const expect = require('expect');

const {Users} = require('./users');

var seedUsers;
var users;

beforeEach(()=>{
    
    seedUsers = [
        {id: '1',name:'User 1',room:'room 1'},
        {id: '2',name:'User 2',room:'room 2'},
        {id: '3',name:'User 3',room:'room 1'}
    ];
    users = new Users();
    seedUsers.forEach(function(element) {
        users.addUser(element.id, element.name, element.room);   
    });
});

describe('Users tests', ()=>{
    it('should add a new user', ()=>{
        var user = {id:'123', name:'Nadeem', room:'Golden Room'};        

        var result = users.addUser(user.id, user.name, user.room);
        expect(users.usersArray.length).toBe(4);        
        expect(result.id).toBe(user.id);
        expect(result.name).toBe(user.name);
        expect(result.room).toBe(user.room);

    });

    it('should remove a user', ()=>{
        
        var u1 = users.removeUser(seedUsers[0].id);
        expect(u1.id).toBe(seedUsers[0].id);
        expect(users.usersArray.length).toBe(2);

    });

    it('should not remove a user', ()=>{
        
        var u1 = users.removeUser('4');
        expect(u1).toNotExist();
        expect(users.usersArray.length).toBe(3); 
    });

    it('should find a user', ()=>{
        
        var u1 = users.getUser(seedUsers[0].id);
        expect(u1.id).toBe(seedUsers[0].id);
        expect(users.usersArray.length).toBe(3); 
    });

    it('should not find a user', ()=>{
        
        var u1 = users.getUser('4');
        expect(u1).toNotExist();
        expect(users.usersArray.length).toBe(3); 
    });

    it('should return name of all users of room one', ()=>{
        
        var r1U = users.getAllUsers(seedUsers[0].room);
        expect(r1U).toEqual([seedUsers[0].name, seedUsers[2].name]);
        expect(r1U).toNotEqual([seedUsers[1].name]);
        expect(r1U).toNotEqual([seedUsers[1].name, seedUsers[2].name]);
        expect(r1U).toNotEqual([seedUsers[0].name, seedUsers[1].name]);
        expect(r1U).toNotEqual(seedUsers.map((u) => u.name));
    });

    it('should return name of all users of room two', ()=>{
        
        var r1U = users.getAllUsers(seedUsers[1].room);
        expect(r1U).toEqual([seedUsers[1].name]);
        expect(r1U).toNotEqual([seedUsers[0].name, seedUsers[2].name]);
        expect(r1U).toNotEqual([seedUsers[1].name, seedUsers[2].name]);
        expect(r1U).toNotEqual([seedUsers[0].name, seedUsers[1].name]);
    });
});