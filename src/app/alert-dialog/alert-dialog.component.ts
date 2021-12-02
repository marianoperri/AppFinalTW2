import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data :any,
    private route : Router,
    public dialogRef: MatDialogRef<AlertDialogComponent>) { }

  ngOnInit(): void {
  }
  closeDialog(){
    localStorage.setItem('pedido', '[]');
    this.dialogRef.close();
    this.route.navigate(['/inicio']);
  }
}
