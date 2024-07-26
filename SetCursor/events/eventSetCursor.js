const id = "GUD_EVENT_SET_CURSOR";
const groups = ["Gud GBS Plugins", "EVENT_GROUP_DIALOGUE"];
const name = "Set Cursor";

const fields = [].concat([
  {
    label:
      "Select an 8x8 tileset to use as the cursor.",
  },
  {
    label: "Cursor",
    type: "tileset",
    key: "tilesetId",
  },
]);

const compile = (input, helpers) => {
  const { appendRaw, _addComment, tilesets } = helpers;

  const tilesetId = input.tilesetId;

  const tileset = tilesets.find((t) => t.id === tilesetId) ?? tilesets[0];
  if (!tileset) {
    return;
  }

  if (tileset.imageWidth !== 8 || tileset.imageHeight !== 8) {
    throw new Error(
      `The selected tileset is ${tileset.imageWidth}x${tileset.imageHeight}px. Please select a 8x8 tileset.`
    );
  }
  const symbol = tileset.symbol;

  _addComment("Set cursor");
  appendRaw(`
    VM_PUSH_CONST 0
    VM_PUSH_CONST .CURSOR_TILE_ID 

    VM_REPLACE_TILE .ARG0, ___bank_${symbol}, _${symbol}, .ARG1, .CURSOR_LENGTH

    VM_POP 2
  `);
};

module.exports = {
  id,
  name,
  groups,
  fields,
  compile,
  waitUntilAfterInitFade: false,
};