import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private http: Http, private localStorageService: LocalStorageService) {
        console.log('authGuard ctor: logged: ' + this.localStorageService.get('isLogged'));
        this.isUserLogged().subscribe(res => {
            this.localStorageService.set('isLogged', res.logged);
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('authGuard canActivate: logged: ' + this.localStorageService.get('isLogged'));
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(returnUrl): boolean {
        console.log('authGuard checkLoggedIn: logged: ' + this.localStorageService.get('isLogged'));
        if (this.localStorageService.get('isLogged')) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
        return false;
    }

    private isUserLogged() {
        console.log('authGuard isUserLogged: logged: ' + this.localStorageService.get('isLogged'));
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.get('http://localhost:8080/isLogged', options)
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
