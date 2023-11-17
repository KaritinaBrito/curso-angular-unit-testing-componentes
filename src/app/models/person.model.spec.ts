import { Person } from "./person.model";

describe('Tests for class Person', () => {
  let person: Person;
  beforeEach(()=> {
    person = new Person('Karen', 'Brito', 34, 67, 1.75);
  })

  it('attrs', ()=>{
    expect(person.name).toEqual('Karen');
    expect(person.lastname).toEqual('Brito');
    expect(person.age).toEqual(34);
    expect(person.weigth).toEqual(67);
    expect(person.height).toEqual(1.75);
  });

  describe('tests for calcIMC', () => {
    it('should return a string: down', () => {
      //Arrange
      person.weigth = 40;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Down');
    });

    it('should return a string: Normal', () => {
      //Arrange
      person.weigth = 58;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Normal');
    });

    it('should return a string: Overweigth', () => {
      //Arrange
      person.weigth = 68;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweigth');
    });

    it('should return a string: Overweigth level 1', () => {
      //Arrange
      person.weigth = 75;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweigth level 1');
    });

    it('should return a string: Overweigth level 2', () => {
      //Arrange
      person.weigth = 90;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweigth level 2');
    });

    it('should return a string: Overweigth level 3', () => {
      //Arrange
      person.weigth = 120;
      person.height = 1.65;
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('Overweigth level 3');
    });


    it('should return a string: Not found', () => {
      //Arrange
      person.weigth = -98;
      expect(person.calcIMC()).toEqual('Not found');

      //Act
      person.weigth = -98;
      person.weigth = -1.98;
            //Assert
      expect(person.calcIMC()).toEqual('Not found');
    });

  })
})
