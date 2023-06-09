import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element'
import { IonicSlides } from '@ionic/angular';
import { Router } from '@angular/router';

// swiperjs metodo principal
register()

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  // detectamos los elementos hijos de Swiper
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiperModules = [IonicSlides] // le pasamos a swiper los modulos de IonicSlides

  slideIndex  : number  = 0     // indice del slide
  backDisabled: boolean = true  // desactivar el boton de regreso (indice 0)
  nextDisabled: boolean = false // desactivar el boton de siguiente (indice 2)
  bullet1: boolean      = true  // activar bullet1
  bullet2: boolean      = false // activar bullet2
  bullet3: boolean      = false // activar bullet3
  nextButtonText: string = 'Siguiente'



  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  // funcion para moverse a la izquierda
  previous() {
    this.slideIndex--
    
    if(this.slideIndex === 0) {
    
      this.backDisabled = true
      this.bullet2      = false
      this.bullet1      = true
    
    } else {
    
      this.bullet3      = false
      this.bullet2      = true
    
    }
    this.swiperRef?.nativeElement.swiper.slidePrev()
  }

  // funcion para moverse a la derecha
  next() {

    if(this.bullet3) {
      this.router.navigate(['login'])
    }

    this.bullet1 =      false
    this.slideIndex++
    
    if(this.slideIndex === 1){
    
      this.bullet2 =    true
    
    }
    else {

      this.bullet2 =    false
      this.bullet3 =    true
      this.nextButtonText = 'Comenzar!'

    }

    
    this.backDisabled = false

    this.swiperRef?.nativeElement.swiper.slideNext()

    

    
  }

  

  

}
