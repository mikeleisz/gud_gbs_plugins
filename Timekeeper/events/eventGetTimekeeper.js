export const id = "GUD_EVENT_GET_TIMEKEEPER";
export const name = "Get Timekeeper";
export const groups = ["Gud GBS Plugins"];

export const autoLabel = (fetchArg) => {
	return `Get Time From Timekeeper`;
};

export const fields = [
    {
        key: "seconds",
        label: "Seconds Var",
        description: "Seconds Var",
        type: "variable",
        width: "50%",
        defaultValue: "LAST_VARIABLE",
    },
    {
        key: "minutes",
        label: "Minutes Var",
        description: "Minutes Var",
        type: "variable",
        width: "50%",
        defaultValue: "LAST_VARIABLE",
    },
    {
        key: "hours",
        label: "Hours Var",
        description: "Hours Var",
        type: "variable",
        width: "50%",
        defaultValue: "LAST_VARIABLE",
    },
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
            _stackPushConst, 
            _stackPop, 
            _setVariable, 
        } = helpers;
	
    _addComment("Get Time From Timekeeper");

    _stackPushConst(0);
    _stackPushConst(0);
    _stackPushConst(0);
    _callNative("vm_get_timekeeper");
    _setVariable(input.seconds, ".ARG0");
    _setVariable(input.minutes, ".ARG1");
    _setVariable(input.hours, ".ARG2");
    _stackPop(3);
};