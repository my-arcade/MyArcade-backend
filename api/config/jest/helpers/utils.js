import Promise from 'bluebird';
import models from 'database/models';

export const cleanDatabase = () => {
  return Promise.all(
    Object.keys(models).map(key => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return models[key].destroy({ where: {}, force: true });
    })
  );
};
