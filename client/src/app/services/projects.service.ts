import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { ITodo, ITodoWithoutId, IProject, IResCreatedTodo, IResCreatedProject } from "../types";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://young-thicket-91125.herokuapp.com';
  }

  projects$ = new BehaviorSubject<IProject[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  loadProjects() {
    this.loading$.next(true);
    this.http.get<IProject[]>(`${this.ROOT_URL}/projects`, {observe: 'response'})
      .subscribe((res) => {
        if (res.status === 200 && res.body) {
          this.projects$.next(res.body);
          this.loading$.next(false);
        }
      });
  }

  addProject(title: number, newTodo: ITodoWithoutId): void {
    this.loading$.next(true);
    this.http.post<IResCreatedProject>(`${this.ROOT_URL}/projects`, { title }, {observe: 'response'})
      .subscribe((res) => {
        if (res.status === 201 && res.body) {
          const createdProject = {
            id: res.body.id,
            title: res.body.title,
            todos: []
          }

          const updatedProjects: IProject[] = this.projects$.getValue();
          updatedProjects.push(createdProject);

          this.projects$.next(updatedProjects);

          this.addTodo(createdProject.id, newTodo);
        }
      });
  }

  addTodo(projectId: number, newTodo: ITodoWithoutId) {
    if (!this.loading$.getValue()) this.loading$.next(true);
    this.http.post<IResCreatedTodo>(`${this.ROOT_URL}/projects/${projectId}/todos`, newTodo, { observe: 'response' })
      .subscribe((res) => {
        if (res.status === 201 && res.body) {
          const createdTodo = { ...res.body };
          const updatedProjects: IProject[] = this.projects$.getValue().map<IProject>((project: IProject) => {
            if (project.id === createdTodo.project_id) {
              const todo: ITodo = { ...createdTodo };
              project.todos.push(todo);
            }
            return project;
          });

          this.projects$.next(updatedProjects);
          this.loading$.next(false);

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
