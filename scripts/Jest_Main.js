RequireScript("Jest_Map.js");

RequireScript("Jest_Physics.js");

function game(){
	CreatePerson("Egg", "egg.rss", false);
	AttachInput("Egg");
  //IgnorePersonObstructions("Egg", true);
	SetPersonValue("Egg", "deltay", 0);
	SetPersonSpeedXY("Egg", 2, 1);
	SetUpdateScript("Gravity(\"Egg\"); Jump(\"Egg\");");

	MapEngine("test.rmp", 60);
}