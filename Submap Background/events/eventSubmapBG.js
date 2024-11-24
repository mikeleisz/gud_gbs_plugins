export const id = "GUD_EVENT_SUBMAP_BG";
export const name = "Submap Background";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCREEN"];
export const subGroups = {
    EVENT_GROUP_SCREEN: "BACKGROUND",
    "Gud GBS Plugins": "BACKGROUND"
};

export const fields = [
    {
        label: "⚠️ Changes will be reset when scrolled offscreen!"
    },
    {
        type: "break"
    },
    {
        type: "group",
        fields: [
            {
                key: "srcX",
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
                key: "srcY",
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
                key: "destX",
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
                key: "destY",
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
                label: "Submap Width",
                description: "Width of the region in tiles",
                type: "value",
                min: 1,
                max: 32,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 1,
                },
            },
            {
                key: "h",
                label: "Submap Height",
                description: "Height of the region in tiles",
                type: "value",
                min: 1,
                max: 32,
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
    const { _stackPush, _callNative, _stackPop, _declareLocal, variableSetToScriptValue } = helpers;

    const height = _declareLocal("height", 1, true);
    variableSetToScriptValue(height, input.h);
    _stackPush(height);
    
    const width = _declareLocal("width", 1, true);
    variableSetToScriptValue(width, input.w);
    _stackPush(width);
    
    const destY = _declareLocal("dest_y", 1, true);
    variableSetToScriptValue(destY, input.destY);
    _stackPush(destY);
    
    const destX = _declareLocal("dest_x", 1, true);
    variableSetToScriptValue(destX, input.destX);
    _stackPush(destX);
    
    const sourceY = _declareLocal("source_y", 1, true);
    variableSetToScriptValue(sourceY, input.srcY);
    _stackPush(sourceY);
    
    const sourceX = _declareLocal("source_x", 1, true);
    variableSetToScriptValue(sourceX, input.srcX);
    _stackPush(sourceX);
    
    _callNative("background_submap");
    _stackPop(6);
};