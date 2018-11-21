import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from './../../shared/employee.model';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];

  constructor(private service: EmployeeService, private store: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getData().subscribe(action => {
      this.list = action.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() } as Employee
      })
    });
  }


  onEdit(item:Employee) {
    this.service.formData = Object.assign({}, item);
  }

  onDelete(id) {
    if (confirm('Are you sure?')) {
      this.store.doc('employees/' + id).delete();

      this.toastr.error('Deleted successfully', 'Register');
    }
  }


}
