#pragma bank 255

#include "timekeeper.h"

#include <gbdk/platform.h>

#include "system.h"
#include "vm.h"
#include "vm_gameboy.h"

#include "data/game_globals.h"

UINT8 playtime_frames; 
UINT8 playtime_seconds;
UINT8 playtime_minutes;
UINT8 playtime_hours;
UINT8 playtime_maxed;
UINT8 timekeeper_running;

void keep_time(void) BANKED {
    if (!timekeeper_running) {
        return;
    }
    
    if (playtime_maxed) {
        playtime_seconds = 0;
        playtime_minutes = 0;
        playtime_seconds = 0;
        playtime_hours = 0xFF;
        return;
    }

    playtime_frames++;
    if (playtime_frames >= 60) {
        playtime_frames = 0;
        playtime_seconds++;

        if (playtime_seconds >= 60) {
            playtime_seconds = 0;
            playtime_minutes++;

            if (playtime_minutes >= 60) {
                playtime_minutes = 0;
                playtime_hours++;

                if (playtime_hours == 0xFF) {
                    playtime_maxed = 0xFF;
                }
            }
        }
    }
}

void vm_set_timekeeper(SCRIPT_CTX * THIS) OLDCALL BANKED {
    playtime_seconds = *(uint8_t*)VM_REF_TO_PTR(FN_ARG0);
    playtime_minutes = *(uint8_t*)VM_REF_TO_PTR(FN_ARG1);
    playtime_hours = *(uint8_t*)VM_REF_TO_PTR(FN_ARG2);
}

void vm_get_timekeeper(SCRIPT_CTX * THIS) OLDCALL BANKED {
    *(uint8_t*)VM_REF_TO_PTR(FN_ARG0) = playtime_seconds;
    *(uint8_t*)VM_REF_TO_PTR(FN_ARG1) = playtime_minutes;
    *(uint8_t*)VM_REF_TO_PTR(FN_ARG2) = playtime_hours;
}

void vm_start_timekeeper(SCRIPT_CTX * THIS) OLDCALL BANKED {
    THIS;
    timekeeper_running = TRUE;
}

void vm_stop_timekeeper(SCRIPT_CTX * THIS) OLDCALL BANKED {
    THIS;
    timekeeper_running = FALSE;
}

void vm_reset_timekeeper(SCRIPT_CTX * THIS) OLDCALL BANKED {
    THIS;
    playtime_frames = 0;
    playtime_seconds = 0;
    playtime_minutes = 0;
    playtime_hours = 0;
    playtime_maxed = FALSE;
}