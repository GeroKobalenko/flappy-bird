import { Component, OnInit, Input } from '@angular/core';
import { Bird } from 'src/app/models/bird';

@Component({
  selector: 'bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent  implements OnInit {

  @Input() bird: Bird = new Bird();

  constructor() { }

  ngOnInit() {}

}
