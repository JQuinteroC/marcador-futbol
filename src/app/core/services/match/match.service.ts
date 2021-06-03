import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Match } from '../../../models/match.model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  matchesCollection: AngularFirestoreCollection<Match>;
  matches: Observable<Match[]>;
  matchDoc: AngularFirestoreDocument<Match>;

  constructor(public db: AngularFirestore) {
    this.matchesCollection = this.db.collection('matches');
    this.matches = this.matchesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Match;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    this.matchDoc = this.db.doc(`matches/0`);
  }

  getMatches() {
    return this.matches;
  }

  updateMatch(match: Match) {
    this.matchDoc = this.db.doc(`matches/${match.id}`);
    this.matchDoc.update(match);
  }
}
