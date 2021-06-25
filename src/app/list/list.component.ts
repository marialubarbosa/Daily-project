import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task.model';
import {ListService} from './list.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})

export class ListComponent implements OnInit {

  public taskList: Task[] = [] ;
  public add = document.getElementById("add");

  constructor(private listTask: ListService ) { }


  ngOnInit() {
    this.getTasks()

  }

  getTasks(){
    this.listTask.getTasks().subscribe
      ((task: Task[])=>{
        this.taskList=task

        this.taskList.forEach((element)  => {
          if(element.status){
            setTimeout(() => {
              document.getElementById(`card-body${element.id}`).classList.add('opacityCard');
            }, 100)

          }
        });

      })

  }

  addTask(){
      this.taskList.push(new Task());
      document.getElementById("add").setAttribute('disabled', 'disabled');
  }

  alterStatus(task: Task) {
    this.listTask.updateStatusTask(task)
    .toPromise()
    .then((e) => {
      if(task.status == true) {
        Swal.fire({
          title: 'Tarefa concluida',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#O6f75a6'
        })
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Tarefa desmarcada',
          text: 'Você desmarcou uma tarefa que já estava concluida',
          confirmButtonText: 'OK',
          confirmButtonColor: '#O6f75a6'
        })
      }
      this.getTasks();
    })
  }
  newTask(task){
    this.listTask.newTask(task).toPromise().then((e)=>{
      Swal.fire({
        title: 'Tarefa criada!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#O6f75a6'
      })
      this.getTasks()

    }).catch((err) => {
      Swal.fire({
        title: 'Tivemos um problema ao criar esta tarefa!',
        text: 'Por favor, reinicia a tela e tenta novamente',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#03395b'
      })
    })
    document.getElementById("add").removeAttribute('disabled');
  }
  updateTask(task) {

    this.listTask.updateTask(task).toPromise().then((e)=>{
      Swal.fire({
        title: 'Tarefa atualizada!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#O6f75a6'
      })
      this.getTasks()

    }).catch((err)=> {
      Swal.fire({
        title: 'Tivemos um problema ao alterar esta tarefa!',
        text: 'Por favor, reinicia a tela e tenta novamente',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#03395b'
      })
    })
  }

  removeTask(task){
    if(!task){
      this.getTasks();
      document.getElementById("add").removeAttribute('disabled');
    }else{
      this.listTask.deleteTask(task).toPromise().then((e)=>{
        Swal.fire({
          title: 'Tarefa removida!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#O6f75a6'
        })
      this.getTasks();
      }).catch((err)=> {
        Swal.fire({
          title: 'Tivemos um problema ao excluir esta tarefa!',
          text: 'Por favor, reinicia a tela e tenta novamente',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#03395b'
        })
      })
      document.getElementById("add").removeAttribute('disabled');

    }


  }

}
