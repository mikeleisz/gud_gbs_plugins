#include <gbdk/platform.h>

#include "math.h"
#include "scroll.h"
#include "interrupts.h"
#include "gbs_types.h"
#include "vm.h"
#include "game_time.h"

#include "parallax.h"
#include "ui.h"

void scanline_isr(void) NONBANKED;
