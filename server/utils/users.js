
//ES6 class Learning
/* class Person {
    //constructor is a reseved name and this function gets called automatically
    constructor(name, room){
        this.name = name;
        this.room = room;
    }
    //defining custom method
    getUserDescription (){
        return `${this.name} is at Room ${this.room}.`;
    }

}

var me = new Person('Wilfred', "A");
var desc = me.getUserDescription();
console.log(`Name: ${me.name} | Room: ${me.room}`);
console.log(desc); */

[{
    id: 'sdssadsadsad',
    name: "Wilfred",
    room: "ABC"
}]


class Users{
    constructor(){
        this.users = []; //this is the empty array that will be filled.
    }
    addUser(id, name,room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        //return user that was removed
       var user = this.getUser(id);
       if(user){
           this.users = this.users.filter((user) => user.id !== id);
       }
       return user;
    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {Users};