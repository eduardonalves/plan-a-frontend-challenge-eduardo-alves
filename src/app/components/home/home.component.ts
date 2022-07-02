import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public movie:Movie;
  public movie_date:Date;
  constructor(private movieService:MovieService) {
    this.movie = new Movie();
     this.movieService.getLatestMovie().subscribe(res=>{
      this.movie = res;
      if(this.movie.release_date != null && this.movie.release_date !=''){
        this.movie_date = new Date(this.movie.release_date);
        
      }
     });
   }

  ngOnInit() {
    
  }

}
