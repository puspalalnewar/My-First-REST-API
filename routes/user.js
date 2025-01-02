const express = require("express");
const router = express.Router();


// app.get('/users',async (req, res) => {
//     const allDbUsers = await User.find({});
//     let html = `
//         <ul>
//         ${allDbUsers.map((user) => `<li>
//             Name : ${user.firstName} -> 
//             Email : ${user.email}
//         </li>`).join("")}
//         </ul>
//     `
//     res.send(html);
// })


// REST API
router.get('/',async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

router.route("/:id")
    .get(async (req, res) => {
        const user =await User.findById(req.params.id);
        // const user = users.find((user) => user.id === id);
        if (!user) return res.status(400).json({ error: "User not found" });
        return res.json(user);
    })
    .patch(async (req, res) => {
        // Edit user with id
        await User.findByIdAndUpdate(req.params.id, {lastName : "Changed"});
        return res.json({ status: "success"});
    })
    .delete(async (req, res) => {
        // Delete user with id
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "Success" })
    })

// app.get("/api/users/:id", (req, res)=>{
//     const id = Number(req.params.id);
//     const user = users.find((user)=>user.id === id)
//     return res.json(user);
// })

router.post('/', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name) {
        return res.status(400).json({ status: "Bad Request!!" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    console.log("Result", result);

    return res.status(201).json({ msg: "Success" });

    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.status(200).json({ status: "Pending", user_id: users.length });
    // })
    // console.log("Body", body);

})

module.exports = router
