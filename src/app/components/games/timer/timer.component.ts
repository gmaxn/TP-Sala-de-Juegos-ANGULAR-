import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimerObservableServiceService } from './../../../services/timer-observable-service.service'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() miliseconds: number;


  isRunning: boolean;

  width: number = 100;

  constructor(private observable: TimerObservableServiceService) {

  }
  
  ngOnInit() {
    console.log(this.miliseconds);
    this.observable.isActiveChanged.subscribe(isRunning => {
      if(isRunning) {
        this.initTimer();
      }
      else {
        this.width = 100;
        console.log(this.width);
      }
    });
  }

  private initTimer(): void {

    let reducer = this.miliseconds; 

    let iterative = setInterval(() => {
      reducer--;
      let newWidth = (reducer * 100) / this.miliseconds;
      if(newWidth === 0) {
        this.observable.isRunning(false);
        clearInterval(iterative);
      }
      else {
        this.width = newWidth;
      }
    }, 1);
  }
}
