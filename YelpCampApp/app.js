var express 		= 	require("express"),
app  			= 	express(),
bodyParser 		= 	require("body-parser"),
mongoose 		=  	require('mongoose'),
methodOveride 	=	require("method-override"),
Campground = require("./models/campground"),
seedDB =  require("./seed"),
Comment = require("./models/comment");

seedDB();
mongoose.set('useFindAndModify', false);

app.use(methodOveride("_method"));
mongoose.connect('mongodb://localhost/yelp_camp',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));


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
	res.render("campgrounds/new")
});

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("campgrounds/show",{campground:campground});
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
			res.render("campgrounds/edit",{campground:campground});
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
			res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});

		}
	})
});


/////==============================///////
//COMMENTS

app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err)
		{
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:campground});
		};
	});
	
});

app.post("/campgrounds/:id/comments",function(req,res){
	var comment = req.body.comment;
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}
		else{
			Comment.create(comment,function(err,succ){
				campground.comments.push(succ);
				campground.save();
				res.redirect("/campgrounds/"+req.params.id);
			});
		};
	});
});

app.listen(3000,function(){
	console.log("Server Started");
});