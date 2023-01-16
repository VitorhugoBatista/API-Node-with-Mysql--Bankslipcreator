
import Sequelize, { Model } from "sequelize";

class Bankslip extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        due_date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        total_in_cents: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        customer: {
          type: Sequelize.STRING,
          allowNull: false,
          validate:{len:[1,10]}
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue:"PENDING",
        },
      },
      {
        sequelize,
        tableName: 'bankslips',
      }
    );

    return this;
    }
    
  

  static associate(models) {
  
  this.hasOne(models.Payment,{
    foreignKey: 'bankslip_id',
        as: 'payments',
  });


}
}
export default Bankslip