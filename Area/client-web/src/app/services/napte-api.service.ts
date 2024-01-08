import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { AreaChosenDetails } from '../area-add-modal/area-add-modal.component';

const successRespCode: number = 201;

export type UserProfile = {
  name: string;
  surname: string;
  id: number;
  email: string;
  profilePicture: string | undefined;
}

export type DiscordGuilds = {
  id: string,
  name: string
}

export type AreaObject = {
  id: number,
  plateform: string,
  action: string
}

export type AreaDbObject = {
  id?: number,
  name?: string,
  action?: string,
  error?: string
}

export type ServiceStatus = {
  service: string;
  logged_in: boolean;
}

export type UserArea = {
  id: number,
  title: string | undefined,
  description: string | undefined,
  trigger_id: number,
  action_id: number,
  triggerToken: string | undefined,
  actionToken: string | undefined
}

@Injectable({
  providedIn: 'root'
})
export class NapteApiService {

  userEmail: string = "";
  allAreaPossibilities: { [key: string] : AreaObject[] } = {};
  public userProfile: UserProfile | undefined;
  constructor() { }

  private AxiosClient = axios.create({
    baseURL: 'https://stirring-settling-mutt.ngrok-free.app',
    timeout: 10000,
  });

  async signUp(name: string, surname: string, email: string, password: string | undefined): Promise<boolean> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/user/signup`, {
          name: name,
          surname: surname,
          email: email,
          password: password
      },
      {
        headers: {
        'Content-Type': 'application/json'
      }})
      localStorage.removeItem('auth_token')
      if (resp.data['token']) {
        localStorage.setItem('auth_token', resp.data['token'])
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async login(email: string, password: string | undefined): Promise<boolean> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/user/signin`, {
        email: email,
        password: password
      },
      {
        headers: {
        'Content-Type': 'application/json'
      }})
      localStorage.removeItem('auth_token')
      if (resp.data['token']) {
        localStorage.setItem('auth_token', resp.data['token'])
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getDiscordGuilds(): Promise<DiscordGuilds[]> {
    let guilds: DiscordGuilds[] = [];

    try {
      const resp: AxiosResponse = await this.AxiosClient.get(`/api/discord/getGuilds`,
      {
        headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      console.log(resp.data);
      guilds = resp.data.map((item: DiscordGuilds) => item);
      return guilds;
    } catch (err) {
      console.log(err);
      return guilds;
    }
  }

  async getTrelloBoards(): Promise<DiscordGuilds[]> {
    let boards: DiscordGuilds[] = [];

    try {
      const resp: AxiosResponse = await this.AxiosClient.get(`/api/trello/getOrganization`,
      {
        headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      console.log(resp.data);
      boards = resp.data.map((item: DiscordGuilds) => item);
      return boards;
    } catch (err) {
      console.log(err);
      return boards;
    }
  }

  async getAboutJson(): Promise<string> {
    try {
      const resp: AxiosResponse = await this.AxiosClient.get(`/about.json`,
      {
        headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420"
      }})
      console.log(resp.data);
      return JSON.stringify(resp.data);
    } catch (err) {
      console.log(err);
      return "error";
    }
  }

  async isUserTokenValid(provider: string) {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/user/isTokenValid`, {
        provider: provider
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
    
  }

  async getServiceStatus(): Promise<ServiceStatus[]> {
    try {
      let statusServices: ServiceStatus[] = [];
      const resp : AxiosResponse = await this.AxiosClient.get(`/api/getStatus`,
      {
        headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      resp.data.status.forEach((item: { [key: string]: string }) => {
        console.log(item);
        if (Object.keys(item).length < 1) {
          return;
        }
        statusServices.push({
          service: Object.entries(item)[0][0],
          logged_in: Object.entries(item)[0][1] !== "No"
        })
      });
      return statusServices;
    } catch (err) {
      return []
    }
  }

  async requestResetPassword(email: string) {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/user/resetPassword`, {
        email: email
      },
      {
        headers: {
        'Content-Type': 'application/json'
      }})
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async resetPassword(resetPassToken: string, newPassword: string) {
      try {
        const resp : AxiosResponse = await this.AxiosClient.post(`/user/resetPassword/${resetPassToken}`, {
          password: newPassword
        },
        {
          headers: {
          'Content-Type': 'application/json'
        }})
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
  }

  async createArea(title: string, description: string | undefined, action: AreaChosenDetails, reactions: AreaChosenDetails[]) {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/areas/create`, {
        title: title,
        description: description,
        triggerId: action.id,
        actionId: reactions[0].id,
        triggerToken: action.actionToken,
        actionToken: reactions[0].actionToken
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateArea(id: number, title: string, description: string | undefined, action: AreaChosenDetails, reactions: AreaChosenDetails[]) {
    try {
      const resp : AxiosResponse = await this.AxiosClient.put(`/areas/${id}`, {
        title: title,
        description: description,
        triggerId: action.id,
        actionId: reactions[0].id,
        triggerToken: action.actionToken,
        actionToken: reactions[0].actionToken
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPossibleAreasFromPlateform(plateform: string, type: string): Promise<AreaDbObject[]> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/areas/getServicesActions`, {
        type: type,
        name: plateform
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      return resp.data;
    } catch (error) {
      return [{error: 'can\'t retrieve areas for plateform'}];
    }
  }

  async signupGithub(): Promise<void> {
    try {
      const actionResp : AxiosResponse = await this.AxiosClient.get(`/api/github/login`,
      {
        headers: {
        'Content-Type': 'application/json',
      }})
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getAllAreaPossibilities(): Promise<{ [key: string] : AreaObject[] }> {
    if (this.allAreaPossibilities['action']) {
      return this.allAreaPossibilities;
    }
    let areaOptions: { [key: string] : AreaObject[] } = {
      'action': [],
      'reaction': []
    };
    try {
      const actionResp : AxiosResponse = await this.AxiosClient.post(`/areas/getServices`, {
        type: 'Reaction'
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})

      const reactionResp : AxiosResponse = await this.AxiosClient.post(`/areas/getServices`, {
        type: 'Action'
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      await actionResp.data.forEach(async (item: string) => {
        const areaObjectResp = await this.getPossibleAreasFromPlateform(item, 'Reaction');
        areaObjectResp.forEach((item: AreaDbObject) => {
          areaOptions['action'].push({
            id: item.id || -1,
            plateform: item.name || "error",
            action: item.action || "error"
          })
        })
        
      });
      await reactionResp.data.forEach(async (item: string) => {
        const areaObjectResp = await this.getPossibleAreasFromPlateform(item, 'Action');
        areaObjectResp.forEach((item: AreaDbObject) => {
          areaOptions['reaction'].push({
            id: item.id || -1,
            plateform: item.name || "error",
            action: item.action || "error"
          })
        })
        
      });
      this.allAreaPossibilities = areaOptions;
      return this.allAreaPossibilities;
    } catch (error) {
      return {};
    }
  }

  getAreaItemById(type: string, id: number): AreaObject {
    return this.allAreaPossibilities[type].filter(item => item.id === id)[0];
  }

  async getUserProfile(): Promise<UserProfile | undefined> {
    try {
      if (!this.userProfile) {
        const resp : AxiosResponse = await this.AxiosClient.get(`/user/me`,
        {
          headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
          'X-Authorization-Key': localStorage.getItem('auth_token')
        }})
        this.userProfile = {
          name: resp.data.name,
          surname: resp.data.surname,
          email: resp.data.email,
          id: resp.data.id,
          profilePicture: resp.data.profilePicture
        }
      }
      return this.userProfile;
    } catch (error) {
      return;
    }
  }

  async getUserAreas(): Promise<UserArea[]> {
    try {
      await this.getAllAreaPossibilities();
      const resp : AxiosResponse = await this.AxiosClient.get(`/areas/listByUser`,
      {
        headers: {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      return resp.data;
    } catch (error) {
      return [];
    }
  }

  async getUserAreaById(id: number): Promise<UserArea> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.get(`/areas/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          "ngrok-skip-browser-warning": "69420",
          'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      console.log(resp.data)
      return resp.data;
    } catch (error) {
      return {
        id: -1,
        title: undefined,
        description: undefined,
        actionToken: undefined,
        triggerToken: undefined,
        trigger_id: -1,
        action_id: -1
      };
    }
  }

  async removeAreaById(id: number): Promise<boolean> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.delete(`/areas/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      return true;
    } catch (error) {
      return false;
    }
  }

  async userExists(email: string) {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/user/exists`, {
        email: email
      },
      {
        headers: {
        'Content-Type': 'application/json'
      }})
    return true;
    } catch (error) {
      return false;
    }
  }

  async authLogin(email: string, token: string, tokenProvider: string): Promise<boolean> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/user/singin_auth`, {
          email: email,
          token: token,
          provider: tokenProvider
      },
      {
        headers: {
        'Content-Type': 'application/json'
      }})
      localStorage.removeItem('auth_token')
      if (resp.data['token']) {
        localStorage.setItem('auth_token', resp.data['token'])
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async getTwitterProfileAccess(token: string) {
    try {
      const raw_token_resp = await this.AxiosClient.post('/api/twitter/auth', {
        access_code: token,
        redirect_uri: 'http://localhost:8081'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const token_resp = raw_token_resp.data;
      return token_resp;
    } catch (err) {
      return {}
    }
  }

  async authSignup(email: string, name: string, surname: string, token: string, tokenProvider: string): Promise<boolean> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/user/signup_auth`, {
        name: name,
        surname: surname,
        email: email,
        token: token,
        provider: tokenProvider
      },
      {
        headers: {
        'Content-Type': 'application/json'
      }})
      localStorage.removeItem('auth_token')
      if (resp.data['token']) {
        localStorage.setItem('auth_token', resp.data['token'])
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async registerApiToken(token: string, tokenProvider: string, email: string): Promise<boolean> {
    try {
      const resp : AxiosResponse = await this.AxiosClient.post(`/api/${tokenProvider}/setToken`, {
        token: token
      },
      {
        headers: {
        'Content-Type': 'application/json',
        'X-Authorization-Key': localStorage.getItem('auth_token')
      }})
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
