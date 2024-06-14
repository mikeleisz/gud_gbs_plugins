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

Does not support tile stacking! This plugin checks for equivalence, instead of checking if a tile contains a selected collision mask. I hope to support this in the future, but I was unable to figure out a masking solution that easily fit all tile types.\
\
Does not support slopes! All other tile types, including ladders and spare collision tiles, are supported.

Input Parameters:

### Store Collision Data In Variable
#### Stores the collision data of a tile into a target variable

Input Parameters:
- `Tile X` : X position of the target tile
- `Tile Y` : Y position of the target tile
- `Target Variable` : A variable to store the collision data

<img width="534" alt="Screenshot 2024-06-13 at 6 57 14 PM" src="https://github.com/mikeleisz/gud_gbs_plugins/assets/2031008/cde7adf7-ba7f-46c8-90dc-b23d186c8fad">


