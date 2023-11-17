import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Host } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title" highligth>default</h5>
    <h5 highligth="yellow">Yellow</h5>
    <p highligth="pink">parrafo</p>
    <p>Otro parrafo</p>
  <input [(ngModel)]="color" [highligth]="color" />

  `
})
class HostComponent {
  color = 'pink';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ],
      imports: [ FormsModule ]
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

  it('should have three hgihligth elements', () =>{
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highligth])'));
    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements be match with bgColor', () =>{
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('pink');
  });


  it('should the h5.title be default color', () =>{
    const titleDebug = fixture.debugElement.query(By.css('.title'));
    const dir = titleDebug.injector.get(HighligthDirective);
    expect(titleDebug.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  });

  it('should binding <input> and change bgColor', () => {
  const inputDebug = fixture.debugElement.query(By.css('input'));
  const inputElem: HTMLInputElement = inputDebug.nativeElement;

  expect(inputElem.style.backgroundColor).toEqual('pink');

  inputElem.value = 'red';
  inputElem.dispatchEvent(new Event('input'));
  fixture.detectChanges();

  expect(inputElem.style.backgroundColor).toEqual('red');
  expect(component.color).toEqual('red');
  })
});
