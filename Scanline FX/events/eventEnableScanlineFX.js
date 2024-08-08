export const id = "GUD_EVENT_ENABLE_ISRFX";
export const name = "Enable Scanline FX";
export const groups = ["Gud GBS Plugins"];

export const fields = [
    {
        label: "Enable Scanline FX"
    }
];

export const compile = (input, helpers) => {
    const { _callNative } = helpers;
    _callNative("enable_scanline_fx");
};