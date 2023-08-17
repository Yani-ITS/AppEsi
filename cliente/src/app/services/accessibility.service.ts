import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private eventSubject    = new Subject<void>()
  public  event$          = this.eventSubject.asObservable()

  // variables para el contraste negro
  public contrastBlackActiveBln: boolean = false
  private contrastBlackActive = new Subject<boolean>()
  public contrastBlack$ = this.contrastBlackActive.asObservable()

    //variables para el aumento de tamaño del texto
    public mediumFontActivateBln: boolean = false
    private mediumFontActive = new Subject<boolean>()
    public mediumFont$ = this.mediumFontActive.asObservable()
  

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
    // metodo para aumentar el tamaño de las letras
    changeMediumFont() : void {
      this.mediumFontActivateBln = !this.mediumFontActivateBln
      this.mediumFontActive.next(this.mediumFontActivateBln)
    }
  

  //TODO agregar metodos para cada una de las opciones
  
}
