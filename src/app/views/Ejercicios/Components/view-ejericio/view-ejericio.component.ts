import { Component, Input } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-view-ejericio',
  templateUrl: './view-ejericio.component.html',
  styleUrls: ['./view-ejericio.component.scss']
})
export class ViewEjericioComponent {

  @Input() presentations: any[] = [];
  slideIndex: number = 0;

  prevSlide() {
    this.slideIndex = (this.slideIndex === 0) ? this.presentations.length - 1 : this.slideIndex - 1;
  }

  nextSlide() {
    this.slideIndex = (this.slideIndex === this.presentations.length - 1) ? 0 : this.slideIndex + 1;
  }

}
