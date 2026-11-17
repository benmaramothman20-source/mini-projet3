import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { type } from '../model/type.model';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-update-type',
  styles: ``,
  templateUrl: './update-type.html',
})
export class UpdateType implements OnInit{
  @Input()
  typ!: type;
   @Input()
  types!: type[];
  @Input()
ajout!: boolean;
  @Output()
  typeUpdated = new EventEmitter<type>();
  constructor(private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
     console.log("ngOnInit du composant UpdateType ", this.typ);
     console.log("Liste des types :", this.types);
    
  }
 saveType(): void {

  if (this.typ.nomType.trim() == '') {
    alert('Veuillez saisir le nom du type');
    return;
  }

  this.typeUpdated.emit(this.typ);
}
ngOnChanges(): void {
  this.cdr.detectChanges();
}

  

  updatedType: type = {idType: 0, nomType: ''};

}
