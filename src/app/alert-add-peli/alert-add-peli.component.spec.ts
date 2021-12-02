import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAddPeliComponent } from './alert-add-peli.component';

describe('AlertAddPeliComponent', () => {
  let component: AlertAddPeliComponent;
  let fixture: ComponentFixture<AlertAddPeliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertAddPeliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertAddPeliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
