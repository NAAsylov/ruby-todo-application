import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import { ITodo, ITodoWithoutId, IProject, IResCreatedTodo } from "../types";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://young-thicket-91125.herokuapp.com';
  }

  projects$ = new BehaviorSubject<IProject[]>([])

  loadProjects() {
    this.http.get<IProject[]>(`${this.ROOT_URL}/projects`, {observe: 'response'})
      .subscribe((res) => {
        if (res.status === 200 && res.body) this.projects$.next(res.body);
      });
  }

  addTodo(projectId: number, newTodo: ITodoWithoutId): void {
    this.http.post<IResCreatedTodo>(`${this.ROOT_URL}/projects/${projectId}/todos`, newTodo, {observe: 'response'})
      .subscribe((res) => {
        if (res.status === 201 && res.body) {
          const createdTodo = {...res.body};
          const updatedProjects: IProject[] = this.projects$.getValue().map<IProject>((project: IProject) => {
            if (project.id === createdTodo.project_id) {
              const todo: ITodo = { ...createdTodo };
              project.todos.push(todo);
            }
            return project
          })

          this.projects$.next(updatedProjects);

        }
      });
  }

  updateTodo(projectId: number, todoId: number) {
    this.http.patch<IResCreatedTodo>(`${this.ROOT_URL}/projects/${projectId}/todos/${todoId}`, {}, {observe: 'response'})
      .subscribe((res) => {
        if (res.status !== 200) {
          const updatedProjects: IProject[] = this.projects$.getValue().map<IProject>((project: IProject) => {
            if (project.id === projectId) {
              project.todos.map<ITodo>((todo: ITodo) => {
                if (todo.id === todoId) {
                  todo.isCompleted = !todo.isCompleted;
                }
                return todo;
              })
            }
            return project;
          });

          this.projects$.next(updatedProjects);
        }
      });
  }
}
