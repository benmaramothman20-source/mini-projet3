
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeWrapper } from '../model/type-wrapper';
import { type } from '../model/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  apiURL = 'http://localhost:8090/makeup/types';

  constructor(private http: HttpClient) { }
  listeType(): Observable<TypeWrapper> {
  return this.http.get<TypeWrapper>(this.apiURL);
}

  

ajouterType(t: type): Observable<any> {
  return this.http.post<any>(this.apiURL, {
    nomType: t.nomType
  });
}

modifierType(t: type): Observable<any> {
  return this.http.put<any>(
    this.apiURL + '/' + t.idType,
    { nomType: t.nomType }
  );
}

supprimerType(id: number): Observable<any> {
  return this.http.delete<any>(this.apiURL + '/' + id);
}


}
