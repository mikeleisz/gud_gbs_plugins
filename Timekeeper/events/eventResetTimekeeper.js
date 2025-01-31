export const id = "GUD_EVENT_RESET_TIMEKEEPER";
export const name = "Reset Timekeeper";
export const groups = ["Gud GBS Plugins"];

export const autoLabel = (fetchArg) => {
	return `Reset Timekeeper`;
};

export const fields = [
    {
        label: "Reset Timekeeper",
    },
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
        } = helpers;
	
    _addComment("Reset Timekeeper");
    _callNative("vm_reset_timekeeper");
};