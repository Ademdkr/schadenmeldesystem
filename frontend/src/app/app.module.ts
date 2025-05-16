// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Jetzt hier die Seiten-Komponenten
import { AuftragErstellenComponent } from './pages/auftrag-erstellen/auftrag-erstellen.component';
import { UebersichtComponent }     from './pages/uebersicht/uebersicht.component';
import { AuftragTabelleComponent }  from './pages/auftrag-tabelle/auftrag-tabelle.component';
import { AuftragDetailComponent }   from './pages/auftrag-detail/auftrag-detail.component';
import { LoginComponent }           from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AuftragErstellenComponent,
    AuftragTabelleComponent,
    AuftragDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    UebersichtComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
