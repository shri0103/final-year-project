package com.tamilemotion.dto;

public class SlangStatusUpdateRequest {
    private String status; // "PENDING", "REVIEWED", "ADAPTED"

    public SlangStatusUpdateRequest() {}

    public SlangStatusUpdateRequest(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
