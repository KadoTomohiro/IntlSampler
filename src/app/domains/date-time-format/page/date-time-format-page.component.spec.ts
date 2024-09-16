import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFormatPageComponent } from './date-time-format-page.component';

describe('DateTimeFormatPageComponent', () => {
  let component: DateTimeFormatPageComponent;
  let fixture: ComponentFixture<DateTimeFormatPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeFormatPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeFormatPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
