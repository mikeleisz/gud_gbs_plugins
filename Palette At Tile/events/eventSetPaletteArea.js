export const id = "GUD_EVENT_SET_PALETTE_AREA";
export const name = "Set Palette Area";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCREEN"];
export const subGroups = {
    EVENT_GROUP_SCREEN: "BACKGROUND",
    "Gud GBS Plugins": "BACKGROUND"
};

export const autoLabel = (fetchArg) => {
	const x = fetchArg("x");
    const y = fetchArg("y");
    const palette = fetchArg("palette");
    const layer = fetchArg("layer");
    return `Set Palette Area (${palette}) At (${x}, ${y}) on ${layer == 0 ? "Background" : "Overlay"}`;
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
        key: "w",
        label: "Width",
        description: "Width",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    },
    {
        key: "h",
        label: "Height",
        description: "Height",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    },
    {
        key: "palette",
        label: "Palette",
        description: "Palette",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    },
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
            _declareLocal, 
            _stackPush,
            _stackPushConst, 
            _stackPop, 
            variableSetToScriptValue } = helpers;
	
    _addComment("Set Palette Area");

    _stackPushConst(input.layer);

    const tmpPalette = _declareLocal("tmp_palette", 1, true);
    variableSetToScriptValue(tmpPalette, input.palette);
    _stackPush(tmpPalette);

    const tmpH = _declareLocal("tmp_h", 1, true);
    variableSetToScriptValue(tmpH, input.h);
    _stackPush(tmpH);

    const tmpW = _declareLocal("tmp_w", 1, true);
    variableSetToScriptValue(tmpW, input.w);
    _stackPush(tmpW);

    const tmpY = _declareLocal("tmp_y", 1, true);
    variableSetToScriptValue(tmpY, input.y);
    _stackPush(tmpY);

    const tmpX = _declareLocal("tmp_x", 1, true);
    variableSetToScriptValue(tmpX, input.x);
    _stackPush(tmpX);

	_callNative("vm_set_palette_area");

    _stackPop(6);
};