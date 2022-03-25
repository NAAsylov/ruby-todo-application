import { Component, OnInit } from '@angular/core';
import { FormCreateComponent } from '../form-create/form-create.component';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectsService } from '../services/projects.service'

@Component({
  selector: 'app-form-create-project',
  templateUrl: './form-create-project.component.html',
  styleUrls: ['./form-create-project.component.scss']
})
export class FormCreateProjectComponent implements OnInit {

  createFormProject: FormGroup;
  titleFormControl = new FormControl('', [Validators.required]);


  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormCreateComponent>,
  ) {
    this.createFormProject = this.formBuilder.group({
      title: this.titleFormControl
    });
  }

  ngOnInit(): void {
  }

  submitHandler() {
    try {
      const title = this.titleFormControl.value;
      this.projectsService.addProject(title);
      this.closeCreateDialog();
    } catch (e) {
      console.log(e);
    }
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Введите название категории';
    }
    return '';
  }

  closeCreateDialog() {
    this.dialogRef.close();
  }

}
