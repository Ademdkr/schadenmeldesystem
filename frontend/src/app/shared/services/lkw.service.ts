import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lkw} from '../models/lkw.model';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LkwService {

  constructor(private http: HttpClient) {
  }

  // Methode zur Fahrzeugabfrage
  getVehicleByKennzeichen(kennzeichen: string): Observable<Lkw> {
    return this.http.get<Lkw>(`${environment.apiBaseUrl}/lkw/kennzeichen/${kennzeichen}`);
  }
}
