const id = "GUD_EVENT_TD_COLLISION_SCRIPT";
const groups = ["Gud GBS Plugins", "Collision"];
const subGroups = {
    "Gud GBS Plugins": "TopDown Tile Collisions",
	"Collision": "TopDown Tile Collisions"
};
const name = "Attach TopDown Tile Collision Script";

const fields = [
	{
		key: "state",
		label: "Select Collision Type",
		type: "select",
		defaultValue: "0",
		options: [
			["0", "Solid - 0xF"],
			["1", "Collision Top - 0x1"],
			["2", "Collision Bottom - 0x2"],
			["3", "Collision Left - 0x4"],
			["4", "Collision Right - 0x8"],
			["5", "Ladder - 0x10"],
			["6", "Slope - 0x60"],
			["7", "Spare 8 - 0x80"],
			["8", "Spare 9 - 0x90"],
			["9", "Spare 10 - 0xA0"],
			["10", "Spare 11 - 0xB0"],
			["11", "Spare 12 - 0xC0"],
			["12", "Spare 13 - 0xD0"],
			["13", "Spare 14 - 0xE0"],
			["14", "Spare 15 - 0xF0"],
		],
	},
	{
		key: "retrigger",
		label: "Retrigger",
		type: "checkbox",
		defaultValue: false,
		width: "50%",
	},
	{
		label: "On Collision Script will retrigger while touching collision tile.",
		conditions: [
			{
				key: "retrigger",
				eq: true,
			},
		],
	},
	{
		label: "On Collision Script will trigger when first touching collision tile.",
		conditions: [
			{
				key: "retrigger",
				ne: true,
			},
		],
	},
	{
		key: "__scriptTabs",
		type: "tabs",
		defaultValue: "scriptinput",
		values: {
			scriptinput: "On Collision",
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
	{
		key: "__scriptTabsEnd",
		type: "tabs",
		defaultValue: "scriptinput",
		values: {
			scriptinput: "On Exit Collision",
		},
	},
	{
		key: "endscript",
		label: "Script",
		description: "Collision End Script",
		type: "events",
		allowedContexts: ["global", "entity"],
		conditions: [
			{
				key: "__scriptTabsEnd",
				in: [undefined, "scriptinput"],
			},
		],
	},
];
	
const compile = (input, helpers) => {
	const {appendRaw, _compileSubScript, _addComment } = helpers;

	const ScriptRef = _compileSubScript("state", input.script, "collision_script"+input.state);
	const stateNumber = `${input.state}`;
	const bank = `___bank_${ScriptRef}`;
	const ptr = `_${ScriptRef}`
	const retrigger = input.retrigger == true ? "1" : "0";

	_addComment("Set Collision Script");
	appendRaw(`VM_PUSH_CONST ${retrigger}`);
	appendRaw(`VM_PUSH_CONST ${stateNumber}`);
	appendRaw(`VM_PUSH_CONST ${bank}`);
	appendRaw(`VM_PUSH_CONST ${ptr}`);
	appendRaw(`VM_CALL_NATIVE b_assign_td_collision_script, _assign_td_collision_script`);
	appendRaw(`VM_POP 4`);

	const EndScriptRef = _compileSubScript("state", input.endscript, "collision_end_script"+input.state);
	const endBank = `___bank_${EndScriptRef}`;
	const endPtr = `_${EndScriptRef}`

	_addComment("Set Collision End Script");
	appendRaw(`VM_PUSH_CONST ${stateNumber}`);
	appendRaw(`VM_PUSH_CONST ${endBank}`);
	appendRaw(`VM_PUSH_CONST ${endPtr}`);
	appendRaw(`VM_CALL_NATIVE b_assign_td_collision_end_script, _assign_td_collision_end_script`);
	appendRaw(`VM_POP 3`);
};
	
module.exports = {
	id,
	name,
	groups,
	subGroups,
	fields,
	compile,
	allowedBeforeInitFade: true,
};