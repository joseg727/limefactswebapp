import { Component, OnInit, Input } from '@angular/core';
import { Fact } from '../facts';
import { FactService } from '../fact.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fact-detail',
  templateUrl: './fact-detail.component.html',
  styleUrls: ['./fact-detail.component.css']
})
export class FactDetailComponent implements OnInit {
  @Input() fact: Fact;
  constructor(
    private route: ActivatedRoute,
    private factService: FactService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.getFact();
  }
  getFact(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.factService.getFact(id)
      .subscribe(fact => this.fact = fact);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.factService.updateFact(this.fact)
      .subscribe(() => this.goBack());
  }

}
