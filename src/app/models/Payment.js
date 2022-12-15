


import Sequelize, { Model, UUIDV4 } from "sequelize";
import Bankslip from "./Bankslip.js";

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue:UUIDV4,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        payment_date: {
          type: Sequelize.DATEONLY,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'payments',
      },
    );

    return this;
  }
  static associate() {
    /**
     * Neste caso usaremos o belongsTo, mas dependendo da necessidade
     * temos outras opçoes
     * belongsToMany, belongsTo, HasMany, HasOne,Association
     * para conhecer mais acesse:
     * https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html
     */

    this.belongsTo(Bankslip, {
      foreignKey: 'id',
      as: 'BankslipId',
      
    });
    this.hasOne(Bankslip)
  }

}



export default Payment