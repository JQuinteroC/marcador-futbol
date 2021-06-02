import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @Input() team: Team = {
    id: '',
    name: '',
    position: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
