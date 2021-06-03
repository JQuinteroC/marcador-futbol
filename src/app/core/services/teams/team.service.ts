import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Team } from '../../../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  teamsCollection: AngularFirestoreCollection<Team>;
  teams: Observable<Team[]>;
  teamDoc: AngularFirestoreDocument<Team>;

  constructor(public db: AngularFirestore) {
    this.teamsCollection = this.db.collection('Team');
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
    this.getTeamsNormal();
    return this.teams;
  }

  private getTeamsNormal() {
    //  this.teamsCollection = this.db.collection('Team');
    this.teamsCollection = this.db.collection<Team>('teams', (ref) => ref);
    this.teams = this.teamsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Team;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getteamsByOrder(filter: string) {
    this.getTeamsOrderBy(filter);
    return this.teams;
  }

  private getTeamsOrderBy(filter: string) {
    this.teamsCollection = this.db.collection<Team>('teams', (ref) =>
      ref.orderBy(filter)
    );
    this.teams = this.teamsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Team;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  updateTeam(team: Team) {
    this.teamDoc = this.db.doc(`teams/${team.id}`);
    this.teamDoc.update({
      name: team.name,
      position: team.position,
      points: team.points,
      note: team.note,
    });
  }
}
