import { Routes } from '@angular/router';
import { MainComponent } from './components/dashboard/main/main.component';
import { SettingsPageComponent } from './components/settings-page/settings-page/settings-page.component';
import { ClientRegisterComponent } from './components/register-page/client-register/client-register.component';
import { ScheduleViewComponent } from './components/schedule-view/schedule-view.component';
import { ClientViewComponent } from './components/client-view/client-view.component';

export const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'settings', component: SettingsPageComponent },
  {path:'clients', component:ClientRegisterComponent},
  {path: 'schedules', component: ScheduleViewComponent},
  {path: 'clients/id', component: ClientViewComponent}
];
