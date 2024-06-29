import { Component } from '@angular/core';
import { Toast } from '../../models/toast.model';
import { Subscription } from 'rxjs';
import { ToastNotificationsService } from '../../services/toast-notifications/toast-notifications.service';

@Component({
  selector: 'app-toast-notifications',
  templateUrl: './toast-notifications.component.html',
  styleUrl: './toast-notifications.component.scss',
})
export class ToastNotificationsComponent {
  toasts: Toast[] = [];
  private subscription!: Subscription;

  constructor(private toastService: ToastNotificationsService) {}

  ngOnInit() {
    this.subscription = this.toastService.getToasts().subscribe({
      next: (toasts) => {
        this.toasts = toasts;
      },
    });
  }

  // Methode zum Schließen des Toasts
  closeToast(id: number) {
    this.toastService.closeToast(id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
