import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { AreaChosenDetails } from '../area-add-modal/area-add-modal.component';
import { IconDefinition, faMessage, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AreaObject, NapteApiService } from '../services/napte-api.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-areacreate',
  templateUrl: './areacreate.component.html',
  styleUrls: ['./areacreate.component.css']
})
export class AreacreateComponent {
  areaTitle: string = "";
  areaDescription: string = "";
  areaAction: AreaChosenDetails | undefined;
  areaReactions: AreaChosenDetails[] = [];
  actionAddModalOpen: boolean = false;
  reactionAddModalOpen: boolean = false;
  phoneDisplay: boolean = false;
  errorMsg: string | undefined;

  editIcon: IconDefinition = faPencil;
  removeIcon: IconDefinition = faXmark;
  allServices: { [key: string] : AreaObject[]} = {};

  constructor(private route: ActivatedRoute, private api: NapteApiService, private sessionService: SessionService, private router: Router, public themeService: ThemeService) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.phoneDisplay = window.innerWidth < 1250;
  }

  saveAreaInfoSoFar(action: AreaChosenDetails | undefined) {
    if (action && action.type === 'reaction')
      this.areaReactions.push(action);
    if (action && action.type === 'action')
      this.areaAction = action;
    localStorage.setItem('direct-redirect', 'areacreate');
    if (this.areaAction)
      localStorage.setItem('saved_create_info_area_action', JSON.stringify(this.areaAction));
    if (this.areaReactions)
      localStorage.setItem('saved_create_info_area_reactions', JSON.stringify(this.areaReactions));
    localStorage.setItem('saved_create_info_area_title', JSON.stringify(this.areaTitle));
    localStorage.setItem('saved_create_info_area_desc', JSON.stringify(this.areaDescription));
  }

  setActionChosen(action: AreaChosenDetails | undefined) {
    this.areaAction = action;
  }

  setReactionChosen(reaction: AreaChosenDetails | undefined) {
    if (reaction) {
      if (this.areaReactions.filter((item: AreaChosenDetails) => item.id === reaction.id).length === 0) {
        this.areaReactions.push(reaction);
      }
    }
  }

  setActionAddModalOpen(val: boolean) {
    this.actionAddModalOpen = val;
  }

  closeModalsCallback() {
    this.setActionAddModalOpen(false);
    this.setReactionAddModalOpen(false);
  }

  setReactionAddModalOpen(val: boolean) {
    this.reactionAddModalOpen = val;
  }

  removeReaction(reaction: AreaChosenDetails) {
    this.areaReactions = this.areaReactions.filter((item) => item.id !== reaction.id);
  }

  navigateToPage(page: string | undefined): void {
    if (page) {
      this.router.navigateByUrl(page);
    }
  };

  async submitArea() {
    this.errorMsg = undefined;
    if (this.areaTitle && this.areaAction && this.areaReactions.length) {
      if (!await this.api.createArea(this.areaTitle, this.areaDescription, this.areaAction, this.areaReactions)) {
        this.errorMsg = "An error occured, please try again at a later time";
      } else {
        this.navigateToPage('/');
      }
    } else {
      this.errorMsg = "Please fill in required fields to create the area";
    }
  }

  async ngOnInit() {
    if (!this.sessionService.loggedIn()) {
      this.navigateToPage('/');
    }

    this.allServices = await this.api.getAllAreaPossibilities();
    console.log(this.allServices);
    if (localStorage.getItem('saved_create_info_area_title') !== null) {
      const laction: string | null = localStorage.getItem('saved_create_info_area_action');
      const lreaction: string | null = localStorage.getItem('saved_create_info_area_reactions');
      const ltitle: string | null = localStorage.getItem('saved_create_info_area_title');
      const ldesc: string | null = localStorage.getItem('saved_create_info_area_desc');
      this.areaAction = laction ? JSON.parse(laction) : undefined;
      this.areaReactions = lreaction ? JSON.parse(lreaction) : undefined;
      this.areaTitle = ltitle ? JSON.parse(ltitle) : "";
      this.areaDescription = ldesc ? JSON.parse(ldesc) : "";
      localStorage.removeItem('saved_create_info_area_action');
      localStorage.removeItem('saved_create_info_area_reactions');
      localStorage.removeItem('saved_create_info_area_title');
      localStorage.removeItem('saved_create_info_area_desc');
    }
  }

}
