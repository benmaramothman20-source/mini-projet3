import { ChangeDetectorRef, Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Makeup } from '../model/makeup.model';
import { MakeupService } from '../services/makeup-service';
import { Auth } from '../services/auth';
import { MakeupWrapper } from '../model/makeup-wrapper';

@Component({
  selector: 'app-makeup',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './makeup.html',
})
export class MakeupComponent implements OnInit {
  public auth = inject(Auth);

  makeups: Makeup[] = [];

  constructor(  private makeupService: MakeupService,
  public authService: Auth,
  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chargerMakeups();
  }

chargerMakeups() {
  this.makeupService.listeMakeup().subscribe((res) => {

    this.makeups = res._embedded.makeuppps;
    this.cdr.detectChanges();

    this.makeups.forEach((m) => {
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

 supprimerMakeup(m: Makeup) {
  let conf = confirm("Etes-vous sûr de supprimer ce makeup ?");

  if (conf && m.idMakeup !== undefined) {
    this.makeupService.supprimerMakeup(m.idMakeup).subscribe(() => {
      this.chargerMakeups();
    });
  }
}
}