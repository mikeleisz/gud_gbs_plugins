const scriptValueHelpers = require("shared/lib/scriptValue/helpers");

export const id = "GUD_BG_SUBMAP";
export const name = "Background Submap";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCENE"];
export const subGroups = {
    EVENT_GROUP_SCENE: "BACKGROUND",
    "Gud GBS Plugins": "BACKGROUND"
};

export const fields = [
    {
        type: "group",
        fields: [
            {
                key: "srcx",
                label: "Source X",
                description: "Source tile X",
                type: "value",
                min: 0,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 0,
                }
            },
            {
                key: "srcy",
                label: "Source Y",
                description: "Source tile Y",
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
        type: "group",
        fields: [
            {
                key: "destx",
                label: "Destination X",
                description: "Destination tile X",
                type: "value",
                min: 0,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 0,
                }
            },
            {
                key: "desty",
                label: "Destination Y",
                description: "Destination tile Y",
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
        type: "group",
        fields: [
            {
                key: "w",
                label: "Width",
                description: "Width of the region in tiles",
                type: "value",
                min: 1,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 1,
                },
            },
            {
                key: "h",
                label: "Height",
                description: "Height of the region in tiles",
                type: "value",
                min: 1,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 1,
                },
            }
        ]
    }
];

export const compile = (input, helpers) => {
    const { _stackPush, _callNative, _stackPop, _declareLocal, _performFetchOperations, _performValueRPN, _rpn } = helpers;

    const [rpnOpsSourceX, fetchOpsSourceX] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.srcx));
    const [rpnOpsSourceY, fetchOpsSourceY] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.srcy));
    const [rpnOpsDestX, fetchOpsDestX] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.destx));
    const [rpnOpsDestY, fetchOpsDestY] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.desty));
    const [rpnOpsWidth, fetchOpsWidth] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.w));
    const [rpnOpsHeight, fetchOpsHeight] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.h));

    const sourceX = _declareLocal("source_x", 1, true);
    const sourceY = _declareLocal("source_y", 1, true);
    const destX = _declareLocal("dest_x", 1, true);
    const destY = _declareLocal("dest_y", 1, true);
    const width = _declareLocal("width", 1, true);
    const height = _declareLocal("height", 1, true);

    const localsLookup = _performFetchOperations([
      ...fetchOpsSourceX,
      ...fetchOpsSourceY,
      ...fetchOpsDestX,
      ...fetchOpsDestY,
      ...fetchOpsWidth,
      ...fetchOpsHeight,
    ]);

    const rpn = _rpn();
    _performValueRPN(rpn, rpnOpsSourceX, localsLookup);
    rpn.refSet(sourceX);
    _performValueRPN(rpn, rpnOpsSourceY, localsLookup);
    rpn.refSet(sourceY);
    _performValueRPN(rpn, rpnOpsDestX, localsLookup);
    rpn.refSet(destX);
    _performValueRPN(rpn, rpnOpsDestY, localsLookup);
    rpn.refSet(destY);
    _performValueRPN(rpn, rpnOpsWidth, localsLookup);
    rpn.refSet(width);
    _performValueRPN(rpn, rpnOpsHeight, localsLookup);
    rpn.refSet(height);
    rpn.stop();

    _stackPush(height);
    _stackPush(width);
    _stackPush(destY);
    _stackPush(destX);
    _stackPush(sourceY);
    _stackPush(sourceX);
    
    _callNative("background_submap");
    _stackPop(6);
};