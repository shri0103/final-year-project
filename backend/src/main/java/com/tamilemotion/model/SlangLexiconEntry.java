package com.tamilemotion.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "slang_lexicon")
public class SlangLexiconEntry {

    @Id
    private String id;

    private String term;
    private String category;
    private String sentiment;
    private String meaning;
    private String addedInEpoch;
    private Double memoryWeight;
    private String status; // "PENDING", "REVIEWED", "ADAPTED"
    private LocalDateTime createdAt;

    public SlangLexiconEntry() {
        this.createdAt = LocalDateTime.now();
        this.status = "ADAPTED";
    }

    public SlangLexiconEntry(String term, String category, String sentiment, String meaning, String addedInEpoch, Double memoryWeight, String status) {
        this.term = term;
        this.category = category;
        this.sentiment = sentiment;
        this.meaning = meaning;
        this.addedInEpoch = addedInEpoch;
        this.memoryWeight = memoryWeight;
        this.status = status != null ? status : "ADAPTED";
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getAddedInEpoch() {
        return addedInEpoch;
    }

    public void setAddedInEpoch(String addedInEpoch) {
        this.addedInEpoch = addedInEpoch;
    }

    public Double getMemoryWeight() {
        return memoryWeight;
    }

    public void setMemoryWeight(Double memoryWeight) {
        this.memoryWeight = memoryWeight;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
