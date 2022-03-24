import {Component, Input, OnInit} from '@angular/core';
import { ProjectsService } from '../services/projects.service'
import { IProject } from "../types";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  projects: IProject[] = [];

  constructor(private projectsService: ProjectsService) {
    this.projectsService.projects$.subscribe((projects) => {
      this.projects = projects;
    });
  }

  ngOnInit(): void {
  }

  toggleCompletedTodo(projectId: number, todoId: number) {
    this.projectsService.updateTodo(projectId, todoId);
  }

}
