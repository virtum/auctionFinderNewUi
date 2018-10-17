import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FacebookService } from 'ngx-facebook';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class LogoutService {

    constructor(private http: Http, private router: Router, private fb: FacebookService, protected localStorage: LocalStorage) { }

    logout(isLogged: BehaviorSubject<boolean>) {
        this.localStorage.getItem('logged').subscribe((logged) => {
            console.log('logout subscribe logged: ' + logged);

            if (logged) {
                this.logoutUser().subscribe(res => {
                    // this.localStorageService.set('isLogged', false);
                    this.localStorage.setItemSubscribe('logged', false);
                    isLogged.next(false);
                });
            }
            this.router.navigateByUrl('/home');
        });

    }

    private logoutUser() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.get('http://localhost:8080/rest/logout', options)
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
