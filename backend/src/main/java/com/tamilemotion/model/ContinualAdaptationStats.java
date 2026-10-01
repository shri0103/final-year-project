package com.tamilemotion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "continual_adaptation_stats")
public class ContinualAdaptationStats {

    @Id
    private String id;

    private Integer activeVocabularyCount;
    private String replayBufferCapacity;
    private Double ewcPenaltyLambda;
    private String catastrophicForgettingProtection;
    private Integer adaptationEpochs;
    private LocalDateTime lastAdaptedTime;

    public ContinualAdaptationStats() {
        this.lastAdaptedTime = LocalDateTime.now();
    }

    public ContinualAdaptationStats(Integer activeVocabularyCount, String replayBufferCapacity, Double ewcPenaltyLambda, String catastrophicForgettingProtection, Integer adaptationEpochs) {
        this.activeVocabularyCount = activeVocabularyCount;
        this.replayBufferCapacity = replayBufferCapacity;
        this.ewcPenaltyLambda = ewcPenaltyLambda;
        this.catastrophicForgettingProtection = catastrophicForgettingProtection;
        this.adaptationEpochs = adaptationEpochs;
        this.lastAdaptedTime = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getActiveVocabularyCount() {
        return activeVocabularyCount;
    }

    public void setActiveVocabularyCount(Integer activeVocabularyCount) {
        this.activeVocabularyCount = activeVocabularyCount;
    }

    public String getReplayBufferCapacity() {
        return replayBufferCapacity;
    }

    public void setReplayBufferCapacity(String replayBufferCapacity) {
        this.replayBufferCapacity = replayBufferCapacity;
    }

    public Double getEwcPenaltyLambda() {
        return ewcPenaltyLambda;
    }

    public void setEwcPenaltyLambda(Double ewcPenaltyLambda) {
        this.ewcPenaltyLambda = ewcPenaltyLambda;
    }

    public String getCatastrophicForgettingProtection() {
        return catastrophicForgettingProtection;
    }

    public void setCatastrophicForgettingProtection(String catastrophicForgettingProtection) {
        this.catastrophicForgettingProtection = catastrophicForgettingProtection;
    }

    public Integer getAdaptationEpochs() {
        return adaptationEpochs;
    }

    public void setAdaptationEpochs(Integer adaptationEpochs) {
        this.adaptationEpochs = adaptationEpochs;
    }

    public LocalDateTime getLastAdaptedTime() {
        return lastAdaptedTime;
    }

    public void setLastAdaptedTime(LocalDateTime lastAdaptedTime) {
        this.lastAdaptedTime = lastAdaptedTime;
    }
}
