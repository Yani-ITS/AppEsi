import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private eventSubject    = new Subject<void>()
  public  event$          = this.eventSubject.asObservable()

  public contrastBlackActiveBln: boolean = false
  private contrastBlackActive = new Subject<boolean>()
  public contrastBlack$ = this.contrastBlackActive.asObservable()

  constructor() { }

  emitChangesOnUI() {
    this.eventSubject.next()
  }

  changeContrastBlack() : void {
    this.contrastBlackActiveBln = !this.contrastBlackActiveBln
    this.contrastBlackActive.next(this.contrastBlackActiveBln) 
  }
  
}
