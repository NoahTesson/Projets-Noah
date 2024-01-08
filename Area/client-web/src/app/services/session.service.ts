import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';
import { NapteApiService } from './napte-api.service';
import { BehaviorSubject, Subject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SessionService {

  public logged_in: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public loginActive = this.logged_in.asObservable();

  private AxiosClient = axios.create({
    baseURL: 'https://stirring-settling-mutt.ngrok-free.app',
    timeout: 10000,
  });

  constructor(private router: Router, private route: ActivatedRoute, private api: NapteApiService) { }

  setUserNotLoggedIn() {
    this.router.navigateByUrl('/');
  }

  async tryFetchOAuthGoogleProfile(access_token: string, emailInput: string | undefined): Promise<string> {
    try {
      const resp = await fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const jsonResp = await resp.json();
      console.log(jsonResp);
      // sessionStorage.setItem('google_profile', JSON.stringify(jsonResp))
      if (!jsonResp.email && !emailInput) {
        return "ask-for-email";
      }
      if (!jsonResp.email && emailInput)
        this.OAuthTryRegister(emailInput, jsonResp.given_name, jsonResp.family_name, access_token, "google");
      else
        this.OAuthTryRegister(jsonResp.email, jsonResp.given_name, jsonResp.family_name, access_token, "google");
      return "success";
    } catch (err) {
      console.log(err);
      return "error";
    }
  }

  // async tryFetchOAuthTwitterProfile(access_token: string): Promise<boolean> {
  //   try {
  //     const resp = await fetch("https://api.twitter.com/2/users/me", {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`
  //       }
  //     });
  //     const jsonResp = await resp.json();
  //     console.log(jsonResp);
  //     sessionStorage.setItem('twitter_profile', JSON.stringify(jsonResp))
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
  // }

  async tryFetchOAuthURLResp(now: Date, emailInput: string | undefined = undefined): Promise<string> {
    let ret_value = "error";

    const params = await firstValueFrom(this.route.fragment);
    console.log(params);
    if (params) {
      const url_params: URLSearchParams = new URLSearchParams(params);
      const access_token: string | null = url_params.get('access_token');
      const expiration = url_params.get('expires_in');
      if (access_token) {
        // localStorage.setItem('access_token', access_token);
        // localStorage.setItem('expires_in', (now.getTime() + parseInt(expiration)).toString());
        // localStorage.setItem('connected_with', 'google');
        ret_value = await this.tryFetchOAuthGoogleProfile(access_token, emailInput);
      } else
        ret_value = "error";
    } else
      ret_value = "error";
      if (ret_value !== 'success' && ret_value !== 'ask-for-email') {
        await this.route.queryParams.subscribe(async (params) => {
          if (params) {
            const url_params: URLSearchParams = new URLSearchParams(params)
            console.log(url_params.toString());
            const access_code: string | null = url_params.get('code');
            if (access_code) {
              try {
                const raw_token_resp = await this.AxiosClient.post('/api/twitter/auth', {
                    access_code: access_code,
                    redirect_uri: 'http://localhost:8081'
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                const token_resp = raw_token_resp.data;
                // localStorage.setItem('access_token', token_resp.tokens.access_token);
                // localStorage.setItem('expires_in', (now.getTime() + parseInt(token_resp.tokens.expires_in)).toString());
                // localStorage.setItem('connected_with', 'X');
                // sessionStorage.setItem('twitter_profile', JSON.stringify(token_resp.profile.data));
                if (emailInput)
                  this.OAuthTryRegister(emailInput, token_resp.profile.data.name, "", token_resp.tokens.access_token, "twitter");
                console.log(token_resp.profile);
                ret_value = 'success';
              } catch (err) {
                console.log(err);
                ret_value = 'error';
              }
            } else
              ret_value = 'error';
          } else 
            ret_value = 'error';
        });
      }
    console.log(ret_value);
    return ret_value;
  }

  async loggedIn(): Promise<boolean> {
    let isLoggedIn: boolean = false;
    await this.loginActive.subscribe(value => isLoggedIn = value);
    this.logged_in.next(isLoggedIn);
    return isLoggedIn;
  }

  async isTokenValid(token: string | undefined | null): Promise<boolean> {
    if (!token) {
      this.manualLogin(false);
      console.log('NO TOKEN')
      return false;
    }
    try {
      const actionResp : AxiosResponse = await this.AxiosClient.post(`/areas/getServices`, {
        type: 'Reaction'
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': token
      }})
      this.manualLogin(true);
      console.log('TOKEN GOOD')
      return true;
    } catch(err) {
      console.log('TOKEN NOT GOOD')
      this.manualLogin(false);
      return false;
    }
  }

  manualLogin(bool: boolean): void {
    this.logged_in.next(bool);
  }

  async OAuthTryRegister(email: string, name: string, surname: string, token: string, tokenProvider: string) {
    const exists = await this.api.userExists(email);

    if (exists) {
      if (!await this.api.authLogin(email, token, tokenProvider)) {
        console.log("ERROR, cannot login");
        this.logged_in.next(false);
        return;
      }
      this.logged_in.next(true);
    } else {
      if (!await this.api.authSignup(email, name, surname, token, tokenProvider)) {
        console.log("ERROR, cannot signup");
        this.logged_in.next(false);
        return;
      }
      this.logged_in.next(false);
    }
    await this.api.registerApiToken(token, tokenProvider, email);
  }

  async getGoogleProfile() {
    if (!await this.loggedIn() || localStorage.getItem('connected_with') !== 'google')
      return {error: 'not connected with google'};
    const googleProfileRaw = sessionStorage.getItem('google_profile')
    if (googleProfileRaw)
      return JSON.parse(googleProfileRaw);
    return {error: 'couldn\'t find google profile in session storage despite being connected with google /!\\'};
  }

  async fetchTokenInURL(): Promise<string> {
    let token: string | undefined | null;
    const params = await firstValueFrom(this.route.queryParams);
    const url_params: URLSearchParams = new URLSearchParams(params);

    token = url_params.get('token');
    if (token) {
      localStorage.setItem('auth_token', token);
      return 'success';
    }
    return 'error';
  }

  async setupTwitterProfile(now: Date, emailInput: string | undefined): Promise<string> {
    let ret_value: string = 'error';
    await this.route.queryParams.subscribe(async (params) => {
      if (params) {
        const url_params: URLSearchParams = new URLSearchParams(params)
        const access_code: string | null = url_params.get('code');
        if (access_code) {
          try {
            const raw_token_resp = await this.AxiosClient.post('/api/twitter/auth', {
                access_code: access_code,
                redirect_uri: 'http://localhost:8081'
              },
              {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
            const token_resp = raw_token_resp.data;
            // localStorage.setItem('access_token', token_resp.tokens.access_token);
            // localStorage.setItem('expires_in', (now.getTime() + parseInt(token_resp.tokens.expires_in)).toString());
            // localStorage.setItem('connected_with', 'X');
            // sessionStorage.setItem('twitter_profile', JSON.stringify(token_resp.profile.data));
            if (emailInput)
              this.OAuthTryRegister(emailInput, token_resp.profile.data.name, "", token_resp.tokens.access_token, "twitter");
            ret_value = 'success';
          } catch (err) {
            console.log(err);
            ret_value = 'error';
          }
        } else
          ret_value = 'error';
      } else 
        ret_value = 'error';
    });
    return ret_value;
  }

  async authenticate(emailInput: string | undefined = undefined): Promise<string> {
    const now = new Date();
    if (!await this.loggedIn()) {
      const res: string = await this.fetchTokenInURL();
      if (res === 'error') {
        return await this.setupTwitterProfile(now, emailInput);
      }
      return res;
    }
    return "success";
  //   const now = new Date();
  //   const access_token = localStorage.getItem('access_token');
  //   const connected_with = localStorage.getItem('connected_with');

  //   if (!access_token || !this.loginActive) {
  //     await this.tryFetchOAuthURLResp(now, emailInput);
  //     return;
  //   }
  //   if (connected_with === 'google' && !sessionStorage.getItem('google_profile'))
  //     this.tryFetchOAuthGoogleProfile(access_token);
  // }
  }
}
