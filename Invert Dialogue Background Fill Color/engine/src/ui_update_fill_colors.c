#pragma bank 255

#include <gbdk/platform.h>

#include "ui.h"
#include "vm.h"

void vm_ui_update_fill_colors(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE enabled = *(UBYTE*)VM_REF_TO_PTR(FN_ARG0);
    text_invert_bkg_fill_color = enabled;
    ui_update_fill_colors();
}