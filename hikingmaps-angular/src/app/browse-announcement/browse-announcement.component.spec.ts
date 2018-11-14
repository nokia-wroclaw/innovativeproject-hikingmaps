import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseAnnouncementComponent } from './browse-announcement.component';

describe('BrowseAnnouncementComponent', () => {
  let component: BrowseAnnouncementComponent;
  let fixture: ComponentFixture<BrowseAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
