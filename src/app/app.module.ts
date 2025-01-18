import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VideoModule } from './video/video.module';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Import Cloudinary modules
// import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from '@cloudinary/url-gen';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    VideoModule,
    UserModule,
    // Initialize Firebase with environment configuration
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule, // Firebase Storage module
    AppRoutingModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: environment.cloudinary.cloudName,
      upload_preset: environment.cloudinary.uploadPreset,
      api_key: environment.cloudinary.api_key,
      api_secret: environment.cloudinary.api_secret
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }