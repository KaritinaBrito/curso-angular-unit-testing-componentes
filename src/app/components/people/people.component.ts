import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  person: Person = new Person('Nicolas', 'Molina', 30, 70, 1.7 );
  people: Person[] = [
    new Person('Carolina', 'Suarez', 22, 55, 1.7 ),
    new Person('Lolita', 'Perez', 19, 50, 1.6 ),
  ];
  selectedPerson: Person | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  choose(person: Person){
    this.selectedPerson = person;
  }

}
