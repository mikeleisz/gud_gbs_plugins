const l10n = require("../helpers/l10n").default;
const scriptValueHelpers = require("shared/lib/scriptValue/helpers");

export const id = "GUD_IF_COLLISION_AT_TILE";
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
  return `If Tile Collision Data at (${x}, ${y}) == 0x${Number(mask).toString(16).toUpperCase()}`;
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
          [0x80, "Spare 8 - 0x80"],
          [0x90, "Spare 9 - 0x90"],
          [0xA0, "Spare 10 - 0xA0"],
          [0xB0, "Spare 11 - 0xB0"],
          [0xC0, "Spare 12 - 0xC0"],
          [0xD0, "Spare 13 - 0xD0"],
          [0xE0, "Spare 14 - 0xE0"],
          [0xF0, "Spare 15 - 0xF0"],
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
    const { _rpn, 
            _performValueRPN, 
            _performFetchOperations, 
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

    
    ////////////////////////////////////////////////////
    const [rpnOpsX, fetchOpsX] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.tx));
    const [rpnOpsY, fetchOpsY] = scriptValueHelpers.precompileScriptValue(scriptValueHelpers.optimiseScriptValue(input.ty));

    const tileX = _declareLocal("tile_x", 1, true);
    const tileY = _declareLocal("tile_y", 1, true);

    const localsLookup = _performFetchOperations([
      ...fetchOpsX,
      ...fetchOpsY,
    ]);

    const rpn = _rpn();
    _performValueRPN(rpn, rpnOpsX, localsLookup);
    rpn.refSet(tileX);
    _performValueRPN(rpn, rpnOpsY, localsLookup);
    rpn.refSet(tileY);
    rpn.stop();
    ////////////////////////////////////////////////////

    // if, else events
    const truePath = input.true;
    const falsePath = input.__disableElse ? [] : input.false;
    // if, else labels
    const trueLabel = getNextLabel();
    const falseLabel = getNextLabel();

    // local for storing stack result
    const result = _declareLocal("result", 1, true);

    // push args and call
    _stackPushConst(input.tileMask);
    _stackPush(tileY);
    _stackPush(tileX);
    _callNative("if_collision_at_tile");
    // store results into local
    _set(result, ".ARG2");
    _stackPop(3);

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