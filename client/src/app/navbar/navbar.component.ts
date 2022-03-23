import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormCreateComponent } from '../form-create/form-create.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() projectList: any = [
    { id: 1, title: "Семья" },
    { id: 2, title: "Работа" },
    { id: 3, title: "Прочее" }
  ]

  constructor(public dialog: MatDialog) { }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(FormCreateComponent, {
      width: '500px',
      data: { projects: this.projectList },
    });
  }

  ngOnInit(): void {
  }

}
