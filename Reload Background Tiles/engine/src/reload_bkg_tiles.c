#pragma bank 255

#include <gbdk/platform.h>

#include "data_manager.h"
#include "bankdata.h"
#include "system.h"
#include "vm.h"

extern far_ptr_t current_scene;
extern void load_background(const background_t* background, UBYTE bank) BANKED;

void vm_reload_bkg_tiles(SCRIPT_CTX * THIS) OLDCALL BANKED {
    THIS;

    scene_t scn;
    MemcpyBanked(&scn, current_scene.ptr , sizeof(scn), current_scene.bank);

    if (scn.script_init.ptr != NULL) {
        load_background(scn.background.ptr, scn.background.bank);
    }
}