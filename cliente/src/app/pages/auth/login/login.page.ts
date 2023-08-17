import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccessibilityService } from 'src/app/services/accessibility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //? Variable que instanciara la suscripcion a cambios en contraste
  private contrastBlackSuscription?: Subscription;
  private changeBrightSuscription?: Subscription;

  constructor(
    private accService: AccessibilityService
  ) {
    this.contrastBlackSuscription = this.accService.contrastBlack$.subscribe({
      next: (active => {
        if(active === true) {
          this.addUniqueClass(['wrapper', 'form-container'], 'constrast-black')
        } else {
          this.removeUniqueClass(['wrapper', 'form-container'], 'constrast-black')
        }
      })
    });
    this.changeBrightSuscription = this.accService.luminousHtml$.subscribe({
      next: (active =>{
        if(active === true){
          this.addUniqueClass(['wrapper','form-container'], 'bright')
        } else{
          this.removeUniqueClass(['wrapper', 'form-container'], 'bright')
        }
      })
    })
   }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.contrastBlackSuscription?.unsubscribe()
    this.changeBrightSuscription?.unsubscribe()
  }


  addUniqueClass(ids: string[], _class: string) {
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.add(_class)
    }
  }

  removeUniqueClass(ids: string[], _class: string){
    for (let i = 0; i < ids.length; i++) {
      const e = ids[i];
      const htmlElement: HTMLElement | null = document.getElementById(e)
      htmlElement?.classList.remove(_class)
    }
  }



}
