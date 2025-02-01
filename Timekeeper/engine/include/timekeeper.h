#include <gbdk/platform.h>

extern UINT8 playtime_frames; 
extern UINT8 playtime_seconds;
extern UINT8 playtime_minutes;
extern UINT8 playtime_hours;
extern UINT8 playtime_maxed;

typedef struct script_timekeeper_t {
    UBYTE script_bank;
    UBYTE *script_addr;
    uint16_t hscript;
} script_timekeeper_t;

extern void keep_time(void) BANKED;
extern void timekeeper_events_init(void) BANKED;