const scriptValueHelpers = require("shared/lib/scriptValue/helpers");

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
    const { appendRaw, _stackPush, _stackPop, _declareLocal, _performFetchOperations, _performValueRPN, _rpn } = helpers;

    const [rpnOpsOverlayX, fetchOpsOverlayX] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.overlayX));
    const [rpnOpsOverlayY, fetchOpsOverlayY] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.overlayY));
    const [rpnOpsSceneX, fetchOpsSceneX] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.bgX));
    const [rpnOpsSceneY, fetchOpsSceneY] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.bgY));
    const [rpnOpsWidth, fetchOpsWidth] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.w));
    const [rpnOpsHeight, fetchOpsHeight] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.h));

    const overlayX = _declareLocal("overlay_x", 1, true);
    const overlayY = _declareLocal("overlay_y", 1, true);
    const bgX = _declareLocal("bg_x", 1, true);
    const bgY = _declareLocal("bg_y", 1, true);
    const width = _declareLocal("width", 1, true);
    const height = _declareLocal("height", 1, true);

    const localsLookup = _performFetchOperations([
      ...fetchOpsOverlayX,
      ...fetchOpsOverlayY,
      ...fetchOpsSceneX,
      ...fetchOpsSceneY,
      ...fetchOpsWidth,
      ...fetchOpsHeight,
    ]);

    const rpn = _rpn();
    _performValueRPN(rpn, rpnOpsOverlayX, localsLookup);
    rpn.refSet(overlayX);
    _performValueRPN(rpn, rpnOpsOverlayY, localsLookup);
    rpn.refSet(overlayY);
    _performValueRPN(rpn, rpnOpsSceneX, localsLookup);
    rpn.refSet(bgX);
    _performValueRPN(rpn, rpnOpsSceneY, localsLookup);
    rpn.refSet(bgY);
    _performValueRPN(rpn, rpnOpsWidth, localsLookup);
    rpn.refSet(width);
    _performValueRPN(rpn, rpnOpsHeight, localsLookup);
    rpn.refSet(height);
    rpn.stop();

    _stackPush(overlayX);
    _stackPush(overlayY);
    _stackPush(width);
    _stackPush(height);
    _stackPush(bgX);
    _stackPush(bgY);

    appendRaw(`VM_OVERLAY_SET_SUBMAP_EX .ARG5`);
    _stackPop(6);
};