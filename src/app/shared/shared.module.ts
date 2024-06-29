import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerComponent } from './components/banner/banner.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastNotificationsComponent } from './components/toast-notifications/toast-notifications.component';
import { TabsComponent } from './components/tabs/tabs.component';
@NgModule({
  declarations: [
    MainHeaderComponent,
    FooterComponent,
    BannerComponent,
    CountdownTimerComponent,
    SubHeaderComponent,
    ProfileComponent,
    ToastNotificationsComponent,
    TabsComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule,
    ReactiveFormsModule],
  exports: [
    BannerComponent,
    MainHeaderComponent,
    SubHeaderComponent,
    FooterComponent,
    CountdownTimerComponent,
    ToastNotificationsComponent,
    TabsComponent
  ],
  providers: [ DatePipe],
})
export class SharedModule { }
