#pragma bank 255

#include <gbdk/platform.h>

#include "actor.h"
#include "system.h"
#include "vm.h"

void vm_set_actor_collision_group(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE actor_idx = *(uint8_t *)VM_REF_TO_PTR(FN_ARG0);
    UBYTE collision_group = *(uint8_t *)VM_REF_TO_PTR(FN_ARG1);

    if (actor_idx == 0) return;

    actor_t * actor = actors + actor_idx;
    actor->collision_group = collision_group;
}