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

  createAuftrag(auftrag: any): Observable<any> {
    return this.http.post(this.baseUrl, auftrag);
  }

  getAuftraegeByStatus(status: string): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(`${this.baseUrl}/status/${status}`);
  }

  getAuftragById(auftragId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${auftragId}`);
  }

  updateAuftrag(id: number, updates: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, updates);
  }
}
