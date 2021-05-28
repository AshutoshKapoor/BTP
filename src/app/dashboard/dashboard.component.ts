import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  addNewItemForm = new FormGroup({
    componentName : new FormControl('', [
      Validators.required,
    ]),
    code : new FormControl('', [
      Validators.required,
    ]),
    quantity : new FormControl('', [
      Validators.required,
    ]),
    lab : new FormControl('', [
      Validators.required,
    ]),
  });

  get courseName() { return this.addNewItemForm.get('courseName'); }
  get code() { return this.addNewItemForm.get('code'); }
  get quantity() { return this.addNewItemForm.get('quantity'); }
  get lab() { return this.addNewItemForm.get('lab'); }


  removeItemForm = new FormGroup({
    componentCodeRIF : new FormControl('', [
      Validators.required,
    ]),
    quantityRIF : new FormControl('', [
      Validators.required,
    ]),
    labRIF : new FormControl('', [
      Validators.required,
    ]),
    reasonRIF : new FormControl('', [
      Validators.required,
    ]),
  });

  get componentCodeRIF() { return this.removeItemForm.get('componentCodeRIF'); }
  get quantityRIF() { return this.removeItemForm.get('quantityRIF'); }
  get labRIF() { return this.removeItemForm.get('labRIF'); }
  get reasonRIF() { return this.removeItemForm.get('reasonRIF'); }

  studentIssueForm = new FormGroup({
    componentCodeSIF : new FormControl('', [
      Validators.required,
    ]),
    quantitySIF : new FormControl('', [
      Validators.required,
    ]),
    labSIF : new FormControl('', [
      Validators.required,
    ]),
  });

  get componentCodeSIF() { return this.studentIssueForm.get('componentCodeSIF'); }
  get quantitySIF() { return this.studentIssueForm.get('quantitySIF'); }
  get labSIF() { return this.studentIssueForm.get('labSIF'); }

  studentReturnForm = new FormGroup({
    rollNoSRF : new FormControl('', [
      Validators.required,
    ]),
    labSRF : new FormControl('', [
      Validators.required,
    ]),
  });

  get rollNoSRF() { return this.studentReturnForm.get('rollNoSRF'); }
  get labSRF() { return this.studentReturnForm.get('labSRF'); }


  constructor() { }
  
  ngOnInit() { }


  addNewItemSubmit() {
    console.log(this.addNewItemForm.value)
  }

  removeItemSubmit() {
    console.log(this.removeItemForm.value)
  }

  studentIssueSubmit() {
    console.log(this.studentIssueForm.value)
  }

  studentReturnSubmit() {
    console.log(this.studentReturnForm.value)
  }
}
