import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  pure: true, // Pipes sind standardmäßig "pure", um die Performance zu verbessern.
  standalone: false
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | undefined | null, format: 'date' | 'datetime'): string | undefined {
    if (!value) {
      return undefined;
    }

    const options: Intl.DateTimeFormatOptions =
      format === 'datetime'
        ? { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }
        : { year: 'numeric', month: '2-digit', day: '2-digit' };

    return new Date(value).toLocaleString('de-DE', options);
  }
}
