import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LoginService {

    constructor(private fb: FacebookService, private http: Http, private router: Router, private localStorageService: LocalStorageService, ) {
        this.initialFacebookService();
    }

    initialFacebookService() {
        const initParams: InitParams = {
            appId: '1722165054742491',
            xfbml: true,
            version: 'v2.8'
        };

        this.fb.init(initParams);

        // this.fb.init({
        //     appId: '1722165054742491',
        //     xfbml: true,
        //     version: 'v2.8'
        // });
    }

    login(isLogged: BehaviorSubject<boolean>) {
        this.fb.login()
            .then((res: LoginResponse) => {
                console.log(res.authResponse.accessToken);
                this.sendAccessToken(res.authResponse.accessToken).subscribe(res => {
                    this.localStorageService.set('isLogged', true);
                    isLogged.next(true);
                    this.router.navigateByUrl('/account');
                }
                );
            })
            .catch(this.handleError);
    }

    sendAccessToken(accessToken): Observable<String> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http
            .post('http://localhost:8080/authenticate', { accessToken }, options)
            .pipe(map(response => {
                const body = response.json();
                return body.response || {};
            }))
            .pipe(catchError(error => {
                this.handleError(error);
                return throwError(error);
            }));
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
