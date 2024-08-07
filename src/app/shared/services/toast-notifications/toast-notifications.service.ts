import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationsService {
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  private currentId = 0;

  private show(
    type: 'success' | 'warning' | 'error' | 'info',
    title: string,
    message: string
  ) {
    const toast: Toast = { id: this.currentId++, type, title, message };
    this.toastSubject.next([...this.toastSubject.value, toast]);
     setTimeout(() => this.closeToast(toast.id), 10000);
  }
  showSuccess(message: string, title?: string) {
    this.show('success', title || 'Success', message);

  }

  showWarning(message: string, title?: string) {
    this.show('warning', title || 'Warning', message);
  }

  showError(message: string, title?: string) {
    this.show('error', title || 'Error', message);
  }

  showInfo(message: string, title?: string) {
    this.show('info', title || 'Info', message);
  }

  getToasts() {
    return this.toastSubject.asObservable();
  }
  closeToast(id: number) {
    const toasts = this.toastSubject.value.filter((toast) => toast.id !== id);
    this.toastSubject.next(toasts);
  }
}
