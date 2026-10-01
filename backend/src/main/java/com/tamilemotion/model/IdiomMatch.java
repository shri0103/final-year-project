package com.tamilemotion.model;

public class IdiomMatch {

    private String idiom;
    private String meaning;
    private String polarity;

    public IdiomMatch() {}

    public IdiomMatch(String idiom, String meaning, String polarity) {
        this.idiom = idiom;
        this.meaning = meaning;
        this.polarity = polarity;
    }

    public String getIdiom() {
        return idiom;
    }

    public void setIdiom(String idiom) {
        this.idiom = idiom;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getPolarity() {
        return polarity;
    }

    public void setPolarity(String polarity) {
        this.polarity = polarity;
    }
}
