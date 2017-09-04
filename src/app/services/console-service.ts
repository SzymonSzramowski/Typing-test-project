import { Injectable } from '@angular/core';

@Injectable()
export class ConsoleService {

    public consoleArray: Array<string> = new Array;

    public addAlertToArray(alert: string): void {
        this.consoleArray.push(alert);
    }
}
