import {Component, Input, OnInit} from '@angular/core';
import {EntryDTO} from '../DTO/entryDTO';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-openlayers-map-box-where',
  templateUrl: './openlayers-map-box-where.component.html',
  styleUrls: ['./openlayers-map-box-where.component.scss']
})
export class OpenlayersMapBoxWhereComponent {
  @Input() title: string;
  lat = 41.879336;
  lon = -2.654190;
  @Input() entry: EntryDTO;
  @Input() pageName: string;

  constructor(public authService: AuthService) { }

  public zoom = 15;
  public opacity = 1.0;
  public width = 5;

  increaseZoom() {
    this.zoom = Math.min(this.zoom + 1, 18);
    console.log('zoom: ', this.zoom);
  }

  decreaseZoom() {
    this.zoom = Math.max(this.zoom - 1, 1);
    console.log('zoom: ', this.zoom);
  }

  increaseOpacity() {
    this.opacity = Math.min(this.opacity + 0.1, 1);
    console.log('opacity: ', this.opacity);
  }

  decreaseOpacity() {
    this.opacity = Math.max(this.opacity - 0.1, 0);
    console.log('opacity: ', this.opacity);
  }
}
