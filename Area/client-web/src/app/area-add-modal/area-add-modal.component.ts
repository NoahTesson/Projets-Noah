import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { AreaObject, DiscordGuilds, NapteApiService, ServiceStatus } from '../services/napte-api.service';
import { HelperService } from '../helper.service';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';


export type AreaDetails = {
  icon: IconDefinition;
  iconFill: string;
  title: string;
}

export type AreaChosenDetails = {
  plateform: string;
  trimColor: string;
  icon: IconDefinition;
  actionDesc: string;
  actionToken: string | undefined;
  id: number | undefined;
  type?: string;
}

@Component({
  selector: 'app-area-add-modal',
  templateUrl: './area-add-modal.component.html',
  styleUrls: ['./area-add-modal.component.css'],
})
export class AreaAddModalComponent {
  @Input() type: string = "";
  @Input() availableServices: AreaObject[] = [];
  @Input() saveInfo: (action: AreaChosenDetails | undefined, reaction: AreaChosenDetails | undefined) => void = (a, r) => {};
  @Output() closedModalEvent = new EventEmitter<boolean>();
  @Output() actionChosen = new EventEmitter<AreaChosenDetails | undefined>();
  @Output() saveInfos = new EventEmitter<AreaChosenDetails>();

  availablePlateforms: string[] = [];

  tokenEntered: string | undefined;

  discordGuilds: DiscordGuilds[] = [];
  selectedGuild: string | undefined;
  trelloBoards: DiscordGuilds[] = [];
  selectedBoard: string | undefined;

  idIconsMap: { [key: number]: string} = this.helper.idIconsMap
  icons: { [key: string]: IconDefinition} = this.helper.icons
  trimColors: { [key: string]: string} = this.helper.trimColors
  modalTitles: { [key: string]: string} = this.helper.modalTitles
  subModalTitles: { [key: string]: string} = this.helper.subModalTitles

  plateformSelected: string | undefined;
  areaTypeSelected: string | undefined;
  tokenAddModalOpen: boolean = false;
  tempActionSelected: AreaObject | undefined;
  phoneDisplay: boolean = false;
  
  constructor(public themeService: ThemeService, private api: NapteApiService, private helper: HelperService, private sessionService: SessionService, private router: Router) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.phoneDisplay = window.innerWidth < 1250;
  }

  getPlateformServices() {
    console.log(this.plateformSelected);
    console.log(this.availableServices);
    return this.availableServices.filter((item: AreaObject) => item.plateform.toLowerCase() === (this.plateformSelected?.toLowerCase()));
  }

  closeModal() {
    this.closedModalEvent.emit(true);
  }

  openAreaSelectionFromCategory(areaType: string, plateform: string) {
    this.areaTypeSelected = areaType;
    this.plateformSelected = plateform;
  }

  returnFromSelectedPlateform() {
    this.areaTypeSelected = undefined;
    this.plateformSelected = undefined;
  }

  returnFromSelectedAction() {
    this.tokenAddModalOpen = false;
    this.tokenEntered = undefined;
    this.tempActionSelected = undefined;
  }

  googleOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/google/login_profile`);

    var query_params: { [key: string]: string } = {
      'device': 'angular'
    };

    for (let qp in query_params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', qp);
      input.setAttribute('value', query_params[qp]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    localStorage.setItem('token_auth_url_provider', 'google');
    form.submit();
  }

  twitterOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://twitter.com/i/oauth2/authorize`);

    var query_params: { [key: string]: string } = {'client_id': 'SWI2ZnlReW5HZXktZzhRUDZYd006MTpjaQ',
                      'redirect_uri': 'http://localhost:8081',
                      'response_type': 'code',
                      'scope': 'tweet.read tweet.write offline.access users.read',
                      'state': 'state',
                      'code_challenge': "challenge",
                      'code_challenge_method': 'plain'
                    };

    for (let qp in query_params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', qp);
      input.setAttribute('value', query_params[qp]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    localStorage.setItem('token_auth_url_provider', 'twitter');
    form.submit();
  }

  githubOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/github/login_profile`);

    var query_params: { [key: string]: string } = {
      'device': 'angular'
    };

    for (let qp in query_params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', qp);
      input.setAttribute('value', query_params[qp]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    localStorage.setItem('token_auth_url_provider', 'github');
    form.submit();
  }

  spotifyOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/spotify/login_profile`);

    var query_params: { [key: string]: string } = {
      'device': 'angular'
    };

    for (let qp in query_params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', qp);
      input.setAttribute('value', query_params[qp]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    localStorage.setItem('token_auth_url_provider', 'spotify');
    form.submit();
  }

  discordOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/discord/login_profile`);

    var query_params: { [key: string]: string } = {
      'device': 'angular'
    };

    for (let qp in query_params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', qp);
      input.setAttribute('value', query_params[qp]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    localStorage.setItem('token_auth_url_provider', 'discord');
    form.submit();
  }

  linkedinOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/linkedin/login_profile`);

    var query_params: { [key: string]: string } = {
      'device': 'angular'
    };

    for (let qp in query_params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', qp);
      input.setAttribute('value', query_params[qp]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    localStorage.setItem('token_auth_url_provider', 'linkedin');
    form.submit();
  }

  trelloOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/trello/login_profile`);

    var query_params: { [key: string]: string } = {
      'device': 'angular'
    };

    for (let qp in query_params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', qp);
      input.setAttribute('value', query_params[qp]);
      form.appendChild(input);
    }
    document.body.appendChild(form);
    localStorage.setItem('token_auth_url_provider', 'trello');
    form.submit();
  }

  async selectAction(plateform: string, actionDetails: AreaObject | undefined, intermediate: string = '') {
    console.log(actionDetails)
    if (!actionDetails)
      return;
    if (!intermediate.length && (actionDetails.plateform.toLowerCase() === 'discord' || actionDetails.plateform.toLowerCase() === 'sheet'
      || actionDetails.plateform.toLowerCase() === 'email' || actionDetails.plateform.toLowerCase() === 'chess'
      || actionDetails.plateform.toLowerCase() === 'spotify' || actionDetails.plateform.toLowerCase() === 'clashroyale' || actionDetails.plateform.toLowerCase() === 'clashofclans'
      || actionDetails.plateform.toLowerCase() === 'weather' || actionDetails.plateform.toLowerCase() === 'twitch' || actionDetails.plateform.toLowerCase() === 'coingecko'
      || actionDetails.plateform.toLowerCase() === 'datetime' || actionDetails.plateform.toLowerCase() === 'brawlstar'
      || (actionDetails.plateform.toLowerCase() === 'github' && actionDetails.id === 26)
      || actionDetails.plateform.toLowerCase() === 'tft' || actionDetails.plateform.toLowerCase() === 'trello' || (actionDetails.plateform.toLowerCase() === 'twitter' && actionDetails.id > 16) )) {

      this.tokenAddModalOpen = true;
      this.tempActionSelected = actionDetails;
      if (actionDetails.plateform.toLowerCase() === 'discord') {
        const allServicesStatus = await this.api.getServiceStatus();
        const valid = allServicesStatus.length > 0 ? allServicesStatus.filter((item: ServiceStatus) => {console.log(item); return item.service.toLowerCase() === actionDetails.plateform.toLowerCase()})[0].logged_in: false;
        if (!valid) {
          this.saveInfos.emit(undefined)
          this.discordOauthSignIn()
        }
      }
      if (actionDetails.plateform.toLowerCase() === 'trello') {
        const allServicesStatus = await this.api.getServiceStatus();
        const valid = allServicesStatus.length > 0 ? allServicesStatus.filter((item: ServiceStatus) => {console.log(item); return item.service.toLowerCase() === actionDetails.plateform.toLowerCase()})[0].logged_in: false;
        if (!valid) {
          this.saveInfos.emit(undefined)
          this.trelloOauthSignIn()
        }
      }
      return;
    }
    if ((actionDetails.plateform.toLowerCase() === 'twitter' && actionDetails.id < 16) || actionDetails.plateform.toLowerCase() === 'discord' || actionDetails.plateform.toLowerCase() === 'sheet' || actionDetails.plateform.toLowerCase() === 'github' || actionDetails.plateform.toLowerCase() === 'spotify' || actionDetails.plateform.toLowerCase() === 'linkedin' || actionDetails.plateform.toLowerCase() === 'trello') {
      let toSet = 'google';
      if (actionDetails.plateform.toLowerCase() !== 'sheet')
        toSet = actionDetails.plateform.toLowerCase();
      const allServicesStatus = await this.api.getServiceStatus();
      const valid = allServicesStatus.length > 0 ? allServicesStatus.filter((item: ServiceStatus) => item.service.toLowerCase() === toSet)[0].logged_in: false;
      if (!valid) {
        this.saveInfos.emit({
          actionDesc: actionDetails.action,
          icon: this.icons[this.idIconsMap[actionDetails.id]],
          trimColor: this.trimColors[plateform.toLowerCase()],
          plateform: plateform.toLowerCase(),
          id: actionDetails.id,
          actionToken: plateform.toLowerCase() === 'discord' ? this.selectedGuild : ((plateform.toLowerCase() === 'trello' && actionDetails.id === 56) ? this.selectedBoard : this.tokenEntered),
          type: this.type
        })
        switch (actionDetails.plateform.toLowerCase()) {
          case 'sheet':
            this.googleOauthSignIn()
            break
          case 'google':
            this.googleOauthSignIn()
            break
          case 'twitter':
            this.twitterOauthSignIn()
            break
          case 'github':
            this.githubOauthSignIn()
            break
          case 'spotify':
            this.spotifyOauthSignIn()
            break
          case 'discord':
            this.discordOauthSignIn()
            break
          case 'linkedin':
            this.linkedinOauthSignIn()
            break
          case 'trello':
            this.trelloOauthSignIn()
            break
          default:
            break
        }
        return;
      }
    }
    this.actionChosen.emit({
      actionDesc: actionDetails.action,
      icon: this.icons[this.idIconsMap[actionDetails.id]],
      trimColor: this.trimColors[plateform.toLowerCase()],
      plateform: plateform.toLowerCase(),
      id: actionDetails.id,
      actionToken: plateform.toLowerCase() === 'discord' ? this.selectedGuild : ((plateform.toLowerCase() === 'trello' && actionDetails.id === 56) ? this.selectedBoard : this.tokenEntered)
    })
    this.returnFromSelectedPlateform();
    this.closeModal();
  }

  navigateToPage(page: string | undefined): void {
    if (page) {
      this.router.navigateByUrl(page);
    }
  };

  async ngOnInit() {
    if (!await this.sessionService.isTokenValid(localStorage.getItem('auth_token')))
      this.navigateToPage('/');
    this.availablePlateforms = []
    this.availableServices.forEach((item: AreaObject) => {
      if (!this.availablePlateforms.includes(item.plateform.toLowerCase()))
        this.availablePlateforms.push(item.plateform.toLowerCase());
    })
    this.discordGuilds = await this.api.getDiscordGuilds();
    this.trelloBoards = await this.api.getTrelloBoards();
  }
}
