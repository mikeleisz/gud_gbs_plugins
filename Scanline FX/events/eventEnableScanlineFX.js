export const id = "GUD_EVENT_ENABLE_ISRFX";
export const name = "Enable Scanline FX";
export const groups = ["Gud GBS Plugins"];

export const fields = [
    {
        label: "Enable Scanline FX"
    },
    {
        key: "scnStart",
        label: "Scanline Start",
        type: "value",
        min: 0,
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        }
    },
    {
        key: "scnEnd",
        label: "Scanline End",
        type: "value",
        min: 0,
        width: "50%",
        defaultValue: {
            type: "number",
            value: 144,
            min: 0,
        }
    },
    {
        key: "stepSize",
        label: "Scanline Step Size",
        type: "value",
        min: 2,
        width: "50%",
        defaultValue: {
            type: "number",
            value: 2,
        }
    },
];

export const compile = (input, helpers) => {
    const { _callNative,
        _declareLocal,
        variableSetToScriptValue,
        _setMemInt16,
        _stackPush,
        _stackPop
     } = helpers;

    const scanlineStart = _declareLocal("scn_start", 1, true);
    variableSetToScriptValue(scanlineStart, input.scnStart);
    _stackPush(scanlineStart);
    _setMemInt16("scanline_fx_start", ".ARG0");

    const scanlineEnd = _declareLocal("scn_end", 1, true);
    variableSetToScriptValue(scanlineEnd, input.scnEnd);
    _stackPush(scanlineEnd);
    _setMemInt16("scanline_fx_end", ".ARG0");

    const scanlineStep = _declareLocal("scn_step", 1, true);
    variableSetToScriptValue(scanlineStep, input.stepSize);
    _stackPush(scanlineStep);
    _setMemInt16("scanline_fx_chunksize", ".ARG0");

    _stackPop(3);

    _callNative("enable_scanline_fx");
};