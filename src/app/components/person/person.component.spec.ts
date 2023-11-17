import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

    beforeEach(() => {
      fixture = TestBed.createComponent(PersonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Karen"', () => {
    component.person = new Person('Karen', '', 35, 60, 1.7);
    expect(component.person.name).toEqual('Karen');
  });

  it('should have <h3> with "hola, {person.name}"', () => {
    //Arrenge
    component.person = new Person('Valentina', 'Molina', 35, 60, 1.7);
    const expectMsg = `hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3:HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Asert
    expect(h3?.textContent).toEqual(expectMsg);
  });

  it('should have <p> with "mi altura es {{person.height}}"', () => {
    //Arrange
    component.person = new Person('Valentina', 'Molina', 35, 60, 1.7);
    const expectMsg = `mi altura es ${component.person.height}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const personElement:HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();
    //Asert
    expect(personElement?.textContent).toEqual(expectMsg);
  })

  it('should show display text with IMC when call calcIMC', () => {
    //Arrenge
    const expectMsg = 'Overweigth level 3'
    component.person = new Person('Valentina', 'Molina', 30, 120, 1.65);
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    //Act
    component.calcIMC();
    fixture.detectChanges();
    //Assert
    expect(button.textContent).toContain(expectMsg);
  })

  it('should show display text with IMC when do click', () => {
    //Arrenge
    const expectMsg = 'Overweigth level 3'
    component.person = new Person('Valentina', 'Molina', 30, 120, 1.65);
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;
    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(buttonElement.textContent).toContain(expectMsg);
  })

  it('should raise selected event when do click', () => {
    //Arrange
    const expectPerson= new Person('Valentina', 'Molina', 30, 120, 1.65);
    component.person = expectPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));

    let  selectedPerson: Person | undefined;
    component.onSelected
    .subscribe(person => {
      selectedPerson = person;
    })
    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert

    expect(selectedPerson).toEqual(expectPerson)
  })
});

@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})
class HostComponent {
  person = new Person('Santiago', 'Reyes', 20, 55, 1.5);
  selectedPerson: Person | undefined;

  onSelected(person: Person){
    this.selectedPerson = person
  }
}

describe('PersonCompoent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show display person name', () => {
    //Arrange
    const expectName = component.person.name;
    const h3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const h3Element = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3Element.textContent).toContain(expectName);
  });

  it('should raise selected event when clicked', () => {
    //Arrange
    const btnDebug = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    fixture.detectChanges();
    btnDebug.triggerEventHandler('click', null);
    //Assert
    expect(component.selectedPerson).toEqual(component.person);
  })
})
