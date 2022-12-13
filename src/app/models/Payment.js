


import Sequelize, { Model } from "sequelize";

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true
        },
        payment_date: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
        bankslipId: {
          type: Sequelize.UUID,
          allowNull: true,
        }
      },
      {
        sequelize,
        tableName: 'payments',
      },
    );

    return this;
  }
  static associate(models) {
    /**
     * Neste caso usaremos o belongsTo, mas dependendo da necessidade
     * temos outras opçoes
     * belongsToMany, belongsTo, HasMany, HasOne,Association
     * para conhecer mais acesse:
     * https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html
     */

    this.belongsTo(models.Bankslip, {
      foreignKey: 'id',
      as: 'bankslips',
    });

  }

}



export default Payment