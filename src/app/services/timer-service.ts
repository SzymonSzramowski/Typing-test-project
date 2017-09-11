import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class TimerService {

    private subscription: Subscription;

    public timeInterval = Observable.interval(1000);

    public timer = 0;

    public startTimer(): void {
        this.timer = 0;
        this.subscription = this.timeInterval.subscribe(() => {
            this.timer++;
        });
    }

    public stopTimer(): void {
        this.subscription.unsubscribe();
    }
}
