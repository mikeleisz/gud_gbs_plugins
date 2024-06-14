export const id = "GUD_GET_ACTOR_ID";
export const name = "Store Actor ID In Variable";
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
	const {_stackPushReference, _setVariable, _stackPop, getActorIndex } = helpers;

	const actorIndex = getActorIndex(input.actorId);

	_stackPushReference(actorIndex);
	_setVariable(input.target, ".ARG0");
	_stackPop(1);
};