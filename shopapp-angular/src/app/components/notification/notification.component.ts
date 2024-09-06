import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  imports: [
    CommonModule,
  ]
})
export class NotificationComponent implements OnInit {
  private notificationService = inject(NotificationService);
  message: string | null = null;
  isError: boolean = false;
  isSuccess: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notification => {
      this.message = notification.message;
      this.isError = notification.type === 'error';
      this.isSuccess = notification.type === 'success';

      // Tự động tắt thông báo sau 3 giây
      setTimeout(() => {
        this.message = null;
        this.isError = false;
        this.isSuccess = false;
      }, 3000); // 3000ms = 3 giây
    });
  }

  close() {
    this.message = null;
  }
}
