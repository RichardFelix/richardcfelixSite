(()=>{
  class Person{
    constructor(name){
      this.name = name;
    }
    getName(){
      return this.name;
    }
  }

  const me = new Person('John');
  console.log(me.getName());
});
