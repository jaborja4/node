var express=require("express");
var app=new express();

app.get('/',function(req,res){
    res.sendfile(__dirname+"/pages/index.html");
});

app.listen(4000);
