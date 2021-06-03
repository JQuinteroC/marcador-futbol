import { Component, OnInit, Input } from '@angular/core';

import { TeamService } from '../../services/team.service';

import { Team } from '../../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  constructor(public teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
      console.log(teams);
    });
  }
}
