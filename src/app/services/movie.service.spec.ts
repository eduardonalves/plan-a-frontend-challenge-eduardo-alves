import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

import { MovieService } from './movie.service';

let mockMovie = {"adult":false,"backdrop_path":null,"belongs_to_collection":null,"budget":0,"genres":[],"homepage":"","id":994816,"imdb_id":null,"original_language":"ar","original_title":"صفارة إنذار","overview":"","popularity":0.0,"poster_path":null,"production_companies":[],"production_countries":[],"release_date":"2003-01-01","revenue":0,"runtime":0,"spoken_languages":[],"status":"Released","tagline":"","title":"صفارة إنذار","video":false,"vote_average":0.0,"vote_count":0};


class MocMovie extends Movie {
}

describe('MovieService', () => {
  let service: MovieService;
  let mocMovie: MocMovie;
  let token: any;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpController = TestBed.inject(HttpTestingController);

    mockMovie = new MocMovie();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list latest movies', () => {
    service.getLatestMovie().subscribe((res) => {
      expect(res).toEqual(mockMovie);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/3/movie/latest?api_key=${environment.apiKey}&language=en-US`,
    });

    req.flush(mockMovie);
  });
});
