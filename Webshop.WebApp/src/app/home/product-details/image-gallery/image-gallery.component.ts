import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent {
  @Input() image: string;

  get imageBase64(): string {
    return `data:image/webp;base64, ${this.image}`;
  }
}
