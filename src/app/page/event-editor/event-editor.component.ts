import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  // 1. Kiolvasni az id paramétert az url-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.
  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => this.eventService.get(params.id) )
  );
  clicked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {}

  onUpdate(form: NgForm, event: Event): void {
    this.clicked = true;
    if (!event.id) {
      // event.id = 11;
      this.eventService.create(event);
      this.router.navigate(['']);
      //   .subscribe(
        //   ev => this.router.navigate([''])
        // );
      } else {
        this.eventService.update(event).subscribe(
          () => this.router.navigate([''])
          );
        }
        console.log('onUpdate:',form.value, event)
  }

  showHtmlToaster(event: Event) {
    let title: string = "You have updated this event:";
    if (!event.id) {
      title = "You have added this new event:";
    }
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
          <tr class="text-primary">
            <td>${event.name}</td>
            <td>${event.date} </td>
            <td>${event.time}</td>
            <td>${event.location.address}, ${event.location.city}, ${event.location.country}</td>
          </tr>
        </tbody>
      </table>`,
      title,
      3000)
  }

}
