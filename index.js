const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");

const PORT = 8000;

// Routes
app.get('/users', (req, res) => {
    let html = `
        <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    res.send(html);
})

// REST API
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.route("/api/users/:id")
.get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id)
    return res.json(user);
})
.patch((req, res)=>{
    // Edit user with id
    return res.json({status:"pending"})
})
.delete((req, res)=>{
    // Delete user with id
    return res.json({status : "Pending"})
})

// app.get("/api/users/:id", (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id === id)
//     return res.json(user);
// })

app.post('./api/users', (req, res)=>{
    return res.json({ status : "Pending"});
})

app.listen(PORT, () => {
    console.log(`Server is starting on PORT ${PORT}`);
})