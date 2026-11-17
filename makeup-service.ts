
import { Injectable } from '@angular/core';
import { Makeup } from '../model/makeup.model';
import { type } from '../model/type.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MakeupWrapper } from '../model/makeup-wrapper';
import { TypeWrapper } from '../model/type-wrapper';

@Injectable({
  providedIn: 'root'
})
export class MakeupService {

  apiURL = 'http://localhost:8090/makeup/makeups';
  apiURLType = 'http://localhost:8090/makeup/types';

  constructor(private http: HttpClient) {
    console.log("creation du service makeup !");
  }

  listeMakeup(): Observable<MakeupWrapper> {
    return this.http.get<MakeupWrapper>(this.apiURL);
  }

  listeTypes(): Observable<TypeWrapper> {
    return this.http.get<TypeWrapper>(this.apiURLType);
  }
ajouterMakeup(m: any): Observable<any> {
  return this.http.post(this.apiURL, m, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
supprimerMakeup(id: number): Observable<void> {
  return this.http.delete<void>(this.apiURL + '/' + id);
}

consulterType(id: number): Observable<type> {
  return this.http.get<type>(this.apiURLType + '/' + id);
}

updateMakeup(id: number, m: any): Observable<any> {
  return this.http.put(this.apiURL + '/' + id, m, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
consulterTypeMakeup(id: number): Observable<type> {
  return this.http.get<type>(this.apiURL + '/' + id + '/type');
}
modifierTypeMakeup(id: number, idType: number): Observable<any> {
  return this.http.put(
    this.apiURL + '/' + id + '/type',
    this.apiURLType + '/' + idType,
    {
      headers: {
        'Content-Type': 'text/uri-list'
      }
    }
  );
}
}
