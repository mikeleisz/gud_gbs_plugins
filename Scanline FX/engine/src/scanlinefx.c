#pragma bank 255

#include <gbdk/platform.h>

#include "math.h"
#include "scroll.h"
#include "interrupts.h"
#include "gbs_types.h"
#include "vm.h"
#include "game_time.h"

#include "parallax.h"
#include "ui.h"

extern LCD_isr_e scene_LCD_type;

UBYTE scanline_fx_start = 0;
UBYTE scanline_fx_end = 143;
UBYTE scanline_fx_chunksize = 4;

// put your custom scanline effect here!
void scanline_isr(void) NONBANKED {
    while (STAT_REG & STATF_BUSY);

    // keep default draw position outside these scanlines
    if (LYC_REG < scanline_fx_start || LYC_REG > scanline_fx_end) {
        SCX_REG = draw_scroll_x;
        SCY_REG = draw_scroll_y;
    } else {
        // wobble between the above scanlines
        SCX_REG = draw_scroll_x + (SIN((LYC_REG + game_time) * 4) >> 4);
        SCY_REG = draw_scroll_y;
    }

    // increase LYC register by 2 (1 is too slow)
    LYC_REG += scanline_fx_chunksize;

    // if we at bottom of screen, reset the LYC register
    if (LYC_REG >= 143) {
        LYC_REG = 0;
    }
}

// enable custom scanline effect
void enable_scanline_fx(SCRIPT_CTX * THIS) OLDCALL BANKED {
    THIS;

    disable_interrupts();

    remove_LCD_ISRs();

    CRITICAL {
        add_LCD(scanline_isr);
    }

    SCX_REG = 0;
    SCY_REG = 0;
    LYC_REG = 0;

    enable_interrupts();
}

// disable custom scanline effect
void disable_scanline_fx(SCRIPT_CTX * THIS) OLDCALL BANKED {
    THIS;
    
    disable_interrupts();

    CRITICAL {
        remove_LCD(scanline_isr);
    }

    // restore GBS LCD interrupts
    CRITICAL {
        switch (scene_LCD_type) {
            case LCD_parallax: 
                add_LCD(parallax_LCD_isr);
                break;
            case LCD_fullscreen:
                add_LCD(fullscreen_LCD_isr);
                break;
            default:
                add_LCD(simple_LCD_isr);
                break;
        }
    }

    SCX_REG = 0;
    SCY_REG = 0;
    LYC_REG = 0;

    enable_interrupts();
}