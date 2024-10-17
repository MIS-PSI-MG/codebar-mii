import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TrackingService } from '../tracking.service';
import { map, Observable, startWith } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-saisie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatError,
    MatSelectModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe,
  ],
  templateUrl: './saisie.component.html',
  styleUrl: './saisie.component.scss',
})
export class SaisieComponent {
  userForm: FormGroup;
  tracking = inject(TrackingService);
  @ViewChild('codeInput') codeInput: ElementRef | undefined;
  tempDestination: string = '';
  tempType: string = '';
  typesOption = [
    { id: 1, option: 'option 1' },
    { id: 2, option: 'option 2' },
    { id: 3, option: 'option 3' },
  ];

  destinationOptions = [
    { id: 1, option: 'destination 1' },
    { id: 2, option: 'destination 2' },
    { id: 3, option: 'destination 3' },
  ];

  filteredDestinations: Observable<{ id: number; option: string }[]>;

  constructor() {
    this.userForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(5)]),
      destination: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
    });

    this.filteredDestinations = this.userForm.controls[
      'destination'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.destinationOptions.filter((option) =>
      option.option.toLowerCase().includes(filterValue),
    );
  }

  updateValidations(): void {
    if (this.tracking.isa() !== 1) {
      this.userForm.get('destination')?.setValidators(null);
      this.userForm.get('destination')?.setValue(this.tempDestination);
      this.userForm.get('type')?.setValue(this.tempType);
      this.userForm.controls['code'].valueChanges.subscribe(() => {
        this.submit();
      });
    } else {
      this.userForm.get('destination')?.setValidators(Validators.required);
      this.userForm.get('type')?.setValidators(Validators.required);
    }
    this.userForm.get('destination')!.updateValueAndValidity();
    this.userForm.get('type')!.updateValueAndValidity();
  }

  submit() {
    if (this.tracking.isa() < 3) {
      this.tracking.incIsa();
      console.log('submit izao');
      this.tempDestination = this.userForm.get('destination')?.value;
      this.tempType = this.userForm.get('type')?.value;
    } else {
      this.tracking.incLot();
      this.tracking.resetIsa();
    }
    console.log(this.userForm.value);
    this.userForm.reset();
    this.updateValidations();
    this.codeInput!.nativeElement.focus();
  }
}
