export const id = "GUD_EVENT_GET_ACTOR_ID_CUSTOM_SCRIPTS";
export const name = "Store Actor ID In Variable (Custom Scripts)";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_ACTOR"];
export const subGroups = {
	EVENT_GROUP_ACTOR: "EVENT_GROUP_VARIABLES",
	"Gud GBS Plugins": "ACTOR"
};

export const fields = [
	{
		key: "actorId",
		label: "Target Actor",
		type: "actor",
	},
	{
		key: "target",
		label: "Target Variable",
		type: "variable",
		defaultValue: "LAST_VARIABLE",
	}
];  

export const compile = (input, helpers) => {
	const {_setVariable, _stackPop, _stackPush, getVariableAlias } = helpers;

	const actorIndex = getVariableAlias(input.actorId);
	_stackPush(actorIndex);

	_setVariable(input.target, ".ARG0");
	_stackPop(1);
};