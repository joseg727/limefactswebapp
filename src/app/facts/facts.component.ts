import { Component, OnInit } from '@angular/core';
import { Fact } from '../facts';
import { FactService } from '../fact.service';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css']
})
export class FactsComponent implements OnInit {
  facts: Fact[];
  constructor(private factService: FactService) { }

  ngOnInit() {
    this.getFacts();
  }
  getFacts(): void {
    this.factService.getFacts() .subscribe(facts => this.facts = facts);
  }
  add(name: string): void {
   name = name.trim();
   if (!name) {return; }
   this.factService.addFact({ name } as Fact)
     .subscribe(fact => {this.facts.push(fact); });
  }
  delete(fact: Fact): void {
    this.facts = this.facts.filter(h => h !== fact);
    this.factService.deleteFact(fact).subscribe();
  }
}
