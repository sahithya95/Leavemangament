import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  constructor(public auth:ApiService) {}

  ngOnInit() {
    
  }
  ngOnDestroy(): void {
  
 }
  menuClick() {
   // document.getElementById('main-panel').style.marginRight = '260px';
  }
}
