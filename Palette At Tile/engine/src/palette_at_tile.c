#pragma bank 255

#include <gbdk/platform.h>
#include <gb/gb.h>
#include <gb/cgb.h>

#include "system.h"
#include "vm.h"
#include "vm_gameboy.h"

void set_tile_palette(UINT8 x, UINT8 y, UINT8 new_palette) BANKED {
    UINT8 attr;

    // Switch to attribute map (VBK_REG = 1 allows access to tile attributes)
    VBK_REG = 1;

    // Get the current attributes for the tile at (x, y)
    attr = get_bkg_tile_xy(x, y);

    // Clear the current palette bits (bits 0-2) and set the new palette
    attr = (attr & 0xF8) | (new_palette & 0x07);

    // Set the new attribute byte back to the tile at (x, y)
    set_bkg_tile_xy(x, y, attr);

    // Switch back to tile data map (VBK_REG = 0)
    VBK_REG = 0;
}

UINT8 get_tile_palette(UINT8 x, UINT8 y) {
    UINT8 attr;

    // Switch to VRAM bank 1 (VBK_REG = 1) to access tile attributes
    VBK_REG = 1;

    // Read the attribute for the tile at (x, y)
    attr = get_bkg_tile_xy(x, y);

    // Switch back to VRAM bank 0 (VBK_REG = 0)
    VBK_REG = 0;

    // Extract the palette (bits 0-2)
    return attr & 0x07;  // Mask to get the palette number (0-7)
}

void vm_get_palette_at_tile(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    *(uint8_t*)VM_REF_TO_PTR(FN_ARG2) = get_tile_palette(x, y);
}

void vm_set_palette_at_tile(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    uint8_t palette = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
    set_tile_palette(x, y, palette);
}

void vm_set_palette_area(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    uint8_t w = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
    uint8_t h = *(uint8_t*)VM_REF_TO_PTR(FN_ARG3);
    uint8_t palette = *(uint8_t*)VM_REF_TO_PTR(FN_ARG4);
    
    for (UINT8 i = 0; i < w; i++) {
        for (UINT8 j = 0; j < h; j++) {
            set_tile_palette(x + i, y + j, palette);
        }
    }
}