import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  jsonUrl: string = 'http://loclahost:3000/events';

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.http.get<Event[]>(this.jsonUrl);
  }

  get(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.jsonUrl}/${id}`);

    // id = typeof id === 'string' ? parseInt(id, 10) : id;
    // const ev: Event | undefined = this.list.find(item => item.id === id);
    // if (ev) {
    //   return of(ev);
    // }

    // return of(new Event());
  }

  update(event: Event): Observable<Event> {
    return this.http.put<Event>(this.jsonUrl, event);
    // const index: number = this.list.findIndex(item => item.id === event.id);
    // this.list.splice(index, 1, event);
    // this.getAll();
    // return of(this.list[index]);
  }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(this.jsonUrl, event);
    // event.id = this.list[this.list.length - 1].id + 1;
    // this.list.push(event);
    // this.getAll();
    // console.log(this.list);
    // return of(this.list[this.list.length - 1]);
  }

  remove(id: number): Observable<Event> {
    return this.http.delete<Event>(`${this.jsonUrl}/${id}`);
    // const index: number = this.list.findIndex(item => item.id === id);
    // this.list.splice(index, 1);
    // this.getAll();
    // return of(this.list[index]);
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

  // constructor(private http: HttpClient) { }

  // getAll(): void {
  //   this.list$.next(this.list);
  // }

  // get(id: number): Observable<Event> {
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
