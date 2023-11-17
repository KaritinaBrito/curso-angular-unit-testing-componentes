import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/models/person.model';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    //Arrenge
    component.people = [
      new Person('Carolina', 'Suarez', 22, 55, 1.7 ),
      new Person('Lolita', 'Perez', 19, 50, 1.6 ),
      new Person('Juan', 'Barrera', 33, 50, 1.6 ),
    ];
    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    //Assert
    expect(debugElement.length).toEqual(3);
  });

  it('should raise selected event when clicked', () => {
    //Arrenge
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render selected event when clicked', () => {
    //Arrenge
    const buttonDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDebug = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDebug.nativeElement.textContent).toContain(component.selectedPerson?.name);
  })
});
