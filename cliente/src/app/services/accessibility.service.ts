import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable ({
  providedIn: 'root'
})

export class AccessibilityService {
  private eventSubject    = new Subject<void>()
  public  event$          = this.eventSubject.asObservable()

  // variables para el contraste negro
  public contrastBlackActiveBln: boolean = false
  private contrastBlackActive = new Subject<boolean>()
  public contrastBlack$ = this.contrastBlackActive.asObservable()

  //variables para luminosidad
  public luminousActiveBln: boolean = false
  private luminousActive = new Subject<boolean>()
  public luminousHtml$ = this.luminousActive.asObservable()
  // TODO agregar variables para cada una de las opciones

  constructor() { }

  emitChangesOnUI() {
    this.eventSubject.next()
  }

  // metodo para cambiar variables de contraste negro
  changeContrastBlack() : void {
    this.contrastBlackActiveBln = !this.contrastBlackActiveBln
    this.contrastBlackActive.next(this.contrastBlackActiveBln)
  }

  changeBrigth() : void{
    this.luminousActiveBln  = !this.luminousActiveBln
    this.luminousActive.next(this.luminousActiveBln)
  }

  //TODO agregar metodos para cada una de las opciones

}
