import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreProjects } from './more-projects';

describe('MoreProjects', () => {
  let component: MoreProjects;
  let fixture: ComponentFixture<MoreProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreProjects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
