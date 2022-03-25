import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormCreateProjectComponent } from '../form-create-project/form-create-project.component';
import { FormCreateComponent } from '../form-create/form-create.component'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(FormCreateComponent, {
      width: '500px',
      data: {},
    });
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(FormCreateProjectComponent, {
      width: '500px',
      data: {},
    });
  }

}
