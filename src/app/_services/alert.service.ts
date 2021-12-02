import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AlertAddPeliComponent } from '../alert-add-peli/alert-add-peli.component';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  openAlert(msg : string){
    this.dialog.open(AlertDialogComponent,{
      width: '390px',
      disableClose: true,
      data: {
        mensaje: msg
      }
    });
}
openAlertPeli(msg : string){
  this.dialog.open(AlertAddPeliComponent,{
    width: '390px',
    disableClose: true,
    data: {
      mensaje: msg
    }
  });
}
}
