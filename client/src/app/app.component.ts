import { Component } from '@angular/core';
import { ProjectsService } from "./services/projects.service";
import {IProject} from "./types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Todo Application';

  projects: IProject[] = [];
  loading: boolean = false;

  constructor(private projectsService: ProjectsService) {
    this.projectsService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
    this.projectsService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit() {
    this.projectsService.loadProjects();
  }

}
