import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teamsCollection = 0;
  teams: Observable<any[]>;
  teamDoc = 0;

  constructor(public db: AngularFirestore) {
    this.teams = this.db.collection('teams').valueChanges();
  }

  getTeams() {
    return this.teams;
  }
}
