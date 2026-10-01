package com.tamilemotion.model;

public class MorphologyToken {

    private String token;
    private String root;
    private String pos;
    private String suffix;
    private String semantic;

    public MorphologyToken() {}

    public MorphologyToken(String token, String root, String pos, String suffix, String semantic) {
        this.token = token;
        this.root = root;
        this.pos = pos;
        this.suffix = suffix;
        this.semantic = semantic;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRoot() {
        return root;
    }

    public void setRoot(String root) {
        this.root = root;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }

    public String getSemantic() {
        return semantic;
    }

    public void setSemantic(String semantic) {
        this.semantic = semantic;
    }
}
