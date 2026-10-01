package com.tamilemotion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "emotion_analyses")
public class EmotionAnalysisRecord {

    @Id
    private String id;

    private String rawText;
    private String transliteration;
    private String channel;
    private String brand;

    private String primaryEmotion;
    private String secondaryEmotion;
    private Double confidence;

    private boolean sarcasmDetected;
    private boolean implicitEmotionDetected;
    private String urgency; // "LOW", "MEDIUM", "HIGH", "CRITICAL"

    private Map<String, Integer> emotionDistribution = new HashMap<>();
    private List<MorphologyToken> morphologyBreakdown = new ArrayList<>();
    private List<IdiomMatch> idiomsIdentified = new ArrayList<>();

    private ModelComparisonResult baselineResult;
    private ModelComparisonResult ourModelResult;

    private String suggestedAction;
    private String analyzedBy; // username or "anonymous"
    private LocalDateTime createdAt;

    public EmotionAnalysisRecord() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRawText() {
        return rawText;
    }

    public void setRawText(String rawText) {
        this.rawText = rawText;
    }

    public String getTransliteration() {
        return transliteration;
    }

    public void setTransliteration(String transliteration) {
        this.transliteration = transliteration;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getPrimaryEmotion() {
        return primaryEmotion;
    }

    public void setPrimaryEmotion(String primaryEmotion) {
        this.primaryEmotion = primaryEmotion;
    }

    public String getSecondaryEmotion() {
        return secondaryEmotion;
    }

    public void setSecondaryEmotion(String secondaryEmotion) {
        this.secondaryEmotion = secondaryEmotion;
    }

    public Double getConfidence() {
        return confidence;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public boolean isSarcasmDetected() {
        return sarcasmDetected;
    }

    public void setSarcasmDetected(boolean sarcasmDetected) {
        this.sarcasmDetected = sarcasmDetected;
    }

    public boolean isImplicitEmotionDetected() {
        return implicitEmotionDetected;
    }

    public void setImplicitEmotionDetected(boolean implicitEmotionDetected) {
        this.implicitEmotionDetected = implicitEmotionDetected;
    }

    public String getUrgency() {
        return urgency;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
    }

    public Map<String, Integer> getEmotionDistribution() {
        return emotionDistribution;
    }

    public void setEmotionDistribution(Map<String, Integer> emotionDistribution) {
        this.emotionDistribution = emotionDistribution;
    }

    public List<MorphologyToken> getMorphologyBreakdown() {
        return morphologyBreakdown;
    }

    public void setMorphologyBreakdown(List<MorphologyToken> morphologyBreakdown) {
        this.morphologyBreakdown = morphologyBreakdown;
    }

    public List<IdiomMatch> getIdiomsIdentified() {
        return idiomsIdentified;
    }

    public void setIdiomsIdentified(List<IdiomMatch> idiomsIdentified) {
        this.idiomsIdentified = idiomsIdentified;
    }

    public ModelComparisonResult getBaselineResult() {
        return baselineResult;
    }

    public void setBaselineResult(ModelComparisonResult baselineResult) {
        this.baselineResult = baselineResult;
    }

    public ModelComparisonResult getOurModelResult() {
        return ourModelResult;
    }

    public void setOurModelResult(ModelComparisonResult ourModelResult) {
        this.ourModelResult = ourModelResult;
    }

    public String getSuggestedAction() {
        return suggestedAction;
    }

    public void setSuggestedAction(String suggestedAction) {
        this.suggestedAction = suggestedAction;
    }

    public String getAnalyzedBy() {
        return analyzedBy;
    }

    public void setAnalyzedBy(String analyzedBy) {
        this.analyzedBy = analyzedBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
