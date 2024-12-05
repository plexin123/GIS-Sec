import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSecurityComponent } from './student-security.component';

describe('StudentSecurityComponent', () => {
  let component: StudentSecurityComponent;
  let fixture: ComponentFixture<StudentSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
