export const id = "GUD_EVENT_START_TIMEKEEPER";
export const name = "Start Timekeeper";
export const groups = ["Gud GBS Plugins"];

export const autoLabel = (fetchArg) => {
	return `Start Timekeeper`;
};

export const fields = [
    {
        label: "Start Timekeeper",
    },
];

export const compile = (input, helpers) => {
	const { _callNative, 
            _addComment, 
        } = helpers;
	
    _addComment("Start Timekeeper");
    _callNative("vm_start_timekeeper");
};