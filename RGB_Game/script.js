//////////////////////////////////////////VARIABLES?//////////////////////////
var colors = [];
var num=6;
genColors(num);
var reset = document.querySelector("#reset");
var winColor = colors[Math.floor(Math.random()*6)];
var h1 = document.querySelector("h1");
var rgbDisplay = document.querySelector("#rgbDisplay")
rgbDisplay.textContent = winColor;
var message = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
newColors();
var easybtn =document.querySelector("#easy");
var hardbtn =document.querySelector("#hard");


////////////////////////////////////////////DIRECT CODES////////////////////////////////////////////////
easybtn.addEventListener("click", function(){
	num = 3;
	hardbtn.classList.remove("selected");
	this.classList.add("selected");
	reload();
});

hardbtn.addEventListener("click", function(){
	num = 6
	easybtn.classList.remove("selected");
	this.classList.add("selected");
	reload()
});

for(var i=0;i<squares.length;i++)
{
	
	squares[i].addEventListener("click", function(){
		// alert("y");
		if(this.style.backgroundColor==winColor)
		{
			
			whenCorrect();
			reset.textContent = "Play Again?";

		}
		else{
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again";
		}
	});
};

reset.addEventListener("click", reload);
///////////////////////////////////FUNCTIONS//////////////////////////////////////////////////////////
function reload(){
	genColors(num);
	newColors();
	winColor = colors[Math.floor(Math.random()*6)];
	rgbDisplay.textContent = winColor;
	h1.style.backgroundColor = "#232323";
	reset.textContent = "New Colors";
	message.textContent = "";
}

function newColors(){
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.backgroundColor = colors[i];
	}
};

function genColors(arg){
	var arr = [];

	for(var i=0;i<arg;i++)
	{
		colors[i] = randomColor();

	};

	return arr;
};

function randomColor(){
	var str = "rgb("
	
	str = str + Math.floor(Math.random()*256)+"," + " "+Math.floor(Math.random()*256)+"," + " "+Math.floor(Math.random()*256) + ")";
	return str;
};

function whenCorrect(){
	message.textContent = "Correct";
	for(var i=0;i<squares.length;i++)
	{
		squares[i].style.backgroundColor = winColor;
	}
	h1.style.backgroundColor = winColor;

};