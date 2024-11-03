const l10n = require("../helpers/l10n").default;

export const id = "GUD_EVENT_ACTOR_COLLISION_GROUP";
export const name = "Set Actor Collision Group";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_ACTOR"];
export const subGroups = {
	EVENT_GROUP_ACTOR: "EVENT_GROUP_SCRIPT",
	"Gud GBS Plugins": "ACTOR"
};

export const fields = [
    {
        key: "actorId",
        label: l10n("ACTOR"),
        description: l10n("FIELD_ACTOR_DEACTIVATE_DESC"),
        type: "actor",
        defaultValue: "$self$",
    },
    {
        key: "collisionGroup",
        label: "Collision Group",
        description: "Collision Group",
        type: "collisionMask",
        // includePlayer: false,
        includeNone: true,
        defaultValue: "1",
    }
];

export const compile = (input, helpers) => {
    const { _callNative, _stackPush, _stackPop, _addComment, _declareLocal, setActorId, _stackPushConst } = helpers;

    _addComment("Set Actor Collision Group");

    const collisionGroup = 1 << input.collisionGroup;
    _stackPushConst(collisionGroup);
    
    const tmpId = _declareLocal("tmp_id", 1, true);
    setActorId(tmpId, input.actorId);
    _stackPush(tmpId);
        
    _callNative("vm_set_actor_collision_group");
    _stackPop(2);   
};