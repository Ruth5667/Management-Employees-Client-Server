import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'managementEmployess';
  
}
