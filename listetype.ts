
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { type as Type } from '../model/type.model';


import { CommonModule } from '@angular/common';
import { UpdateType } from '../update-type/update-type';
import { TypeService } from '../services/type';


@Component({
  imports: [CommonModule, UpdateType],
  selector: 'app-listetype',
  styles: ``,
  templateUrl: './listetype.html',
})
export class Listetype implements OnInit {

  types!: Type[];

  updatedType: Type = {idType: 0,nomType: ''};
  ajout: boolean = true;

  constructor(private typeService: TypeService,
  private cdr: ChangeDetectorRef) { }

  
ngOnInit(): void {
  this.typeService.listeType().subscribe((res: any) => {
    this.types = res._embedded.types;
    this.cdr.detectChanges();
  });
}

typeUpdated(t: Type): void {

  if (this.ajout) {

    this.typeService.ajouterType(t).subscribe(() => {
      this.typeService.listeType().subscribe((res: any) => {
        this.types = res._embedded.types;
      });

      this.updatedType = { idType: 0, nomType: '' };
    });

  } else {

    this.typeService.modifierType(t).subscribe(() => {
      this.typeService.listeType().subscribe((res: any) => {
        this.types = res._embedded.types;
      });

      this.updatedType = { idType: 0, nomType: '' };
      this.ajout = true;
    });

  }

}



  
updateType(t: Type): void {
  this.updatedType = t;
  this.ajout = false;
}

supprimerType(t: Type): void {

  if (confirm('Voulez-vous supprimer ce type ?')) {

    this.typeService.supprimerType(t.idType).subscribe(() => {

      this.typeService.listeType().subscribe((res: any) => {
        this.types = res._embedded.types;
      });

    });

  }

}


}
