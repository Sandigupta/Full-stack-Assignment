import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Language extends Model {
    static associate(models) {
        Language.hasMany(models.Generation, { foreignKey: 'languageId' });
    }
}

Language.init({
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Language',
});

export default Language;
