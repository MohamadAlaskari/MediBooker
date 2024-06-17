import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent {
  usertype: string | null = null;

  ngOnInit() {

    this.usertype = localStorage.getItem('usertype');


  }
}
