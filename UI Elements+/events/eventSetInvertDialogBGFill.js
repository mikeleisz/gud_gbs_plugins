export const id = "GUD_EVENT_SET_INVERT_DIALOG_FILL";
export const name = "Set Invert Dialog BG Fill Color";
export const groups = ["Gud GBS Plugins"];

export const fields = [
    {
        key: "enable",
        label: "Invert Dialog Fill Color",
        description: "Invert dialog fill color",
        type: "select",
        options: [
          [0, "Disable"],
          [1, "Enable"],
        ],
        "defaultValue": 0
    }, 
];

export const compile = (input, helpers) => {
    const { _stackPushConst, _callNative, _stackPop } = helpers;
    _stackPushConst(input.enable);
    _callNative("vm_ui_update_fill_colors");
    _stackPop(1);
};