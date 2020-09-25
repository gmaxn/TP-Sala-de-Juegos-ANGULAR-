import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { IContact } from 'src/app/models/contact';
import { AuthService } from 'src/app/services/auth.service';
import { ContactsService } from 'src/app/services/contacts.service';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: IContact[] = new Array<IContact>();
  private contact: IContact;
  private errorMessage: string;

  private con: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private contactsService: ContactsService) {

    this.contacts = new Array<IContact>();

  }

  ngOnInit(): void {

    this.contactsService.getContactsObservable().subscribe({

      next: contacts => {
        this.contacts = contacts;
      },
      error: err => this.errorMessage = err
    });

  }
}
