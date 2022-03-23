import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NavbarComponent} from '../navbar/navbar.component';

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
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NavbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, /* ПОМЕНЯТЬ ТИП */
  ) {
    this.createForm = this.formBuilder.group({
      text: this.textFormControl,
      projectId: this.projectIdFormControl,
    });
  }

  ngOnInit(): void {
    this.createForm.valueChanges.subscribe(console.log);
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

    try {
      /*Запрос на создание*/
      this.closeCreateDialog();
    } catch (e) {
      console.log(e);
    }

    this.loading = false;
  }

}
