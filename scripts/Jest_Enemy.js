var SpikyList = [];

function CarryPerson(name){

		var sx = GetPersonX(name);
		var sy = GetPersonY(name);
		var ptm = GetObstructingPerson(name,sx,sy-1);
		
		if(ptm!=""){
			var dx = GetPersonValue(name,"deltax");
			var ptmdx = GetPersonValue(ptm, "deltax");
			var f = GetPersonFrame(ptm);
			SetPersonValue(ptm, "deltax", dx);
			
			Move(ptm, true);
			
			SetPersonFrame(ptm, f);
			SetPersonValue(ptm, "deltax", ptmdx);
		}

}


function DamageNearbyPerson(name, amount){
	var sx = GetPersonX(name);
	var sy = GetPersonY(name);
	var ptd = GetObstructingPerson(name,sx,sy-4);
	
	if(ptd=="")
		ptd = GetObstructingPerson(name,sx,sy+4);
	if(ptd=="")
		ptd = GetObstructingPerson(name,sx-4,sy);
	if(ptd=="")
		ptd = GetObstructingPerson(name,sx+4,sy);

	if(ptd=="")
		return false;
		
	if(ptd==GetInputPerson())
		Player.health-=Math.max(amount-Player.defense, 1);
		
	else{
		var data = GetPersonData(ptd);
		data["health"]-=Math.max(data["defense"]-amount, 1);
		SetPersonData(ptd,data);
	}

	return true;

}

function AddSpiky(name){
	SpikyList.push(name);
	
	//Assume that spikies get stuck all the time.
	// 
	// This is a shortcoming of both the wx Editor and Radnen's editor.
	// Some enemies do NOT fit nicely into tiles.
	//
	
	while(IsPersonObstructed(name,GetPersonX(name),GetPersonY(name))){
		SetPersonY(name, GetPersonY(name)-1);
	}
	
	SetPersonValue(name, "deltay", 0);
	SetPersonValue(name, "deltax", -25);
	SetPersonValue(name, "framei", 0);
	SetPersonValue(name, "frmaxi", 1);
	SetPersonValue(name, "cooldown", 0);
	
	SetPersonScript(name, SCRIPT_ON_DESTROY, "\
	for(var i in SpikyList){\
		if(SpikyList[i]==\""+name+"\"){\
			SpikyList.splice(i, 1);\
			break;\
		}\
	}\
	");

}

function ThinkAboutSpikies(){
	for(var i in SpikyList){
		Gravity(SpikyList[i]);
		var sx = GetPersonX(SpikyList[i]);
		var sy = GetPersonY(SpikyList[i]);
		var dx = GetPersonValue(SpikyList[i],"deltax");
		var cooldown = GetPersonValue(SpikyList[i],"cooldown");
		
		
		if(dx>0){
			if(IsPersonObstructed(SpikyList[i],sx+1,sy)){
				SetPersonValue(SpikyList[i],"deltax",-25)
			}
		}
		else if(dx<0){
			if(IsPersonObstructed(SpikyList[i],sx-1,sy)){
				SetPersonValue(SpikyList[i],"deltax",25)
			}
		}
		else{
				SetPersonValue(SpikyList[i],"deltax",25);
		}
				
		CarryPerson(SpikyList[i]);
		
		if(cooldown==0){
			if(DamageNearbyPerson(SpikyList[i], 10))
				SetPersonValue(SpikyList[i],"cooldown", 60);
		}
		else{
			SetPersonValue(SpikyList[i],"cooldown", cooldown-1);
		}
		
		Move(SpikyList[i], true);
	}

}