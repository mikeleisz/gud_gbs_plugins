export const id = "GUD_EVENT_ACTOR_ON_HIT";
export const name = "Call Actor Hit Script";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_ACTOR"];
export const subGroups = {
	EVENT_GROUP_ACTOR: "EVENT_GROUP_SCRIPT",
	"Gud GBS Plugins": "ACTOR"
};

export const autoLabel = (fetchArg, args) => {
	const actor = fetchArg("targetActor");
    const collisionGroup = fetchArg("collisionGroup");
	return `Call ${actor} Hit Script: ${collisionGroup}`;
};

export const fields = [
    {
        key: "targetActor",
        label: "Target Actor",
        type: "actor",
    },
    {
        key: "collisionGroup",
        label: "Collision Group",
        description: "Actor OnHit Script Group",
        type: "collisionMask",
        includePlayer: true,
        defaultValue: "1",
    }
];

export const compile = (input, helpers) => {
    const { _stackPushConst, _stackPushReference, _callNative, _stackPop, getActorIndex } = helpers;

    const actorIndex = getActorIndex(input.targetActor);
    const collisionGroup = 1 << input.collisionGroup;
    
    _stackPushConst(collisionGroup);
    _stackPushReference(actorIndex);
    _callNative("call_actor_onhit_script");
    _stackPop(2);
};