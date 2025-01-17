import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {RouterOutlet} from '@angular/router';
import {SidenavComponent} from './shared/components/sidenav/sidenav.component';
import {MaterialModule} from './shared/modules/material.module';
import {AuftragErstellenComponent} from './pages/auftrag-erstellen/auftrag-erstellen.component';
import {FormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuftragErstellenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    SidenavComponent,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
