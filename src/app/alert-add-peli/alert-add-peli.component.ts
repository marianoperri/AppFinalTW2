import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-add-peli',
  templateUrl: './alert-add-peli.component.html',
  styleUrls: ['./alert-add-peli.component.css']
})
export class AlertAddPeliComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data :any) { }

  ngOnInit(): void {
  }

}
