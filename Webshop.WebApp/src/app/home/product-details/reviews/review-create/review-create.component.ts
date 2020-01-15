import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ReviewDto } from 'src/models/reviews/review-dto';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.scss']
})
export class ReviewCreateComponent {
  get stars() { return this.form.get('stars'); }

  readonly form = new FormGroup({
    stars: new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    body: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private readonly dialogRef: MatDialogRef<ReviewCreateComponent>) { }

  rate(rating: number): void {
    this.stars.setValue(rating);
  }

  submit(): void {
    if (this.form.valid) {
      const review: ReviewDto = this.form.value;

      this.dialogRef.close(review);
    }
  }
}
