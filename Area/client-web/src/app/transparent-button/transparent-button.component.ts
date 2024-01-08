import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transparent-button',
  templateUrl: './transparent-button.component.html',
  styleUrls: ['./transparent-button.component.css']
})
export class TransparentButtonComponent {
  @Input() text: string = 'transparent button';
  @Input() opacity: number = 0.0;
  @Input() navigateTo: string | undefined = undefined;

  constructor(private router: Router) { }

  navigateToPage = (page: string | undefined) => {
    if (page) {
      this.router.navigateByUrl(page);
    }
  }
}
