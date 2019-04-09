import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Fact } from './facts';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const facts = [
      { id: 11, user: 'Mr. Nice'  , content: 'fact11' },
      { id: 12, user: 'Narco'  , content: 'fact12' },
      { id: 13, user: 'Bombasto'  , content: 'fact13' },
      { id: 14, user: 'Celeritas'  , content: 'fact14' },
      { id: 15, user: 'Magneta'  , content: 'fact15' },
      { id: 16, user: 'RubberMan'  , content: 'fact16' },
      { id: 17, user: 'Dynama'  , content: 'fact17' },
      { id: 18, user: 'Dr IQ'  , content: 'fact18' },
      { id: 19, user: 'Magma'  , content: 'fact19' },
      { id: 20, user: 'Tornado'  , content: 'fact20' }
    ];
    return {facts};
  }

  genId(facts: Fact[]): number {
    return facts.length > 0 ? Math.max(...facts.map(fact => fact.id)) + 1 : 11;
  }
}
