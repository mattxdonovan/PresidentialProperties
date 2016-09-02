
exports.up = function(knex, Promise) {
  return knex.schema.createTable('presprops',
  function(table){
    table.increments();
    table.string('title');
    table.string('price');
    table.string('bedrooms');
    table.string('bathrooms');
    table.string('type');
    table.string('status');
    table.string('picLink');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('presprops');
};
