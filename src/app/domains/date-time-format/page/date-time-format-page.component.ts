import {Component, computed, model} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";

type DateTimeForm = {
  date: string | null,
  time: string | null
}

type LocaleFormValue = {
  locale: string | null
  numberingSystem: string | null
  calendar: string | null
  hourCycle: string | null
}

type LocaleFormGroup = {[key in keyof LocaleFormValue]: FormControl<LocaleFormValue[key]> }

@Component({
  selector: 'app-date-time-format-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    FormsModule
  ],
  templateUrl: './date-time-format-page.component.html',
  styleUrl: './date-time-format-page.component.css'
})
export class DateTimeFormatPageComponent {

  dateTimeModel = model<DateTimeForm>({
    date: null,
    time: null
  })
  dateTime = computed(() => {
    const {date, time} = this.dateTimeModel()
    return new Date(`${date}T${time ?? `00:00:00`}.000Z`)
  })
  localeModel = model<LocaleFormValue>({
    locale: 'ja-JP',
    numberingSystem: null,
    calendar: null,
    hourCycle: null
  })
  localeString = computed(() => this.convertLocaleString(this.localeModel()))
  formatted = computed(() => {
    const dateTime = this.dateTime()
    if (dateTime.toString() === 'Invalid Date') return ''
    const formatter = new Intl.DateTimeFormat(this.localeString())
    return formatter.format(this.dateTime())
  })

  numberingSystemOptions = ["arab", "arabext", "bali", "beng", "deva", "fullwide", "gujr", "guru", "hanidec", "khmr", "knda", "laoo", "latn", "limb", "mlym", "mong", "mymr", "orya", "tamldec", "telu", "thai", "tibt"]
  calendarOptions = ["buddhist", "chinese", "coptic", "ethiopia", "ethiopic", "gregory", "hebrew", "indian", "islamic", "iso8601", "japanese", "persian", "roc"]
  hourCycleOptions = ["h11", "h12", "h23", "h24"]

  constructor() {}

  private convertLocaleString(value: Partial<LocaleFormValue>) {
    const {locale, numberingSystem, calendar, hourCycle} = value
    const unicodeExtensions: string[] = []
    if (numberingSystem) {
      unicodeExtensions.push(`nu-${numberingSystem}`)
    }
    if (calendar) {
      unicodeExtensions.push(`ca-${calendar}`)
    }
    if (hourCycle) {
      unicodeExtensions.push(`hc-${hourCycle}`)
    }
    return `${locale}${unicodeExtensions.length ? `-u-${unicodeExtensions.join('-')}` : ''}`;
  }

  setNow(): void {
    const now = new Date()
    this.dateTimeModel.set({
      date: this.getDate(now),
      time: this.getTime(now)
    })
  }

  format() {

  }

  private getDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  private getTime(date: Date): string {
    return date.toISOString().split('T')[1].split('.')[0]
  }
}
