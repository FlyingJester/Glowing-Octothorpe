RequireScript("Jest_Map.js");

RequireScript("Jest_Physics.js");

function game(){
	CreatePerson("Egg", "egg.rss", false);
	AttachInput("Egg");
  //IgnorePersonObstructions("Egg", true);
	SetPersonValue("Egg", "deltay", 0);
	SetPersonValue("Egg", "deltax", 0);
	SetPersonSpeedXY("Egg", 0, 0);
	SetUpdateScript(" Jump(\"Egg\"); Gravity(\"Egg\"); Move(\"Egg\");");

	MapEngine("test.rmp", 60);
}