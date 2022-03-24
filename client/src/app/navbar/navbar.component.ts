import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

}
