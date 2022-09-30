import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  clients : Client[];
  constructor(private clientService:ClientService) { } //metiendo el client service en los () lo inyectamos para poder llamarlo

  ngOnInit(): void {
    this.clientService.getClients().subscribe( //cuando llamamos al metodo de un servicio hay que usar subscribe
      clients => this.clients = clients
    )
  }

}
