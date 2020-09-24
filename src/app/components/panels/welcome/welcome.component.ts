import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username:string;
  password:string;

  constructor() { }

  ngOnInit(): void {
    
    let user = JSON.parse(localStorage.getItem('usuario'));

    this.username = user.email;
  }

}
