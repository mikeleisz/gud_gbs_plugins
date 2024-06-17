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

script_collision_t collision_events[15];
script_end_collision_t collision_end_events[15];

UBYTE tile_collision_iframes = 20;
UBYTE tile_collision = 0;
UBYTE last_collision_index = 255;

extern UBYTE player_iframes;

void call_collision_script(UBYTE index, UBYTE last_index) BANKED;

void check_collision_exit_script(UBYTE collision_data) BANKED;

bool contains_collision_mask(UBYTE tile, UBYTE mask) BANKED;

void handle_tile_collision(UBYTE tile) BANKED;

UBYTE index_to_mask(UBYTE index) BANKED;

void call_collision_script(UBYTE index, UBYTE last_index) BANKED {
    UBYTE call_collision_script = false;

    if (player_iframes == 0) {
        if ((collision_events[index].retrigger == 1) && (collision_events[index].script_addr != 0)) {
            player_iframes = tile_collision_iframes;
            call_collision_script = true;
        }
    }
    else if (player_iframes != 0) {
        player_iframes--;
    }

    if ((collision_events[index].script_addr != 0) && (index != last_index)) {
        if (collision_events[index].retrigger == 1) {
            player_iframes = tile_collision_iframes;
        }
        call_collision_script = true;
    }

    if (call_collision_script == true) {
        collision_events[index].active = true;
        script_execute(collision_events[index].script_bank, collision_events[index].script_addr, 0, 0);
    }
}

void check_collision_exit_script(UBYTE collision_data) BANKED {
    // if (index == 255 && last_index != 255) {
    //     if (collision_end_events[last_index].script_addr != 0) {
    //         script_execute(collision_end_events[last_index].script_bank, collision_end_events[last_index].script_addr, 0, 0);
    //     }
    // } else {
    //     if (index != last_index) {
    //         if (last_index != 255 && collision_end_events[last_index].script_addr != 0) {
    //             script_execute(collision_end_events[last_index].script_bank, collision_end_events[last_index].script_addr, 0, 0);
    //         }
    //     }
    // }

    UBYTE script_index = 0;
    while (script_index != 15) {
        if (collision_events[script_index].active) {
            UBYTE mask = index_to_mask(script_index);
            if (!contains_collision_mask(collision_data, mask)) {
                collision_events[script_index].active = false;
                if (collision_end_events[script_index].script_addr != 0) {
                    script_execute(collision_end_events[script_index].script_bank, collision_end_events[script_index].script_addr, 0, 0);
                }
            }
        }
        script_index++;
    }
}

UBYTE index_to_mask(UBYTE index) BANKED {
    UBYTE mask = 0x0;
    switch (index) {
        case 0:
            mask = 0xF;
            break;
        case 1:
            mask = 0x1;
            break;
        case 2:
            mask = 0x2;
            break;
        case 3:
            mask = 0x4;
            break;
        case 4:
            mask = 0x8;
            break;
        case 5:
            mask = 0x10;
            break;
        case 6:
            mask = 0x60;
            break;
        case 7:
            mask = 0x80;
            break;
        case 8:
            mask = 0x90;
            break;
        case 9:
            mask = 0xA0;
            break;
        case 10:
            mask = 0xB0;
            break;
        case 11:
            mask = 0xC0;
            break;
        case 12:
            mask = 0xD0;
            break;
        case 13:
            mask = 0xE0;
            break;
        case 14:
            mask = 0xF0;
            break;
    }
    return mask;
}

bool contains_collision_mask(UBYTE tile, UBYTE mask) BANKED {
    // handle slopes
    if (mask == 0x60) {
        return ((tile <= 0x70) && (tile & 0x60));
    } else {
        if (mask <= 0xF) {
            // handle solids
            return ((tile & 0xF) == mask);
        } else {
            // handle spare tiles, ladder
            return ((tile & 0xF0) == mask);
        }
    }
}

void handle_tile_collision(UBYTE tile) BANKED {
    UBYTE collision_index = 255;

    if (contains_collision_mask(tile, 0xF)) {
        // solids...
        collision_index = 0;
    } else if (contains_collision_mask(tile, 0x1)) {
        collision_index = 1;
    } else if (contains_collision_mask(tile, 0x2)) {
        collision_index = 2;
    } else if (contains_collision_mask(tile, 0x4)) {
        collision_index = 3;
    } else if (contains_collision_mask(tile, 0x8)) {
        collision_index = 4;
    } else if (contains_collision_mask(tile, 0x10)) {
        // ladder
        collision_index = 5;
    } else if (contains_collision_mask(tile, 0x60)) {
        // slope
        collision_index = 6;
    } else if (contains_collision_mask(tile, 0x80)) {
        // spare tiles...
        collision_index = 7;
    } else if (contains_collision_mask(tile, 0x90)) {
        collision_index = 8;
    } else if (contains_collision_mask(tile, 0xA0)) {
        collision_index = 9;
    } else if (contains_collision_mask(tile, 0xB0)) {
        collision_index = 10;
    } else if (contains_collision_mask(tile, 0xC0)) {
        collision_index = 11;
    } else if (contains_collision_mask(tile, 0xD0)) {
        collision_index = 12;
    } else if (contains_collision_mask(tile, 0xE0)) {
        collision_index = 13;
    } else if (contains_collision_mask(tile, 0xF0)) {
        collision_index = 14;
    } else {
        // no collision
        collision_index = 255;
    }
    
    check_collision_exit_script(tile);

    if(collision_index != 255){
        call_collision_script(collision_index, last_collision_index);
    }

    last_collision_index = collision_index;
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

        tile_collision = 0;

        // Check for collisions when standing still
        UBYTE tile_start_x = (((PLAYER.pos.x >> 4) + PLAYER.bounds.left) >> 3);
        UBYTE tile_end_x   = (((PLAYER.pos.x >> 4) + PLAYER.bounds.right) >> 3) + 1;

        UBYTE tile_start_y = (((PLAYER.pos.y >> 4) + PLAYER.bounds.top) >> 3);
        UBYTE tile_end_y   = (((PLAYER.pos.y >> 4) + PLAYER.bounds.bottom) >> 3) + 1;

        while (tile_start_y != tile_end_y) {

            while (tile_start_x != tile_end_x) {
                UBYTE tile = tile_at(tile_start_x, tile_start_y);
                tile_collision |= tile;
                tile_start_x++;
            }
            
            UBYTE tile_start_x = (((PLAYER.pos.x >> 4) + PLAYER.bounds.left) >> 3);
            tile_start_y++;
        }

        // Check input to set player movement
        if (INPUT_RECENT_LEFT) {
            player_moving = TRUE;
            new_dir = DIR_LEFT;

            // Check for collisions to left of player
            tile_start = (((PLAYER.pos.y >> 4) + PLAYER.bounds.top)    >> 3);
            tile_end   = (((PLAYER.pos.y >> 4) + PLAYER.bounds.bottom) >> 3) + 1;
            UBYTE tile_x = ((PLAYER.pos.x >> 4) + PLAYER.bounds.left) >> 3;
            while (tile_start != tile_end) {
                
                UBYTE tile = tile_at(tile_x - 1, tile_start);
                
                if (tile & COLLISION_RIGHT) {
                    player_moving = FALSE;
                    
                    tile_collision |= tile;

                    break;
                }
                tile_start++;
            }
        } else if (INPUT_RECENT_RIGHT) {
            player_moving = TRUE;
            new_dir = DIR_RIGHT;

            // Check for collisions to right of player
            tile_start = (((PLAYER.pos.y >> 4) + PLAYER.bounds.top)    >> 3);
            tile_end   = (((PLAYER.pos.y >> 4) + PLAYER.bounds.bottom) >> 3) + 1;
            UBYTE tile_x = ((PLAYER.pos.x >> 4) + PLAYER.bounds.right) >> 3;
            while (tile_start != tile_end) {
                
                UBYTE tile = tile_at(tile_x + 1, tile_start);
                
                if (tile & COLLISION_LEFT) {
                    player_moving = FALSE;

                    tile_collision |= tile;

                    break;
                }
                tile_start++;
            }
        } else if (INPUT_RECENT_UP) {
            player_moving = TRUE;
            new_dir = DIR_UP;

            // Check for collisions above player
            tile_start = (((PLAYER.pos.x >> 4) + PLAYER.bounds.left)  >> 3);
            tile_end   = (((PLAYER.pos.x >> 4) + PLAYER.bounds.right) >> 3) + 1;
            UBYTE tile_y = ((PLAYER.pos.y >> 4) + PLAYER.bounds.top) >> 3;
            while (tile_start != tile_end) {
                
                UBYTE tile = tile_at(tile_start, tile_y - 1);
                
                if (tile & COLLISION_BOTTOM) {
                    player_moving = FALSE;

                    tile_collision |= tile;

                    break;
                }
                tile_start++;
            }
        } else if (INPUT_RECENT_DOWN) {
            player_moving = TRUE;
            new_dir = DIR_DOWN;

            // Check for collisions below player
            tile_start = (((PLAYER.pos.x >> 4) + PLAYER.bounds.left)  >> 3);
            tile_end   = (((PLAYER.pos.x >> 4) + PLAYER.bounds.right) >> 3) + 1;
            UBYTE tile_y = ((PLAYER.pos.y >> 4) + PLAYER.bounds.bottom) >> 3;
            while (tile_start != tile_end) {
                
                UBYTE tile = tile_at(tile_start, tile_y + 1);
                
                if (tile & COLLISION_TOP) {
                    player_moving = FALSE;

                    tile_collision |= tile;

                    break;
                }
                tile_start++;
            }
        }

        handle_tile_collision(tile_collision);

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
    UBYTE retrigger = *(UBYTE*)VM_REF_TO_PTR(FN_ARG3);
    UWORD *slot = VM_REF_TO_PTR(FN_ARG2);
    UBYTE *bank = VM_REF_TO_PTR(FN_ARG1);
    UBYTE **ptr = VM_REF_TO_PTR(FN_ARG0);
    collision_events[*slot].script_bank = *bank;
    collision_events[*slot].script_addr = *ptr;
    collision_events[*slot].retrigger = retrigger;
}

void assign_td_collision_end_script(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UWORD *slot = VM_REF_TO_PTR(FN_ARG2);
    UBYTE *bank = VM_REF_TO_PTR(FN_ARG1);
    UBYTE **ptr = VM_REF_TO_PTR(FN_ARG0);
    collision_end_events[*slot].script_bank = *bank;
    collision_end_events[*slot].script_addr = *ptr;
}

void clear_td_collision_script(SCRIPT_CTX * THIS) OLDCALL BANKED {
    UBYTE clear_type = *(UBYTE*)VM_REF_TO_PTR(FN_ARG1);
    UWORD *slot = VM_REF_TO_PTR(FN_ARG0);

    switch (clear_type) {
        case 0:
            collision_events[*slot].script_bank = NULL;
            collision_events[*slot].script_addr = NULL;
            collision_end_events[*slot].script_bank = NULL;
            collision_end_events[*slot].script_addr = NULL;
            break;
        case 1:
            collision_events[*slot].script_bank = NULL;
            collision_events[*slot].script_addr = NULL;
            break;
        case 2:
            collision_end_events[*slot].script_bank = NULL;
            collision_end_events[*slot].script_addr = NULL;
            break;
        case 3:
            UBYTE script_count = 0;
            while (script_count != 30) {
                collision_events[script_count].script_bank = NULL;
                collision_events[script_count].script_addr = NULL;
                collision_end_events[script_count].script_bank = NULL;
                collision_end_events[script_count].script_addr = NULL;
                script_count++;
            }
            break;
        default:
            break;
    }
}