#pragma bank 255

#include <gbdk/platform.h>

#include "collision.h"
#include "vm.h"

extern UBYTE collision_bank;
extern unsigned char *collision_ptr;
extern UBYTE image_tile_width;
extern UBYTE image_tile_height;


void get_collision_at_tile(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE tx = *(UBYTE*)VM_REF_TO_PTR(FN_ARG0);
    UBYTE ty = *(UBYTE*)VM_REF_TO_PTR(FN_ARG1);
    if ((tx < image_tile_width) && (ty < image_tile_height)) 
        *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = ReadBankedUBYTE(collision_ptr + (ty * (UINT16)image_tile_width) + tx, collision_bank);
    else
        *(UBYTE*)VM_REF_TO_PTR(FN_ARG2) = COLLISION_ALL;
}