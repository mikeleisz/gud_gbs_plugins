const l10n = require("../helpers/l10n").default;

export const id = "GUD_EVENT_IF_ACTOR_STATE";
export const name = "If Actor State";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_ACTOR"];
export const subGroups = {
	EVENT_GROUP_ACTOR: "EVENT_GROUP_SCRIPT",
	"Gud GBS Plugins": "ACTOR"
};

export const autoLabel = (fetchArg, args) => {
    const state = fetchArg("state");
    let s = "";
    switch (Number(state)) {
        case 0:
        s = "Active";
        break;
        case 1:
        s = "Deactivated";
        break;
        case 2:
        s = "Hidden";
        break;
        case 3:
        s = "Not Hidden"
        break;
        case 4:
        s = "Persistent"
        break;
        case 5:
        s = "Pinned"
        break;
        case 6:
        s = "On Screen"
        break;
        case 7:
        s = "Off Screen"
        break;
    }
    return `If Actor Is ${s}`;
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
        key: "state",
        label: "State",
        description: "The actor state to check for",
        type: "select",
        options: [
          [0, "Active"],
          [1, "Deactivated"],
          [2, "Hidden"],
          [3, "Not Hidden"],
          [4, "Persistent"],
          [5, "Pinned"],
          [6, "On Screen"],
          [7, "Off Screen"],
        ],
        "defaultValue": 0
    },
    {
        key: "true",
        label: l10n("FIELD_TRUE"),
        description: l10n("FIELD_TRUE_DESC"),
        type: "events",
    },
    {
        key: "__collapseElse",
        label: l10n("FIELD_ELSE"),
        type: "collapsable",
        defaultValue: true,
        conditions: [
        {
            key: "__disableElse",
            ne: true,
        },
        ],
    },
    {
        key: "false",
        label: l10n("FIELD_FALSE"),
        description: l10n("FIELD_FALSE_DESC"),
        conditions: [
        {
            key: "__collapseElse",
            ne: true,
        },
        {
            key: "__disableElse",
            ne: true,
        },
        ],
        type: "events",
    },
];
  
export const compile = (input, helpers) => {
    const { _ifConst, getNextLabel, 
            _jump, 
            _label, 
            _set, 
            _declareLocal, 
            _stackPush, 
            _stackPushConst, 
            _callNative, 
            _stackPop, 
            setActorId,
            compileEvents } = helpers;

    // local for storing stack result
    const result = _declareLocal("result", 1, true);
    const actorId = _declareLocal("actor_id", 1, true);

    setActorId(actorId, input.actorId);
    
    _stackPushConst(input.state);
    _stackPush(actorId);

    _callNative("vm_if_actor_state");
    // store results into local
    _set(result, ".ARG1");
    _stackPop(2);

    // if, else events
    const truePath = input.true;
    const falsePath = input.__disableElse ? [] : input.false;
    // if, else labels
    const trueLabel = getNextLabel();
    const falseLabel = getNextLabel();

    // branch and compile events
    _ifConst(".EQ", result, 1, trueLabel, 0);

    // false path
    compileEvents(falsePath);
    _jump(falseLabel);

    // true path
    _label(trueLabel);
    compileEvents(truePath);

    // end
    _label(falseLabel);
};