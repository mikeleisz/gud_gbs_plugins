export const id = "GUD_EVENT_SET_COLLISION_TILE_TYPE_TO_SOLID";
export const name = "Set Solid Tile Group";
export const groups = ["Gud GBS Plugins", "Collision"];
export const subGroups = {
	"Gud GBS Plugins": "COLLISION"
};

export const autoLabel = (fetchArg) => {
	const tileType = fetchArg("tileMask");
    if (tileType == 15) {
        return `Turn Off Solid Tile Group`;
    } else {
        return `Assign ${tileTypeToName[tileType]} To Solid Group`;
    }
};

const tileTypeToName = (() => {
    return {
        15: "Off",
        16: "Ladder",
        128: "Spare 8",
        144: "Spare 9",
        160: "Spare 10",
        176: "Spare 11",
        192: "Spare 12",
        208: "Spare 13",
        224: "Spare 14",
        240: "Spare 15",
    };
})();

export const fields = [
    {
        label: "⚠️ Only one collision type can be assigned as solid at a time!"
    },
    {
        type: "break"
    },
    {
        key: "tileMask",
        label: "Collision Tile Type",
        description: "Collision Tile Type",
        type: "select",
        options: [
            [0xF, "Off"],
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
        "defaultValue": 0xF
    }
];

export const compile = (input, helpers) => {
    const { _addComment, _callNative, _stackPushConst, _stackPop } = helpers;
    _addComment("Set Collision Tile Type To Solid");
    _stackPushConst(input.tileMask);
    _callNative("vm_set_collision_tile_type_to_solid");
    _stackPop(1);
};