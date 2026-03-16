
import { Component, inject, OnInit } from '@angular/core';
import { FooterService } from './footer-service';
import { Footer } from '../interfaces/footer.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'footer-component',
  imports: [],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css',
})
export class FooterComponent implements OnInit {
  // Stores the list of footer titles/sections to be displayed in the UI.
  listOfTitles: Footer[] = [];

  // Injects the FooterService to fetch footer data.
  listOfLinks = inject(FooterService);

  constructor (private translate: TranslateService) {
  }

  /*
    Lifecycle hook: Runs once the component is initialized.
   Fetches the list of footer links from FooterService and assigns them to `listOfTitles`.
   */
  ngOnInit(): void {
    this.listOfTitles = this.listOfLinks.getList();
  }

  changeLanguage(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
  }
}
