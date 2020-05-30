var express = require("express");
var app  = express();
var bodyParser = require("body-parser");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
var campgrounds = [
{name: "Camp Site 1", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_001.jpg"},
{name: "Camp Site 2", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_Sign.jpg"},
{name: "Camp Site 1", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_001.jpg"},
{name: "Camp Site 2", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_Sign.jpg"},
{name: "Camp Site 1", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_001.jpg"},
{name: "Camp Site 2", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_Sign.jpg"},
{name: "Camp Site 3", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_014.jpg"}
]

app.post("/campgrounds",function(req,res){
	var values = req.body;
	var name = values.name;
	var url = values.image;
	campgrounds.push({name:name,image:url});
	res.redirect('/campgrounds');
});


app.get("/campgrounds/new",function(req,res){
	res.render("new")
})

app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.listen(3000,function(){
	console.log("Server Started");
});