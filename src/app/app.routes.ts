import { Routes } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { SettingsPageComponent } from './components/settings-page/settings-page/settings-page.component';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'settings', component: SettingsPageComponent },
];
