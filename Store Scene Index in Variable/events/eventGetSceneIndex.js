const l10n = require("../helpers/l10n").default;

const id = "GUD_EVENT_GET_SCENE_INDEX";
const name = "Store Scene Index In Variable";
const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCENE"];

export const autoLabel = (fetchArg, args) => {
    const target = fetchArg("target");
    return `Store Scene Index into ${target}`;
};

const fields = [
	{
		type: "group",
		fields: [
			{
				key: "sceneId",
				label: l10n("SCENE"),
				description: l10n("FIELD_SCENE_DESC"),
				type: "scene",
				defaultValue: "LAST_SCENE",
				width: "75%",
			},
			{
				key: "target",
				label: "Target Variable",
				type: "variable",
				defaultValue: "LAST_VARIABLE",
			},
		]
	},
];

const compile = (input, helpers) => {
	const { 
		options,
		_addComment,
		_stackPushConst,
		_stackPop,
		_setVariable,

	} = helpers;

	_addComment("Store Scene Index In Variable");

	const { scenes } = options;
	const scene = scenes.find((s) => s.id === input.sceneId);

	const symbol = scene.symbol;
	const index = Number(symbol.split("_")[1]);

	_stackPushConst(index);
	_setVariable(input.target, ".ARG0");
	_stackPop(1);
};

module.exports = {
	id,
	name,
	groups,
	autoLabel,
	fields,
	compile,
	waitUntilAfterInitFade: false,
};