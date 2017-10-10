class Users {
    constructor(){
        this.usersArray = [];
    }

    addUser(id, name, room){
        var user = {id, name, room};
        this.usersArray.push(user);
        return user;
    }

    removeUser(id){
        var index = this.usersArray.findIndex((u)=>u.id === id);
        if(index === -1){
            return;
        }        
        var users = this.usersArray.splice(index, 1);
        if(users.length > 0)
        {
            return users[0];
        }

    }

    getUser(id){
        return this.usersArray.find((u)=>u.id === id);
    }

    getAllUsers(room){
        var users = this.usersArray.filter((user)=> user.room === room);
        var roomUsers = users.map((user) => user.name);

        return roomUsers;
    }
}

module.exports = {Users};