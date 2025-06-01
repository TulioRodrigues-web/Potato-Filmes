import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritadosPage } from './favoritados.page';

describe('FavoritadosPage', () => {
  let component: FavoritadosPage;
  let fixture: ComponentFixture<FavoritadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
