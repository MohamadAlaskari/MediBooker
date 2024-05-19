import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ModulesModule } from './modules/modules.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { AppoitmentsComponent } from './modules/appoitments/components/appoitments/appoitments.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    ModulesModule,
    SharedModule,

    BrowserModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
