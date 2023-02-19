import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactusForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public commonservice: CommonService,
  ) { }

  ngOnInit(): void {
    this.ContactForm()
  }


  ErrorMessage(value: any) {
    return 'Please ' + value;
  }

  private ContactForm() {
    this.contactusForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      subject: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      emailId: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55),Validators.email],
        updateOn: 'change',
      }),
      description: new FormControl(''),
    });
  }


  onSubmitContactUs() {
    let contactDetails = this.contactusForm.value;
    this.commonservice.sendMailForContact(contactDetails).subscribe(
      (data: any) => { console.log(data,"contact data") },
      (err: any) => console.log(err)
    );
    this.contactusForm.reset();



  }


}
