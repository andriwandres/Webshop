import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageGalleryComponent } from './image-gallery.component';
import { SafeUrlModule } from '../../safe-url/safe-url.module';

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [
    CommonModule,
    SafeUrlModule,
  ],
  exports: [ImageGalleryComponent]
})
export class ImageGalleryModule { }
