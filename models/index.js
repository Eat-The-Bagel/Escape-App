const Character = require('./Character');
const Interaction = require('./Interaction');
const Location = require('./Location');
const User = require('./User');
const Inventory = require('./Inventory');
const Item = require('./Item');
const Resolution = require('./Resolution');

Character.belongsTo(Location, {
  foreignKey: 'location_id'
})

Location.hasMany(Interaction, {
  foreignKey: 'location_id'
})

Interaction.belongsTo(Location, {
  foreignKey: 'location_id'
});

User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Resolution.belongsTo(Interaction, {
  foreignKey: 'resolution_id',
});

// Interaction.hasMany(Resolution, {
//   foreignKey: 'resolution_id',
// });

Inventory.belongsTo(Character, {
  foreignKey: 'character_id',
});

Inventory.hasMany(Item, {
  foreignKey: 'item_id',
});



module.exports = { Character, Interaction, Location, User, Inventory, Item, Resolution };
