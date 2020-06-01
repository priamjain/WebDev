var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
{
	name:"ababa",
	image:"https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	description:"very nice 3"
},
{
	name:"a b",
	image:"https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	description:"very nice 2"
},
{
	name:"a b a b",
	image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
	description:"very nice 1"
}
];

function seedDB(){
	Campground.remove({},function(err,succ){
		if(err){
			console.log(err);
		}
		else{
			console.log("removed");
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					}
					else{
						console.log(campground);
						Comment.create({
							text: "Lets go here",
							author: "Bunty"
						},function(err,succ1){
							if(err){
								console.log(err);
							}
							else{
							campground.comments.push(succ1);
							campground.save();
							

						};
						})
					};
				});
			});
		}
	});

	
};

module.exports = seedDB;