import { Component, Input, OnInit } from '@angular/core';
import { ProjectApiService } from '../services/ProjectApi/project-api.service';
import { IProject } from './../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() projectList: IProject[] = [];

  constructor(private projectApiService: ProjectApiService) { }

  ngOnInit(): void {
  }

  toggleCompletedTodo(event: any, projectId: number, todoId: number) {
    this.projectApiService.updateTodo(projectId, todoId).subscribe(response => {
      if (response.status !== 200) {
        event.checked = !event.checked;
      }
    })
  }

}
