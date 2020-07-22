import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../service/cinema.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  public villes;
  public cinema;
  public selectedVille;
  public salles;
  public selectedProjetcion;
  public tickets;
  private ListselectedTicket= [];
  public auth=true;
  public selectedCinema;
  public selectedSalle;
  public films;
  selectedFilm;
  constructor(private cinemaService: CinemaService) { }

  ngOnInit(): void {
    this.cinemaService.getVilles().subscribe(data=>{
      this.villes=data;
      console.log(data);
    },err=>{
      console.log(err);
    });
    this.cinemaService.getFilms().subscribe(data=>{
      this.films=data;
    },err=>{
      console.log(err);
    });
  }

  onGetCinemas(v){
    this.salles="";
    this.selectedVille=v;
    this.cinemaService.getCinemas(v._links.cinemas.href).subscribe(data=>{
      this.cinema=data;
    },err=>{
      console.log(err);
    });
  }

  onGetSalles(c){
    this.selectedCinema=c;
    this.cinemaService.getSalles(c._links.salles.href).subscribe(data=>{
      this.salles=data;
      this.salles._embedded.salles.forEach(salle=>{
        this.cinemaService.getProjection(salle._links.projectionFilms.href).subscribe(datap=>{
          salle.projections=datap;
        },err=>{
          console.log(err);
        })
      })
    },err=>{
      console.log(err);
    })
  }

  showTickets(p){
    this.selectedProjetcion=p;
    this.cinemaService.getTicket(p._links.tickets.href).subscribe(data=>{
      this.tickets=data;
      this.ListselectedTicket=[];
    },err=>{
      console.log(err);
    })

  }

  onSelectTicket(t) {
    if(!t.selected){
      t.selected=!t.selected;
      this.ListselectedTicket.push(t);
    }else {
      t.selected=!t.selected;
      this.ListselectedTicket.splice(this.ListselectedTicket.indexOf(t),1);
    }

  }

  getTicketCless(t) {
    let str="btn ";
    if(t.reservee==true){
      str+="btn-danger";
    }else if(t.selected==true){
      str+="btn-warning";
    }else{
      str+="btn-success";
    }
    return str;
  }

  onPaymen(value) {
    let listTicket:bigint[]=[];
    this.ListselectedTicket.forEach(v=>{
      listTicket.push(v.id);
    })
    value.listTicket=listTicket;
    this.cinemaService.payerTickert(value).subscribe(data=>{
      alert("ticket reserves avec succes");
      this.showTickets(this.selectedProjetcion);
    },err=>{
      console.log(err);
    });
  }


  onAjouterVile(value) {
    console.log(value);
    this.cinemaService.addVille(value).subscribe(data=>{
      alert("added");
      this.villes=null;
      this.ngOnInit();
    },err=>{
      console.log(err);
    })

  }

  onSupVilles(v) {

    this.cinemaService.deleteVille(v).subscribe(data=>{
      alert("deleted");
      this.villes=null;
      this.ngOnInit();
    },err=>{
      console.log(err);
    });

  }

  onajouterCinema(f) {
    f.ville=this.selectedVille.id
    f.nbSalle=0;
    console.log(f);
    this.cinemaService.addCinemas(f).subscribe(data=>{
      alert("added");
      this.cinema=null;
      this.onGetCinemas(this.selectedVille);
    },err=>{
      console.log(err);
    })

  }

  onajouerSalle(f) {
    f.cinema=this.selectedCinema.id;
    this.cinemaService.addSalle(f).subscribe(data=>{
      alert("added");
    },err=>{
      console.log(err);
    });
  }

  onAjouterProjection(value) {

    value.salle=this.selectedSalle.id;
    value.HeureDebut="25:20";
    value.film=this.selectedFilm;
    console.log(value);
    this.cinemaService.addProjection(value).subscribe(data=>{
      alert("added");
    },err=>{
      console.log(err);
    });
  }

  onselectedSalle(s) {
    this.selectedSalle=s;
  }
}
