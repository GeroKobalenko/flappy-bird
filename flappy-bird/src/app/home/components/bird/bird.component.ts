import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss'],
})
export class BirdComponent  implements OnInit {

  @Input() height!: number;
  @Input() width!: number;
  @Input() top!: number;

  constructor() { }

  ngOnInit() {}

}
