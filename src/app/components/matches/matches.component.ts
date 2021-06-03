import { Component, OnInit, Input } from '@angular/core';

import { MatchService } from '../../services/match.service';

import { Match } from '../../models/match.model';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];

  constructor(public matchService: MatchService) {}

  ngOnInit(): void {
    this.matchService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });
  }
}