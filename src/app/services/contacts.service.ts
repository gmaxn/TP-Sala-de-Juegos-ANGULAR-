import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IContact } from '../models/contact';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  dblist: AngularFirestoreCollection<IContact>;

  constructor(private firestore: AngularFirestore) {
    this.dblist = this.firestore.collection<IContact>('registro-usuarios');
  }


  getContactsObservable(): Observable<IContact[]> {

    return this.dblist.valueChanges().pipe(

      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
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

