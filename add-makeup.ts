
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Makeup } from '../model/makeup.model';
import { type } from '../model/type.model';
import { TypeWrapper } from '../model/type-wrapper';
import { MakeupService } from '../services/makeup-service';

@Component({
  selector: 'app-add-makeup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-makeup.html'
})
export class AddMakeup implements OnInit {

  newMakeup = new Makeup();
  types!: type[];
  newIdType!: number;
  message: string = '';

  constructor(
    private makeupService: MakeupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.makeupService.listeTypes().subscribe((res: TypeWrapper) => {
      this.types = res._embedded.types;
    });
  }

addMakeup() {
  const selectedType = this.types.find(
    t => t.idType == this.newIdType
  );

  if (selectedType) {

    const makeupAEnvoyer = {
      nomMakeup: this.newMakeup.nomMakeup,
      prix: this.newMakeup.prix,
      dateCreation: this.newMakeup.dateCreation,
      type: this.makeupService.apiURLType + '/' + selectedType.idType
    };

    this.makeupService.ajouterMakeup(makeupAEnvoyer).subscribe({
      next: () => {
        this.router.navigate(['makeup']);
      },
      error: (err) => {
        console.log(err);
        this.message = "Erreur lors de l'ajout du Makeup !";
      }
    });

  } else {
    this.message = "Veuillez choisir un type !";
  }
}
}
