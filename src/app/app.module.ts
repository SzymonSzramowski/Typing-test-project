import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { LoginService } from './services/login-service';
import { TestTextService } from './services/test-text-service';
import { ConsoleService } from './services/console-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    LoginService,
    TestTextService,
    ConsoleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
