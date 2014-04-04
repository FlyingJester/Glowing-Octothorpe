var SpikyList = [];

function CarryPerson(name){

		var sx = GetPersonX(name);
		var sy = GetPersonY(name);
		ptm = GetObstructingPerson(name,sx,sy-1)
		
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
}

function ThinkAboutSpikies(){
	for(var i in SpikyList){
		Gravity(SpikyList[i]);
		var sx = GetPersonX(SpikyList[i]);
		var sy = GetPersonY(SpikyList[i]);
		var dx = GetPersonValue(SpikyList[i],"deltax");
		
		
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
				
		Move(SpikyList[i], true);
	}

}