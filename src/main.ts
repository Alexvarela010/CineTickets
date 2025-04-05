import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {routes} from './app/app.routes';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {getAnalytics} from '@angular/fire/analytics';

bootstrapApplication(AppComponent,{
  providers:[provideRouter(routes),
    provideHttpClient(),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideStorage(() => getStorage()),]
})
const firebaseConfig = {
  apiKey: "AIzaSyCPOLbbJvhQTH5-WvPqw7ewN2z3lFN2Lxc",
  authDomain: "cinetickets-f28c2.firebaseapp.com",
  projectId: "cinetickets-f28c2",
  storageBucket: "cinetickets-f28c2.firebasestorage.app",
  messagingSenderId: "794353272071",
  appId: "1:794353272071:web:0c8292a163dc57d15671a2",
  measurementId: "G-155JHP3EX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
