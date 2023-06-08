import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { register } from 'swiper/element'
import { IonicSlides } from '@ionic/angular';

register()

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  slideIndex  : number = 0
  backDisabled: boolean = true
  nextDisabled: boolean = false
  bullet1 = true
  bullet2 = false
  bullet3 = false


  swiperModules = [IonicSlides]

  constructor() { }

  ngOnInit() {
    
  }

  previous() {
    this.slideIndex--
    if(this.slideIndex === 0) {
      this.backDisabled = true
      this.bullet2 = false
      this.bullet1 = true
    } else {
      this.bullet3 = false
      this.bullet2 = true
    }
    this.swiperRef?.nativeElement.swiper.slidePrev()
  }

  next() {
    this.bullet1 = false
    this.slideIndex++
    if(this.slideIndex === 1){
      this.bullet2 = true
    }
    else {
      this.bullet2 = false
      this.bullet3 = true
    }
    this.backDisabled = false
    this.swiperRef?.nativeElement.swiper.slideNext()
  }

  

  

}
