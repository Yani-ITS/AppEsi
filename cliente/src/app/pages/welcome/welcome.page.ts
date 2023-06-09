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
  swiperModules = [IonicSlides]         // le pasamos a swiper los modulos de IonicSlides

  slideIndex  : number  = 0             // indice del slide
  backDisabled: boolean = true          // desactivar el boton de regreso (indice 0)
  nextDisabled: boolean = false         // desactivar el boton de siguiente (indice 2)
  bullet1: boolean      = true          // activar bullet1
  bullet2: boolean      = false         // activar bullet2
  bullet3: boolean      = false         // activar bullet3
  nextButtonText: string = 'Siguiente'  // textp del boton siguiente (Siguente || Comenzar!)

  constructor(
    // necesitamos usar Router para navegar al login
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  //! funcion para moverse a la izquierda
  previous() {
    this.slideIndex-- // -> cada vez que volvemos restamos un indice
    
    // si el indice de las slides es 0
    if(this.slideIndex === 0) {
      this.backDisabled = true  // -> desactivamos el boton previous
      this.bullet2      = false // -> desactivamos el bullet 2
      this.bullet1      = true  // -> activamos el bullet 1
    
    } else {
      // si no es el indice 0, solo puede ser el indice 1
      this.bullet3      = false // -> el bullet 3 se desactiva
      this.bullet2      = true  // -> el bullet 2 se activa
    
    }

    // funcion de swiper para moverse entre slides
    this.swiperRef?.nativeElement.swiper.slidePrev()
  }

  // -------------------------------------------------- //

  //! funcion para moverse a la derecha
  next() {
    // si el bullet 3 esta activado, quioere decir que estamos en la ultima slide
    if(this.bullet3) {
      // por ende estamos listos para navegar al login
      this.router.navigate(['login'])
    }
    // si navegamos hacia delante, el primer bullet se desactiva
    this.bullet1 =      false
    this.slideIndex++ // ->  sumamos al contador del indice
    
    // si el indice es el uno 
    if(this.slideIndex === 1){
      this.bullet2 =    true // el bullet activo es el dos
    }
    else {
      // si no es el uno, no queda otra que el indice sea el 2, por ende
      this.bullet2 =    false             // ->  desactivamos el bullet 2
      this.bullet3 =    true              // -> activamos el bullet 3
      this.nextButtonText = 'Comenzar!'   // -> cambiamos el texto del boton
    }

    // como es obvio que no estamos en la slide 0, podemos activar el boton de previous
    this.backDisabled = false

    // usamos la funcion de swiper para avanzar de slide
    this.swiperRef?.nativeElement.swiper.slideNext()
    
  }

}
