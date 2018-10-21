import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LocalStorage } from '@ngx-pwa/local-storage';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private http: Http, protected localStorage: LocalStorage) {
        this.isUserLogged().subscribe(res => {
            // this.localStorageService.set('isLogged', res.logged);
            this.localStorage.setItemSubscribe('logged', res.logged);
        });
    }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     return this.checkLoggedIn(state.url);
    // }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return this.localStorage.getItem('logged')
        // .catch(() => {
        //     this.router.navigate(['/login']);
        //     return Observable.of(false);
        // });

        return this.localStorage.getItem('logged')
            .pipe(map(logged => {
                console.log('canActivate map:' + logged);
                if (logged) {
                    return true;
                }
                this.router.navigate(['/login']);

                return false;
            }), catchError(error => {
                console.log('canActivate error:');
                this.router.navigate(['/login']);

                return of(false);
            }));
    }

    checkLoggedIn(returnUrl) {
        this.localStorage.getItem('logged').subscribe((logged) => {
            if (logged) {
                return true;
            }
            this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
            return false;
        });
    }

    private isUserLogged() {
        // console.log('authGuard isUserLogged: logged: ' + this.localStorageService.get('isLogged'));
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get('http://localhost:8080/isLogged', options)
            .pipe(map(response => {
                const body = response.json();

                return body.response || {};
            }), catchError(error => {
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
