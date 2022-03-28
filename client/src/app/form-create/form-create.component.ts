import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectsService } from '../services/projects.service'
import { MatDialog } from '@angular/material/dialog';
import { IProject, ITodoWithoutId } from "../types";


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {

  createNewProject = false;

  validateTitleProject = (control: AbstractControl) => {

    if (!this.createNewProject || !control.value) {
      return null;
    } else if (!control.value) {
      return {require: true};
    }

    return null;
  }

  createForm: FormGroup;
  textFormControl = new FormControl('', [Validators.required]);
  projectIdFormControl = new FormControl(null, [Validators.required]);
  titleFormControl = new FormControl('', [this.validateTitleProject]);

  projects: IProject[] = [];

  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NavbarComponent>,
    public dialog: MatDialog
  ) {
    this.createForm = this.formBuilder.group({
      text: this.textFormControl,
      projectId: this.projectIdFormControl,
      title: this.titleFormControl
    });
  }

  ngOnInit(): void {
    this.projects = this.projectsService.projects$.getValue();
  }

  selectChange(value: number) {
    this.createNewProject = Number(value) === -1;
  }

  submitHandler() {
    try {
      const projectsId = this.projectIdFormControl.value;
      const newTodo: ITodoWithoutId = {
        text: this.textFormControl.value,
        isCompleted: false
      }

      if (this.createNewProject) {
        this.projectsService.addProject(this.titleFormControl.value, newTodo);
      } else {
        this.projectsService.addTodo(projectsId, newTodo);
      }
      this.closeCreateDialog();
    } catch (e) {
      console.log(e);
    }
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      if (this.textFormControl === control) return 'Введите название задачи';
      if (this.projectIdFormControl === control) return 'Выберите категорию задачи';
      if (this.titleFormControl === control) return 'Введите название новой категории';
    }
    return '';
  }

  closeCreateDialog() {
    this.dialogRef.close();
  }

}
