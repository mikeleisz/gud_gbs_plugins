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

Changes to the background will be reset when scrolled off screen!

**Input Parameters:**
- `Source X` : X position of the tile to copy
- `Source Y` : Y position of the tile to copy
- `Destination X` : X position of the tile to replace
- `Destination Y` : Y position of the tile to replace
- `Submap Width` : Width of the submap in tiles
- `Submap Height` : Height of the submap in tiles

<img width="614" alt="Screenshot 2024-10-25 at 3 45 13 PM" src="https://github.com/user-attachments/assets/384e1805-0231-4129-9a3d-6360aa38afbb">

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

Made in collaboration with [Gumpy Function](https://www.gumpyfunction.com)

#

### Invert Dialogue Background Fill Color

Inverts the text background fill color in dialogue boxes to suit ASCII sheets with white text on black background. Typically, GBS users need to place `\007\002` in front of text in a dialogue box to invert the background fill colors; this plugin will ensure you no longer need to put that before all your text throughout an entire project.

**NOTE:** This will not effect the background fill color in the overlay, only when drawing dialogue using a Display Dialogue event.

![364571913-7bbb984e-6458-44f8-8344-fd76c719e691](https://github.com/user-attachments/assets/eeffcff1-98f1-4ea4-ad3a-0c71e2f475f7)\
<sub>Default background fill (left) and background fill with Invert Dialogue Background Fill Color Plugin applied (right)</sub>

#### How to Use

Enable or Disable the Plugin in your Project Settings under 'UI Elements+'. You can also toggle it on or off in a script using the 'Engine Field Update' event.

![365335212-4c577d66-b688-4c3a-8909-e7a9f19f6ecc](https://github.com/user-attachments/assets/4cbb3bb6-8af3-460a-adeb-bbc089f0a9ce)

#

### Emote Bubble Duration

Change the amount of time the Emote Bubble stays on screen for (in frames).

![379011790-0dc9d8a4-8afb-4dac-9f62-7b1a8d1b7e93](https://github.com/user-attachments/assets/f3e53c23-a55c-47ce-80ad-636071764e40)

#### How to Use

Set the time in frames in the Project Settings under 'UI Elements+', or set the value in a script using the 'Engine Field Update' event.

#

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
