import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { ProductDescriptionModule } from './product-description/product-description.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    ImageGalleryModule,
    ProductDescriptionModule,
    ProductDetailsRoutingModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ProductDetailsModule { }
