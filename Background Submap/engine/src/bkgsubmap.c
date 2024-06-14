#pragma bank 255

#include <gbdk/platform.h>

#include "data_manager.h"
#include "vm.h"
#include "bankdata.h"
#include "system.h"

extern UBYTE image_bank;
extern UBYTE image_attr_bank;
extern unsigned char *image_ptr;
extern unsigned char *image_attr_ptr;

void handle_bkg_submap(UINT8 x, UINT8 y, UINT8 w, UINT8 h, INT16 offset_x, INT16 offset_y) NONBANKED;

void background_submap(SCRIPT_CTX * THIS) OLDCALL BANKED {
    int16_t src_x = *(int16_t*)VM_REF_TO_PTR(FN_ARG0);
    int16_t src_y = *(int16_t*)VM_REF_TO_PTR(FN_ARG1);
    int16_t dest_x = *(int16_t*)VM_REF_TO_PTR(FN_ARG2);
    int16_t dest_y = *(int16_t*)VM_REF_TO_PTR(FN_ARG3);
    int16_t w = *(int16_t*)VM_REF_TO_PTR(FN_ARG4);
    int16_t h = *(int16_t*)VM_REF_TO_PTR(FN_ARG5);

    int16_t offset_x = src_x - dest_x;
    int16_t offset_y = src_y - dest_y;

    handle_bkg_submap(dest_x, dest_y, w, h, offset_x, offset_y);
}

void handle_bkg_submap(UINT8 x, UINT8 y, UINT8 w, UINT8 h, INT16 offset_x, INT16 offset_y) NONBANKED {
    UINT8 _save = CURRENT_BANK;

#ifdef CGB
    if (_is_CGB) { 
        SWITCH_ROM(image_attr_bank);
        VBK_REG = 1;
        set_bkg_submap(x, y, w, h, image_attr_ptr + offset_x + (offset_y * image_tile_width), image_tile_width);
        VBK_REG = 0;
    }
#endif

    SWITCH_ROM(image_bank);
    set_bkg_submap(x, y, w, h, image_ptr + offset_x + (offset_y * image_tile_width), image_tile_width);
    
    SWITCH_ROM(_save);
}