#pragma bank 255

#include "collision_tile_type_to_solid.h"
#include "system.h"
#include "vm.h"

UBYTE solid_collision_tile_mask = 0xF;

void vm_set_collision_tile_type_to_solid(SCRIPT_CTX * THIS) OLDCALL BANKED {
    uint8_t tile_mask = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    solid_collision_tile_mask = tile_mask;
}