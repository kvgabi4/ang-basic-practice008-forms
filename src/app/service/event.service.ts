import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  jsonUrl: string = 'http://localhost:3000/events';

  constructor(private http: HttpClient) { }

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  getAll(): void {
    this.http.get<Event[]>(this.jsonUrl).subscribe(
      event => this.list$.next(event));
  }

  get(id: number | string): Observable<Event> {
    id = parseInt(('' + id), 10);
    return this.http.get<Event>(`${this.jsonUrl}/${id}`);
  }

  update(event: Event): Observable<Event> {
    return this.http.put<Event>(this.jsonUrl, event).pipe(
      tap(() => this.getAll())
    );
  }

  create(event: Event): void {
    this.http.post<Event>(this.jsonUrl, event)
      .subscribe(() => this.getAll());
  }

  remove(id: number): void {
    this.http.delete<Event>(`${this.jsonUrl}/${id}`)
    .subscribe( () =>this.getAll());
  }


  // private list: Event[] = [
  //   {
  //     id: 1,
  //     name: 'Angular Connect',
  //     date: '9/26/2036',
  //     time: '10am',
  //     location: { address: '1 London Rd', city: 'London', country: 'England' }
  //   },
  //   {
  //     id: 2,
  //     name: 'ng-nl',
  //     date: '4/15/2037',
  //     time: '9am',
  //     location: { address: '127 DT ', city: 'Amsterdam', country: 'NL' }
  //   },
  //   {
  //     id: 3,
  //     name: 'ng-conf 2037',
  //     date: '4/15/2037',
  //     time: '9am',
  //     location: { address: 'The Palatial America Hotel', city: 'Salt Lake City', country: 'USA' }
  //   },
  //   {
  //     id: 4,
  //     name: 'UN Angular Summit',
  //     date: '6/10/2037',
  //     time: '8am',
  //     location: { address: 'The UN Angular Center', city: 'New York', country: 'USA' }
  //   },
  // ];

  // list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>(this.list);

  // constructor() { }

  // getAll(): void {
  //   this.list$.next(this.list);
  // }

  // get(id: number | string): Observable<Event> {
  //   id = typeof id === 'string' ? parseInt(id, 10) : id;
  //   const ev: Event | undefined = this.list.find( item => item.id === id );
  //   if (ev) {
  //     return of(ev);
  //   }

  //   return of(new Event());
  // }

  // update(event: Event): Observable<Event> {
  //   const index: number = this.list.findIndex( item => item.id === event.id );
  //   this.list.splice(index, 1, event);
  //   this.getAll();
  //   return of(this.list[index]);
  // }

  // create(event: Event): Observable<Event> {
  //   event.id = this.list[this.list.length-1].id+1;
  //   this.list.push(event);
  //   this.getAll();
  //   console.log(this.list);
  //   return of(this.list[this.list.length-1]);
  // }

  // remove(id: number): Observable<Event> {
  //   const index: number = this.list.findIndex( item => item.id === id );
  //   this.list.splice(index, 1);
  //   this.getAll();
  //   return of(this.list[index]);
  // }
}
