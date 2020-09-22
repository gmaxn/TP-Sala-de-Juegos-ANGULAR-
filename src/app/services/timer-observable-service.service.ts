import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerObservableServiceService {


  private isActive = new BehaviorSubject<boolean>(false);
  isActiveChanged = this.isActive.asObservable();

  constructor() { }

  isRunning(value: boolean){
    this.isActive.next(value);
  }
}
