import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from './client';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlEndpoiont : string = 'http://localhost:8082/api/clients';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router:Router) { }

  getClients():Observable<Client[]>{
    //el simbolo : indica que tipo de valor devolvera el metodo(array de clientes aqui)
    //Observable se pone para que se puedan hacer peticiones al servidor de forma asincrona
    return this.http.get<Client[]>(this.urlEndpoiont);
  }

  create(client:Client):Observable<any>{
    return this.http.post(this.urlEndpoiont,client,{headers:this.httpHeaders}).pipe(  //llamada a la API REST
      catchError(
        e => {
          //if(e.status == 400){
          //  return throwError(()=>e);
          //}
          return throwError(()=>e);
        }
      ) 
    )
  }

  getClient(id:number) : Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoiont}/${id}`)
    .pipe(catchError(e => {
      this.router.navigate(['/clients']);
      console.error(e.error.errors);
      return throwError(()=> e);})
    )
  }

  updateClient(client:Client) : Observable<any> {
    return this.http.put<any>(`${this.urlEndpoiont}/${client.id}`, client, {headers: this.httpHeaders})
    .pipe(catchError( e => { return throwError(()=> e)  } ) )
  }
}
