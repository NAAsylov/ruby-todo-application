import { Component } from '@angular/core';
import { ProjectApiService } from './services/ProjectApi/project-api.service';
import { IProject } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ruby Todo Application';

  projectList: IProject[] = [];

  constructor(
    private projectApiService: ProjectApiService,
  ) {}

  ngOnInit(): void {
    this.projectApiService.getTodo().subscribe(res => {
      if (res.status === 200) {
        const projectList = res.body || [];
        this.projectList = projectList;
      }
    })
  }

}
