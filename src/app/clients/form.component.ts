import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  client:Client = new Client();
  title:string = 'formulario cliente';
  errors:string[];

  constructor(private clientService:ClientService, private router:Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getClient();
  }

  public create():void{
    this.clientService.create(this.client).subscribe(
      response=>{
        this.router.navigate(['/clients']);
        swal.fire('Nuevo cliente',`${response.message}: ${response.Cliente.name}`, 'success');
      },
      err=>{
        this.errors=err.error.errors1 as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    )
  }

  public getClient():void{
    this.activeRoute.params.subscribe( params =>{
      let id = params['id'];
      if (id) {
        this.clientService.getClient(id).subscribe(client => this.client = client)
      }
    }
    )
  }

  public updateClient():void {
    this.clientService.updateClient(this.client).subscribe(
      response=>{
        this.router.navigate(['/clients']);
        swal.fire('Cliente actualizado',`${response.message}: ${response.Cliente.name}`, 'success');
      },
      err=>{
        this.errors=err.error.errors1 as string[];
        console.error(err.status);
        console.error(this.errors);
      }
    )
  }


}
