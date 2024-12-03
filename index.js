import express from "express"
import bodyParser from "body-parser"

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

var blogMap=new Map();
function addBlog(name, text){
    blogMap.set(name,text);
}
app.get("/",(req,res)=>{
    res.render("index.ejs",{
        blogMap: blogMap
    });
})

app.get("/create",(req,res)=>{
    res.render("create.ejs");
})

app.post("/create",(req,res)=>{
    var name=req.body['edit'];
    res.render("create.ejs",{
        prevName: name,
        prevText: blogMap.get(name)
    })
})

app.post("/blog",(req,res)=>{
    var blogKey=req.body['blogClicked'];
    res.render("blog.ejs",{
        blogName: blogKey ,
        blogValue: blogMap.get(blogKey)
    })
})

app.post("/addBlog",(req,res)=>{
    var name=req.body['name'];
    var text=req.body['text'];
    addBlog(name,text);
    res.redirect("/");
})



app.listen(port,()=>{
    console.log("Listening on port 3000");
})