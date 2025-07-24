import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreButton } from './more-button';

describe('MoreButton', () => {
  let component: MoreButton;
  let fixture: ComponentFixture<MoreButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
