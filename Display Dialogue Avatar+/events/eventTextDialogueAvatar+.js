const l10n = require("../helpers/l10n").default;

const id = "GUD_EVENT_TEXT";
const name = "Display Dialogue Avatar+"
const groups = ["EVENT_GROUP_DIALOGUE", "Gud GBS Plug-ins", "UI Elements+"];

const autoLabel = (fetchArg, args) => {
    if (([].concat(args.text) || []).join()) {
        return l10n("EVENT_TEXT_LABEL", {
            text: fetchArg("text"),
        });
    } else {
        l10n("EVENT_TEXT");
    }
};

const fields = [
    {
        key: "__section",
        type: "tabs",
        defaultValue: "text",
        variant: "eventSection",
        values: {
            text: l10n("FIELD_TEXT"),
            layout: l10n("FIELD_LAYOUT"),
            behavior: l10n("FIELD_BEHAVIOR"),
            presets: l10n("FIELD_PRESETS"),
        },
    },

    // Text Section

    {
        key: "text",
        type: "textarea",
        placeholder: l10n("FIELD_TEXT_PLACEHOLDER"),
        multiple: true,
        defaultValue: "",
        flexBasis: "100%",
        conditions: [
            {
                key: "__section",
                in: ["text", undefined],
            },
        ],
    },
    {
        key: "avatarId",
        type: "avatar",
        label: l10n("FIELD_TEXT_AVATAR"),
        description: l10n("FIELD_TEXT_AVATAR_DESC"),
        defaultValue: "",
        optional: true,
        width: "100%",
        conditions: [
            {
                key: "__section",
                in: ["text", undefined],
            },
        ],
    },
    {
        key: "avatarPos",
        label: l10n("Avatar Position"),
        type: "select",
        defaultValue: "left",
        optional: true,
        width: "100%",
        options: [
            ["left", l10n("FIELD_LEFT")],
            ["right", l10n("FIELD_RIGHT")],
        ],
        conditions: [
            {
                key: "__section",
                in: ["text", undefined],
            },
        ],
    },
    {
        type: "group",
        fields: [
            {
                key: `avatarX`,
                label: "Avatar Offset X",
                description: "Avatar Offset X",
                type: "number",
                min: -20,
                max: 20,
                defaultValue: 0,
                optional: true,
                width: "50%",
                conditions: [
                    {
                        key: "__section",
                        in: ["text", undefined],
                    },
                ],
            },
            {
                key: `avatarY`,
                label: "Avatar Offset Y",
                description: "Avatar Offset Y",
                type: "number",
                min: -18,
                max: 18,
                defaultValue: 0,
                optional: true,
                width: "50%",
                conditions: [
                    {
                        key: "__section",
                        in: ["text", undefined],
                    },
                ],
            },
        ]
    },
    {
        type: "break"
    },
    {
        label: "Dialogue Preview will not display changes to Avatar position.",
        width: "100%",
        conditions: [
            {
                key: "__section",
                in: ["text", undefined],
            },
        ],
    },

    // Layout Section
    {
        type: "group",
        conditions: [
            {
                key: "__section",
                in: ["layout"],
            },
        ],
        fields: [
            {
                key: `minHeight`,
                label: l10n("FIELD_MIN_HEIGHT"),
                description: l10n("FIELD_DIALOGUE_MIN_HEIGHT_DESC"),
                type: "number",
                min: 1,
                max: 18,
                width: "50%",
                defaultValue: 4,
            },
            {
                key: `maxHeight`,
                label: l10n("FIELD_MAX_HEIGHT"),
                description: l10n("FIELD_DIALOGUE_MAX_HEIGHT_DESC"),
                type: "number",
                min: 1,
                max: 18,
                width: "50%",
                defaultValue: 7,
            },
        ],
    },
    {
        type: "group",
        wrapItems: true,
        conditions: [
            {
                key: "__section",
                in: ["layout"],
            },
        ],
        fields: [
            {
                key: `textX`,
                label: l10n("FIELD_TEXT_X"),
                description: l10n("FIELD_TEXT_X_DESC"),
                type: "number",
                min: -20,
                max: 20,
                defaultValue: 1,
                width: "50%",
            },
            {
                key: `textY`,
                label: l10n("FIELD_TEXT_Y"),
                description: l10n("FIELD_TEXT_Y_DESC"),
                type: "number",
                min: -18,
                max: 18,
                defaultValue: 1,
                width: "50%",
            },
            {
                key: `textHeight`,
                label: l10n("FIELD_TEXT_SCROLL_HEIGHT"),
                description: l10n("FIELD_TEXT_SCROLL_HEIGHT_DESC"),
                type: "number",
                min: 1,
                max: 18,
                defaultValue: 5,
                width: "50%",
            },
            {
                key: `position`,
                label: l10n("FIELD_POSITION"),
                description: l10n("FIELD_DIALOGUE_POSITION_DESC"),
                type: "select",
                defaultValue: "bottom",
                width: "50%",
                options: [
                    ["bottom", l10n("FIELD_BOTTOM")],
                    ["top", l10n("FIELD_TOP")],
                ],
                conditions: [
                    {
                        key: "__section",
                        in: ["layout"],
                    },
                    {
                        parallaxEnabled: false,
                    },
                ],
            },
        ],
    },
    {
        type: "group",
        alignBottom: true,
        conditions: [
            {
                key: "__section",
                in: ["layout"],
            },
        ],
        fields: [
            {
                key: `clearPrevious`,
                label: l10n("FIELD_CLEAR_PREVIOUS"),
                description: l10n("FIELD_CLEAR_PREVIOUS_DESC"),
                type: "checkbox",
                defaultValue: true,
                width: "50%",
                conditions: [
                    {
                        key: "__section",
                        in: ["layout"],
                    },
                ],
            },
            {
                key: `showFrame`,
                label: l10n("FIELD_SHOW_FRAME"),
                description: l10n("FIELD_SHOW_FRAME_DESC"),
                type: "checkbox",
                defaultValue: "true",
                width: "50%",
                conditions: [
                    {
                        key: "__section",
                        in: ["layout"],
                    },
                    {
                        key: "clearPrevious",
                        in: [true, undefined],
                    },
                ],
            },
        ],
    },
    {
        type: "group",
        alignBottom: true,
        conditions: [
            {
                key: "__section",
                in: ["behavior"],
            },
        ],
        fields: [
            {
                label: l10n("TEXT_SPEED_IN"),
                description: l10n("TEXT_SPEED_IN_DESC"),
                key: "speedIn",
                type: "cameraSpeed",
                defaultValue: -1,
                width: "50%",
                allowDefault: true,
                conditions: [
                    {
                        key: "__section",
                        in: ["behavior"],
                    },
                ],
            },
            {
                label: l10n("TEXT_SPEED_OUT"),
                description: l10n("TEXT_SPEED_OUT_DESC"),
                key: "speedOut",
                type: "cameraSpeed",
                defaultValue: -1,
                width: "50%",
                allowDefault: true,
                conditions: [
                    {
                        key: "__section",
                        in: ["behavior"],
                    },
                ],
            },
        ],
    },
    {
        key: `closeWhen`,
        label: l10n("FIELD_CLOSE_WHEN"),
        description: l10n("FIELD_CLOSE_WHEN_DESC"),
        type: "select",
        defaultValue: "key",
        options: [
            ["key", l10n("FIELD_BUTTON_PRESSED")],
            ["text", l10n("FIELD_TEXT_FINISHED")],
            ["notModal", l10n("FIELD_NEVER_NONMODAL")],
        ],
        conditions: [
            {
                key: "__section",
                in: ["behavior"],
            },
        ],
    },
    {
        label: l10n("FIELD_NONMODAL_POSITION_TOP_WARNING"),
        labelVariant: "warning",
        flexBasis: "100%",
        conditions: [
            {
                key: "__section",
                in: ["layout", "behavior"],
            },
            {
                key: "position",
                eq: "top",
            },
            {
                key: "closeWhen",
                eq: "notModal",
            },
            {
                parallaxEnabled: false,
            },
        ],
    },
    {
        type: "group",
        wrapItems: true,
        conditions: [
        {
            key: "__section",
            in: ["layout", "behavior"],
        },
        {
            key: "position",
            eq: "top",
        },
        {
            key: "closeWhen",
            eq: "notModal",
        },
        {
            parallaxEnabled: false,
        },
        ],
            fields: [
            {
                type: "addEventButton",
                hideLabel: true,
                label: l10n("EVENT_DIALOGUE_CLOSE_NONMODAL"),
                defaultValue: {
                    id: "EVENT_DIALOGUE_CLOSE_NONMODAL",
                },
                width: "50%",
            },
            {
                type: "addEventButton",
                hideLabel: true,
                label: l10n("EVENT_OVERLAY_SET_SCANLINE_CUTOFF"),
                defaultValue: {
                    id: "EVENT_OVERLAY_SET_SCANLINE_CUTOFF",
                    values: {
                        y: { type: "number", value: 150 },
                        units: "pixels",
                    },
                },
                width: "50%",
            },
        ],
    },
    {
        key: "closeButton",
        type: "togglebuttons",
        alignBottom: true,
        options: [
            ["a", "A"],
            ["b", "B"],
            ["any", l10n("FIELD_ANY")],
        ],
        allowNone: false,
        defaultValue: "a",
        conditions: [
            {
                key: "__section",
                in: ["behavior"],
            },
            {
                key: "closeWhen",
                in: ["key", undefined],
            },
        ],
    },
    {
        key: "closeDelayTime",
        label: l10n("FIELD_CLOSE_DELAY"),
        description: l10n("FIELD_CLOSE_DELAY_DESC"),
        type: "number",
        min: 0,
        max: 3600,
        step: 0.1,
        defaultValue: 0.5,
        unitsField: "closeDelayUnits",
        unitsDefault: "time",
        unitsAllowed: ["time", "frames"],
        conditions: [
            {
                key: "__section",
                in: ["behavior"],
            },
            {
                key: "closeDelayUnits",
                ne: "frames",
            },
            {
                key: "closeWhen",
                in: ["text"],
            },
        ],
    },
    {
        key: "closeDelayFrames",
        label: l10n("FIELD_CLOSE_DELAY"),
        description: l10n("FIELD_CLOSE_DELAY_DESC"),
        type: "number",
        min: 0,
        max: 3600,
        defaultValue: 30,
        unitsField: "closeDelayUnits",
        unitsDefault: "time",
        unitsAllowed: ["time", "frames"],
        conditions: [
            {
                key: "__section",
                in: ["behavior"],
            },
            {
                key: "closeDelayUnits",
                eq: "frames",
            },
            {
                key: "closeWhen",
                in: ["text"],
            },
        ],
    },
    {
        type: "presets",
        conditions: [
            {
                key: "__section",
                in: ["presets"],
            },
        ],
    },
];

const userPresetsGroups = [
    {
        id: "text",
        label: l10n("FIELD_TEXT"),
        fields: ["text"],
    },
    {
        id: "avatar",
        label: l10n("FIELD_TEXT_AVATAR"),
        fields: [
            "avatarId",
            "avatarPos",
            "avatarX",
            "avatarY"
        ],
    },
    {
        id: "layout",
        label: l10n("FIELD_LAYOUT"),
        fields: [
        "position",
        "minHeight",
        "maxHeight",
        "textX",
        "textY",
        "textHeight",
        "clearPrevious",
        "showFrame",
        ],
        selected: true,
    },
    {
        id: "behaviour",
        label: l10n("FIELD_BEHAVIOR"),
        fields: [
        "speedIn",
        "speedOut",
        "closeWhen",
        "closeButton",
        "closeDelayTime",
        "closeDelayFrames",
        ],
        selected: true,
    },
];

const userPresetsIgnore = ["__section"];

const calculateTextBoxHeight = ({
    textLines,
    textY,
    textHeight,
    minHeight,
    maxHeight,
    showFrame,
  }) =>
Math.max(
    minHeight,
    Math.min(
        maxHeight,
        Math.min(textLines, textHeight) + textY + (showFrame ? 1 : 0)
    )
);

const decOct = (dec) => wrap8Bit(dec).toString(8).padStart(3, "0");
const wrap8Bit = (val) => (256 + (val % 256)) % 256;

const textCodeSetSpeed = (speed) => {
    return `\\001\\${decOct(speed + 1)}`;
};
  
const textCodeSetFont = (fontIndex) => {
    return `\\002\\${decOct(fontIndex + 1)}`;
};
  
const textCodeGoto = (x, y) => {
    return `\\003\\${decOct(x)}\\${decOct(y)}`;
};
  
const textCodeGotoRel = (x, y) => {
    return `\\004\\${decOct(x)}\\${decOct(y)}`;
};

const compile = (input, helpers) => {
    const { options, 
            textNumLines, 
            _addComment, 
            _stackPushConst, 
            _getMemUInt8, 
            _setConstMemUInt8, 
            _loadStructuredText, 
            _overlayClear, 
            _overlayMoveTo, 
            _overlaySetScroll, 
            _displayText, 
            _overlayWait, 
            _idle,
            _declareLocal, 
            stackPtr, 
            _setConst, 
            _invoke, 
            _assertStackNeutral,
            _setMemUInt8, 
            _stackPop, 
            _addNL } = helpers;

    let closeDelayFrames = 0;   
    if (input.closeDelayUnits === "frames") {
        closeDelayFrames =
        typeof input.closeDelayFrames === "number" ? input.closeDelayFrames : 30;
    } else {
        const seconds =
        typeof input.closeDelayTime === "number" ? input.closeDelayTime : 0.5;
        closeDelayFrames = Math.ceil(seconds * 60);
    }

    const convertSpeed = (value) => {
        if (value > 0) {
            return value - 1;
        }
        if (value === 0) {
            return -3;
        }
            return -1;
    };

    // BEGIN TEXT DIALOGUE REPLACEMENT //////////////////////////////////////////

    // replicate textDialogue() inputs
    const inputText = input.text || " ";
    const avatarId = input.avatarId;
    const minHeight = input.minHeight;
    const maxHeight = input.maxHeight;
    const position = input.position ?? "bottom";
    const showFrame = input.showFrame ?? true;
    const clearPrevious = input.clearPrevious ?? true;
    const textX = input.textX ?? 1;
    const textY = input.textY ?? 1;
    const textHeight = input.textHeight ?? 5;
    const speedIn = convertSpeed(input.speedIn);
    const speedOut = convertSpeed(input.speedOut);
    const closeWhen = input.closeWhen ?? "key";
    const closeButton = input.closeButton ?? "a";

    const { scene } = options;
    const _input = Array.isArray(inputText) ? inputText : [inputText];

    const overlayInSpeed = speedIn === -1 ? ".OVERLAY_IN_SPEED" : speedIn;
    const overlayOutSpeed = speedOut === -1 ? ".OVERLAY_OUT_SPEED" : speedOut;

    const initialNumLines = _input.map(textNumLines);
    const maxNumLines = Math.max.apply(null, initialNumLines);
    const textBoxHeight = calculateTextBoxHeight({
        textLines: maxNumLines,
        textY,
        textHeight,
        minHeight,
        maxHeight,
        showFrame,
    });

    const isModal = closeWhen !== "notModal";
    const renderOnTop = position === "top" && !scene.parallax;
    const textBoxY = renderOnTop ? 0 : 18 - textBoxHeight;
    const x = decOct(Math.max(1, 1 + textX + (avatarId && input.avatarPos == "left" ? 2 : 0)));
    const y = decOct(Math.max(1, 1 + textY));
    const textPosSequence = `\\003\\${x}\\${y}`;

    _addComment("Text Dialogue");

    if (renderOnTop) {
        _stackPushConst(0);
        _getMemUInt8(".ARG0", "overlay_cut_scanline");
        _setConstMemUInt8("overlay_cut_scanline", textBoxHeight * 8 - 1);
    }

    _input.forEach((text, textIndex) => {
        let avatarIndex = undefined;
        if (avatarId) {
            const { avatars } = options;
            avatarIndex = avatars.findIndex((a) => a.id === avatarId);
            if (avatarIndex < 0) {
                avatarIndex = undefined;
            }
        }

        // HANDLE AVATAR //////////////////////////////////////////////////////////

        text = `${textPosSequence}${text}`;

        const _avatarIndex = avatarIndex;

        // Add avatar
        if (_avatarIndex !== undefined) {
            const { fonts } = options;
            const avatarFontSize = 16;
            const fontIndex = fonts.length + Math.floor(_avatarIndex / avatarFontSize);
            const baseCharCode = ((_avatarIndex * 4) % (avatarFontSize * 4)) + 64;

            const avatarX = input.avatarPos == "left" ? 1 + input.avatarX : 17 + input.avatarX;
            const avatarY = 1 + input.avatarY;
            const aX = decOct(Math.max(1, 1 + avatarX));
            const aY = decOct(Math.max(1, 1 + avatarY));
            const avatarPosSequence = avatarX !== 1 || avatarY !== 1 ? `\\003\\${aX}\\${aY}` : "";

            text = `${textCodeSetSpeed(0)}${textCodeSetFont(
                fontIndex
            )}${String.fromCharCode(baseCharCode)}${String.fromCharCode(
                baseCharCode + 1
            )}\\n${String.fromCharCode(baseCharCode + 2)}${String.fromCharCode(
                baseCharCode + 3
            )}${textCodeSetSpeed(2)}${textCodeGotoRel(1, -1)}${textCodeSetFont(
                0
            )}${text}`;

            text = `${avatarPosSequence}${text}`;
        }

        _loadStructuredText(
            text,
            undefined,
            textHeight
        );

        ///////////////////////////////////////////////////////////////////////////////

        if (clearPrevious) {
            _overlayClear(
                0,
                0,
                20,
                textBoxHeight,
                ".UI_COLOR_WHITE",
                showFrame,
                false
            );
        }

        // Animate first dialogue window of sequence on screen
        if (textIndex === 0) {  
            _overlayMoveTo(
                0,
                renderOnTop ? textBoxHeight : 18,
                ".OVERLAY_SPEED_INSTANT"
            );
            _overlayMoveTo(0, textBoxY, overlayInSpeed);

            _overlaySetScroll(
                textX + (avatarId ? 2 : 0),
                textY,
                (showFrame ? 19 : 20) - (avatarId ? 2 : 0) - textX,
                textHeight,
                ".UI_COLOR_WHITE"
            );
        }

        _displayText(); 

        if (isModal) {
            const waitFlags = [
                ".UI_WAIT_WINDOW",
                ".UI_WAIT_TEXT",
            ];
        
            if (closeWhen === "key") {
                if (closeButton === "a") {
                    waitFlags.push(".UI_WAIT_BTN_A");
                }
                if (closeButton === "b") {
                    waitFlags.push(".UI_WAIT_BTN_B");
                }
                if (closeButton === "any") {
                    waitFlags.push(".UI_WAIT_BTN_ANY");
                }
            }

            _overlayWait(isModal, waitFlags);

            if (closeWhen === "text" && closeDelayFrames > 0) {
                if (closeDelayFrames < 5) {
                    for (let i = 0; i < closeDelayFrames; i++) {
                        _idle();
                    }
                } else {
                    const waitArgsRef = _declareLocal("wait_args", 1, true);
                    const _stackPtr = stackPtr;
                    _setConst(waitArgsRef, Math.round(closeDelayFrames));
                    _invoke("wait_frames", 0, waitArgsRef);
                    _assertStackNeutral(_stackPtr);
                }
            }
        }

        // Animate final dialogue window of sequence off screen
        if (textIndex === _input.length - 1) {
            if (isModal) {
                _overlayMoveTo(
                    0,
                    renderOnTop ? textBoxHeight : 18,
                    overlayOutSpeed
                );
                _overlayWait(true, [".UI_WAIT_WINDOW", ".UI_WAIT_TEXT"]);
            }
        }
    });

    // Reset scanline when rendering on top (as long as it wasn't non-modal)
    if (isModal && renderOnTop) {
        _overlayMoveTo(0, 18, ".OVERLAY_SPEED_INSTANT");
        _idle();
        _setMemUInt8("overlay_cut_scanline", ".ARG0");
    }

    if (renderOnTop) {
        _stackPop(1);
    }

    _addNL();
};

module.exports = {
    id,
    name,
    description: l10n("EVENT_TEXT_DESC"),
    autoLabel,
    groups,
    fields,
    compile,
    waitUntilAfterInitFade: true,
    userPresetsGroups,
    userPresetsIgnore,
    helper: {
        type: "text",
        text: "text",
        avatarId: "avatarId",
        minHeight: "minHeight",
        maxHeight: "maxHeight",
        showFrame: "showFrame",
        clearPrevious: "clearPrevious",
        textX: "textX",
        textY: "textY",
        textHeight: "textHeight",
    },
};