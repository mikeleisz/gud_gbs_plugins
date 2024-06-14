const scriptValueHelpers = require("shared/lib/scriptValue/helpers");

export const id = "GUD_OVERLAY_SUBMAP";
export const name = "Overlay Submap";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCREEN"];
export const subGroups = {
    EVENT_GROUP_SCREEN: "EVENT_GROUP_OVERLAY",
    "Gud GBS Plugins": "OVERLAY"
};

export const fields = [
    {
        type: "group",
        fields: [
            {
                key: "overlayx",
                label: "Overlay X",
                description: "Overlay X",
                type: "value",
                min: 0,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 0,
                }
            },
            {
                key: "overlayy",
                label: "Overlay Y",
                description: "Overlay Y",
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
                key: "scenex",
                label: "Scene X",
                description: "Scene X",
                type: "value",
                min: 0,
                width: "50%",
                defaultValue: {
                    type: "number",
                    value: 0,
                }
            },
            {
                key: "sceney",
                label: "Scene Y",
                description: "Scene Y",
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
    const { _stackPushConst, appendRaw, _stackPush, _callNative, _stackPop, _declareLocal, _performFetchOperations, _performValueRPN, _rpn } = helpers;

    const [rpnOpsOverlayX, fetchOpsOverlayX] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.overlayx));
    const [rpnOpsOverlayY, fetchOpsOverlayY] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.overlayy));
    const [rpnOpsSceneX, fetchOpsSceneX] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.scenex));
    const [rpnOpsSceneY, fetchOpsSceneY] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.sceney));
    const [rpnOpsWidth, fetchOpsWidth] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.w));
    const [rpnOpsHeight, fetchOpsHeight] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.h));

    const overlayX = _declareLocal("overlay_x", 1, true);
    const overlayY = _declareLocal("overlay_y", 1, true);
    const sceneX = _declareLocal("scene_x", 1, true);
    const sceneY = _declareLocal("scene_y", 1, true);
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
    rpn.refSet(sceneX);
    _performValueRPN(rpn, rpnOpsSceneY, localsLookup);
    rpn.refSet(sceneY);
    _performValueRPN(rpn, rpnOpsWidth, localsLookup);
    rpn.refSet(width);
    _performValueRPN(rpn, rpnOpsHeight, localsLookup);
    rpn.refSet(height);
    rpn.stop();

    _stackPush(sceneY);
    _stackPush(sceneX);
    _stackPush(height);
    _stackPush(width);
    _stackPush(overlayY);
    _stackPush(overlayX);

    appendRaw(`VM_OVERLAY_SET_SUBMAP_EX .ARG5`);
    _stackPop(6);
};