import { Component } from '@angular/core';
import { NapteApiService } from '../services/napte-api.service';

@Component({
  selector: 'app-about-json',
  templateUrl: './about-json.component.html',
  styleUrls: ['./about-json.component.css']
})
export class AboutJsonComponent {
  jsonData: string = "";

  constructor(private api: NapteApiService) {}

  async ngOnInit() {
    this.jsonData = await this.api.getAboutJson();
  }
}
