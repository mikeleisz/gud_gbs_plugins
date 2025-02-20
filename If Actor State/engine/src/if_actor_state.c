#pragma bank 255

#include <gbdk/platform.h>

#include "actor.h"
#include "scroll.h"
#include "vm.h"

#define TILE16_OFFSET              64u
#define SCREEN_TILE16_W            10u
#define SCREEN_TILE16_H            9u
#define ACTOR_BOUNDS_TILE16        6u
#define ACTOR_BOUNDS_TILE16_HALF   3u

void vm_if_actor_state(SCRIPT_CTX * THIS) OLDCALL BANKED {
    // active, pinned, hidden, disabled, persistent, on screen...
    
    UBYTE id = *(UBYTE*)VM_REF_TO_PTR(FN_ARG0);
    UBYTE type = *(UBYTE*)VM_REF_TO_PTR(FN_ARG1);
    UBYTE result = FALSE;

    static actor_t *actor;
    actor = actors + id;

    switch (type) {
        case 0: // active
        if (actor->active && !actor->disabled) {
            result = TRUE;
        }
        break;
        case 1: // deactivated
        if (!actor->active || actor->disabled) {
            result = TRUE;
        }
        break;
        case 2: // hidden
        if (actor->hidden) {
            result = TRUE;
        }
        break;
        case 3: // not hidden
        if (!actor->hidden) {
            result = TRUE;
        }
        break;
        case 4: // persistent
        if (actor->persistent) {
            result = TRUE;
        }
        break;
        case 5: // pinned
        if (actor->pinned) {
            result = TRUE;
        }
        break;
        case 6: // on screen
        {
            static uint8_t screen_tile16_x, screen_tile16_y;
            static uint8_t actor_tile16_x, actor_tile16_y;
            // Convert scroll pos to 16px tile coordinates
            // allowing full range of scene to be represented in 7 bits
            // offset by 64 to allow signed comparisons on
            // unsigned int values (is faster)
            screen_tile16_x = (draw_scroll_x >> 4) + TILE16_OFFSET;
            screen_tile16_y = (draw_scroll_y >> 4) + TILE16_OFFSET;
            // Bottom right coordinate of actor in 16px tile coordinates
            // Subtract bounding box estimate width/height
            // and offset by 64 to allow signed comparisons with screen tiles
            actor_tile16_x = (actor->pos.x >> 8) + ACTOR_BOUNDS_TILE16_HALF + TILE16_OFFSET;
            actor_tile16_y = (actor->pos.y >> 8) + ACTOR_BOUNDS_TILE16_HALF + TILE16_OFFSET;
            if (
                // Actor right edge < screen left edge
                (actor_tile16_x < screen_tile16_x) ||
                // Actor left edge > screen right edge
                ((actor_tile16_x - (ACTOR_BOUNDS_TILE16 + SCREEN_TILE16_W)) > screen_tile16_x) ||
                // Actor bottom edge < screen top edge
                (actor_tile16_y < screen_tile16_y) ||
                // Actor top edge > screen bottom edge
                ((actor_tile16_y - (ACTOR_BOUNDS_TILE16 + SCREEN_TILE16_H)) > screen_tile16_y)
            ) 
            {
                result = FALSE;
            } else {
                result = TRUE;
            }
        }
        break;
        case 7: // off screen
        {
            static uint8_t screen_tile16_x, screen_tile16_y;
            static uint8_t actor_tile16_x, actor_tile16_y;
            screen_tile16_x = (draw_scroll_x >> 4) + TILE16_OFFSET;
            screen_tile16_y = (draw_scroll_y >> 4) + TILE16_OFFSET;
            actor_tile16_x = (actor->pos.x >> 8) + ACTOR_BOUNDS_TILE16_HALF + TILE16_OFFSET;
            actor_tile16_y = (actor->pos.y >> 8) + ACTOR_BOUNDS_TILE16_HALF + TILE16_OFFSET;
            if (
                (actor_tile16_x < screen_tile16_x) ||
                ((actor_tile16_x - (ACTOR_BOUNDS_TILE16 + SCREEN_TILE16_W)) > screen_tile16_x) ||
                (actor_tile16_y < screen_tile16_y) ||
                ((actor_tile16_y - (ACTOR_BOUNDS_TILE16 + SCREEN_TILE16_H)) > screen_tile16_y)
            ) 
            {
                result = TRUE;
            }
        }
        break;
        default:
        break;
    }

    *(UBYTE*)VM_REF_TO_PTR(FN_ARG1) = result;
}