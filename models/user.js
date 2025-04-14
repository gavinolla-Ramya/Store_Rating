module.exports = (sequelize, DataTypes) => {
                    const User = sequelize.define("user", {
                      name: {
                        type: DataTypes.STRING(60),
                        allowNull: false,
                        validate: {
                          len: [3, 60],
                        },
                      },
                      email: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true,
                        validate: {
                          isEmail: true,
                        },
                      },
                      password: {
                        type: DataTypes.STRING,
                        allowNull: false,
                      },
                      role: {
                        type: DataTypes.ENUM("admin", "user", "store_owner"),
                        allowNull: false,
                        defaultValue: "user",
                      },
                    });
                  
                    return User;
                  };
                  