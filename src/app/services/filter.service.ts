import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class FilterService{
  
  ///////////////////////////////////////////////////////////////////////////////
  // using EventEmitter
  //  selectedBtnEvent: EventEmitter<string> = new EventEmitter<string>();
//////////////////////////////////////////////////////////////////////////////////


// using Subjects
selectedBtnEvent = new Subject<string>();

   onRadioBtnChanged(value: string){
    this.selectedBtnEvent.next(value);
   }
}