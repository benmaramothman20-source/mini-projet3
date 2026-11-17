
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Makeup } from '../model/makeup.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MakeupService } from '../services/makeup-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { type } from '../model/type.model';
import { TypeWrapper } from '../model/type-wrapper';
import { MakeupWrapper } from '../model/makeup-wrapper';

@Component({
  selector: 'app-update-makeup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-makeup.html',
  styles: ``
})
export class UpdateMakeup implements OnInit {

  currentMakeup = new Makeup();
  types: type[] = [];
  updatedTypeId!: number;

  constructor(
      private activatedRoute: ActivatedRoute,
  private makeupService: MakeupService,
  private router: Router,
  private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.makeupService.listeTypes().subscribe((res: TypeWrapper) => {
      this.types = res._embedded.types;
    });

    const id = Number(this.activatedRoute.snapshot.params['id']);

    this.makeupService.listeMakeup().subscribe((res: MakeupWrapper) => {
      const makeupTrouve = res._embedded.makeuppps.find(
        m => m.idMakeup == id
      );

      if (makeupTrouve) {
  this.currentMakeup = makeupTrouve;

  this.makeupService.consulterTypeMakeup(id).subscribe((t) => {
    this.currentMakeup.type = t;
    this.cdr.detectChanges();
    this.updatedTypeId = t.idType;
  });
}
    });
  }

  updateMakeup(): void {
  const selectedType = this.types.find(
    t => t.idType == this.updatedTypeId
  );

  if (selectedType && this.currentMakeup.idMakeup) {

    const makeupAEnvoyer = {
      nomMakeup: this.currentMakeup.nomMakeup,
      prix: this.currentMakeup.prix,
      dateCreation: this.currentMakeup.dateCreation
    };

    this.makeupService.updateMakeup(
      this.currentMakeup.idMakeup,
      makeupAEnvoyer
    ).subscribe({
      next: () => {

        this.makeupService.modifierTypeMakeup(
          this.currentMakeup.idMakeup!,
          selectedType.idType
        ).subscribe({
          next: () => {
            this.router.navigate(['makeup']);
          },
          error: (err) => {
            console.log(err);
          }
        });

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
  changerDate(date: string): void {
    if (date) {
      this.currentMakeup.dateCreation = new Date(date);
    }
  }
}
