import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/model/event';
import { EventService } from 'src/app/service/event.service';
import { NotificationService } from 'src/app/service/notification.service';

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
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.eventService.getAll();
   }

  // onDelete(event: Event) {
  //   this.eventService.remove(event);
  //   this.notifyService.showSuccessWithTimeout(`
  //     <br><h5 class="text-danger">${event.name},<br> ${event.date},<br> ${event.time},<br>
  //     ${event.location.country},  ${event.location.city},  ${event.location.address}</h5>`,
  //     "You have deleted this event:", 3000)
  // }

  onDelete(event: Event) {
    this.eventService.remove(event);
    this.notifyService.showSuccessWithTimeout(`
      <br>
      <table class="table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Time</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-danger">
            <td>${event.name}</td>
            <td>${event.date} </td>
            <td>${event.time}</td>
            <td>${event.location.address}, ${event.location.city}, ${event.location.country}</td>
          </tr>
        </tbody>
      </table>`,
      "You have deleted this event:",
      3000)
  }

  // onCreate() {
  //   const newEvent: Event = new Event
  //   newEvent.id = 0;
  //   console.log(newEvent)
  //   this.eventService.create(newEvent);
  // }

}
