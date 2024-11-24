const l10n = require("../helpers/l10n").default;

export const id = "GUD_EVENT_IF_SLOPE_AT_TILE";
export const name = "If Slope At Tile";
export const groups = ["Gud GBS Plugins", "Collision"];
export const subGroups = {
	"Gud GBS Plugins": "COLLISION DATA",
	"Collision": "COLLISION DATA"
};

export const autoLabel = (fetchArg, args) => {
	const x = fetchArg("tx");
	const y = fetchArg("ty");
	return `If Slope at (${x}, ${y})`;
};

export const fields = [
{
	type: "group",
	label: "Tile",
	fields: [
		{
			key: "tx",
			label: "Tile X",
			type: "value",
			min: 0,
			width: "50%",
			defaultValue: {
				type: "number",
				value: 0,
			}
		},
		{
			key: "ty",
			label: "Tile Y",
			type: "value",
			min: 0,
			width: "50%",
			defaultValue: {
				type: "number",
				value: 0,
			}
		}
	  ]
	},
	{
		key: "slopeCheck",
		label: "Slope Check Type",
		description: "The type of slope check to perform",
		type: "select",
		options: [
			[1, "Slope"],
			[2, "Slope Right"],
			[3, "Slope Left"],
			[4, "Slope Right: 45 Degrees"],
			[5, "Slope Right: 22.5 Degrees, Bottom"],
			[6, "Slope Right: 22.5 Degrees, Top"],
			[7, "Slope Left: 45 Degrees"],
			[8, "Slope Left: 22.5 Degrees, Bottom"],
			[9, "Slope Left: 22.5 Degrees, Top"],
		],
		"defaultValue": 1
	},
	{
		key: "true",
		label: l10n("FIELD_TRUE"),
		description: l10n("FIELD_TRUE_DESC"),
		type: "events",
	},
	{
		key: "__collapseElse",
		label: l10n("FIELD_ELSE"),
		type: "collapsable",
		defaultValue: true,
		conditions: [
			{
				key: "__disableElse",
				ne: true,
			},
		],
	},
	{
		key: "false",
		label: l10n("FIELD_FALSE"),
		description: l10n("FIELD_FALSE_DESC"),
		conditions: [
			{
				key: "__collapseElse",
				ne: true,
			},
			{
				key: "__disableElse",
				ne: true,
			},
		],
		type: "events",
	},
];

export const compile = (input, helpers) => {
	const { variableSetToScriptValue,
			_ifConst, getNextLabel, 
			_jump, 
			_label, 
			_set, 
			_declareLocal, 
			_stackPush, 
			_stackPushConst, 
			_callNative, 
			_stackPop,
			_setConst,
			compileEvents } = helpers;  


	// local for storing slope result
	const result = _declareLocal("result", 1);
	_setConst(result, 0);
	// const for storing native call results...
	_stackPushConst(0);
	// slope check type...
	_stackPushConst(input.slopeCheck);

	// tile y
	const tileY = _declareLocal("tile_y", 1, true);
	variableSetToScriptValue(tileY, input.ty);
	_stackPush(tileY);
	// tile x
	const tileX = _declareLocal("tile_x", 1, true);
	variableSetToScriptValue(tileX, input.tx);
	_stackPush(tileX);
	
	// call engine function
	_callNative("if_slope_at_tile");
	// store results into local
	_set(result, ".ARG3");
	// clear stack
	_stackPop(4);

	// if, else events
	const truePath = input.true;
	const falsePath = input.__disableElse ? [] : input.false;
	// if, else labels
	const trueLabel = getNextLabel();
	const falseLabel = getNextLabel();

	// branch and compile events
	_ifConst(".EQ", result, 1, trueLabel, 0);

	// false path
	compileEvents(falsePath);
	_jump(falseLabel);
	// true path
	_label(trueLabel);
	compileEvents(truePath);
	// end
	_label(falseLabel);
};