    Function.prototype.bind = function (self) {
        var args = Array.prototype.slice.call(arguments, 1), func = this;
        return function () {
            return func.apply(self, args.concat(Array.prototype.slice.call(arguments)));
        };
    };
RequireScript("link.js");

const D_L = 1;
const D_R = 2;
const D_D = 3;
const D_U = 4;

if (typeof(FJ)==='undefined')
	var FJ = {};

function FMap(name, file, x, y){
	this.name = name;
	this.file = file;
	this.x = x;
	this.y = y;
}

FJ.Map = {

	SwitchMap : function(From, To){
		
		if(To.x==From.x){
			if(To.y==From.y)
			Abort("Bad Rolling Map Switch: From "+From+" ("+From.x+", "+From.y+") to "+To+" ("+To.x+", "+To.y+").");
			
		}
		else if(To.y==From.y){
			
		}
		else{
			Abort("Bad Rolling Map Switch: From "+From+" ("+From.x+", "+From.y+") to "+To+" ("+To.x+", "+To.y+").");
		}
		
		var inp = GetInputPerson();
			
		var inpx= GetPersonX(inp);
		var inpy= GetPersonY(inp);
		SetPersonXYFloat(inp, 32, 32);
		ChangeMap(((To.x<10)?"0":"")+To.x+"-"+((To.y<10)?"0":"")+To.y+".rmp");
//		ChangeMap(map.file);
		SetPersonXYFloat(inp, inpx, inpy);
		this.CurrentMap = To;
	},

	
	East : function(){
		this.SwitchMap(this.CurrentMap, {x:this.CurrentMap.x+1, y:this.CurrentMap.y});
		SetPersonX(GetInputPerson(), 0);
	},
	West : function(){
		this.SwitchMap(this.CurrentMap, {x:this.CurrentMap.x-1, y:this.CurrentMap.y});
		SetPersonX(GetInputPerson(), GetLayerWidth(0)*GetTileWidth());
	},
	North : function(){
		this.SwitchMap(this.CurrentMap, {x:this.CurrentMap.x, y:this.CurrentMap.y-1});
		SetPersonY(GetInputPerson(), GetLayerHeight(0)*GetTileHeight());
	},
	South : function(){
		this.SwitchMap(this.CurrentMap, {x:this.CurrentMap.x, y:this.CurrentMap.y+1});
		SetPersonY(GetInputPerson(), 0);
	},
	
}

FJ.Map.CurrentMap = {x:10, y:10};
