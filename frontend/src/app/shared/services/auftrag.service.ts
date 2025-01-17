import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuftragService {
  private baseUrl = 'http://localhost:8080/api/auftraege'; // API-Endpoint des Backends

  constructor(private http: HttpClient) {}

  // Methode zum Speichern eines Auftrags
  createAuftrag(auftrag: any): Observable<any> {
    return this.http.post(this.baseUrl, auftrag);
  }
}
