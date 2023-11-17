export class Person {
  constructor(
    public name: string,
    public lastname: string,
    public age: number,
    public weigth: number,
    public height: number,
  ){  }

  calcIMC(): string {
    const result = Math.round(this.weigth/ (this.height * this.height));
    if( result < 0){
      return 'Not found';
    } else if(result >= 0 && result <= 18){
      return 'Down';
    } else if( result >= 19 && result <=24){
      return 'Normal';
    } else if( result >= 25 && result <= 26 ){
      return 'Overweigth';
    } else if( result >= 27 && result <= 29){
      return 'Overweigth level 1';
    } else if( result >=30 && result <= 39){
      return 'Overweigth level 2';
    } else if( result >= 40){
      return 'Overweigth level 3';
    } else {
      return 'Not ound';
    }
  }
}
