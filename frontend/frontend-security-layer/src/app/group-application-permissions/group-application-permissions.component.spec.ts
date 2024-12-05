import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupApplicationPermissionsComponent } from './group-application-permissions.component';

describe('GroupApplicationPermissionsComponent', () => {
  let component: GroupApplicationPermissionsComponent;
  let fixture: ComponentFixture<GroupApplicationPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupApplicationPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupApplicationPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
