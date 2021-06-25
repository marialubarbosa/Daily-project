import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ListService {

endpoint = 'http://localhost:3000/tarefas';

  constructor( private http: HttpClient) {

  }
  getTasks () :Observable<Task[]> {
    return this.http.get<Task[]>(this.endpoint);
  }

  newTask (newTask) :Observable<Task> {
    return this.http.post<Task>(this.endpoint, newTask)
  }

  updateStatusTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.endpoint}/${task.id}`, {
      'titulo': task.titulo,
      'descricao': task.descricao,
      'status': !task.status
    })
  }
  updateTask (task) :Observable<Task> {
    return this.http.put<Task>(`${this.endpoint}/${task.id}`, task)
  }

  deleteTask (task) :Observable<Task> {
    return this.http.delete<Task>(`${this.endpoint}/${task}`)


  }

}
