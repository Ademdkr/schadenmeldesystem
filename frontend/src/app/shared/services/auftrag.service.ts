import {Injectable} from '@angular/core';
import {Auftrag} from '../models/auftrag.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuftragService {

  private baseUrl = 'http://localhost:8080/api/auftraege'; // Backend-URL
  constructor(private http: HttpClient) {
  }

  // Methode zum Speichern eines Auftrags
  createAuftrag(auftrag: any): Observable<any> {
    return this.http.post(this.baseUrl, auftrag);
  }

  getAuftraegeByStatus(status: string): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(`${this.baseUrl}/${status}`);
  }

  getAuftragById(auftragId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${auftragId}`);
  }

  updateAuftragStatus(id: number, body: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/status`, body); // Base-URL verwenden
  }

  updateAuftragAbgabeBestaetigt(id: number, body: { abgabeBestaetigt: boolean }) {
    return this.http.patch(`${this.baseUrl}/${id}/abgabe-bestaetigen`, body);
  }
}
