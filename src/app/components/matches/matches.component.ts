import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from 'src/app/core/services/teams/team.service';
import { Team } from 'src/app/models/team.model';

import { MatchService } from '../../core/services/match/match.service';

import { Match } from '../../models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  edditingMatch: Match = {
    id: '',
    idTeam1: '',
    idTeam2: '',
    goalsTeam1: 0,
    goalsTeam2: 0,
  };
  teams: Team[] = [];
  nameText: nameTeams[] = [];
  team1: string = '';
  team2: string = '';

  constructor(
    private matchService: MatchService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.matchService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });

    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
      for (let match of this.matches) {
        let aux = 0;
        for (let team of teams) {
          if (match.idTeam1 === team.id) {
            this.team1 = '' + team.name;
          } else if (match.idTeam2 === team.id) {
            this.team2 = '' + team.name;
            this.nameText.push({ Team1: this.team1, Team2: this.team2 });
            break;
          }
        }
        this.team1 = '';
        this.team2 = '';
      }
    });
  }

  updateMatch($event: Event, match: Match) {
    this.matchService.updateMatch(match);
    this.calculatePoints();
  }

  private calculatePoints() {
    for (let team of this.teams) {
      team.points = 0;
      for (let match of this.matches) {
        if (team.id === match.idTeam1 && match.goalsTeam1 > match.goalsTeam2) {
          team.points += 3;
        }
        if (team.id === match.idTeam2 && match.goalsTeam1 < match.goalsTeam2) {
          team.points += 3;
        }
        if (
          (team.id === match.idTeam1 || team.id === match.idTeam2) &&
          match.goalsTeam1 === match.goalsTeam2 &&
          match.goalsTeam1 != 0
        ) {
          team.points += 1;
        }
      }
      this.teamService.updateTeam(team);
    }
    this.calcualtePosition();
  }

  private calcualtePosition() {
    console.log(this.teams);
    this.teams = this.teams.sort(function (a, b) {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
    });
    console.log(this.teams);
    let auxPos = 1;
    for (let team of this.teams) {
      team.position = auxPos;
      auxPos++;
      this.teamService.updateTeam(team);
    }
  }
}

interface nameTeams {
  Team1: string;
  Team2: string;
}
