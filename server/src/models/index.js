import Language from './Language.js';
import Generation from './Generation.js';

const models = {
    Language,
    Generation
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export { Language, Generation };
export default models;
