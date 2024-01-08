import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { NapteApiService } from '../services/napte-api.service';
import { NgForm, NgModel } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  rememberMeForm: boolean = false;
  formEmail: string | undefined;
  formPass: string | undefined;
  phoneDisplay: boolean = false;
  askForEmail: boolean = false;
  emailInput: string | undefined;
  errorMsg: string | undefined;

  constructor (public themeService: ThemeService, private sessionService: SessionService, private router: Router, private apiService: NapteApiService) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.phoneDisplay = window.innerWidth < 1250;
  }
  
  openEmailModal() {
    this.askForEmail = true;
  }

  navigateToPage(page: string | undefined): void {
    if (page) {
      this.router.navigateByUrl(page);
    }
  }

  async resetPassword() {
    if (this.emailInput) {
      if (!await this.apiService.requestResetPassword(this.emailInput)) {

      } else {
        this.askForEmail = false;
      }
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

    var query_params: { [key: string]: string } = {'client_id': 'T1lweTc0Z0h5UGpCWVQzeUFMenY6MTpjaQ',
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

  async loginSubmit() {
    this.errorMsg = undefined;
    if (this.formEmail && this.formPass) {
      if (!this.formEmail.includes('@') || !this.formEmail.includes('.')) {
        this.errorMsg = 'Please enter a valid email'
        return
      }
      if (await this.apiService.login(this.formEmail, this.formPass)) {
        this.sessionService.logged_in.next(true);
        this.navigateToPage('/');
      } else {
        this.errorMsg = 'Login failed. Double check your password.'
      }
    } else {
      this.errorMsg = 'Please fill in all fields'
    }
  }
}
