// src/app/shared/utils/date-format.pipe.ts
import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
  transform(
    value: string | Date | null | undefined,
    format: string = 'short',
    locale: string = 'de-DE'
  ): string | null {
    if (value == null) {
      return null;
    }
    const date = typeof value === 'string' ? new Date(value) : value;
    return formatDate(date, format, locale);
  }
}
