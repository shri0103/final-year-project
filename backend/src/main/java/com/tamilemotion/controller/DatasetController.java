package com.tamilemotion.controller;

import com.tamilemotion.model.SampleFeedback;
import com.tamilemotion.repository.SampleFeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dataset")
@CrossOrigin(origins = "*")
public class DatasetController {

    @Autowired
    private SampleFeedbackRepository sampleRepository;

    @GetMapping("/samples")
    public ResponseEntity<List<SampleFeedback>> getSamples() {
        return ResponseEntity.ok(sampleRepository.findAll());
    }

    @GetMapping("/samples/{code}")
    public ResponseEntity<SampleFeedback> getSampleByCode(@PathVariable String code) {
        return sampleRepository.findBySampleCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/samples")
    public ResponseEntity<SampleFeedback> createSample(@RequestBody SampleFeedback sample) {
        return ResponseEntity.ok(sampleRepository.save(sample));
    }
}
