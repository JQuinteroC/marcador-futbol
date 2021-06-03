import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';

import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teamsCollection: AngularFirestoreCollection<Team>;
  teams: Observable<Team[]>;
  teamDoc: AngularFirestoreDocument<Team>;

  constructor(public db: AngularFirestore) {
    this.teamsCollection = this.db.collection('teams');
    this.teams = this.teamsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Team;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.teamDoc = this.db.doc(`teams/0`);
  }

  getTeams() {
    return this.teams;
  }

  updateTeam(team: Team) {
    this.teamDoc = this.db.doc(`teams/${team.id}`);
    this.teamDoc.update(team);
  }
}
