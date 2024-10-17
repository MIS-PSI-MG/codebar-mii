import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  lot = signal(1);
  isa = signal(1);
  total = computed(() => this.lot() * this.isa());

  incLot() {
    this.lot.update((val) => val + 1);
  }

  incIsa() {
    this.isa.update((val) => val + 1);
  }

  resetIsa() {
    this.isa.set(1);
  }
}
