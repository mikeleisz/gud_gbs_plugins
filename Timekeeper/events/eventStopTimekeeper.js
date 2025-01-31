export const id = "GUD_EVENT_STOP_TIMEKEEPER";
export const name = "Stop Timekeeper";
export const groups = ["Gud GBS Plugins"];

export const autoLabel = (fetchArg) => {
	return `Stop Timekeeper`;
};

export const fields = [
    {
        label: "Stop Timekeeper",
    },
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
        } = helpers;
	
    _addComment("Stop Timekeeper");
    _callNative("vm_stop_timekeeper");
};