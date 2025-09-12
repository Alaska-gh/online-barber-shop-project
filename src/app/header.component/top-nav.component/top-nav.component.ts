import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'top-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css',
})
export class TopNavComponent implements OnInit {
  // List of social media icon classes (Font Awesome)
  iconList: string[] = [
    'fab fa-facebook',
    'fab fa-twitter',
    'fab fa-instagram',
    'fab fa-tiktok',
  ];

  // Inject ActivatedRoute to listen to URL fragment changes
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    // Subscribe to URL fragment changes (e.g., #about, #contact)
    // When a fragment is present, scroll to the corresponding section smoothly
    this.activeRoute.fragment.subscribe((data) => {
      this.jumpToSection(data);
    });
  }

  // Scrolls to the specified section of the page smoothly.

  jumpToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
