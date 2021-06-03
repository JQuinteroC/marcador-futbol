import { Component, OnInit } from '@angular/core';

import { TeamService } from '../../core/services/teams/team.service';

import { Team } from '../../models/team.model';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  panelOpenState = false;
  selectedValue: string;
  teams: Team[] = [];
  editingTeam: Team = { points: 0 };
  editing: boolean = false;
  displayedColumns: string[] = ['ID', 'Equipo', 'Editar'];

  constructor(private teamService: TeamService) {
    this.selectedValue = '';
  }
  updateTeam(): void {
    this.teamService.updateTeam(this.editingTeam);
    console.log('actualizar');
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
