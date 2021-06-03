import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { ConfigComponent } from './components/config/config.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchesComponent } from './components/matches/matches.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'leaderboard', pathMatch: 'full' },
      { path: 'config', component: ConfigComponent },
      { path: 'leaderboard', component: TeamsComponent },
      { path: 'match', component: MatchesComponent },
    ],
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
  { path: '404', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
