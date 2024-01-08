import { Component, Input } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-card',
  templateUrl: './area-card.component.html',
  styleUrls: ['./area-card.component.css']
})
export class AreaCardComponent {
  @Input() width: string = "";
  @Input() height: string = "";
  @Input() title: string = "";
  @Input() trimColor: string = "#0066FF";
  @Input() actionLogo: string = "";
  @Input() reactionLogoList: string[] = [];
  @Input() areaId: string = "";

  constructor (public theme: ThemeService, private router: Router) {}

  navigateToPage(page: string | undefined): void {
    if (page) {
      this.router.navigate([page], { queryParams: { 'area-id': this.areaId } });
    }
  };
}
