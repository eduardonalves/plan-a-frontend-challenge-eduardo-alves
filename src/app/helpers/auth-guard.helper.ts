import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    constructor(
        private router: Router,
        private userService: UserService,


    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.userSubject.value;
        if (user) {

            if (typeof user.request_token == "undefined") {

                this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
                this.user = this.userSubject.asObservable();
                const user2 = this.userSubject.value;
                if (typeof user2.token == "undefined") {
                    this.router.navigate(['/login']);

                }
            }
            
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
