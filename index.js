const express = require("express");
const app = express();
const users = require("./MOCK_DATA.json");
const fs = require('fs');

const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile("log.txt", `${Date.now()} : ${req.ip} : ${req.method} : ${req.path}\n`,
        (err, data) => {
            next();
        });
})

// Learning Middleware
// app.use((req, res, next)=>{
//     console.log("Hello, from middware 1");
//     req.userName = "Puspalal Newar";
//     next();
// })
// app.use((req, res, next)=>{
//     console.log("Hello, from middware 2", req.userName);
//     // next();
//     // return res.send("hey");
//     next();
// })


// Routes
app.get('/users', (req, res) => {
    let html = `
        <ul>
        ${users.map((user) => `<li>
            ${user.first_name}
        </li>`).join("")}
        </ul>
    `
    res.send(html);
})

// REST API


app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)
        return res.json(user);
    })
    .patch((req, res) => {
        // Edit user with id
        return res.json({ status: "pending" })
    })
    .delete((req, res) => {
        // Delete user with id
        return res.json({ status: "Pending" })
    })

// app.get("/api/users/:id", (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id === id)
//     return res.json(user);
// })

app.post('/api/users/details', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "Pending", user_id: users.length });
    })
    // console.log("Body", body);

})

app.listen(PORT, () => {
    console.log(`Server is starting on PORT ${PORT}`);
})