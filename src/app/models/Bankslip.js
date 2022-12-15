
import Sequelize, { Model } from "sequelize";

class Bankslip extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          autoIncrement:true,
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
        },
        status: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue:"PENDING",
        },
      },
      {
        sequelize,modelName:'Bankslip',
        tableName: 'bankslips',
      }
    );

    return this;
      
  }
  

 
  
}




export default Bankslip