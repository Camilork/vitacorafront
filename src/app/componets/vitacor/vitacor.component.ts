import { Component, OnInit } from '@angular/core';
import { VitacorService } from '../../services/vitacor.service'
import { Vita } from '../../models/vitacor';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-vitacor',
  templateUrl: './vitacor.component.html',
  styleUrls: ['./vitacor.component.sass'],
  providers: [VitacorService]
})
export class VitacorComponent implements OnInit {

  constructor(public vitacorService : VitacorService) { }

  ngOnInit() { this.getVita(); console.log(this.vitacorService.vita)}

  getVita(){
    this.vitacorService.getVita()
    .subscribe(res=>{
      this.vitacorService.vita = res as Vita[]
    })
  }
  createVita(form?: NgForm){
    console.log(form.value)
    if(form.value._id){
      this.vitacorService.putVita(form.value)
      .subscribe(res=>{})
    }else{
      this.vitacorService.postVita(form.value)
      .subscribe(res=>{
        if(res['success'])
          alert(res['msg'])
        alert('Error'+ res['msg'])
      })
    }
  }
  editVita(vita: Vita){
    this.vitacorService.selectvitacor = vita;
  }
}
