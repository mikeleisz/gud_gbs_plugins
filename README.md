# Gud GBS Plugins
### A collection of plugins for GB Studio 4+

Many thanks to the [GB Studio Discord Community](https://discord.gg/bxerKnc) for sharing their knowledge and code.
#

## Actor Plugins

### Call Actor OnHit Script
#### Calls the OnHit Scripts of a selected actor

Also works for the player actor.\
\
**Input Parameters:**
- `Target Actor` : The actor whose OnHit Script will be called
- `Collision Group` : Selects which OnHit Script will be called

<img width="532" alt="Screenshot 2024-06-13 at 6 38 24 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/4809f3fc-469e-4d7a-98b6-85c84518b1fd">

#

### Store Actor ID In Variable
#### Stores the ID of the selected actor into a target variable

Useful for targeting specific actors in GBVM operations or an engine editing context.\
\
**Input Parameters:**
- `Target Actor` : The actor whose ID will be retrieved
- `Target Variable` : A variable to store the ID in

<img width="538" alt="Screenshot 2024-06-16 at 8 20 05 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/c1d6b7b0-fd7c-4b3d-b083-d57ad68f25a2">

#
## Collision Data Plugins

### If Collision Data At Tile
#### Checks a tile for a selected collision mask and executes events

Supports all tile types, including slopes and spare tiles. Supports tile stacking.

**Input Parameters:**
- `Tile X` : X position of the tile to check
- `Tile Y` : Y position of the tile to check
- `Tile Collision Mask` : Collision mask to check for
- `True | False` : Events to be executed based on the result of the check

<img width="538" alt="Screenshot 2024-06-16 at 8 21 38 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/c470abd6-a84f-4014-8e01-13ec691e2705">

#

### Store Collision Data In Variable
#### Stores the collision data of a tile into a target variable

**Input Parameters:**
- `Tile X` : X position of the target tile
- `Tile Y` : Y position of the target tile
- `Target Variable` : A variable to store the collision data

<img width="534" alt="Screenshot 2024-06-13 at 6 57 14 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/cde7adf7-ba7f-46c8-90dc-b23d186c8fad">

#

## Screen Plugins

### Submap Background
#### Copies a region of background tiles to another position on the background

**Input Parameters:**
- `Source X` : X position of the tile to copy
- `Source Y` : Y position of the tile to copy
- `Destination X` : X position of the tile to replace
- `Destination Y` : Y position of the tile to replace
- `Submap Width` : Width of the submap in tiles
- `Submap Height` : Height of the submap in tiles

<img width="516" alt="Screenshot 2024-06-14 at 4 16 28 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/800c9430-8e10-4e4b-969a-a72c56e13260">

#

### Submap Overlay
#### Copies a region of background tiles to the overlay

A simple event interface for GBVM Operation `VM_OVERLAY_SET_SUBMAP_EX`\
\
**Input Parameters:**
- `Background X` : X position of the tile to copy
- `Background Y` : Y position of the tile to copy
- `Overlay X` : X position of the tile to replace
- `Overlay Y` : Y position of the tile to replace
- `Submap Width` : Width of the submap in tiles
- `Submap Height` : Height of the submap in tiles

<img width="516" alt="Screenshot 2024-06-14 at 4 24 58 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/910f6571-eaaf-4002-a7e7-388d0f953c3c">

#

## TopDown Tile Collisions
#### An engine plugin that allows scripts to be automatically executed when colliding with tiles in TopDown

- Based on Platformer+ State Scripts by [Hauntology](https://hauntology.itch.io)
- Replaces TopDown scene type
- Adds adjustable `Tile Collision IFrames` engine field

#

### Attach TopDown Tile Collision Script
#### Attach a script to collision with a selected tile type

**Input Parameters:**
- `Collision Type` : Collision tile type to attach script to
- `Retrigger` : Sets if script should be re-executed when collision is continuous (debounced with `Tile Collision IFrames`)
- `On Collision Script` : Events to be executed when colliding with selected tile type
- `On Exit Collision Script` : Events to be executed exiting collision with selected tile type

<img width="537" alt="Screenshot 2024-06-16 at 8 24 15 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/e73bb77f-533d-4ab2-afbb-7a9770365dea">

#

### Clear TopDown Tile Collision Script
#### Clear the script currently attached to a collision tile type

**Input Parameters:**
- `Collision Type` : Collision tile type to remove script from
- `Clear Script` : Selects which script to clear (`On Collision` | `On Exit Collision` | `Both` | `ALL`)
  
<img width="552" alt="Screenshot 2024-06-14 at 4 57 33 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/cb84bd38-4717-4b15-885f-e86358a84844">

#

## UI Elements+ 
#### A collection of event and engine plugins for UI Elements

### Set Cursor
#### Change UI Cursor at runtime

**Input Parameters:**
- `Cursor` : 8x8 tileset to use as UI cusror

<img width="613" alt="Screenshot 2024-10-25 at 9 04 37 AM" src="https://github.com/user-attachments/assets/e5e1aea9-72e2-4063-ac19-2dcd56333e73">

#

### Text Dialogue Avatar+
#### Extends the default dialogue event to include positionable avatars

**Input Parameters:**
- `Avatar Position` : Places avatar on left or ride side of dialogue text
- `Avatar Offset X` : Adjust position of avatar X in tiles
- `Avatar Offset Y` : Adjust position of avatar Y in tiles

<img width="614" alt="Screenshot 2024-10-25 at 8 59 09 AM" src="https://github.com/user-attachments/assets/7e55c61a-8e79-42e4-b05e-8a769df63b0a">


#
