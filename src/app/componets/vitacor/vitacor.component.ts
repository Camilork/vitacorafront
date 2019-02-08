import { Component, OnInit } from '@angular/core';
import { VitacorService } from '../../services/vitacor.service'
import { TaskService } from '../../services/task.service'
import { Vita } from '../../models/vitacor';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-vitacor',
  templateUrl: './vitacor.component.html',
  styleUrls: ['./vitacor.component.sass'],
  providers: [VitacorService,TaskService]
})
export class VitacorComponent implements OnInit {
tasks : string[][];

  constructor(public vitacorService : VitacorService,public taskService : TaskService) { }

  ngOnInit() { 
    this.getVita()
    this.getTaskCount(1)
  }

  getVita(){
    this.vitacorService.getVita()
    .subscribe(res=>{
      this.vitacorService.vita = res as Vita[]
    })
  }
  createVita(form?: NgForm){
    if(form.value._id){
      this.vitacorService.putVita(form.value)
      .subscribe(res=>{
        this.resetForm(form)
        this.getVita()
      })
    }else{
      this.vitacorService.postVita(form.value)
      .subscribe(res=>{
        if(res['success']){
          alert(res['msg'])
          this.resetForm(form)
          this.getVita()
        }else{
          alert('Error'+ res['msg'])
        }
      })
    }
  }
  editVita(vita: Vita){
    this.vitacorService.selectvitacor = vita;
  }
  deleteVita(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.vitacorService.deleteVita(_id)
      .subscribe(res=>{
        this.resetForm()
        this.getVita()
      })
    }
  }
  resetForm(form?: NgForm){
    if(form){
      form.reset()
      this.vitacorService.selectvitacor = new Vita
    }
  }
  getTask(){
    this.taskService.getTask()
    .subscribe(res=>{
      this.taskService.task = res as Task[]
    })
  }
  getTaskCount(id){
    this.taskService.getTaskCount(id)
    .subscribe(res=>{
      this.taskService.task = res as Task[]
    })
  }
  createTask(form?: NgForm){
    if(form.value._id){
      this.taskService.putTask(form.value)
      .subscribe(res=>{
        this.resetForm(form)
        this.getTask()
      })
    }else{
      form.value.status = "pending"
      this.taskService.postTask(form.value)
      .subscribe(res=>{
        if(res['success']){
          alert(res['msg'])
          this.resetForm(form)
          this.getTask()
        }else{
          alert('Error'+ res['msg'])
        }
      })
    }
  }
  editTask(task: Task){
    this.taskService.selecttask = task;
    console.log(this,this.taskService.selecttask)
  }
  deleteTask(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.taskService.deleteTask(_id)
      .subscribe(res=>{
        this.resetForm()
        this.getTask()
      })
    }
  }
  resetFormTask(form?: NgForm){
    if(form){
      form.reset()
      this.taskService.selecttask = new Task
    }
  }
  chnge(task: Task, status){
    if(task.status == "pending"){
      task.status = "finish"
      this.taskService.putTask(task)
      .subscribe(res=>{
        console.log(res)
      })
    }else{
      task.status = "pending"
      this.taskService.putTask(task)
      .subscribe(res=>{
        console.log(res)
      })
    }
  }
}
