import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
	public autor: any = {nombre:'José', apellido: 'Eras'};

  constructor() { }

  ngOnInit() {
  }

}
