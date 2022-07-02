import { Genre } from "./genre.model";
export class Movie {
    public adult;
    public backdrop_path;
    public belongs_to_collection;
    public budget;
    public homepage;
    public id;
    public imdb_id;
    public original_language;
    public original_title;
    public overview ;
    public popularity;
    public poster_path;
    public release_date;
    public revenue;
    public runtime;
    public tagline;
    public title;
    public video;
    public vote_average;
    public vote_count;
    public status;
    public genres: Array<Genre>;
    public production_companies: Array<any>;
    public production_countries: Array<any>;
    public spoken_languages: Array<any>;

    constructor(){
        this.adult='';
        this.backdrop_path='';
        this.belongs_to_collection='';
        this.budget='';
        this.homepage='';
        this.id='';
        this.imdb_id='';
        this.original_language='';
        this.original_title='';
        this.overview='' ;
        this.popularity='';
        this.poster_path='';
        this.release_date='';
        this.revenue='';
        this.runtime='';
        this.tagline='';
        this.title='';
        this.video='';
        this.vote_average='';
        this.vote_count='';
        this.status='';
        this.genres=[];
        this.production_companies=[];
        this.production_countries= [];
        this.spoken_languages=[];
    }

}

  
  