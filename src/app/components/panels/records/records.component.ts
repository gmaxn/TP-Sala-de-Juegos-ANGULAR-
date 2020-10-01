import { Component, OnInit } from '@angular/core';
import { IRecord } from 'src/app/models/record';
import { RecordsService } from 'src/app/services/records.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  public records: IRecord[];
  private errorMessage: string;

  constructor(private recordService: RecordsService) { }

  ngOnInit(): void {

    this.recordService.getRecordsObservable().subscribe({

      next: records => {
        this.records = records;
      },
      error: err => this.errorMessage = err
    });
  }

}
