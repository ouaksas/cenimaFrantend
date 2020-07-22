import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host='http://localhost:8080'

  constructor(private http:HttpClient) { }

  getVilles(){
    return this.http.get(this.host+'/villes');
  }

  public getCinemas(url:string){
    return this.http.get(url);
  }

  public getSalles(url: string) {
    return this.http.get(url);
  }

  getProjection(projectionFilms: string) {
    let url=projectionFilms.replace('{?projection}','?projection=p1');
    return this.http.get(url);
  }

  getTicket(tickets: string) {
    let url=tickets.replace('{?projection}','?projection=ticketProj');
    return this.http.get(url);
  }

  payerTickert(value) {
    return this.http.post(this.host+"/payerTicker",value);
  }

  addVille(f) {
    return this.http.post(this.host+"/villes",f);
  }

  deleteVille(v) {
    const  param=new HttpParams().set('id',v.id);
    return this.http.delete(this.host+"/villes/"+v.id);

  }

  modiferVille(v) {
    return this.http.post(this.host+"/villes",v);
  }

  getCinema(){
    return this.http.get(this.host+'/cinemas');
  }

  supCinema(cinema) {
    return this.http.delete(this.host+"/cinemas/"+cinema.id);
  }

  addCinemas(c) {
    return this.http.post(this.host+"/ajouterCinema",c);
  }

  addSalle(f) {
    return this.http.post(this.host+"/ajouterSalle",f);
  }

  getFilms() {
    return this.http.get(this.host+"/films");
  }

  addProjection(f) {
    return this.http.post(this.host+"/addProj",f);
  }
}
