export const id = "GUD_EVENT_CALL_SCENE_INIT";
export const name = "Call Scene Init Script";
export const groups = ["Gud GBS Plugins", "EVENT_GROUP_SCENE"];
export const subGroups = {
	EVENT_GROUP_SCENE: "EVENT_GROUP_SCRIPT",
	"Gud GBS Plugins": "SCENE"
};

export const fields = [
    {
        label: "Call Init Script for Current Scene and all Actors in Current Scene"
    }
];

export const compile = (input, helpers) => {
    const { _addComment, _callNative } = helpers;
    _addComment("Call Scene Init");
    _callNative("vm_call_scene_init");
};