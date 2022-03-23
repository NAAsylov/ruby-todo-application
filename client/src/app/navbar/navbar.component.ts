import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FormCreateComponent } from '../form-create/form-create.component';
import { IProject } from './../types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() projectList: IProject[] = [];

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
