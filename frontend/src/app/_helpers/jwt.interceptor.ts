import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
=======
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
>>>>>>> 2383958f5025b1740e163aac0186b6d95c23015e
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const account = this.accountService.accountValue;
        const isLoggedIn = account && account.jwtToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${account.jwtToken}` }
            });
        }

        return next.handle(request);
    }
}

export const jwtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
};
