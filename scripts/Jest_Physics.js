function Gravity(player){
	if(IsKeyPressed(KEY_SHIFT))
		return;
	//ClearPersonCommands(player);
	if(!IsCommandQueueEmpty(player))
		return;
	var data = GetPersonData(player);
	if(data["deltay"]<40)
		SetPersonValue(player, "deltay", data["deltay"]+1);
		
	
	if(IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)+1))
		SetPersonValue(player, "deltay", 0);
	
	
	for(var i = 0; i<data["deltay"];i+=10){
		if((IsPersonObstructed(player, GetPersonX(player)+1, GetPersonY(player)+1))&&(IsPersonObstructed(player, GetPersonX(player)-1, GetPersonY(player)+1)))
			return;
		SetPersonY(player, GetPersonY(player)+1);
	}
		
}

function Jump(player){

	if(IsKeyPressed(KEY_SPACE)){
		var rdata = GetPersonData(player);
		
		if((rdata["deltay"]>=-1)&&(IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)+1))
			&&
		(!(IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)-1)))
		)
			SetPersonValue(player, "deltay", -40);
			
	}

		
	if(GetPersonData(player)["deltay"]>=0)
		return;
			
	var data = GetPersonData(player);
	
	for(var i = 0; i>data["deltay"];i-=17){
		if(IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)-1)){
			SetPersonValue(player, "deltay", 0);
			return;
		}
		if(IsKeyPressed(KEY_SPACE))
			i+=7;
		SetPersonY(player, GetPersonY(player)-1);
	}
	
}

function Move(player){
	var data = GetPersonData(player);

	var mov = false;
	
	if(IsKeyPressed(KEY_LEFT)){
		SetPersonValue(player,"deltax",data["deltax"]-1);
		mov = true;
	}
	
	if(IsKeyPressed(KEY_RIGHT)){
		SetPersonValue(player,"deltax",data["deltax"]+1);
		mov = true;
	}
	
	data = GetPersonData(player);
	
	if(data["deltax"]>20){
		SetPersonValue(player,"deltax",20);
	}
	if(data["deltax"]<-20){
		SetPersonValue(player,"deltax",-20);
	}
	
	if(!mov){
		if(data["deltax"]>0)
			SetPersonValue(player,"deltax",data["deltax"]-1);
		else if(data["deltax"]<0)
			SetPersonValue(player,"deltax",data["deltax"]+1);
		
	}
	
	data = GetPersonData(player);
	
	if(data["deltax"]==0)
		return;
	
	SetPersonFrame(player,Math.floor(data["framei"]/100)%data["frmaxi"]);
	
	SetPersonValue(player,"framei",(data["framei"]%(data["frmaxi"]*100))+Math.abs(data["deltax"]));
	
	for(var i = 0; i<Math.abs(data["deltax"]); i+=10){
		if(data["deltax"]<0){
			if(!IsPersonObstructed(player, GetPersonX(player)-1, GetPersonY(player)))
				SetPersonX(player, GetPersonX(player)-1);
		}
		else{
			if(!IsPersonObstructed(player, GetPersonX(player)+1, GetPersonY(player)))
				SetPersonX(player, GetPersonX(player)+1);
		}
	}
	
	
	
}
