package com.tamilemotion.dto;

import com.tamilemotion.model.EmotionAnalysisRecord;

import java.util.List;
import java.util.Map;

public class DashboardStatsResponse {

    private long totalAnalyses;
    private long frustrationCount;
    private double frustrationPercent;
    private long angerCount;
    private double angerPercent;
    private long sarcasmCount;
    private double sarcasmPercent;
    private long satisfactionCount;
    private double satisfactionPercent;

    private List<Map<String, Object>> pieData;
    private List<Map<String, Object>> weeklyTrend;
    private List<EmotionAnalysisRecord> recentAnalyses;

    public DashboardStatsResponse() {}

    public long getTotalAnalyses() {
        return totalAnalyses;
    }

    public void setTotalAnalyses(long totalAnalyses) {
        this.totalAnalyses = totalAnalyses;
    }

    public long getFrustrationCount() {
        return frustrationCount;
    }

    public void setFrustrationCount(long frustrationCount) {
        this.frustrationCount = frustrationCount;
    }

    public double getFrustrationPercent() {
        return frustrationPercent;
    }

    public void setFrustrationPercent(double frustrationPercent) {
        this.frustrationPercent = frustrationPercent;
    }

    public long getAngerCount() {
        return angerCount;
    }

    public void setAngerCount(long angerCount) {
        this.angerCount = angerCount;
    }

    public double getAngerPercent() {
        return angerPercent;
    }

    public void setAngerPercent(double angerPercent) {
        this.angerPercent = angerPercent;
    }

    public long getSarcasmCount() {
        return sarcasmCount;
    }

    public void setSarcasmCount(long sarcasmCount) {
        this.sarcasmCount = sarcasmCount;
    }

    public double getSarcasmPercent() {
        return sarcasmPercent;
    }

    public void setSarcasmPercent(double sarcasmPercent) {
        this.sarcasmPercent = sarcasmPercent;
    }

    public long getSatisfactionCount() {
        return satisfactionCount;
    }

    public void setSatisfactionCount(long satisfactionCount) {
        this.satisfactionCount = satisfactionCount;
    }

    public double getSatisfactionPercent() {
        return satisfactionPercent;
    }

    public void setSatisfactionPercent(double satisfactionPercent) {
        this.satisfactionPercent = satisfactionPercent;
    }

    public List<Map<String, Object>> getPieData() {
        return pieData;
    }

    public void setPieData(List<Map<String, Object>> pieData) {
        this.pieData = pieData;
    }

    public List<Map<String, Object>> getWeeklyTrend() {
        return weeklyTrend;
    }

    public void setWeeklyTrend(List<Map<String, Object>> weeklyTrend) {
        this.weeklyTrend = weeklyTrend;
    }

    public List<EmotionAnalysisRecord> getRecentAnalyses() {
        return recentAnalyses;
    }

    public void setRecentAnalyses(List<EmotionAnalysisRecord> recentAnalyses) {
        this.recentAnalyses = recentAnalyses;
    }
}
