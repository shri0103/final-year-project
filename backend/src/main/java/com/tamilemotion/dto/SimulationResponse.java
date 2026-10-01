package com.tamilemotion.dto;

import java.util.List;

public class SimulationResponse {

    private boolean success;
    private String message;
    private int epoch;
    private int newVocabularyCount;
    private double ewcLoss;
    private double stabilityMetric;
    private List<String> executionLog;

    public SimulationResponse() {}

    public SimulationResponse(boolean success, String message, int epoch, int newVocabularyCount, double ewcLoss, double stabilityMetric, List<String> executionLog) {
        this.success = success;
        this.message = message;
        this.epoch = epoch;
        this.newVocabularyCount = newVocabularyCount;
        this.ewcLoss = ewcLoss;
        this.stabilityMetric = stabilityMetric;
        this.executionLog = executionLog;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getEpoch() {
        return epoch;
    }

    public void setEpoch(int epoch) {
        this.epoch = epoch;
    }

    public int getNewVocabularyCount() {
        return newVocabularyCount;
    }

    public void setNewVocabularyCount(int newVocabularyCount) {
        this.newVocabularyCount = newVocabularyCount;
    }

    public double getEwcLoss() {
        return ewcLoss;
    }

    public void setEwcLoss(double ewcLoss) {
        this.ewcLoss = ewcLoss;
    }

    public double getStabilityMetric() {
        return stabilityMetric;
    }

    public void setStabilityMetric(double stabilityMetric) {
        this.stabilityMetric = stabilityMetric;
    }

    public List<String> getExecutionLog() {
        return executionLog;
    }

    public void setExecutionLog(List<String> executionLog) {
        this.executionLog = executionLog;
    }
}
