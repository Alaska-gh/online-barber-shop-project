import { Component, inject, OnInit } from '@angular/core';
import { Filter } from './filter/filter';
import { FilterService } from '../../../services/filter.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { BookingService } from '../../../services/booking.service';
import { StylistService } from '../../../services/stylist.service';

@Component({
  selector: 'stylist-list',
  imports: [Filter, RouterModule],
  templateUrl: './stylist-list-component.html',
  styleUrl: './stylist-list-component.css',
})
export class StylistListComponent implements OnInit {
  /*
    The currently selected filter category (defaults to "all").
    Used to filter the stylist list in the template.
   */
  filterCategory: string = 'all';

  //  Holds the list of stylists fetched from the resolver.
  listOfStylists: User[] = [];

  // Service injections
  filterService = inject(FilterService);
  stylistService = inject(StylistService);
  bookingService = inject(BookingService);
  router: Router = inject(Router);
  activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // Retrieve pre-fetched stylist list from route resolver
    this.listOfStylists = this.activeRoute.snapshot.data['stylist'];

    // Listen for filter changes from the FilterService
    this.filterService.selectedBtnEvent.subscribe((value) => {
      this.filterCategory = value;
    });
  }

  /**
    Handles selection of a stylist from the list.
    - Stores the chosen stylist in BookingService.
    - Navigates the user to the booking page.
   */
  chooseStylist(stylist: User) {
    this.bookingService.setStylist(stylist);
    this.router.navigate(['/booking']);
  }
}
