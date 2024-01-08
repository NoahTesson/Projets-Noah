import { Component, HostListener } from '@angular/core';
import onlineAssets, { AssetsConfig } from 'src/services/online-assets';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { NapteApiService } from '../services/napte-api.service';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loggedIn: boolean | undefined;
  formName: string | undefined;
  formLastname: string | undefined;
  formEmail: string | undefined;
  formPass: string | undefined;
  phoneDisplay: boolean = false;
  github_client_id: string = 'baa2c9ff96a09a61ab27'
  askForEmail: boolean = false;
  emailInput: string | undefined;
  errorMsg: string | undefined;

  constructor (public themeService: ThemeService, private router: Router, private sessionService: SessionService, private apiService: NapteApiService) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.phoneDisplay = window.innerWidth < 1250;
  }

  navigateToPage(page: string | undefined): void {
    if (page) {
      this.router.navigateByUrl(page);
    }
  };

  async signupSubmit() {
    this.errorMsg = undefined;
    if (this.formName && this.formLastname && this.formEmail && this.formPass) {
      if (!this.formEmail.includes('@') || !this.formEmail.includes('.')) {
        this.errorMsg = 'Please enter a valid email'
        return
      }
      if (await this.apiService.signUp(this.formName, this.formLastname, this.formEmail, this.formPass)) {
        this.sessionService.logged_in.next(true);
        this.navigateToPage('/');
      } else {
        this.errorMsg = 'Signup failed. Please verify the account doesn\'t already exist'
      }
    } else {
      this.errorMsg = 'Please fill in all fields'
    }
  }

  oauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/google/login`);

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
    form.submit();
  }

  githubOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/github/login`);

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
    form.submit();
  }
  discordOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/discord/login`);

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
    form.submit();
  }
  spotifyOauthSignIn() {
    const form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', `https://stirring-settling-mutt.ngrok-free.app/api/spotify/login`);

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
    form.submit();
  }
}
