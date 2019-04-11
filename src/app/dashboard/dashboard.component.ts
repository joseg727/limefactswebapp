import { Component, OnInit } from '@angular/core';
import { Fact } from '../facts';
import { FactService } from '../fact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  facts: Fact[] = [];

  constructor(private factService: FactService) { }

  ngOnInit() {
    this.getFacts();
  }

  getFacts(): void {
    this.factService.getFacts()
          //is displaying new fact at end of list instead of top
      .subscribe(facts => this.facts = facts.slice(facts.length-4, facts.length).reverse());
  }

  add(user: string, content: string): void {
    user = user.trim();
    content = content.trim();
    if (!user || !content) {return; }
    this.factService.addFact({ user, content } as Fact)
      .subscribe(fact => {
        this.facts.pop();
        this.facts.reverse();
        this.facts.push(fact);
        this.facts.reverse(); 
      });
  }
}
