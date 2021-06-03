import { Component, OnInit } from '@angular/core';

import { TeamService } from '../../core/services/teams/team.service';

import { Team } from '../../models/team.model';
import { Match } from '../../models/match.model';
import { MatchService } from 'src/app/core/services/match/match.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  teams: Team[] = [];
  editingTeam: Team = { points: 0 };
  editing: boolean = false;
  displayedColumns: string[] = ['ID', 'Equipo', 'Editar'];

  constructor(
    private teamService: TeamService,
    private matchService: MatchService
  ) {}

  updateTeam(): void {
    this.teamService.updateTeam(this.editingTeam);
    this.editing = false;
  }
  ngOnInit(): void {
    this.teamService.getteamsByOrder('position').subscribe((teams) => {
      this.teams = teams;
    });
  }
  edit(event: Event, team: Team) {
    if (this.editingTeam.id == undefined) this.editing = true;
    else if (this.editingTeam.id != team.id) this.editing = true;
    else this.editing = !this.editing;

    this.editingTeam = team;
  }
}
