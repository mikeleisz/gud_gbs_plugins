# Gud GBS Plugins
### A collection of plugins for GB Studio 4

These plugins were made and tested with GB Studio 4 Beta-2.\
\
GB Studio 4 is still in active development. These plugins are subject to change to ensure they work with the official release of GBS4, whenever that happens.\
\
These plugins are not compatible with earlier versions of GB Studio. This is due to the introduction of `ScriptValue` fields in GBS4, which these plugins make use of.

## Actor Plugins

### Call Actor OnHit Script
#### Calls the OnHit Scripts of a selected actor

Also works for the player actor.\
\
Input Parameters:
- `Target Actor` : The actor whose OnHit Script will be called
- `Collision Group` : Selects which OnHit Script will be called -> [Player, Group1, Group2, Group3]

<img width="532" alt="Screenshot 2024-06-13 at 6 38 24 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/4809f3fc-469e-4d7a-98b6-85c84518b1fd">

### Store Actor ID In Variable
#### Stores the ID of the selected actor into a target variable

Useful for targeting specific actors in GBVM operations or an engine editing context.\
\
Input Parameters:
- `Target Actor` : The actor whose ID will be retrieved
- `Target Variable` : A variable to store the ID in

<img width="532" alt="Screenshot 2024-06-13 at 6 34 30 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/f53915d9-c6fe-4eeb-beef-7beb17b21715">

## Collision Data Plugins

### If Collision Data At Tile
#### Checks a tile for a selected collision mask and executes events

Supports all tile types, including slopes and spare tiles. Supports tile stacking.

Input Parameters:
- `Tile X` : X position of the tile to check
- `Tile Y` : Y position of the tile to check
- `Tile Collision Mask` : Collision mask to check for
- `True | False` : Events to be executed based on the result of the check

 <img width="514" alt="Screenshot 2024-06-13 at 8 31 05 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/50217e44-c914-4549-abad-43e36859f2ba">

### Store Collision Data In Variable
#### Stores the collision data of a tile into a target variable

Input Parameters:
- `Tile X` : X position of the target tile
- `Tile Y` : Y position of the target tile
- `Target Variable` : A variable to store the collision data

<img width="534" alt="Screenshot 2024-06-13 at 6 57 14 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/cde7adf7-ba7f-46c8-90dc-b23d186c8fad">

## Submap Plugins

### Background Submap
#### Copies a region of background tiles to another position on the background

⚠️ **This plugin does not support scrolling!**\
  Changes to the background will be reset when scrolled offscreen.\
\
⚠️ **Destination coordinates are wrapped!**\
  Changes to the background will repeat every 32 tiles.\
\
Input Parameters:
- `Source X` : X position of the tile to copy
- `Source Y` : Y position of the tile to copy
- `Destination X` : X position of the tile to replace
- `Destination Y` : Y position of the tile to replace
- `Submap Width` : Width of the submap in tiles
- `Submap Height` : Height of the submap in tiles

<img width="516" alt="Screenshot 2024-06-14 at 4 16 28 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/800c9430-8e10-4e4b-969a-a72c56e13260">

### Overlay to Background Submap
#### Copies a region of overlay tiles to the background

⚠️ **This plugin does not support scrolling!**\
  Changes to the background will be reset when scrolled offscreen.\
\
⚠️ **Destination coordinates are wrapped!**\
  Changes to the background will repeat every 32 tiles.\
\
Input Parameters:
- `Overlay X` : X position of the tile to copy
- `Overlay Y` : Y position of the tile to copy
- `Background X` : X position of the tile to replace
- `Background Y` : Y position of the tile to replace
- `Submap Width` : Width of the submap in tiles
- `Submap Height` : Height of the submap in tiles

<img width="516" alt="Screenshot 2024-06-14 at 4 19 49 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/962e5af0-9b63-4d18-b0c5-71719c225e59">

### Overlay Submap
#### Copies a region of background tiles to the overlay

A simple event interface for GBVM Operation `VM_OVERLAY_SET_SUBMAP_EX`\
\
Input Parameters:
- `Background X` : X position of the tile to copy
- `Background Y` : Y position of the tile to copy
- `Overlay X` : X position of the tile to replace
- `Overlay Y` : Y position of the tile to replace
- `Submap Width` : Width of the submap in tiles
- `Submap Height` : Height of the submap in tiles

<img width="516" alt="Screenshot 2024-06-14 at 4 24 58 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/910f6571-eaaf-4002-a7e7-388d0f953c3c">


