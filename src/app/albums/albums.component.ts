import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  trigger, 
  style, 
  transition, 
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-15px)'}),
          stagger('50ms',
          animate('550ms ease-out',
          style({opacity:1, transform: 'translateY(0px)'})))
        ], {optional: true}),

        query(':leave', [
          animate('550ms',
          style({opacity:0}))
        ], {optional: true})
      ])
    ])
  ]
})

export class AlbumsComponent implements OnInit {

  photos$: Object;

  constructor(private data: DataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.data.getAlbums().subscribe(
      data => this.photos$ = data
    )
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
}
