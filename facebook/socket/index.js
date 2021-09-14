const io = require("socket.io")(8900,
    {
        cors: {
            origin: "http://localhost:3000",
        },
    });

let users = [ ]
var count = 0


const addUser = (userid, socketid)=>{
    !users.some((user)=> user.userid === userid) &&
        users.push({userid, socketid})
}

const removeUser = (socketid)=>{
    users = users.filter(user=>user.socketid !== socketid)
}

const getUser = (userid)=>{
    return users.find((user)=> user.userid === userid);
}

io.on("connection", (socket)=>{
    console.log("a user is connected")
    //io.emit("welcome", "hello this is socket")

    socket.on("addUser", userid=>{
        console.log("user is added",userid,socket.id)
        addUser(userid,socket.id);
        //io.emit("getUsers", users)
        console.log("users array ", users)
    })
    
    socket.on("sendMessage", ({id, senderid, recieverid, text})=>{
        console.log(senderid, recieverid, text )
        const user = getUser(recieverid)
        console.log("user",user)    
        io.to(user?.socketid).emit("getMessage", {id, senderid, recieverid, text})
        
    })

    socket.on("disconnect", ()=>{
        console.log("a user is disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

