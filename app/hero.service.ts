import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private jsonHeader = new Headers({'Content-Type': 'application/json'});
  private postHeaders = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  private heroesUrl = 'api/list';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get("api/list")
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.http.get("/api/get-hero?id="+ id)
      .toPromise()
      .then(response => response.json().data as Hero)
  }

  delete(id: number): Promise<void> {
    const url = `api/delete?id=${id}`;
    return this.http.delete(url, {headers: this.jsonHeader})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post("api/create", `name=${name}`, {headers: this.postHeaders})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `api/update`;
    return this.http
      .put(url, `id=${hero.id}&name=${hero.name}`, {headers: this.postHeaders})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
