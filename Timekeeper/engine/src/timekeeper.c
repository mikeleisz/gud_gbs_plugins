#pragma bank 255

#include "timekeeper.h"

#include <gbdk/platform.h>
#include <string.h>

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

script_timekeeper_t timekeeper_script[3];

void call_timekeeper_script(UBYTE index) BANKED {
    if (timekeeper_script[index].script_addr != 0) {
        if ((timekeeper_script[index].hscript & SCRIPT_TERMINATED) == 0) {
            script_terminate(timekeeper_script[index].hscript);
        }
        timekeeper_script[index].hscript = SCRIPT_TERMINATED;
        script_execute(timekeeper_script[index].script_bank, timekeeper_script[index].script_addr, &(timekeeper_script[index].hscript), 0);
    }
}

void timekeeper_events_init(void) BANKED {
    memset(timekeeper_script, 0, sizeof(timekeeper_script));
}

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

        call_timekeeper_script(0);

        if (playtime_seconds >= 60) {
            playtime_seconds = 0;
            playtime_minutes++;

            call_timekeeper_script(1);

            if (playtime_minutes >= 60) {
                playtime_minutes = 0;
                playtime_hours++;

                call_timekeeper_script(2);

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

void vm_assign_timekeeper_script(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UWORD *slot = VM_REF_TO_PTR(FN_ARG2);
    UBYTE *bank = VM_REF_TO_PTR(FN_ARG1);
    UBYTE **ptr = VM_REF_TO_PTR(FN_ARG0);
    timekeeper_script[*slot].script_bank = *bank;
    timekeeper_script[*slot].script_addr = *ptr;
}

void vm_clear_timekeeper_script(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE clear_type = *(UBYTE*)VM_REF_TO_PTR(FN_ARG1);
    UWORD *slot = VM_REF_TO_PTR(FN_ARG0);

    switch (clear_type) {
        case 0:
            timekeeper_script[*slot].script_bank = NULL;
            timekeeper_script[*slot].script_addr = NULL;
            break;
        case 1:
            UBYTE script_count = 0;
            while (script_count != 2) {
                timekeeper_script[script_count].script_bank = NULL;
                timekeeper_script[script_count].script_addr = NULL;
                script_count++;
            }
            break;
        default:
            break;
    }
}