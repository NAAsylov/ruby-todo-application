import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() projectList: any = [
    { id: 1, title: "Семья", todos: [
        {id: 1, text: "Задача 1", isCompleted: false},
        {id: 2, text: "Задача 2", isCompleted: true},
        {id: 3, text: "Задача 3", isCompleted: false}
      ]
    },
    { id: 2, title: "Работа", todos: [
        {id: 4, text: "Задача 4", isCompleted: false},
        {id: 5, text: "Задача 5", isCompleted: false},
        {id: 6, text: "Задача 6", isCompleted: true}
      ]
    },
    { id: 3, title: "Прочее", todos: [
        {id: 7, text: "Задача 7", isCompleted: false},
        {id: 8, text: "Задача 8", isCompleted: true},
        {id: 9, text: "Задача 9", isCompleted: true}
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  toggleCompletedTodo(projectId: number, todoId: number) {
    /*Запрос на изменение*/
  }

}
