// let user = {
//     name : 'Avneesh',
//     age : [3,4,5,3]
// }

// console.log(user.toString());

// function Person(name, age) {
//     const person = {
//         name: name,
//         age: age,
//         talk() {
//             console.log(`Hi, my name is ${this.name}`)
//         }
//     }
//     return person;
// }
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age
    }
    talk() {
        console.log(`Hi I'm ${this.name}`);
    }
}
class student extends Person{
    constructor(name,age,marks){
        super(name,age);
        this.marks = marks;
    }
}

let stu = new student('avi',20,95)

// let p1 = Person('Avneesh', 20);
// let p2 = Person('kashish', 25);

// console.log(p1.talk === p2.talk);