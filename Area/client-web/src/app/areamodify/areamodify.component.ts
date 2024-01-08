import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { SessionService } from '../services/session.service';
import { AreaChosenDetails } from '../area-add-modal/area-add-modal.component';
import { IconDefinition, faComments, faMessage, faPenToSquare, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { AreaObject, NapteApiService } from '../services/napte-api.service';
import { faAt, faCircleMinus, faFileCirclePlus, faFont, faPencil, faRightToBracket, faSquarePen, faSquareXmark, faThumbTack, faUserCheck, faUserSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-areamodify',
  templateUrl: './areamodify.component.html',
  styleUrls: ['./areamodify.component.css']
})
export class AreamodifyComponent {

  areaTitle: string = "";
  areaDescription: string = "";
  areaAction: AreaChosenDetails | undefined;
  areaReactions: AreaChosenDetails[] = [];
  actionAddModalOpen: boolean = false;
  reactionAddModalOpen: boolean = false;
  areaId: number = -1;
  errorMsg: string | undefined;

  idIconsMap: { [key: number]: string} = this.helper.idIconsMap
  icons: { [key: string]: IconDefinition} = this.helper.icons
  trimColors: { [key: string]: string} = this.helper.trimColors
  modalTitles: { [key: string]: string} = this.helper.modalTitles
  subModalTitles: { [key: string]: string} = this.helper.subModalTitles

  phoneDisplay: boolean = false;
  editIcon: IconDefinition = faPencil;
  removeIcon: IconDefinition = faXmark;
  allServices: { [key: string] : AreaObject[]} = {};

  constructor(private route: ActivatedRoute, private api: NapteApiService, private sessionService: SessionService, private router: Router, public themeService: ThemeService, private helper: HelperService) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.phoneDisplay = window.innerWidth < 1250;
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
      if (!await this.api.updateArea(this.areaId, this.areaTitle, this.areaDescription, this.areaAction, this.areaReactions)) {
        this.errorMsg = "An error occured, please try again at a later time";
      } else {
        this.navigateToPage('/');
      }
    } else {
      this.errorMsg = "Please fill in required fields to create the area";
    }
  }

  async deleteArea() {
    await this.api.removeAreaById(this.areaId);
    this.navigateToPage('/');
  }

  async ngOnInit() {
    if (!this.sessionService.loggedIn()) {
      this.navigateToPage('/');
    }
    const params = await firstValueFrom(this.route.queryParams);
    const url_params: URLSearchParams = new URLSearchParams(params);
    const rawId: string | null = url_params.get('area-id');
    if (!rawId) {
      this.navigateToPage('/');
      return;
    }
    this.allServices = await this.api.getAllAreaPossibilities();
    this.areaId = parseInt(rawId ? rawId : '0');
    const requestedArea = await this.api.getUserAreaById(this.areaId);

    if (requestedArea.title)
      this.areaTitle = requestedArea.title;
    if (requestedArea.description)
      this.areaDescription = requestedArea.description;
    const action = this.api.getAreaItemById('action', requestedArea.trigger_id);
    this.areaAction = {
      plateform: action.plateform,
      id: action.id,
      trimColor: this.trimColors[action.plateform.toLowerCase()],
      icon: this.icons[this.idIconsMap[action.id]],
      actionDesc: action.action,
      actionToken: ''
    }
    const reaction = this.api.getAreaItemById('reaction', requestedArea.action_id);
    this.areaReactions = [{
      plateform: reaction.plateform,
      id: reaction.id,
      trimColor: this.trimColors[reaction.plateform.toLowerCase()],
      icon: this.icons[this.idIconsMap[reaction.id]],
      actionDesc: reaction.action,
      actionToken: ''
    }]
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
