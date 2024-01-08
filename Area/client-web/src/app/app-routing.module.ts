import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AreamodifyComponent } from './areamodify/areamodify.component';
import { AreacreateComponent } from './areacreate/areacreate.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutJsonComponent } from './about-json/about-json.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'register', component:  RegisterComponent },
  { path: 'areamodify', component:  AreamodifyComponent },
  { path: 'areacreate', component:  AreacreateComponent },
  { path: 'profile', component:  ProfileComponent },
  { path: 'about.json', component:  AboutJsonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
