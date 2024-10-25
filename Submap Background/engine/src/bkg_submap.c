#pragma bank 255

#include <gbdk/platform.h>

#include "data_manager.h"
#include "bankdata.h"
#include "system.h"
#include "vm.h"

extern UBYTE image_bank;
extern UBYTE image_attr_bank;
extern unsigned char *image_ptr;
extern unsigned char *image_attr_ptr;

UBYTE submap_tile_buffer[32];

void background_submap(SCRIPT_CTX * THIS) OLDCALL BANKED {
    int16_t src_x = *(int16_t*)VM_REF_TO_PTR(FN_ARG0);
    int16_t src_y = *(int16_t*)VM_REF_TO_PTR(FN_ARG1);
    int16_t dest_x = *(int16_t*)VM_REF_TO_PTR(FN_ARG2);
    int16_t dest_y = *(int16_t*)VM_REF_TO_PTR(FN_ARG3);
    int16_t w = *(int16_t*)VM_REF_TO_PTR(FN_ARG4) & 31;
    int16_t h = *(int16_t*)VM_REF_TO_PTR(FN_ARG5) & 31;

    unsigned char* tilemap_ptr = image_ptr;
    unsigned char* tilemap_attr_ptr = image_attr_ptr;

    UBYTE buffer_size = sizeof(UBYTE) * w;
	for (uint8_t i = 0; i < h; i++){		
		int16_t offset = ((src_y + i) * image_tile_width) + src_x;
#ifdef CGB
		if (_is_CGB) {
			VBK_REG = 1;
			MemcpyBanked(submap_tile_buffer, tilemap_attr_ptr + offset, buffer_size, image_attr_bank);
			set_bkg_tiles(dest_x & 31, (dest_y + i) & 31, w, 1, submap_tile_buffer);
			VBK_REG = 0;
		}
#endif
		MemcpyBanked(submap_tile_buffer, tilemap_ptr + offset, buffer_size, image_bank);
		set_bkg_tiles(dest_x & 31, (dest_y + i) & 31, w, 1, submap_tile_buffer);
	}
}