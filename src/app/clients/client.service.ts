import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlEndpoiont : string = 'http://localhost:8082/api/clients';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getClients():Observable<Client[]>{
    //el simbolo : indica que tipo de valor devolvera el metodo(array de clientes aqui)
    //Observable se pone para que se puedan hacer peticiones al servidor de forma asincrona
    return this.http.get<Client[]>(this.urlEndpoiont);
  }
}
