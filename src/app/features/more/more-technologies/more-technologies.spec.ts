import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreTechnologies } from './more-technologies';

describe('MoreTechnologies', () => {
  let component: MoreTechnologies;
  let fixture: ComponentFixture<MoreTechnologies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreTechnologies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreTechnologies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
