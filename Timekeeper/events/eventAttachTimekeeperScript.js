const id = "GUD_EVENT_ATTACH_TIMEKEEPER_SCRIPT";
const name = "Attach Timekeeper Script";
const groups = ["Gud GBS Plugins"];

const fields = [
	{
		key: "state",
		label: "Select Event Type",
		type: "select",
		defaultValue: "0",
		options: [
			["0", "Seconds"],
			["1", "Minutes"],
            ["2", "Hours"],
		],
	},
    {
		key: "__scriptTabs",
		type: "tabs",
		defaultValue: "scriptinput",
		values: {
			scriptinput: "Timekeeper Script",
		},
	},
	{
		key: "script",
		label: "Script",
		description: "Script",
		type: "events",
		allowedContexts: ["global", "entity"],
		conditions: [
			{
				key: "__scriptTabs",
				in: [undefined, "scriptinput"],
			},
		],
	},
];
	
const compile = (input, helpers) => {
	const {appendRaw, _compileSubScript, _addComment } = helpers;

	const ScriptRef = _compileSubScript("state", input.script, "timekeeper_script"+input.state);
	const stateNumber = `${input.state}`;
	const bank = `___bank_${ScriptRef}`;
	const ptr = `_${ScriptRef}`

	_addComment("Attach Timekeeper Script");
	appendRaw(`VM_PUSH_CONST ${stateNumber}`);
	appendRaw(`VM_PUSH_CONST ${bank}`);
	appendRaw(`VM_PUSH_CONST ${ptr}`);
	appendRaw(`VM_CALL_NATIVE b_vm_assign_timekeeper_script, _vm_assign_timekeeper_script`);
	appendRaw(`VM_POP 4`);
};
	
module.exports = {
	id,
	name,
	groups,
	fields,
	compile,
	allowedBeforeInitFade: true,
};