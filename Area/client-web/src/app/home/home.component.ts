import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { NapteApiService, UserArea, UserProfile } from '../services/napte-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  emailInput: string | undefined;
  public askForEmail: boolean = false;
  public logged_in: boolean = false;
  userAreas: UserArea[] = [];
  phoneDisplay: boolean = false;
  userProfile: UserProfile | undefined;
  displayForgotPasswordModal: boolean = false;
  forgotPasswordToken: string | undefined | null;
  newPasswordInput: string | undefined;
  confirmNewPasswordInput: string | undefined;
  errorMessageToDisplay: string | undefined;
  
  constructor (public themeService: ThemeService, private sessionService: SessionService, public api: NapteApiService, private router: Router, private route: ActivatedRoute) {
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

  getLogoListForReactions(reactionIds: number[]): string[] {
    let logoList: string[] = [];

    reactionIds.forEach(id => {
      const areaDetails = this.api.getAreaItemById('reaction', id);
      const logoToAdd = this.themeService.onlineAssets[areaDetails.plateform.toLowerCase() + '_logo'];
      if (!logoList.includes(logoToAdd))
      logoList.push(logoToAdd);
    })
    return logoList;
  };

  async submitEmail() {
    this.sessionService.authenticate(this.emailInput);
    this.askForEmail = false;
  }

  async submitNewPassword() {
    console.log("TEST")
    this.errorMessageToDisplay = undefined;
    if (this.confirmNewPasswordInput !== this.newPasswordInput) {
      this.errorMessageToDisplay = 'The 2 passwords differ';
      return;
    }
    if (this.forgotPasswordToken && this.newPasswordInput) {
      if (!await this.api.resetPassword(this.forgotPasswordToken, this.newPasswordInput)) {
        this.errorMessageToDisplay = 'There was an error resetting your password';
      } else {
        this.displayForgotPasswordModal = false;
      }
    }
  }

  async ngOnInit() {
    if (await this.sessionService.isTokenValid(localStorage.getItem('auth_token'))) {
      console.log("VALID");
      this.route.queryParams.subscribe(async (params) => {
        if (params) {
          const url_params: URLSearchParams = new URLSearchParams(params);
          if (url_params.get('token') && localStorage.getItem('token_auth_url_provider')) {
            const tokenProvider = localStorage.getItem('token_auth_url_provider');
            localStorage.removeItem('token_auth_url_provider');
            const token = url_params.get('token');
            if (tokenProvider !== 'twitter') {
              this.api.registerApiToken(token ? token : '', tokenProvider ? tokenProvider : '', '');
            } else {
              try {
                const token_resp = await this.api.getTwitterProfileAccess(token ? token : '');
                if (token_resp) {
                  this.api.registerApiToken(token_resp?.tokens?.access_token ? token_resp.tokens.access_token : '', 'twitter', '');
                }
              } catch (err) {

              }
            }
          }
        }
      })
      this.route.fragment.subscribe(async (params) => {
        if (params) {
          const url_params: URLSearchParams = new URLSearchParams(params);
          if (url_params.get('token') && localStorage.getItem('token_auth_url_provider')) {
            const tokenProvider = localStorage.getItem('token_auth_url_provider');
            console.log(tokenProvider);
            localStorage.removeItem('token_auth_url_provider');
            const token = url_params.get('token');
            if (tokenProvider !== 'twitter') {
              this.api.registerApiToken(token ? token : '', tokenProvider ? tokenProvider : '', '');
            } else {
              try {
                const token_resp = await this.api.getTwitterProfileAccess(token ? token : '');
                if (token_resp) {
                  this.api.registerApiToken(token_resp?.tokens?.access_token ? token_resp.tokens.access_token : '', 'twitter', '');
                }
              } catch (err) {

              }
            }
          }
        }
      })
    }
    this.sessionService.loginActive.subscribe(async (value) => {
      this.logged_in = value
      if (this.logged_in && this.userAreas.length === 0) {
        this.userProfile = await this.api.getUserProfile();
        this.userAreas = await this.api.getUserAreas();
        const redirectToPage: string | null = localStorage.getItem('direct-redirect');
        if (redirectToPage) {
          setTimeout(() => {
            localStorage.removeItem('direct-redirect')
            this.navigateToPage(`/${redirectToPage}`);
          }, 1500);
        }
      }
    });
    if (await this.sessionService.isTokenValid(localStorage.getItem('auth_token'))) {
      this.route.queryParams.subscribe(async (params) => {
        if (params) {
          const url_params: URLSearchParams = new URLSearchParams(params);
          if (url_params.get('state') && url_params.get('code') && !url_params.get('plateform')) {
            const token: string | null = url_params.get('code');
            try {
            const token_resp = await this.api.getTwitterProfileAccess(token ? token : '');
            if (token_resp) {
              this.api.registerApiToken(token_resp?.tokens?.access_token ? token_resp.tokens.access_token : '', 'twitter', '');
            }
            } catch (err) {

            }
          }
        }
      })
      this.userProfile = await this.api.getUserProfile();
      this.userAreas = await this.api.getUserAreas();
      return;
    }
    await this.route.queryParams.subscribe(async (params) => {
      if (params) {
        const url_params: URLSearchParams = new URLSearchParams(params);
        if (url_params.get('forgot-password')) {
          this.displayForgotPasswordModal = true;
          this.forgotPasswordToken = url_params.get('forgot-password');
        }
        if (url_params.get('code') && !url_params.get('plateform')) {
          this.askForEmail = true;
        }
      }
    })
    if (!this.askForEmail) {
      const state: string = await this.sessionService.authenticate();
      if (state === 'ask-for-email') {
        this.askForEmail = true;
      }
      if (state === 'success') {
        await this.sessionService.isTokenValid(localStorage.getItem('auth_token'))
      }
    }
  }
}
