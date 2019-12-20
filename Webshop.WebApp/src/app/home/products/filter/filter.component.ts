import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly form = new FormGroup({
    filter: new FormControl(''),
    sortCriteria: new FormControl('relevance')
  });

  constructor() { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(value => !!value)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
