import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongviewComponent } from './songview.component';

describe('SongviewComponent', () => {
  let component: SongviewComponent;
  let fixture: ComponentFixture<SongviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
