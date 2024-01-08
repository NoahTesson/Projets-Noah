import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TransparentButtonComponent } from './transparent-button/transparent-button.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, NgModel } from '@angular/forms';
import { SessionService } from './services/session.service';
import { AreaCardComponent } from './area-card/area-card.component';
import { AreamodifyComponent } from './areamodify/areamodify.component';
import { AreacreateComponent } from './areacreate/areacreate.component';
import { AreaAddModalComponent } from './area-add-modal/area-add-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AboutJsonComponent } from './about-json/about-json.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransparentButtonComponent,
    LoginComponent,
    RegisterComponent,
    AreaCardComponent,
    AreamodifyComponent,
    AreacreateComponent,
    AreaAddModalComponent,
    ProfileComponent,
    AboutJsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
