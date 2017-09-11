import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAutoScroll } from 'ngx-auto-scroll/lib/ngx-auto-scroll.directive';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { LoginService } from './services/login-service';
import { TestTextService } from './services/test-text-service';
import { ConsoleService } from './services/console-service';
import { TimerService } from './services/timer-service';
import { ScoreService } from './services/score-service';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NgxAutoScroll,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LoginService,
    TestTextService,
    ConsoleService,
    TimerService,
    ScoreService,
    DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
