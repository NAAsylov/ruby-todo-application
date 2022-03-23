import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavbarComponent } from '../navbar/navbar.component';
import { IProject } from './../types';
import { ProjectApiService } from '../services/ProjectApi/project-api.service';
import { ProjectsService } from '../services/Projects/projects.service';

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.scss']
})
export class FormCreateComponent implements OnInit {

  createForm: FormGroup;
  textFormControl = new FormControl('', [Validators.required]);
  projectIdFormControl = new FormControl(null, [Validators.required]);

  loading = false;

  constructor(
    private projectApiService: ProjectApiService,
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NavbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {projects: IProject[]},
  ) {
    this.createForm = this.formBuilder.group({
      text: this.textFormControl,
      projectId: this.projectIdFormControl,
    });
  }

  ngOnInit(): void {
    this.createForm.valueChanges;
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      if (this.textFormControl === control) return 'Введите название задачи';
      if (this.projectIdFormControl === control) return 'Выберите категорию задачи'
    }
    return '';
  }

  closeCreateDialog() {
    this.dialogRef.close();
  }

  submitHandler() {
    this.loading = true;

    const projectId = this.createForm.value.projectId;

    const todo = {
      text: this.createForm.value.text,
      isCompleted: false
    }

    try {
      this.projectApiService.createTodo(projectId, todo)
        .subscribe(res => {
          if (res.status === 201 && res.body) {
            const todo = res.body;
            this.data.projects.map(project => project.id === projectId ? project.todos.push(todo) : project);
            this.closeCreateDialog();
          }
        });
    } catch (e) {
      console.log(e);
    }

    this.loading = false;
  }

}
