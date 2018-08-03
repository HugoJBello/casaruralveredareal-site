import { Component, OnInit, Input} from '@angular/core';
import {EntryDTO} from '../DTO/entryDTO';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() entry: EntryDTO;
  @Input() title: string;
  @Input() pageName: string;
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
