export const id = "GUD_EVENT_RELOAD_BKG_TILES";
export const name = "Reload Background Tiles";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCREEN"];
export const subGroups = {
	EVENT_GROUP_SCREEN: "EVENT_GROUP_SCRIPT",
	"Gud GBS Plugins": "SCREEN"
};

export const fields = [
    {
        label: "Reload all Background Tiles in VRAM to original state."
    }
];

export const compile = (input, helpers) => {
    const { _addComment, _callNative } = helpers;
    _addComment("Reload Background Tiles");
    _callNative("vm_reload_bkg_tiles");
};