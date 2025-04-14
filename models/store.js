module.exports = (sequelize, DataTypes) => {
                    const Store = sequelize.define("store", {
                      name: {
                        type: DataTypes.STRING(60),
                        allowNull: false,
                        validate: {
                          len: [1, 60],
                        },
                      },
                      address: {
                        type: DataTypes.STRING(400),
                        allowNull: false,
                        validate: {
                          len: [1, 400],
                        },
                      },
                      ownerId: {
                        type: DataTypes.INTEGER,
                        allowNull: false,
                      },
                    });
                  
                    return Store;
                  };
                  