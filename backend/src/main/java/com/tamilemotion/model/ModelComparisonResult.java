package com.tamilemotion.model;

public class ModelComparisonResult {

    private String model;
    private String predictedEmotion;
    private boolean correct;
    private String reasoning;

    public ModelComparisonResult() {}

    public ModelComparisonResult(String model, String predictedEmotion, boolean correct, String reasoning) {
        this.model = model;
        this.predictedEmotion = predictedEmotion;
        this.correct = correct;
        this.reasoning = reasoning;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPredictedEmotion() {
        return predictedEmotion;
    }

    public void setPredictedEmotion(String predictedEmotion) {
        this.predictedEmotion = predictedEmotion;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public String getReasoning() {
        return reasoning;
    }

    public void setReasoning(String reasoning) {
        this.reasoning = reasoning;
    }
}
