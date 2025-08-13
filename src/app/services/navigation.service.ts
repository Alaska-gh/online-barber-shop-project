import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService{

  navLinkChangeEvent = new Subject<string>();

  onNavLinkChanged(value: string){
    this.navLinkChangeEvent.next(value)
  }
}