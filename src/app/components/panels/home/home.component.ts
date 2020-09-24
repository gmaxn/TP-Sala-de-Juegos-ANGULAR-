import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:string;
  password:string;

  constructor() { }

  ngOnInit(): void {

    let user = JSON.parse(localStorage.getItem('usuario'));

    this.username = user.email;
  }
}
