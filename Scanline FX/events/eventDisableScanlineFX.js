export const id = "GUD_EVENT_DISABLE_ISRFX";
export const name = "Disable Scanline FX";
export const groups = ["Gud GBS Plugins"];

export const fields = [
    {
        label: "Disable Scanline FX"
    }
];

export const compile = (input, helpers) => {
    const { _callNative } = helpers;
    _callNative("disable_scanline_fx");
};