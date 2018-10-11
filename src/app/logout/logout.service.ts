import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorageService } from 'angular-2-local-storage';
import { FacebookService } from 'ngx-facebook';

@Injectable()
export class LogoutService {

    constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService, private fb: FacebookService) { }

    logout(isLogged: BehaviorSubject<boolean>) {
        console.log('logout service logged: ' + this.localStorageService.get('isLogged'));
        this.logoutUser().subscribe(res => {
            this.localStorageService.set('isLogged', false);
            isLogged.next(false);
            this.router.navigate(['/home']);
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
