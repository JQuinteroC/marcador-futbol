import { Component } from '@angular/core';
import { Team } from './models/team.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Marcador futbol';
  teams: Team[] = [
    {
      id: '1',
      name: 'Grupo A',
      position: '1',
    },
    {
      id: '2',
      name: 'Grupo B',
      position: '2',
    },
    {
      id: '3',
      name: 'Grupo C',
      position: '4',
    },
    {
      id: '4',
      name: 'Grupo D',
      position: '3',
    },
  ];
}
