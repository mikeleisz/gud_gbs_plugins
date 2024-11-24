export const id = "GUD_EVENT_SUBMAP_OVERLAY";
export const name = "Submap Overlay";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCREEN"];
export const subGroups = {
    EVENT_GROUP_SCREEN: "EVENT_GROUP_OVERLAY",
    "Gud GBS Plugins": "OVERLAY"
};

export const fields = [
    {
        label: "Copy a region of background tiles to the overlay"
    },
    {
        type: "break"
    },
    {
        type: "group",
        fields: [
            {
                key: "bgX",
                label: "Background X",
                description: "Background X",
                type: "value",
                min: 0,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 0,
                }
            },
            {
                key: "bgY",
                label: "Background Y",
                description: "Background Y",
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
                key: "overlayX",
                label: "Overlay X",
                description: "Overlay X",
                type: "value",
                min: 0,
                max: 31,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 0,
                }
            },
            {
                key: "overlayY",
                label: "Overlay Y",
                description: "Overlay Y",
                type: "value",
                min: 0,
                max: 31,
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
    const { appendRaw, _stackPush, _stackPop, _declareLocal, variableSetToScriptValue } = helpers;

    const overlayX = _declareLocal("overlay_x", 1, true);
    variableSetToScriptValue(overlayX, input.overlayX);
    _stackPush(overlayX);

    const overlayY = _declareLocal("overlay_y", 1, true);
    variableSetToScriptValue(overlayY, input.overlayY);
    _stackPush(overlayY);

    const width = _declareLocal("width", 1, true);
    variableSetToScriptValue(width, input.w);
    _stackPush(width);

    const height = _declareLocal("height", 1, true);
    variableSetToScriptValue(height, input.h);
    _stackPush(height);

    const bgX = _declareLocal("bg_x", 1, true);
    variableSetToScriptValue(bgX, input.bgX);
    _stackPush(bgX);

    const bgY = _declareLocal("bg_y", 1, true);
    variableSetToScriptValue(bgY, input.bgY);
    _stackPush(bgY);

    appendRaw(`VM_OVERLAY_SET_SUBMAP_EX .ARG5`);
    _stackPop(6);
};