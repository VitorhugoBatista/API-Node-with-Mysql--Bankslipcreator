import Sequelize from 'sequelize';
import databaseConfig from '../config/database.cjs';
import Banklsip from '../app/models/Bankslip.js';
import Payment from '../app/models/Payment.js';
const models = [Payment,Banklsip];

class Database {
  constructor(){
      this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection))
      .map((model) => {
          if(model.associate) model.associate(this.connection.models);
          return model;
      })
  }
}

export default new Database();