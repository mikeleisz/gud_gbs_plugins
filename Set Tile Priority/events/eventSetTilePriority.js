export const id = "GUD_EVENT_SET_TILE_PRIORITY";
export const name = "Set Tile Priority";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCREEN"];
export const subGroups = {
    EVENT_GROUP_SCREEN: "BACKGROUND",
    "Gud GBS Plugins": "BACKGROUND"
};

export const autoLabel = (fetchArg) => {
	const x = fetchArg("x");
    const y = fetchArg("y");
    const priority = fetchArg("priority");
    return `Set Tile Priority At (${x}, ${y}) to (${priority}) `;
};

export const fields = [
    {
        label: "⚠️ Changes will be reset when scrolled offscreen!"
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
        key: "priority",
        label: "Tile Priority Type",
        description: "Tile Priority Type",
        type: "select",
        options: [
            [0, "Off"],
            [1, "On"],
            [2, "Toggle"],
        ],
        "defaultValue": 1
    }
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
            _declareLocal, 
            _stackPushConst,
            _stackPush, 
            _stackPop, 
            variableSetToScriptValue } = helpers;
	
    _addComment("Set Tile Priority");

    _stackPushConst(input.priority);

    const tmpY = _declareLocal("tmp_y", 1, true);
    variableSetToScriptValue(tmpY, input.y);
    _stackPush(tmpY);

    const tmpX = _declareLocal("tmp_x", 1, true);
    variableSetToScriptValue(tmpX, input.x);
    _stackPush(tmpX);

	_callNative("vm_set_tile_priority");

    _stackPop(3);
};