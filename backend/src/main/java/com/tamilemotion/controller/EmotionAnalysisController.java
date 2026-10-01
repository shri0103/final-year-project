package com.tamilemotion.controller;

import com.tamilemotion.dto.AnalyzeRequest;
import com.tamilemotion.model.EmotionAnalysisRecord;
import com.tamilemotion.service.TamilEmotionReasoningService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analyze")
@CrossOrigin(origins = "*")
public class EmotionAnalysisController {

    @Autowired
    private TamilEmotionReasoningService emotionService;

    @PostMapping
    public ResponseEntity<EmotionAnalysisRecord> analyzeText(@Valid @RequestBody AnalyzeRequest request) {
        EmotionAnalysisRecord record = emotionService.analyze(request);
        return ResponseEntity.ok(record);
    }

    @GetMapping("/history")
    public ResponseEntity<List<EmotionAnalysisRecord>> getHistory() {
        return ResponseEntity.ok(emotionService.getRecentAnalyses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmotionAnalysisRecord> getAnalysisById(@PathVariable String id) {
        return emotionService.getAnalysisById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
