 const express=require("express");
 const colors=require("colors");
 const userRouter=require("./routes/user");
 const systemRouter=require("./routes/system");
 const logger=require("./middlewares/logger");

 const app=express();
 app.use(express.json());
app.use(logger);


app.use("/users",userRouter);
app.use("./system",systemRouter);

app.listen(3000,()=>{
    console.log(colors.rainbow("server started on http://localhost:3000"));
})
