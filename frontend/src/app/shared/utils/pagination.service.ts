import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  /**
   * Füllt die Tabelle mit Platzhalterzeilen auf und hängt den Paginator an.
   */
  initializeTable<T>(
    dataSource: MatTableDataSource<T>,
    paginator: MatPaginator,
    placeholderRowCount = 10
  ): void {
    paginator.pageSize = placeholderRowCount;

    // Aktuelle Daten kopieren
    const filledData: T[] = [...dataSource.data];
    if (filledData.length === 0) {
      // Wenn noch nichts da ist, einfach Paginator setzen und beenden
      dataSource.paginator = paginator;
      return;
    }

    // Ein Platzhalter-Objekt basierend auf der ersten Zeile erstellen
    const placeholder = this.createPlaceholderRow(filledData[0]);

    // Solange auffüllen, bis wir die gewünschte Zeilenanzahl haben
    while (filledData.length < placeholderRowCount) {
      filledData.push(placeholder);
    }

    dataSource.data = filledData;
    dataSource.paginator = paginator;
  }

  /**
   * Erzeugt aus einer echten Zeile eine Platzhalter-Zeile,
   * indem alle Felder auf null gesetzt werden.
   */
  private createPlaceholderRow<T>(firstRow: T): T {
    // Wir casten zuerst in eine Map von string→unknown, um Feldzugriffe zu
    // erlauben, ohne `any` zu verwenden.
    const placeholderMap = {
      ...(firstRow as unknown as Record<string, unknown>),
    };

    Object.keys(placeholderMap).forEach((key) => {
      placeholderMap[key] = null;
    });

    // Zurückcasten auf T – muss akzeptieren, dass hier null drinsteht
    return placeholderMap as unknown as T;
  }
}
