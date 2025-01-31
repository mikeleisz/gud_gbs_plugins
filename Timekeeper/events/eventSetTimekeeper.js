export const id = "GUD_EVENT_SET_TIMEKEEPER";
export const name = "Set Timekeeper";
export const groups = ["Gud GBS Plugins"];

export const autoLabel = (fetchArg) => {
	return `Set Timekeeper`;
};

export const fields = [
    {
        key: "seconds",
        label: "Seconds",
        description: "Seconds",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    },
    {
        key: "minutes",
        label: "Minutes",
        description: "Minutes",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    },
    {
        key: "hours",
        label: "Hours",
        description: "Hours",
        type: "value",
        width: "50%",
        defaultValue: {
            type: "number",
            value: 0,
        },
    }
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
            _stackPush,
            _stackPop,
            _declareLocal,
            variableSetToScriptValue
        } = helpers;
	
    _addComment("Set Timekeeper");

    const tmpHours = _declareLocal("tmp_hours", 1, true);
    variableSetToScriptValue(tmpHours, input.hours);
    _stackPush(tmpHours);

    const tmpMins = _declareLocal("tmp_mins", 1, true);
    variableSetToScriptValue(tmpMins, input.minutes);
    _stackPush(tmpMins);

    const tmpSecs = _declareLocal("tmp_secs", 1, true);
    variableSetToScriptValue(tmpSecs, input.seconds);
    _stackPush(tmpSecs);

	_callNative("vm_set_timekeeper");

    _stackPop(3);
};