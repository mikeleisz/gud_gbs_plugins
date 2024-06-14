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
			["6", "Spare 8 - 0x80"],
			["7", "Spare 9 - 0x90"],
			["8", "Spare 10 - 0xA0"],
			["9", "Spare 11 - 0xB0"],
			["10", "Spare 12 - 0xC0"],
			["11", "Spare 13 - 0xD0"],
			["12", "Spare 14 - 0xE0"],
			["13", "Spare 15 - 0xF0"],
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
		description: "Collision Script",
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
	const ScriptRef = _compileSubScript("state", input.script, "collision_script"+input.state);
	const stateNumber = `${input.state}`;
	const bank = `___bank_${ScriptRef}`;
	const ptr = `_${ScriptRef}`

	_addComment("Set Collision Script");
	appendRaw(`VM_PUSH_CONST ${stateNumber}`);
	appendRaw(`VM_PUSH_CONST ${bank}`);
	appendRaw(`VM_PUSH_CONST ${ptr}`);
	appendRaw(`VM_CALL_NATIVE b_assign_td_collision_script, _assign_td_collision_script`);
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