#pragma bank 255

#include <gbdk/platform.h>

#include "data_manager.h"
#include "bankdata.h"
#include "system.h"
#include "vm.h"

extern far_ptr_t current_scene;

void vm_call_scene_init(SCRIPT_CTX * THIS) OLDCALL BANKED {
    THIS;

    scene_t scn;
    MemcpyBanked(&scn, current_scene.ptr , sizeof(scn), current_scene.bank);

    if (scn.script_init.ptr != NULL) {
        script_execute(scn.script_init.bank, scn.script_init.ptr, 0, 0);
    }
}