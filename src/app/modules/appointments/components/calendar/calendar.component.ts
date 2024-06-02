import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  today: Date = new Date();
  year: number = this.today.getFullYear();
  month: number = this.today.getMonth();
  monthTag: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  day: number = this.today.getDate();
  days: HTMLTableCellElement[] = [];
  selectedDay!: Date;
  setDate!: Date;
  daysLen!: number;
  options: string | undefined;

  ngOnInit() {
    this.days = Array.from(document.getElementsByTagName('td'));
    this.daysLen = this.days.length;
    this.draw();
  }

  draw() {
    this.getCookie('selected_day');
    this.getOptions();
    this.drawDays();

    document.getElementById('reset')?.addEventListener('click', () => this.reset());
    document.getElementsByClassName('pre-button')[0]?.addEventListener('click', () => this.preMonth());
    document.getElementsByClassName('next-button')[0]?.addEventListener('click', () => this.nextMonth());
    this.days.forEach(day => day.addEventListener('click', () => this.clickDay(day)));
  }

  drawHeader(e?: any) {
    const headDay = document.getElementsByClassName('head-day')[0] as HTMLElement;
    const headMonth = document.getElementsByClassName('head-month')[0] as HTMLElement;

    headDay.innerHTML = e || this.day.toString();
    headMonth.innerHTML = `${this.monthTag[this.month]} - ${this.year}`;
  }

  drawDays() {
    const startDay = new Date(this.year, this.month, 1).getDay();
    const nDays = new Date(this.year, this.month + 1, 0).getDate();
    let n = startDay;

    for (let k = 0; k < 42; k++) {
      this.days[k].innerHTML = '';
      this.days[k].id = '';
      this.days[k].className = '';
    }

    for (let i = 1; i <= nDays; i++) {
      this.days[n].innerHTML = i.toString();
      n++;
    }

    for (let j = 0; j < 42; j++) {
      if (!this.days[j].innerHTML) {
        this.days[j].id = "disabled";
      } else if (j === this.day + startDay - 1) {
        if ((!this.setOptions() && this.isCurrentMonthAndYear()) || this.isSetMonthAndYear()) {
          this.drawHeader(this.day);
          this.days[j].id = "today";
        }
      }
      if (this.selectedDay && j === this.selectedDay.getDate() + startDay - 1 && this.isSelectedMonthAndYear()) {
        this.days[j].className = "selected";
        this.drawHeader(this.selectedDay.getDate());
      }
    }
  }

  clickDay(o: HTMLElement) {
    const selected = document.getElementsByClassName("selected")[0] as HTMLElement;
    if (selected) {
      selected.className = "";
    }
    o.className = "selected";
    this.selectedDay = new Date(this.year, this.month, parseInt(o.innerHTML));
    this.drawHeader(o.innerHTML);
    this.setCookie('selected_day', 1);
  }

  preMonth() {
    if (this.month < 1) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    this.drawHeader(1);
    this.drawDays();
  }

  nextMonth() {
    if (this.month >= 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.drawHeader(1);
    this.drawDays();
  }

  getOptions() {
    if (this.setOptions()) {
      const [year, month, day] = this.setOptions()!.split('-').map(Number);
      this.setDate = new Date(year, month - 1, day);
      this.day = this.setDate.getDate();
      this.year = this.setDate.getFullYear();
      this.month = this.setDate.getMonth();
    }
  }

  reset() {
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
    this.day = this.today.getDate();
    this.selectedDay = new Date(this.year, this.month, this.day);
    this.setOptions(undefined);
    this.drawHeader(this.day);
    this.drawDays();
  }

  setCookie(name: string, expiredays: number) {
    const date = new Date();
    date.setTime(date.getTime() + (expiredays * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + this.selectedDay + expires + "; path=/";
  }

  getCookie(name: string) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) == 0) {
        this.selectedDay = new Date(cookie.substring(nameEQ.length, cookie.length));
      }
    }
  }

  setOptions(options?: string) {
    this.options = options;
    return this.options;
  }

  isCurrentMonthAndYear() {
    return this.month === this.today.getMonth() && this.year === this.today.getFullYear();
  }

  isSetMonthAndYear() {
    return this.month === this.setDate.getMonth() && this.year === this.setDate.getFullYear();
  }

  isSelectedMonthAndYear() {
    return this.month === this.selectedDay.getMonth() && this.year === this.selectedDay.getFullYear();
  }
}

