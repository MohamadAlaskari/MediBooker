import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainHeaderComponent,
    FooterComponent,
    BannerComponent,
    CountdownTimerComponent,
    SubHeaderComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    BannerComponent,
    MainHeaderComponent,
    SubHeaderComponent,
    FooterComponent,
    CountdownTimerComponent,
  ],
  providers: [],
})
export class SharedModule {}
