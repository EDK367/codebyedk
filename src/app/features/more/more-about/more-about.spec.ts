import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAbout } from './more-about';

describe('MoreAbout', () => {
  let component: MoreAbout;
  let fixture: ComponentFixture<MoreAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
