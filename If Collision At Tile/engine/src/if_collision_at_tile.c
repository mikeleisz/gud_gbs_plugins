#pragma bank 255

#include <gbdk/platform.h>

#include "collision.h"
#include "vm.h"

extern UBYTE collision_bank;
extern unsigned char *collision_ptr;
extern UBYTE image_tile_width;
extern UBYTE image_tile_height;


void if_collision_at_tile(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE tx = *(UBYTE*)VM_REF_TO_PTR(FN_ARG0);
    UBYTE ty = *(UBYTE*)VM_REF_TO_PTR(FN_ARG1);
    UBYTE collision_mask = *(UBYTE*)VM_REF_TO_PTR(FN_ARG2);

    if ((tx < image_tile_width) && (ty < image_tile_height)) {
        UBYTE tile = ReadBankedUBYTE(collision_ptr + (ty * (UINT16)image_tile_width) + tx, collision_bank);

        // handle no collision
        if (collision_mask == 0x3) {
            *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = (tile == 0x0);
        } else if (collision_mask == 0x60) {
            // handle slopes
            *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile <= 0x70) && (tile & 0x60));
        } else {
            if (collision_mask <= 0xF) {
                // handle solids
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF) == collision_mask);
            } else {
                // handle spare tiles, ladder
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF0) == collision_mask);
            }
        }
    } else {
        // o.o.b. returns true when checking for solids
        *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = (collision_mask == 0xF);
    }
}