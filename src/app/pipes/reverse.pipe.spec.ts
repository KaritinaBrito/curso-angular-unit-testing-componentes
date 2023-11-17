import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Host } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("roma")
    expect(rta).toEqual("amor");
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("1234")
    expect(rta).toEqual("4321");
  });

});

@Component({
  template: `
    <h5>{{'amor' | reverse}}</h5>
    <p>{{ text | reverse }}</p>
  <input [(ngModel)]="text" />

  `
})
class HostComponent {
  text = '';
}

describe('ReversePipe from HostComponent', () =>{
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, ReversePipe ],
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

  it('should the h5 be "roma"', () => {
    const h5Debug = fixture.debugElement.query(By.css('h5'));
    expect(h5Debug.nativeElement.textContent).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDebug = fixture.debugElement.query(By.css('input'));
    const inputEle: HTMLInputElement = inputDebug.nativeElement;
    const pDebug = fixture.debugElement.query(By.css('p'));

    expect(pDebug.nativeElement.textContent).toEqual('');

    inputEle.value = 'Ana 2';
    inputEle.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDebug.nativeElement.textContent).toEqual('2 anA');
  });

});
