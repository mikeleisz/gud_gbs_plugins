#pragma bank 255

#include <gbdk/platform.h>
#include <gb/gb.h>
#include <gb/cgb.h>

#include "system.h"
#include "vm.h"
#include "vm_gameboy.h"

void set_tile_priority(UINT8 x, UINT8 y, UINT8 priority) BANKED {
    UINT8 attr;

    VBK_REG = 1;

    attr = get_bkg_tile_xy(x, y);

    switch (priority) {
        case 0: // off
        attr &= 0x7F;
        break;
        case 1: // on
        attr |= 0x80;
        break;
        case 2: // toggle
        attr ^= 0x80;
        break;
        default:
        break;
    }

    set_bkg_tile_xy(x, y, attr);

    VBK_REG = 0;
}

void vm_set_tile_priority(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    uint8_t priority = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
    set_tile_priority(x, y, priority);
}

void vm_set_tile_priority_area(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t x = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    uint8_t y = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    uint8_t w = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
    uint8_t h = *(uint8_t*)VM_REF_TO_PTR(FN_ARG3);
    uint8_t priority = *(uint8_t*)VM_REF_TO_PTR(FN_ARG4);
    
    for (UINT8 i = 0; i < w; i++) {
        for (UINT8 j = 0; j < h; j++) {
            set_tile_priority(x + i, y + j, priority);
        }
    }
}