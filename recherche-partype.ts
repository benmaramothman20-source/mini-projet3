
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Makeup } from '../model/makeup.model';
import { type } from '../model/type.model';
import { TypeWrapper } from '../model/type-wrapper';
import { MakeupWrapper } from '../model/makeup-wrapper';
import { MakeupService } from '../services/makeup-service';

@Component({
  selector: 'app-recherche-partype',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-partype.html',
  styles: ``
})
export class RecherchePartype implements OnInit {

  makeups: Makeup[] = [];
  allMakeups: Makeup[] = [];
  idType!: number;
  types: type[] = [];

  constructor(private makeupService: MakeupService,
  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

  this.makeupService.listeTypes().subscribe((res: TypeWrapper) => {
    this.types = res._embedded.types;
  });

  this.makeupService.listeMakeup().subscribe((res: MakeupWrapper) => {

    this.allMakeups = res._embedded.makeuppps;

    this.allMakeups.forEach((m) => {

      if (m.idMakeup) {
        this.makeupService.consulterTypeMakeup(m.idMakeup)
          .subscribe((t) => {
            m.type = t;
            this.cdr.detectChanges();
          });
      }

    });

  });
}
  onChange(): void {
    this.makeups = this.allMakeups.filter(
      makeup => makeup.type?.idType == this.idType
    );
  }
}
