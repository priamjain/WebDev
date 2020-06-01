var express 		= 	require("express"),
app  			= 	express(),
bodyParser 		= 	require("body-parser"),
mongoose 		=  	require('mongoose'),
methodOveride 	=	require("method-override");


app.use(methodOveride("_method"));
mongoose.connect('mongodb://localhost/yelp_camp',{ useNewUrlParser: true, useUnifiedTopology: true });
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({name: "Camp Site 2", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_Sign.jpg"},function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(campground)
// 	}
// });
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
// var campgrounds = [
// {name: "Camp Site 2", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_Sign.jpg"},
// {name: "Camp Site 1", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_001.jpg"},
// {name: "Camp Site 2", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_Sign.jpg"},
// {name: "Camp Site 1", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_001.jpg"},
// {name: "Camp Site 2", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_Sign.jpg"},
// {name: "Camp Site 3", image: "https://d2g85s3tfaxbly.cloudfront.net/photo/camp/11974/Elk_Lake_014.jpg"}
// ]

app.post("/campgrounds",function(req,res){
	var values = req.body.values;
	Campground.create(values,function(err,newAdded){
		if(err){
			res.send(err);
		}
		else{
			res.redirect('/campgrounds');			
		}
	});
});

app.put("/campgrounds/:id",function(req,res){

	Campground.findByIdAndUpdate(req.params.id,req.body.values,function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		};
	});
});

app.delete("/campgrounds/:id",function(req,res){

	Campground.findByIdAndDelete(req.params.id,req.body.values,function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		};
	});
});


app.get("/campgrounds/new",function(req,res){
	res.render("new")
});

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("show",{campground:campground});
		}
	});
});

app.get("/campgrounds/:id/edit",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("edit",{campground:campground});
		}
	});
});


app.get("/",function(req,res){
	res.render("landing");
});

app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("campgrounds",{campgrounds:allCampgrounds});

		}
	})
});

app.listen(3000,function(){
	console.log("Server Started");
});