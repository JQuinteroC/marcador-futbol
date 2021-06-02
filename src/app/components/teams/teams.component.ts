import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  @Input() team: Team = {
    id: '',
    name: '',
    position: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
