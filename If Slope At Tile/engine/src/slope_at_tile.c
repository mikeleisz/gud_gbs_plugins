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
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = 1;
                break;
                case 2: // slope right
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = (((tile) & 0x10) == 0);
                break;
                case 3: // slope left
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = (((tile) & 0x10) != 0);
                break;
                case 4: // slope right, 45 degrees
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF0) == 0x20);
                break;
                case 5: // slope right, 22.5 degrees, bottom
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF0) == 0x40);
                break;
                case 6: // slope right, 22.5 degrees, top
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF0) == 0x60);
                break;
                case 7: // slope left, 45 degrees
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF0) == 0x30);
                break;
                case 8: // slope left, 22.5 degrees, bottom
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF0) == 0x50);
                break;
                case 9: // slope left, 22.5 degrees, top
                *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ((tile & 0xF0) == 0x70);
                break;
            }
        } else {
            // not on slope
            *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = 0;
        }
    } else {
        // o.o.b.
        *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = 0;
    }
}

/*
#ifndef COLLISION_SLOPE_45_RIGHT
#define COLLISION_SLOPE_45_RIGHT 0x20
#endif
#ifndef COLLISION_SLOPE_225_RIGHT_BOT
#define COLLISION_SLOPE_225_RIGHT_BOT 0x40
#endif
#ifndef COLLISION_SLOPE_225_RIGHT_TOP
#define COLLISION_SLOPE_225_RIGHT_TOP 0x60
#endif
#ifndef COLLISION_SLOPE_45_LEFT
#define COLLISION_SLOPE_45_LEFT 0x30
#endif
#ifndef COLLISION_SLOPE_225_LEFT_BOT
#define COLLISION_SLOPE_225_LEFT_BOT 0x50
#endif
#ifndef COLLISION_SLOPE_225_LEFT_TOP
#define COLLISION_SLOPE_225_LEFT_TOP 0x70
#endif
#ifndef COLLISION_SLOPE
#define COLLISION_SLOPE 0xF0
#endif

#define IS_ON_SLOPE(t) ((t) & 0x60)
#define IS_SLOPE_LEFT(t) ((t) & 0x10)
#define IS_SLOPE_RIGHT(t) (((t) & 0x10) == 0)

if (IS_ON_SLOPE(col)) {
    if ((col & COLLISION_SLOPE) == COLLISION_SLOPE_45_RIGHT) {
        slope_y_coord = (((tile_y << 3) + (8 - x_offset) - PLAYER.bounds.bottom) << 4) - 1;
    } else if ((col & COLLISION_SLOPE) == COLLISION_SLOPE_225_RIGHT_BOT) {
        slope_y_coord = (((tile_y << 3) + (8 - (x_offset >> 1)) - PLAYER.bounds.bottom) << 4) - 1;
    } else if ((col & COLLISION_SLOPE) == COLLISION_SLOPE_225_RIGHT_TOP) {
        slope_y_coord = (((tile_y << 3) + (4 - (x_offset >> 1)) - PLAYER.bounds.bottom) << 4) - 1;
    }

    else if ((col & COLLISION_SLOPE) == COLLISION_SLOPE_45_LEFT) {
        slope_y_coord = (((tile_y << 3) + (x_offset) - PLAYER.bounds.bottom) << 4) - 1;
    } else if ((col & COLLISION_SLOPE) == COLLISION_SLOPE_225_LEFT_BOT) {
        slope_y_coord = (((tile_y << 3) + (x_offset >> 1) - PLAYER.bounds.bottom + 4) << 4) - 1;
    } else if ((col & COLLISION_SLOPE) == COLLISION_SLOPE_225_LEFT_TOP) {
        slope_y_coord = (((tile_y << 3) + (x_offset >> 1) - PLAYER.bounds.bottom) << 4) - 1;
    }
}
*/