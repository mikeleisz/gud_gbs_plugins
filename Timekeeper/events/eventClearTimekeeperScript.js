const id = "GUD_EVENT_CLEAR_TIMEKEEPER_SCRIPT";
const groups = ["Gud GBS Plugins"];
const name = "Clear Timekeeper Script";

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
		conditions: [
			{
				key: "clearType",
				ne: "1"
			}
		]
	},
	{
		key: "clearType",
		label: "Clear Type",
		type: "select",
		defaultValue: "0",
		options: [
			["0", "Clear Selected Timekeeper Script"],
			["1", "Clear ALL Timekeeper Scripts"],
		],
	},
];
	
const compile = (input, helpers) => {
	const {appendRaw, _addComment} = helpers;
	const stateNumber = `${input.state}`;
	const clearType = `${input.clearType}`;

	_addComment("Remove Timekeeper Script");
	appendRaw(`VM_PUSH_CONST ${clearType}`);
	appendRaw(`VM_PUSH_CONST ${stateNumber}`);
	appendRaw(`VM_CALL_NATIVE b_vm_clear_timekeeper_script, _vm_clear_timekeeper_script`);
	appendRaw(`VM_POP 2`);
};
	
module.exports = {
	id,
	name,
	groups,
	fields,
	compile,
	allowedBeforeInitFade: true,
};