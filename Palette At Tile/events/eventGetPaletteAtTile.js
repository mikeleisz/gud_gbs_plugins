export const id = "GUD_EVENT_GET_PALETTE_AT_TILE";
export const name = "Get Palette At Tile";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCREEN"];
export const subGroups = {
    EVENT_GROUP_SCREEN: "BACKGROUND",
    "Gud GBS Plugins": "BACKGROUND"
};

export const autoLabel = (fetchArg) => {
	const x = fetchArg("x");
	const y = fetchArg("y");
    return `Get Palette At (${x}, ${y})`;
};

export const fields = [
    {
        key: "layer",
        label: "Layer",
        description: "Layer",
        type: "select",
        options: [
            [0, "Background"],
            [1, "Overlay"],
        ],
        "defaultValue": 0
    },
    {
        type: "break"
    },
    {
        label: "⚠️ Background changes will be reset when scrolled offscreen!",
        conditions: [
			{
				key: "layer",
				ne: 1
			}
		]
    },
    {
        type: "break"
    },
    {
        key: "x",
        label: "Tile X",
        description: "Tile X",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    },
    {
        key: "y",
        label: "Tile Y",
        description: "Tile Y",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    },
    {
        key: "save",
        label: "Save",
        description: "Save",
        type: "variable",
        width: "50%",
        defaultValue: "LAST_VARIABLE",
    },
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
            _declareLocal, 
            _stackPushConst, 
            _stackPush, 
            _stackPop, 
            _setVariable, 
            variableSetToScriptValue } = helpers;
	
    _addComment("Get Palette At Tile");

    _stackPushConst(0);

    _stackPushConst(input.layer);

    const tmpY = _declareLocal("tmp_y", 1, true);
    variableSetToScriptValue(tmpY, input.y);
    _stackPush(tmpY);

    const tmpX = _declareLocal("tmp_x", 1, true);
    variableSetToScriptValue(tmpX, input.x);
    _stackPush(tmpX);

	_callNative("vm_get_palette_at_tile");
    _setVariable(input.save, ".ARG3");

    _stackPop(4);
};