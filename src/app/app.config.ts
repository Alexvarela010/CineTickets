import
{ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
    providePrimeNG({
      theme:{
        preset:Aura
      }
    })
  ]

};
const firebaseConfig = {
  apiKey: "AIzaSyCPOLbbJvhQTH5-WvPqw7ewN2z3lFN2Lxc",
  authDomain: "cinetickets-f28c2.firebaseapp.com",
  projectId: "cinetickets-f28c2",
  storageBucket: "cinetickets-f28c2.firebasestorage.app",
  messagingSenderId: "794353272071",
  appId: "1:794353272071:web:0c8292a163dc57d15671a2",
  measurementId: "G-155JHP3EX3"
};
