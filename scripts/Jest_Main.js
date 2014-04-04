RequireScript("Jest_Map.js");

RequireScript("Jest_Physics.js");

var ScoreFont = LoadFont("numbers.rfn");

var ph = 100;

function game(){
	CreatePerson("Egg", "egg.rss", false);
	AttachInput("Egg");
  //IgnorePersonObstructions("Egg", true);
	SetPersonValue("Egg", "deltay", 0);
	SetPersonValue("Egg", "deltax", 0);
	SetPersonValue("Egg", "framei", 0);
	SetPersonValue("Egg", "frmaxi", 8);
	SetPersonSpeedXY("Egg", 0, 0);

		
	SetUpdateScript("var inp = GetInputPerson(); Jump(inp); Gravity(inp); Move(inp);\
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
	");

	SetRenderScript(
		"Rectangle(20, 20, 80, 20, CreateColor(0, 0, 0, 255));\
		Rectangle(110, 20, 450, 20, CreateColor(0, 0, 0, 255));\
		ScoreFont.drawText(25, 25, ph);\
		ScoreFont.drawText(115, 25, 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG 1234567890 FLYING JESTER');"
	);

	BindKey(KEY_COMMA, "ph--", "");
	BindKey(KEY_PERIOD, "ph++", "");

	MapEngine("test.rmp", 60);
}