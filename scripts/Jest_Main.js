RequireScript("Jest_Map.js");
RequireScript("Jest_Enemy.js");
RequireScript("Jest_Physics.js");

var ScoreFont = LoadFont("numbers.rfn");

var Player = {
	health:100,
	maxhealth:100,
	defense:0,

}

function game(){
	CreatePerson("Egg", "egg.rss", false);
	AttachInput("Egg");
  //IgnorePersonObstructions("Egg", true);
	SetPersonValue("Egg", "deltay", 0);
	SetPersonValue("Egg", "deltax", 0);
	SetPersonValue("Egg", "framei", 0);
	SetPersonValue("Egg", "frmaxi", 8);
	SetPersonSpeedXY("Egg", 0, 0);

		
	SetUpdateScript("var inp = GetInputPerson(); Jump(inp); Gravity(inp); Control(inp);\
	var inpx = GetPersonX(inp);\
	var inpy = GetPersonY(inp);\
	if(inpx<0){\
		FJ.Map.West();\
	}\
	else if(inpy<0){\
		FJ.Map.North();\
	}\
	else if(inpx>GetLayerWidth(0)*GetTileWidth()){\
		FJ.Map.East();\
	}\
	else if(inpy>GetLayerHeight(0)*GetTileHeight()){\
		FJ.Map.South();\
	}\
	\
	ThinkAboutSpikies();\
	");

	SetRenderScript(
		"Rectangle(20, 20, 80, 20, CreateColor(0, 0, 0, 255));\
		Rectangle(110, 20, 450, 20, CreateColor(0, 0, 0, 255));\
		ScoreFont.drawText(25, 25, Player.health);\
		ScoreFont.drawText(115, 25, 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG 1234567890 FLYING JESTER');"
	);

	BindKey(KEY_COMMA, "Player.health--; Player.health = Math.max(Player.health, 0);", "");
	BindKey(KEY_PERIOD, "Player.health++; Player.health = Math.min(Player.health, Player.maxhealth);", "");

	MapEngine("test.rmp", 60);
}