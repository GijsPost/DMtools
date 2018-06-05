import { Component, OnInit, Input } from '@angular/core';
import { Monster } from 'src/app/Models/Monster';
import { AbilityBonusCalculator } from '../../../Models/AbilityBonusCalculator';

@Component({
  selector: 'app-monster-card',
  templateUrl: './monster-card.component.html',
  styleUrls: ['./monster-card.component.scss']
})
export class MonsterCardComponent implements OnInit {

  @Input() monster: Monster;
  abc: AbilityBonusCalculator = new AbilityBonusCalculator;

  constructor() { }

  ngOnInit() {
  }

}
