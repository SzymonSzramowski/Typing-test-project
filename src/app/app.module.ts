import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxAutoScroll } from 'ngx-auto-scroll/lib/ngx-auto-scroll.directive';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimeAgoPipe } from 'time-ago-pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { TestTextService } from './services/test-text-service';
import { ConsoleService } from './services/console-service';
import { TimerService } from './services/timer-service';
import { ScoreService } from './services/score-service';
import { ScoreboardComponent } from './views/scoreboard/scoreboard.component';
import { HomepageComponent } from './views/homepage/homepage.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },

  { path: 'home', component: HomepageComponent },
  { path: 'main', component: MainComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NgxAutoScroll,
    ScoreboardComponent,
    HomepageComponent,
    TimeAgoPipe
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule
  ],
  providers: [
    TestTextService,
    ConsoleService,
    TimerService,
    ScoreService,
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
