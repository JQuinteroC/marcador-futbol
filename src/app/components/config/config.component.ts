import { Component, OnInit } from '@angular/core';

import { TeamService } from '../../core/services/teams/team.service';

import { Team } from '../../models/team.model';
import { MatchService } from 'src/app/core/services/match/match.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  teams: Team[] = [];
  editingTeam: Team = { points: 0, id: '', position: 0, note: '', name: '' };
  editing: boolean = false;
  displayedColumns: string[] = ['ID', 'Equipo', 'Editar'];

  constructor(
    private teamService: TeamService,
    private matchService: MatchService
  ) {}

  updateTeam(): void {
    console.log(this.editingTeam);
    this.teamService.updateTeam(this.editingTeam);
    this.editing = false;
  }
  ngOnInit(): void {
    this.teamService.getTeams().subscribe((teams) => {
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
