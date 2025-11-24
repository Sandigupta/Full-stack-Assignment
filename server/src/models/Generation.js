import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Generation extends Model {
    static associate(models) {
        Generation.belongsTo(models.Language, { foreignKey: 'languageId' });
    }
}

Generation.init({
    prompt: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    code: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    languageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Languages',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Generation',
});

export default Generation;
