import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Photo,} from './Interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NasaExpeditions';
  public list: Photo[];
  public rover: string;
  public camera: string;
  public sol: number;
  public message: string;
  private httpClient: HttpClient;
  public rovers: {};
  public cameras: {};
  public limit: number;
  public loaded: boolean;




  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.rovers = ['Opportunity', 'Curiosity', 'Spirit'];
    this.cameras = [
      {name: 'FHAZ', full: 'Front Hazard Avoidance Camera'},
      {name: 'RHAZ', full: 'Rear Hazard Avoidance Camera'},
      {name: 'MAST', full: 'Mast Camera'},
      {name: 'CHEMCAM', full: 'Chemistry and Camera Complex'},
      {name: 'MAHLI', full: 'Mars Hand Lens Imager'},
      {name: 'MARDI', full: 'Mars Descent Imager'},
      {name: 'NAVCAM', full: 'Navigation Camera'},
      {name: 'PANCAM', full: 'Panoramic Camera'},
      {name: 'MINITES', full: 'Miniature Thermal Emission Spectrometer (Mini-TES)'}

    ];
    this.limit = 20;
  }




  getData(): void{
    this.httpClient.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' + this.rover + '/photos?sol=' + this.sol + '&camera=' + this.camera + '&api_key=KsfTtYjvdZgyTy72gsFXPDJcgERKaaH5LPgDCizn',{headers: this.httpHeaders}).subscribe(list => {

      this.list = list['photos'];
      if (this.list.length === 0){
        this.message = 'There is no photos';
      }
      else{
        this.message = 'There is ' + this.list.length + ' photos';
      }
      this.loaded = true;
      console.log(this.list);

    });
  }
  loadMore(): void{
      this.limit += 20;
  }
}
