import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostofficeService } from './postoffice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Post Office Details';
  status: string = '';  // ✅ Fix: Provide a default value
  errorMessage: string = '';  // ✅ Fix: Provide a default value
  requestFinished: boolean = false;
  requestValid: boolean = false;

  newForm = new FormGroup({
    fieldVal: new FormControl('607807')  // Default pincode
  });

  postofficeDetails: any = [];

  constructor(private postofficeService: PostofficeService) {}

  ngOnInit(): void {}

  onSearch(): void {
    let enteredPinCode = this.newForm.get('fieldVal')?.value;

    if (!enteredPinCode) {
      this.errorMessage = "Pincode cannot be empty!";
      this.requestValid = false;
      return;
    }

    this.postofficeService.getPostOfficeDetails(enteredPinCode).subscribe(
      (data: any) => {  // ✅ Fix: Explicitly define type
        if (data && data[0]?.PostOffice) {
          this.postofficeDetails = data[0].PostOffice;
          this.status = data[0].Status;
          this.requestFinished = true;

          if (this.status === "404" || this.status === "Error") {
            this.errorMessage = `Invalid Pincode ${enteredPinCode}! Enter a valid one.`;
            this.requestValid = false;
          } else {
            this.errorMessage = "";
            this.requestValid = true;
          }
        } else {
          this.errorMessage = "Invalid response from server.";
          this.requestValid = false;
        }
      },
      (error: any) => {  // ✅ Fix: Explicitly define type
        this.errorMessage = "Unexpected Error Occurred!";
        this.requestValid = false;
        console.error(error);
      }
    );
  }
}
