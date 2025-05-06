const express=require("express");

const fs=require("fs").promises;

const router=express.Router();

router.post("/add", async(req,res)=>{
    try {
        let users=[];

        try {
            const data=await fs.readFile("./db.json", "utf-8");
            users=JSON.parse(data);
        } catch (err) {
            users=[];
        }

        const newUser={id:Date.now().toString, ...req.body};
        users.push(newUser);

        await fs.writeFile("./db.json", JSON.stringify(users, null,2));
        res.status(201).json(newUser);
    } catch {
        res.status(500).send("Server error");
    }
});


//GET/ users id

router.get("/:id", async (req,res)=>{
    try {
        const data=await fs.readFile("./db.json","utf-8");
        const users=JSON.parse(data);
        const user=users.find(u=>u.id===req.params.id);

        if (user) {
            res.json(user);
        } else res.status(404).send("User not found");
    } catch {
        res.status(500).send("Server error");
    }
});


//Delete users id
router.delete("/:id", async (req,res)=>{
    try {
        const data=await fs.readFile("./db.json","utf-8");
        const users=JSON.parse(data);

        const initialLength=users.length;
        users=users.filter(u=>u.id!==req.params.id);

        if (users.length===initialLength) {
            return res.status(404).send("User not found");
        }

        await fs.writeFile("./db.json", JSON.stringify(users,null,2));
        res.send("User deleted");
    } catch {
        res.status(500).send("Server error");
    }
});

module.exports=router;