import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';

@NgModule({
  declarations: [
    MainHeaderComponent,
    FooterComponent,
    BannerComponent,
    CountdownTimerComponent,
  ],
  imports: [CommonModule],
  exports: [
    BannerComponent,
    MainHeaderComponent,
    FooterComponent,
    CountdownTimerComponent,
  ],
})
export class SharedModule {}
