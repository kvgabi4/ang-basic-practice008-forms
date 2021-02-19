import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  eventList$: BehaviorSubject<Event[]> = this.eventService.list$;
  testEvent: Observable<Event> = this.eventService.get(1);

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.eventService.getAll();
   }

  onDelete(event: Event) {
    this.eventService.remove(event);
  }

  // onCreate() {
  //   const newEvent: Event = new Event
  //   newEvent.id = 0;
  //   console.log(newEvent)
  //   this.eventService.create(newEvent);
  // }

}
