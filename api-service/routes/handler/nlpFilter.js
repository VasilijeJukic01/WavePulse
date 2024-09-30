const toxicity = require('@tensorflow-models/toxicity');

const threshold = 0.9;
let model;

const loadModel = async () => {
    model = await toxicity.load(threshold);
};

const isReviewToxic = async (review) => {
    if (!model) {
        throw new Error("Model not loaded yet");
    }

    const predictions = await model.classify([review]);
    return predictions.some(prediction =>
        prediction.results.some(result => result.match)
    );
};

module.exports = {
    loadModel,
    isReviewToxic
};