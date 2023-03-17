import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsongComponent } from './searchsong.component';

describe('SearchsongComponent', () => {
  let component: SearchsongComponent;
  let fixture: ComponentFixture<SearchsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchsongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
