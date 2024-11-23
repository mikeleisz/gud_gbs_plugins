export const id = "GUD_EVENT_GET_COLLISION_AT_TILE";
export const name = "Store Collision Data In Variable";
export const groups = ["Gud GBS Plugins", "Collision"];
export const subGroups = {
  "Gud GBS Plugins": "COLLISION DATA",
  "Collision": "COLLISION DATA"
};

export const autoLabel = (fetchArg, args) => {
    const x = fetchArg("tx");
    const y = fetchArg("ty");
    const target = fetchArg("target");
    return `Store Collision Data at (${x}, ${y}) into ${target}`;
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
        key: "target",
        label: "Target Variable",
        type: "variable",
        defaultValue: "LAST_VARIABLE",
    },
];

export const compile = (input, helpers) => {
    const { _stackPushConst, _stackPush, _callNative, _stackPop, _setVariable, _declareLocal, variableSetToScriptValue } = helpers;

    _stackPushConst(0);

    const tileY = _declareLocal("tile_y", 1, true);
    variableSetToScriptValue(tileX, input.ty);
    _stackPush(tileY);
    
    const tileX = _declareLocal("tile_x", 1, true);
    variableSetToScriptValue(tileX, input.tx);
    _stackPush(tileX);

    _callNative("get_collision_at_tile");
    _setVariable(input.target, ".ARG2");
    _stackPop(3);
};