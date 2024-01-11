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

    // //////////////////////////////////////

    this.studentFormGroup = this.fb.group({
      name: ['', Validators.required],
      subOne: ['', Validators.required],
      subTwo: ['', Validators.required],
      subThree: ['', Validators.required],
    });

    this.getPassedStudents();
  }

  title = 'form-app';
  formGb: FormGroup;
  data: any = [];
  hobbiesControl = new FormArray([new FormControl('', Validators.required)]);

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

  // //////////////////////////////////////

  studenList: any = [
    { name: 'Zack', subOne: '56', subTwo: '85', subThree: '12' },
    {
      name: 'Mahi',
      subOne: '86',
      subTwo: '75',
      subThree: '82',
    },
  ];
  editForm!: boolean;
  studentForm!: boolean;
  passedStudents: any;

  studentFormGroup!: FormGroup;
  currentIndex!: number;

  openForm() {
    this.studentForm = true;
  }

  submitForm() {
    if (this.studentForm) {
      console.log(this.studentFormGroup.value);
      const formData = this.studentFormGroup.value;
      this.studenList.push(formData);
      this.getPassedStudents();
      this.studentForm = false;
      this.studentFormGroup.reset();
    }
    if (this.editForm) {
      const formData = this.studentFormGroup.value;
      this.studentFormGroup.reset();
      this.studenList = this.studenList.map((v: any) => {
        if (v.name === formData.name) {
          v = { ...formData };
          return v;
        } else return v;
      });
      this.editForm = false;
      this.getPassedStudents();
    }
  }

  getPassedStudents() {
    this.studenList = this.studenList.map((v: any) => {
      if (
        parseInt(v.subOne) > 34 &&
        parseInt(v.subTwo) > 34 &&
        parseInt(v.subThree) > 34
      ) {
        v.status = 'PASS';
        return v;
      } else {
        v.status = 'FAIL';
        return v;
      }
    });
  }

  editField(index: number) {
    this.currentIndex = index;
    this.editForm = true;

    const currentRow = this.studenList[index];

    this.studentFormGroup.patchValue(currentRow);
  }
}
