import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { IconDefinition, faCheck, faLink, faPencil } from '@fortawesome/free-solid-svg-icons';
import { NapteApiService, ServiceStatus, UserProfile } from '../services/napte-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profilePicture: string | undefined;
  editIcon: IconDefinition = faPencil;
  connectIcon: IconDefinition = faLink;
  connectedIcon: IconDefinition = faCheck;
  userProfile: UserProfile | undefined;
  phoneDisplay: boolean = false;
  allStatuses: ServiceStatus[] = [];

  constructor(public theme: ThemeService, private router: Router, private api: NapteApiService) {
    this.onResize();
  }

  async ngOnInit() {
    this.userProfile = await this.api.getUserProfile();
    this.allStatuses = await this.api.getServiceStatus();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.phoneDisplay = window.innerWidth < 1250;
  }

  changePfp(event: Event) {
    // @ts-ignore
    const files: FileList = event?.target?.files;

    if (files.length > 0 && this.userProfile) {
      const _file = URL.createObjectURL(files[0]);
      this.userProfile.profilePicture = _file;
    }
  }

  openOAuthConnection(plateform: string) {
    localStorage.setItem('direct-redirect', 'profile');
    switch (plateform) {
      case 'google':
        this.oauthSignIn()
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
        break;
    }

  }

  oauthSignIn() {
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
      localStorage.setItem('token_auth_url_provider', 'twitter');
      form.appendChild(input);
    }
    document.body.appendChild(form);
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

  navigateToPage(page: string | undefined): void {
    if (page) {
      this.router.navigateByUrl(page);
    }
  };
}
