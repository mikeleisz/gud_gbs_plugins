const l10n = require("../helpers/l10n").default;

export const id = "GUD_EVENT_IF_COLLISION_AT_TILE";
export const name = "If Collision Data At Tile";
export const groups = ["Gud GBS Plugins", "Collision"];
export const subGroups = {
  "Gud GBS Plugins": "COLLISION DATA",
  "Collision": "COLLISION DATA"
};

export const autoLabel = (fetchArg, args) => {
  const x = fetchArg("tx");
  const y = fetchArg("ty");
  const mask = fetchArg("tileMask");
  const n = Number(mask).toString(16).toUpperCase();
  return `If Tile Collision Data 0x${n == 3 ? 0 : n} at (${x}, ${y})`;
};

export const fields = [
  {
    type: "group",
    label: "Tile",
    fields: [
        {
            key: "tx",
            label: "Tile X",
            type: "value",
            min: 0,
            width: "50%",
            defaultValue: {
                type: "number",
                value: 0,
            }
        },
        {
            key: "ty",
            label: "Tile Y",
            type: "value",
            min: 0,
            width: "50%",
            defaultValue: {
                type: "number",
                value: 0,
            }
        }
      ]
    },
    {
        key: "tileMask",
        label: "Tile Collision Mask",
        description: "The type of collision tile to check for",
        type: "select",
        options: [
          [0xF, "Solid - 0xF"],
          [0x1, "Collision Top - 0x1"],
          [0x2, "Collision Bottom - 0x2"],
          [0x4, "Collision Left - 0x4"],
          [0x8, "Collision Right - 0x8"],
          [0x10, "Ladder - 0x10"],
          [0x60, "Slope - 0x60"],
          [0x80, "Spare 8 - 0x80"],
          [0x90, "Spare 9 - 0x90"],
          [0xA0, "Spare 10 - 0xA0"],
          [0xB0, "Spare 11 - 0xB0"],
          [0xC0, "Spare 12 - 0xC0"],
          [0xD0, "Spare 13 - 0xD0"],
          [0xE0, "Spare 14 - 0xE0"],
          [0xF0, "Spare 15 - 0xF0"],
          [0x3, "No Collision - 0x0"],
        ],
        "defaultValue": 15
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
    const { variableSetToScriptValue,
            _ifConst, getNextLabel, 
            _jump, 
            _label, 
            _set, 
            _declareLocal, 
            _stackPush, 
            _stackPushConst, 
            _callNative, 
            _stackPop, 
            compileEvents } = helpers;


    // local for storing stack result
    const result = _declareLocal("result", 1, true);

    _stackPushConst(input.tileMask);

    const tileY = _declareLocal("tile_y", 1, true);
    variableSetToScriptValue(tileY, input.ty);
    _stackPush(tileY);
    
    const tileX = _declareLocal("tile_x", 1, true);
    variableSetToScriptValue(tileX, input.tx);
    _stackPush(tileX);
    
    _callNative("if_collision_at_tile");
    // store results into local
    _set(result, ".ARG2");
    _stackPop(3);

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