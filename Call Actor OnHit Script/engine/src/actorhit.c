#pragma bank 255

#include <gbdk/platform.h>

#include "actor.h"
#include "vm.h"

void call_actor_onhit_script(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE colgroup = *(UBYTE*)VM_REF_TO_PTR(FN_ARG1);
    UBYTE actor_index = *(UBYTE*)VM_REF_TO_PTR(FN_ARG0);
    
    static actor_t *hit_actor;
    hit_actor = actors + actor_index;

    if (colgroup == 1) {
        // execute actor OnInteract script
        if (hit_actor && !hit_actor->collision_group && hit_actor->script.bank) {
            script_execute(hit_actor->script.bank, hit_actor->script.ptr, 0, 1, 0);
        }

        // execute actor Player OnHit script
        if (hit_actor->collision_group) {
            if (hit_actor->script.bank) {
                script_execute(hit_actor->script.bank, hit_actor->script.ptr, 0, 1, 0);
            }
        }
    } else {
        if ((hit_actor->script.bank) && (hit_actor->hscript_hit & SCRIPT_TERMINATED)) {
        script_execute(hit_actor->script.bank, hit_actor->script.ptr, &(hit_actor->hscript_hit), 1, (UWORD)(colgroup));
        }
    }
}