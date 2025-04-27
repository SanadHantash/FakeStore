import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProdcutComponent } from './create-prodcut.component';

describe('CreateProdcutComponent', () => {
  let component: CreateProdcutComponent;
  let fixture: ComponentFixture<CreateProdcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProdcutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProdcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
