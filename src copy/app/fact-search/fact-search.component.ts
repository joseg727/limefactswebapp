import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Fact} from '../facts';
import { FactService } from '../fact.service';


@Component({
  selector: 'app-fact-search',
  templateUrl: './fact-search.component.html',
  styleUrls: ['./fact-search.component.css']
})
export class FactSearchComponent implements OnInit {
  facts$: Observable<Fact[]>;
  private searchTerm = new Subject<string>();
  constructor(private factService: FactService) { }
  search(term: string): void {
    this.searchTerm.next(term);
  }
  ngOnInit(): void {
    this.facts$ = this.searchTerm.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.factService.searchFacts(term)),
    );
  }

}
