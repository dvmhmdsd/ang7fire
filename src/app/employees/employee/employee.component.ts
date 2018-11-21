import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private ser: EmployeeService, private store: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if (form != null) form.resetForm();
    
    this.ser.formData = {
      id: null,
      fullName : '',
      position : '',
      empCode : '',
      mobile : ''
    }

  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);

    delete data.id;

    if (form.value.id == null) {
      this.store.collection('employees').add(data);
      this.toastr.success('Form submitted successfully', 'Register');
    }

    else {
      this.store.doc('employees/' + form.value.id).update(data);
      this.toastr.success('informations updated successfuly', 'Register');
    }
    this.resetForm(form);

  }

}
