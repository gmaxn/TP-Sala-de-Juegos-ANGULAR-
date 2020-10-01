import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { IRecord } from '../models/record';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  dblist: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {
    this.dblist = this.firestore.collection<IRecord>('records');
  }
  getRecordsObservable(): Observable<IRecord[]> {

    return this.dblist.valueChanges().pipe(

      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getRecordsDoc(): IRecord[] {
    let arr: IRecord[];
    this.dblist.get().toPromise().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        arr.push({
          docRefId: doc.ref.id,
          game: doc.data().game,
          points: doc.data().points,
          username: doc.data().username
        });
      });
    });
    return arr;
  }
  setRecordsDoc(record: IRecord) {
    let arr: IRecord[];
    this.dblist.doc(record.docRefId).set({
      docRefId: record.docRefId,
      game: record.game,
      username: record.username,
      poins: record.points
    });
  }

  addRecordDoc(record: IRecord) {
    let arr: IRecord[];
    this.dblist.add({
      docRefId: record.docRefId,
      game: record.game,
      username: record.username,
      poins: record.points
    }).then(docRef => {
      this.dblist.doc(docRef.id).set({
        docRefId: docRef.id,
        game: record.game,
        username: record.username,
        points: record.points
      }).catch(error => {
        console.error('Error adding document: ', error);
      });
    }).catch(error => {
      console.log('Login error: ', error);
      //this.router.navigate(['error']);
    });
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console.
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
