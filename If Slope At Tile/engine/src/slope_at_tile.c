#pragma bank 255

#include <gbdk/platform.h>

#include "collision.h"
#include "vm.h"

extern UBYTE collision_bank;
extern unsigned char *collision_ptr;
extern UBYTE image_tile_width;
extern UBYTE image_tile_height;


void if_slope_at_tile(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE tx = *(UBYTE*)VM_REF_TO_PTR(FN_ARG0);
    UBYTE ty = *(UBYTE*)VM_REF_TO_PTR(FN_ARG1);
    UBYTE slope_check = *(UBYTE*)VM_REF_TO_PTR(FN_ARG2);

    if ((tx < image_tile_width) && (ty < image_tile_height)) {
        UBYTE tile = ReadBankedUBYTE(collision_ptr + (ty * (UINT16)image_tile_width) + tx, collision_bank);

        if (((tile) & 0x60)) {
            switch (slope_check) {
                case 1: // slope
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = 1;
                break;
                case 2: // slope right
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = (((tile) & 0x10) == 0);
                break;
                case 3: // slope left
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = (((tile) & 0x10) != 0);
                break;
                case 4: // slope right, 45 degrees
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = ((tile & 0xF0) == 0x20);
                break;
                case 5: // slope right, 22.5 degrees, bottom
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = ((tile & 0xF0) == 0x40);
                break;
                case 6: // slope right, 22.5 degrees, top
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = ((tile & 0xF0) == 0x60);
                break;
                case 7: // slope left, 45 degrees
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = ((tile & 0xF0) == 0x30);
                break;
                case 8: // slope left, 22.5 degrees, bottom
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = ((tile & 0xF0) == 0x50);
                break;
                case 9: // slope left, 22.5 degrees, top
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = ((tile & 0xF0) == 0x70);
                break;
            }
        } else {
            // not on slope
            *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = 0;
        }
    } else {
        // o.o.b.
        *(UBYTE*)VM_REF_TO_PTR(FN_ARG3) = 0;
    }
}