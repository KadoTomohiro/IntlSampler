import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFormatComponent } from './date-time-format.component';

describe('DateTimeFormatComponent', () => {
  let component: DateTimeFormatComponent;
  let fixture: ComponentFixture<DateTimeFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimeFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimeFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
