
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Makeup } from '../model/makeup.model';
import { MakeupService } from '../services/makeup-service';
import { MakeupWrapper } from '../model/makeup-wrapper';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
  styles: ``
})
export class RechercheParNom implements OnInit {

  nomMakeup!: string;
  makeups: Makeup[] = [];
  searchTerm!: string;

  constructor(private makeupService: MakeupService) {}

  ngOnInit(): void {
    this.makeupService.listeMakeup().subscribe((res: MakeupWrapper) => {
      console.log(res);
      this.makeups = res._embedded.makeuppps;
    });
  }

  rechercherMakeups() {
    if (this.nomMakeup && this.nomMakeup.trim() !== '') {
      const nom = this.nomMakeup.toLowerCase();

      this.makeupService.listeMakeup().subscribe((res: MakeupWrapper) => {
        this.makeups = res._embedded.makeuppps.filter(m =>
          m.nomMakeup.toLowerCase().includes(nom)
        );
      });
    } else {
      this.makeupService.listeMakeup().subscribe((res: MakeupWrapper) => {
        this.makeups = res._embedded.makeuppps;
      });
    }
  }
}
