import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public nickname = '';

    public setLoginStatus(name: string): void {
        this.nickname = name;
        this.isLoggedIn.next(true);
    }

    public getNickname(): string {
        return this.nickname;
    }

    public isUserLogged(): Observable<boolean> {
        return this.isLoggedIn.asObservable();
    }

    public logout(): void {
        this.isLoggedIn.next(false);
        this.nickname = '';
    }
}
