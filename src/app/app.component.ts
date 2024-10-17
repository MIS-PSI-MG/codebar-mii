import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaisieComponent } from './saisie/saisie.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SaisieComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rforms';
}
