const dbConfig = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.store = require("./store.js")(sequelize, Sequelize);
db.rating = require("./rating.js")(sequelize, Sequelize);

// Associations
db.user.hasMany(db.rating, { foreignKey: "userId" });
db.rating.belongsTo(db.user, { foreignKey: "userId" });

db.store.hasMany(db.rating, { foreignKey: "storeId" });
db.rating.belongsTo(db.store, { foreignKey: "storeId" });

db.user.hasMany(db.store, { foreignKey: "ownerId" }); // Store Owner
db.store.belongsTo(db.user, { foreignKey: "ownerId" });

module.exports = db;
