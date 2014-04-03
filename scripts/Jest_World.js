RequireScript("link.js");

const D_L = 1;
const D_R = 2;
const D_D = 3;
const D_U = 4;

function Map(name, x, y){
	this.name = name;
	this.x = x;
	this.y = y;
}

var CurrentMap = null;

function SwitchMap(To, From){
	var direction = D_L;
	
	if(To.x==From.x){
		if(To.y==From.y)
			return;
			
		
	}
	else if(To.y==From.y){
		
	}
	else{
		Abort("Bad Rolling Map Switch: From "+From.name+" ("+From.x+", "+From.y+") to "+To.name+" ("+To.x+", "+To.y+").");
	}

}

var World = Link([
	new Map("Test", 0, 0),


]);