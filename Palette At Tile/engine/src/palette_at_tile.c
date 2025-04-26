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

void set_win_tile_palette_xy(uint8_t x, uint8_t y, uint8_t palette_index) BANKED {
    if (_cpu != CGB_TYPE) return;

    uint16_t addr = 0x9C00 + y * 32 + x;

    // wait_vbl_done();
    VBK_REG = 1;
    uint8_t attr = *((uint8_t *)addr);
    attr = (attr & 0xF8) | (palette_index & 0x07); // Keep flip/priority bits
    *((uint8_t *)addr) = attr;
    VBK_REG = 0;
}

UINT8 get_tile_palette(UINT8 x, UINT8 y) BANKED {
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

UINT8 get_win_tile_palette(UINT8 x, UINT8 y) BANKED {
    UINT8 attr;

    VBK_REG = 1;                           // Access attributes
    attr = get_win_tile_xy(x, y);         // Read attribute from window tilemap
    VBK_REG = 0;                           // Restore to tile ID bank

    return attr & 0x07;                   // Return palette index (0–7)
}

#define MAX_ATTR_TILES 360 // 20 × 18

void set_win_palette_region(uint8_t x, uint8_t y, uint8_t w, uint8_t h, uint8_t palette_index) BANKED {
    if (_cpu != CGB_TYPE) return;

    if (w == 0 || h == 0 || w * h > MAX_ATTR_TILES) return; // Bounds safety

    static uint8_t attr_buf[MAX_ATTR_TILES]; // Buffer reused every call
    uint8_t attr = palette_index & 0x07;

    for (uint16_t i = 0; i < (uint16_t)(w * h); i++) {
        attr_buf[i] = attr;
    }

    VBK_REG = 1;
    set_win_tiles(x, y, w, h, attr_buf);
    VBK_REG = 0;
}

void vm_get_palette_at_tile(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    uint8_t layer = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
    if (layer == 0) {
        *(uint8_t*)VM_REF_TO_PTR(FN_ARG3) = get_tile_palette(x, y);
    } else {
        *(uint8_t*)VM_REF_TO_PTR(FN_ARG3) = get_win_tile_palette(x, y);
    }
}

void vm_set_palette_at_tile(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    uint8_t palette = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
    uint8_t layer = *(uint8_t*)VM_REF_TO_PTR(FN_ARG3);

    if (layer == 0) {
        set_tile_palette(x, y, palette);
    } else {
        set_win_tile_palette_xy(x, y, palette);
    }
}

void vm_set_palette_area(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    uint8_t w = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
    uint8_t h = *(uint8_t*)VM_REF_TO_PTR(FN_ARG3);
    uint8_t palette = *(uint8_t*)VM_REF_TO_PTR(FN_ARG4);
    uint8_t layer = *(uint8_t*)VM_REF_TO_PTR(FN_ARG5);

    if (layer == 0) {
        for (UINT8 i = 0; i < w; i++) {
            for (UINT8 j = 0; j < h; j++) {
                set_tile_palette(x + i, y + j, palette);
            }
        }
    } else {
        // wait_vbl_done();
        // while (STAT_REG & 0x03); // Wait until mode is 0 (HBlank) or 1 (VBlank)
        set_win_palette_region(x, y, w, h, palette);
    }
}