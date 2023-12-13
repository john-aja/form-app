import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import 'zone.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-app';
  formGb: FormGroup;
  data: any = [];
  hobbiesControl = new FormArray([new FormControl('', Validators.required)]);
  constructor(private fb: FormBuilder) {
    this.formGb = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: this.hobbiesControl,
      verify: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getDataForTable();
  }

  addHobbies() {
    this.hobbiesControl.push(new FormControl('', Validators.required));
  }

  submit() {
    const getVal = this.formGb.value;

    let localData: any = [];
    localData.push(getVal);

    const getExistingData = localStorage.getItem('tableData');

    let parseExistingData;
    if (getExistingData) {
      parseExistingData = JSON.parse(getExistingData);
    } else {
      parseExistingData = null;
    }
    if (parseExistingData !== null) {
      localData.push(...parseExistingData);
    }

    this.data = localData;

    const saveData = JSON.stringify(localData);
    localStorage.setItem('tableData', saveData);
    this.formGb.reset();
  }

  reset() {
    this.formGb.reset();
  }

  getDataForTable() {
    const getFromLs = localStorage.getItem('tableData');
    if (getFromLs) {
      const formData = JSON.parse(getFromLs);
      console.log(formData);
      this.data = formData;
    } else {
      this.data = [];
    }
  }

  deleteRow(index: number) {
    const getFromLs = localStorage.getItem('tableData');
    if (getFromLs) {
      const formData = JSON.parse(getFromLs);
      const afterDelete = formData.filter((v: any, i: any) => {
        if (i === index) {
          return;
        } else return v;
      });
      this.data = afterDelete;
      console.log(this.data);
    } else {
      this.data = [];
    }
  }
}
