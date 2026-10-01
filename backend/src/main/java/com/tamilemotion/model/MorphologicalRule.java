package com.tamilemotion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "morphological_rules")
public class MorphologicalRule {

    @Id
    private String id;

    private String suffix;
    private String functionName;
    private String example;
    private String emotionImpact;

    public MorphologicalRule() {}

    public MorphologicalRule(String suffix, String functionName, String example, String emotionImpact) {
        this.suffix = suffix;
        this.functionName = functionName;
        this.example = example;
        this.emotionImpact = emotionImpact;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }

    public String getEmotionImpact() {
        return emotionImpact;
    }

    public void setEmotionImpact(String emotionImpact) {
        this.emotionImpact = emotionImpact;
    }
}
