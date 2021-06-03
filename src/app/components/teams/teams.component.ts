import { Component, OnInit, Input } from '@angular/core';

import { TeamService } from '../../core/services/teams/team.service';

import { Team } from '../../models/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  public teams: Team[] = [];
  displayedColumns: string[] = ['Posicion', 'Equipo', 'Puntos'];
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }
}
