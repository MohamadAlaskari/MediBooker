import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getFullYear();
  daysInMonth: number = 0;
  startingDay: number = 0;
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  daysOfMonth: number[] = [];
  today: number = this.currentDate.getDate();
  selectedDate: Date | null = null; // Store the selected date as a Date object
  @Output() dateSelected: EventEmitter<Date> = new EventEmitter<Date>();
  usertype: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.setMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    if (this.currentMonth === this.currentDate.getMonth() && this.currentYear === this.currentDate.getFullYear()) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, this.today); // Set selectedDate to today only on initialization
    }

    this.usertype = localStorage.getItem('usertype');
    if (this.usertype == 'patient') {

    } else if (this.usertype == 'employee') {

    }
  }

  setMonth(month: number, year: number): void {
    this.currentMonth = month;
    this.currentYear = year;
    this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.startingDay = new Date(this.currentYear, this.currentMonth, 1).getDay();

    this.daysOfMonth = Array.from({ length: this.daysInMonth }, (_, i) => i + 1);
  }

  prevMonth(): void {
    this.currentYear = this.currentMonth === 0? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0? 11 : this.currentMonth - 1;
    this.setMonth(this.currentMonth, this.currentYear);
  }

  nextMonth(): void {
    this.currentYear = this.currentMonth === 11? this.currentYear + 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 11? 0 : this.currentMonth + 1;
    this.setMonth(this.currentMonth, this.currentYear);
  }

  isToday(day: number): boolean {
    return day === this.today && this.currentMonth === this.currentDate.getMonth() && this.currentYear === this.currentDate.getFullYear();
  }

  isSelected(day: number): boolean {
    return this.selectedDate!== null && day === this.selectedDate.getDate() && this.currentMonth === this.selectedDate.getMonth() && this.currentYear === this.selectedDate.getFullYear();
  }

  isPastDay(day: number): boolean {
    const dateToCheck = new Date(this.currentYear, this.currentMonth, day);
    const today = new Date();
    return dateToCheck < today && dateToCheck.getDate()!== today.getDate();
  }

  onSelectDate(selectedDate: number): void {
    if (this.usertype === 'patient' && this.isPastDay(selectedDate)) {
      return; // prevent selection of past days for patients
    }
    this.selectedDate = new Date(this.currentYear, this.currentMonth, selectedDate);
    this.dateSelected.emit(this.selectedDate);
  }

  resetToToday(): void {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.setMonth(this.currentMonth, this.currentYear);
    this.selectedDate = new Date(this.currentYear, this.currentMonth, this.today);
    this.dateSelected.emit(this.selectedDate);
  }
}
