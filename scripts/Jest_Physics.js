function Gravity(player){
	//ClearPersonCommands(player);
	if(!IsCommandQueueEmpty(player))
		return;
	var data = GetPersonData(player);
	if(data["deltay"]<40)
		SetPersonValue(player, "deltay", parseInt(data["deltay"])+1);
		
	
	if(IsPersonObstructed(player, GetPersonX(player)-1, GetPersonY(player)+1)&&IsPersonObstructed(player, GetPersonX(player)+1, GetPersonY(player)+1))
		SetPersonValue(player, "deltay", 0);
	
	for(var i = 0; i<data["deltay"];i+=10){
		if(IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)+1))
			return;
		SetPersonY(player, GetPersonY(player)+1);
	}
		
}

function Jump(player){

	if(IsKeyPressed(KEY_SPACE)){
		if((IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)+1))
			&&
		(!(IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)-1)))
		)
			SetPersonValue(player, "deltay", -35);
	}

		
	if(GetPersonData(player)["deltay"]>0)
		return;
			
	var data = GetPersonData(player);
	
	for(var i = 0; i>data["deltay"];i-=10){
		if(IsPersonObstructed(player, GetPersonX(player), GetPersonY(player)-1)){
			SetPersonValue(player, "deltay", 0);
			return;
		}
		SetPersonY(player, GetPersonY(player)-1);
	}
	
}

