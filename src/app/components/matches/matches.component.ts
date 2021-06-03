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
  edditingTeamA: Team = { id: '0', position: 0, points: 0, note: '', name: '' };
  edditingTeamB: Team = { id: '0', position: 0, points: 0, note: '', name: '' };
  teams: Team[] = [];
  nameText: nameTeams[] = [];
  team1: string = '';
  team2: string = '';
  flagTie: Ties[] = [];

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
    this.teams = this.teams.sort(function (a, b) {
      if (a.points > b.points) {
        return -1;
      }
      if (a.points < b.points) {
        return 1;
      }
      return 0;
    });
    let auxPos = 1;
    for (let team of this.teams) {
      team.position = auxPos;
      auxPos++;
      this.teamService.updateTeam(team);
    }
    this.tiebreaker();
  }

  private tiebreaker() {
    for (let teamA of this.teams) {
      for (let teamB of this.teams) {
        if (teamA != teamB && teamA.points === teamB.points) {
          let save = true;
          for (let tie of this.flagTie) {
            if (
              (tie.idTeamA == teamB.id && tie.idTeamB == teamA.id) ||
              (tie.idTeamA == teamA.id && tie.idTeamB == teamB.id)
            )
              save = false;
          }
          if (save)
            this.flagTie.push({
              idTeamA: teamA.id,
              idTeamB: teamB.id,
              nomA: teamA.name,
              nomB: teamB.name,
              totalA: 0,
              totalB: 0,
              posTeamA: teamA.position,
              posTeamB: teamB.position,
            });
        }
      }
    }

    for (let tie of this.flagTie) {
      for (let match of this.matches) {
        if (match.idTeam2 == tie.idTeamA)
          tie.totalA += match.goalsTeam2 - match.goalsTeam1;
        if (match.idTeam1 == tie.idTeamA)
          tie.totalA += match.goalsTeam1 - match.goalsTeam2;
        if (match.idTeam2 == tie.idTeamB)
          tie.totalB += match.goalsTeam2 - match.goalsTeam1;
        if (match.idTeam1 == tie.idTeamB)
          tie.totalB += match.goalsTeam1 - match.goalsTeam2;
      }
      console.log(tie);
      if (
        (tie.totalA > tie.totalB && tie.posTeamA > tie.posTeamB) ||
        (tie.totalA < tie.totalB && tie.posTeamA < tie.posTeamB)
      ) {
        this.edditingTeamA.id = tie.idTeamA;
        this.edditingTeamA.position = tie.posTeamB;
        this.edditingTeamA.points = tie.totalA;
        this.edditingTeamA.name = tie.nomA;
        this.edditingTeamA.note = 'Desempate con el equipo ' + tie.idTeamB;
        this.teamService.updateTeam(this.edditingTeamA);

        this.edditingTeamB.id = tie.idTeamB;
        this.edditingTeamB.position = tie.posTeamA;
        this.edditingTeamB.points = tie.totalB;
        this.edditingTeamB.name = tie.nomB;
        this.edditingTeamB.note = 'Desempate con el equipo ' + tie.idTeamB;
        this.teamService.updateTeam(this.edditingTeamB);
      } else {
        this.edditingTeamA.id = tie.idTeamA;
        this.edditingTeamA.position = tie.posTeamA;
        this.edditingTeamA.points = tie.totalA;
        this.edditingTeamA.name = tie.nomA;
        this.edditingTeamA.note = 'Desempate con el equipo ' + tie.idTeamB;
        this.teamService.updateTeam(this.edditingTeamA);

        this.edditingTeamB.id = tie.idTeamB;
        this.edditingTeamB.position = tie.posTeamB;
        this.edditingTeamB.points = tie.totalB;
        this.edditingTeamB.name = tie.nomB;
        this.edditingTeamB.note = 'Desempate con el equipo ' + tie.idTeamB;
        this.teamService.updateTeam(this.edditingTeamB);
      }
    }
  }
}

interface nameTeams {
  Team1: string;
  Team2: string;
}

interface Ties {
  idTeamA: string;
  idTeamB: string;
  posTeamA: number;
  posTeamB: number;
  nomA: string;
  nomB: string;
  totalA: number;
  totalB: number;
}
