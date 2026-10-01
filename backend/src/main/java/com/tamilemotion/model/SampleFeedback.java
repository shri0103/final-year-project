package com.tamilemotion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "sample_feedback")
public class SampleFeedback {

    @Id
    private String id;

    private String sampleCode;
    private String title;
    private String text;
    private String transliteration;
    private String channel;
    private String brand;
    private String explicitEmotion;
    private String actualEmotion;
    private Double confidence;
    private boolean sarcasmDetected;
    private String urgency;

    private List<MorphologyToken> morphologyBreakdown;
    private List<IdiomMatch> idiomsIdentified;
    private Map<String, Integer> emotionDistribution;
    private ModelComparisonResult baselineResult;
    private ModelComparisonResult ourModelResult;
    private String suggestedAction;

    public SampleFeedback() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSampleCode() {
        return sampleCode;
    }

    public void setSampleCode(String sampleCode) {
        this.sampleCode = sampleCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public String getExplicitEmotion() {
        return explicitEmotion;
    }

    public void setExplicitEmotion(String explicitEmotion) {
        this.explicitEmotion = explicitEmotion;
    }

    public String getActualEmotion() {
        return actualEmotion;
    }

    public void setActualEmotion(String actualEmotion) {
        this.actualEmotion = actualEmotion;
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

    public String getUrgency() {
        return urgency;
    }

    public void setUrgency(String urgency) {
        this.urgency = urgency;
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

    public Map<String, Integer> getEmotionDistribution() {
        return emotionDistribution;
    }

    public void setEmotionDistribution(Map<String, Integer> emotionDistribution) {
        this.emotionDistribution = emotionDistribution;
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
}
