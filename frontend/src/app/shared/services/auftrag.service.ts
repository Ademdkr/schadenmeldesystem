import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Auftrag} from '../models/auftrag.model';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuftragService {
  private baseUrl = `${environment.apiBaseUrl}/auftraege`;

  constructor(private http: HttpClient) {
  }

  /** Erzeugt einen neuen Auftrag und liefert ihn in voller Typisierung zurück */
  createAuftrag(auftrag: Auftrag): Observable<Auftrag> {
    return this.http.post<Auftrag>(this.baseUrl, auftrag);
  }

  /** Liefert alle Aufträge mit dem gegebenen Status */
  getAuftraegeByStatus(status: string): Observable<Auftrag[]> {
    return this.http.get<Auftrag[]>(`${this.baseUrl}/status/${status}`);
  }

  /** Liefert einen einzelnen Auftrag nach ID */
  getAuftragById(auftragId: number): Observable<Auftrag> {
    return this.http.get<Auftrag>(`${this.baseUrl}/${auftragId}`);
  }

  /**
   * Aktualisiert die angegebenen Felder eines Auftrags.
   * `updates` darf ein Teilobjekt von Auftrag sein.
   */
  updateAuftrag(id: number, updates: Partial<Auftrag>): Observable<Auftrag> {
    return this.http.patch<Auftrag>(`${this.baseUrl}/${id}`, updates);
  }
}
