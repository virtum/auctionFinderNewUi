import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LoginService {

    constructor(private fb: FacebookService, private http: Http, private router: Router, private localStorageService: LocalStorageService) {
        console.log('login ctor: logged: ' + this.localStorageService.get('isLogged'));
        this.initialFacebookService();
    }

    initialFacebookService() {
        this.fb.init({
            appId: '1722165054742491',
            xfbml: true,
            version: 'v2.8'
        });
    }

    login(isLogged: BehaviorSubject<boolean>) {
        if (!this.localStorageService.get('isLogged')) {
            console.log('login login before: logged: ' + this.localStorageService.get('isLogged'));
            this.fb.login()
                .then((res: LoginResponse) => {
                    console.log(res.authResponse.accessToken);
                    this.sendAccessToken(res.authResponse.accessToken).subscribe(res => {
                        this.localStorageService.set('isLogged', true);
                        isLogged.next(true);
                        this.router.navigateByUrl('/account');
                        console.log('login login after: logged: ' + this.localStorageService.get('isLogged'));
                    });
                })
                .catch(this.handleError);
        } else {
            this.router.navigateByUrl('/account');
        }
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
