import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewCreateComponent } from './review-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewComponent } from '../review/review.component';

@NgModule({
  declarations: [ReviewCreateComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [ReviewCreateComponent]
})
export class ReviewCreateModule { }
