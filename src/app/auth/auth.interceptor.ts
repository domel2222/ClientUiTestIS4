import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, from } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);
        return from(authService.getUser())
        .pipe(
            switchMap(user => {
                console.log(user);

                const authReq = req.clone({setHeaders: { Authorization: `Bearer ${user.access_token}`}})
                return next.handle(authReq);
            })
        )   
    }

}