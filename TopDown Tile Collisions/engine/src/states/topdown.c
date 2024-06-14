#pragma bank 255

#include "data/states_defines.h"
#include "states/topdown.h"

#include "actor.h"
#include "camera.h"
#include "collision.h"
#include "data_manager.h"
#include "game_time.h"
#include "input.h"
#include "trigger.h"
#include "math.h"
#include "vm.h"

#ifndef INPUT_TOPDOWN_INTERACT
#define INPUT_TOPDOWN_INTERACT INPUT_A
#endif

UBYTE topdown_grid;

// tile collision ////////////////////////////////////////////////////////////////////

script_collision_t collision_events[14];

extern UBYTE player_iframes;

void call_collision_script(UBYTE index) BANKED;

void call_collision_script(UBYTE index) BANKED {
    if (player_iframes == 0 && collision_events[index].script_addr != 0) {
        script_execute(collision_events[index].script_bank, collision_events[index].script_addr, 0, 0);
        // Set player to be invicible for N frames
        player_iframes = PLAYER_HURT_IFRAMES;
    } else if (player_iframes != 0) {
        player_iframes--;
    }
}

bool contains_collision_mask(UBYTE tile, UBYTE mask) BANKED;

bool contains_collision_mask(UBYTE tile, UBYTE mask) BANKED {
    // return (tile & mask) == mask;
    if (tile < 0x80) {
        return ((tile & 0xFF) == mask);
    } else {
        return ((tile & 0xF0) == mask);
    }
}

void handle_tile_collision(UBYTE tile) BANKED;

void handle_tile_collision(UBYTE tile) BANKED {
    UBYTE script_index = 255;

    if (contains_collision_mask(tile, 0xF)) {
        // Handle case for collision mask 0xF, solid
        script_index = 0;
    } else if (contains_collision_mask(tile, 0x1)) {
        // Handle case for collision mask 0x1
        script_index = 1;
    } else if (contains_collision_mask(tile, 0x2)) {
        // Handle case for collision mask 0x2
        script_index = 2;
    } else if (contains_collision_mask(tile, 0x4)) {
        // Handle case for collision mask 0x4
        script_index = 3;
    } else if (contains_collision_mask(tile, 0x8)) {
        // Handle case for collision mask 0x8
        script_index = 4;
    } else if (contains_collision_mask(tile, 0x10)) {
        // Handle case for collision mask 0x10, ladder
        script_index = 5;
    } else if (contains_collision_mask(tile, 0x80)) {
        // Handle case for collision mask 0x80
        script_index = 6;
    } else if (contains_collision_mask(tile, 0x90)) {
        // Handle case for collision mask 0x90
        script_index = 7;
    } else if (contains_collision_mask(tile, 0xA0)) {
        script_index = 8;
        // Handle case for collision mask 0xA0
    } else if (contains_collision_mask(tile, 0xB0)) {
        script_index = 9;
        // Handle case for collision mask 0xB0
    } else if (contains_collision_mask(tile, 0xC0)) {
        script_index = 10;
        // Handle case for collision mask 0xC0
    } else if (contains_collision_mask(tile, 0xD0)) {
        script_index = 11;
        // Handle case for collision mask 0xD0
    } else if (contains_collision_mask(tile, 0xE0)) {
        script_index = 12;
        // Handle case for collision mask 0xE0
    } else if (contains_collision_mask(tile, 0xF0)) {
        script_index = 13;
        // Handle case for collision mask 0xF0
    } else {
        // Handle default case if necessary
        script_index = 255;
    }

    if(script_index != 255){
        call_collision_script(script_index);
    }
}

///////////////////////////////////////////////////////////////////////////////

void topdown_init(void) BANKED {
    camera_offset_x = 0;
    camera_offset_y = 0;
    camera_deadzone_x = 0;
    camera_deadzone_y = 0;

    if (topdown_grid == 16) {
        // Snap to 16px grid
        PLAYER.pos.x = ((PLAYER.pos.x >> 8) << 8);
        PLAYER.pos.y = ((PLAYER.pos.y >> 8) << 8) + 128;
    } else {
        PLAYER.pos.x = ((PLAYER.pos.x >> 7) << 7);
        PLAYER.pos.y = ((PLAYER.pos.y >> 7) << 7);
    }
}

void topdown_update(void) BANKED {
    actor_t *hit_actor;
    UBYTE tile_start, tile_end;
    direction_e new_dir = DIR_NONE;

    // Is player on an 8x8px tile?
    if ((topdown_grid == 16 && ON_16PX_GRID(PLAYER.pos)) ||
        (topdown_grid == 8 && ON_8PX_GRID(PLAYER.pos))) {
        // Player landed on an tile
        // so stop movement for now
        player_moving = FALSE;

        // Check for trigger collisions
        if (trigger_activate_at_intersection(&PLAYER.bounds, &PLAYER.pos, FALSE)) {
            // Landed on a trigger
            return;
        }

        // tile collision!
        UBYTE tile_collision = 0;

        // Check input to set player movement
        if (INPUT_RECENT_LEFT) {
            player_moving = TRUE;
            new_dir = DIR_LEFT;

            // tile collision!
            tile_collision = 0;

            // Check for collisions to left of player
            tile_start = (((PLAYER.pos.y >> 4) + PLAYER.bounds.top)    >> 3);
            tile_end   = (((PLAYER.pos.y >> 4) + PLAYER.bounds.bottom) >> 3) + 1;
            UBYTE tile_x = ((PLAYER.pos.x >> 4) + PLAYER.bounds.left) >> 3;
            while (tile_start != tile_end) {
                
                // tile collision!
                UBYTE tile = tile_at(tile_x - 1, tile_start);
                if (tile != 0 && tile != tile_collision) {
                    handle_tile_collision(tile);
                    tile_collision = tile;
                }
                
                if (tile_at(tile_x - 1, tile_start) & COLLISION_RIGHT) {
                    player_moving = FALSE;
                    break;
                }
                tile_start++;
            }
        } else if (INPUT_RECENT_RIGHT) {
            player_moving = TRUE;
            new_dir = DIR_RIGHT;

            // tile collision!
            tile_collision = 0;

            // Check for collisions to right of player
            tile_start = (((PLAYER.pos.y >> 4) + PLAYER.bounds.top)    >> 3);
            tile_end   = (((PLAYER.pos.y >> 4) + PLAYER.bounds.bottom) >> 3) + 1;
            UBYTE tile_x = ((PLAYER.pos.x >> 4) + PLAYER.bounds.right) >> 3;
            while (tile_start != tile_end) {
                
                // tile collision!
                UBYTE tile = tile_at(tile_x + 1, tile_start);
                if (tile != 0 && tile != tile_collision) {
                    handle_tile_collision(tile);
                    tile_collision = tile;
                }
                
                if (tile_at(tile_x + 1, tile_start) & COLLISION_LEFT) {
                    player_moving = FALSE;
                    break;
                }
                tile_start++;
            }
        } else if (INPUT_RECENT_UP) {
            player_moving = TRUE;
            new_dir = DIR_UP;

            // tile collision!
            tile_collision = 0;

            // Check for collisions below player
            tile_start = (((PLAYER.pos.x >> 4) + PLAYER.bounds.left)  >> 3);
            tile_end   = (((PLAYER.pos.x >> 4) + PLAYER.bounds.right) >> 3) + 1;
            UBYTE tile_y = ((PLAYER.pos.y >> 4) + PLAYER.bounds.top) >> 3;
            while (tile_start != tile_end) {
                
                // tile collision!
                UBYTE tile = tile_at(tile_start, tile_y - 1);
                if (tile != 0 && tile != tile_collision) {
                    handle_tile_collision(tile);
                    tile_collision = tile;
                }
                
                if (tile_at(tile_start, tile_y - 1) & COLLISION_BOTTOM) {
                    player_moving = FALSE;
                    break;
                }
                tile_start++;
            }
        } else if (INPUT_RECENT_DOWN) {
            player_moving = TRUE;
            new_dir = DIR_DOWN;

            // tile collision!
            tile_collision = 0;

            // Check for collisions below player
            tile_start = (((PLAYER.pos.x >> 4) + PLAYER.bounds.left)  >> 3);
            tile_end   = (((PLAYER.pos.x >> 4) + PLAYER.bounds.right) >> 3) + 1;
            UBYTE tile_y = ((PLAYER.pos.y >> 4) + PLAYER.bounds.bottom) >> 3;
            while (tile_start != tile_end) {
                
                // tile collision!
                UBYTE tile = tile_at(tile_start, tile_y + 1);
                if (tile != 0 && tile != tile_collision) {
                    handle_tile_collision(tile);
                    tile_collision = tile;
                }
                
                if (tile_at(tile_start, tile_y + 1) & COLLISION_TOP) {
                    player_moving = FALSE;
                    break;
                }
                tile_start++;
            }
        }

        // Update direction animation
        if (new_dir != DIR_NONE) {
            actor_set_dir(&PLAYER, new_dir, player_moving);
        } else {
            actor_set_anim_idle(&PLAYER);
        }

        if (IS_FRAME_ODD) {
            // Check for actor overlap
            hit_actor = actor_overlapping_player(FALSE);
            if (hit_actor != NULL && hit_actor->collision_group) {
                player_register_collision_with(hit_actor);
            }
        }

        // Check if walked in to actor
        if (player_moving) {
            hit_actor = actor_in_front_of_player(topdown_grid, FALSE);
            if (hit_actor != NULL) {
                player_register_collision_with(hit_actor);
                actor_stop_anim(&PLAYER);
                player_moving = FALSE;
            }
        }

        if (INPUT_PRESSED(INPUT_TOPDOWN_INTERACT)) {
            hit_actor = actor_in_front_of_player(topdown_grid, TRUE);
            if (hit_actor != NULL && !hit_actor->collision_group) {
                actor_set_dir(hit_actor, FLIPPED_DIR(PLAYER.dir), FALSE);
                player_moving = FALSE;
                if (hit_actor->script.bank) {
                    script_execute(hit_actor->script.bank, hit_actor->script.ptr, 0, 1, 0);
                }
            }
        }
    }

    if (player_moving) point_translate_dir(&PLAYER.pos, PLAYER.dir, PLAYER.move_speed);
}

void assign_td_collision_script(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UWORD *slot = VM_REF_TO_PTR(FN_ARG2);
    UBYTE *bank = VM_REF_TO_PTR(FN_ARG1);
    UBYTE **ptr = VM_REF_TO_PTR(FN_ARG0);
    collision_events[*slot].script_bank = *bank;
    collision_events[*slot].script_addr = *ptr;
}

void clear_td_collision_script(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UWORD *slot = VM_REF_TO_PTR(FN_ARG0);
    collision_events[*slot].script_bank = NULL;
    collision_events[*slot].script_addr = NULL;
}