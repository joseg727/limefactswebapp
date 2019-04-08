import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Fact } from './facts';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class FactService {

  private factsUrl = 'api/facts';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getFacts(): Observable<Fact[]> {
    return this.http.get<Fact[]>(this.factsUrl)
      .pipe(
        tap(_ => this.log('fetched fact')),
        catchError(this.handleError<Fact[]>('getFacts', []))
      );
  }

  /** GET fact by id. Return `undefined` when id not found */
  getFactsNo404<Data>(id: number): Observable<Fact> {
    const url = `${this.factsUrl}/?id=${id}`;
    return this.http.get<Fact[]>(url)
      .pipe(
        map(facts => facts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} fact id=${id}`);
        }),
        catchError(this.handleError<Fact>(`getFact id=${id}`))
      );
  }

  /** GET fact by id. Will 404 if id not found */
  getFact(id: number): Observable<Fact> {
    const url = `${this.factsUrl}/${id}`;
    return this.http.get<Fact>(url).pipe(
      tap(_ => this.log(`fetched fact id=${id}`)),
      catchError(this.handleError<Fact>(`getFact id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchFacts(term: string): Observable<Fact[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Fact[]>(`${this.factsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found facts matching "${term}"`)),
      catchError(this.handleError<Fact[]>('searchFacts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addFact(fact: Fact): Observable<Fact> {
    return this.http.post<Fact>(this.factsUrl, fact, httpOptions).pipe(
      tap((newFact: Fact) => this.log(`added fact w/ id=${newFact.id}`)),
      catchError(this.handleError<Fact>('addFact'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteFact(fact: Fact | number): Observable<Fact> {
    const id = typeof fact === 'number' ? fact : fact.id;
    const url = `${this.factsUrl}/${id}`;

    return this.http.delete<Fact>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted fact id=${id}`)),
      catchError(this.handleError<Fact>('deleteFact'))
    );
  }

  /** PUT: update the hero on the server */
  updateFact(fact: Fact): Observable<any> {
    return this.http.put(this.factsUrl, fact, httpOptions).pipe(
      tap(_ => this.log(`updated fact id=${fact.id}`)),
      catchError(this.handleError<any>('updateFact'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
