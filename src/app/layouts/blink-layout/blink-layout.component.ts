import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blink-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './blink-layout.component.html',
  styleUrl: './blink-layout.component.scss'
})
export class BlinkLayoutComponent {

}
