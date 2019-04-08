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
      .subscribe(facts => this.facts = facts.slice(1, 5));
  }
}
