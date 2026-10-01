package com.tamilemotion.controller;

import com.tamilemotion.dto.SimulationResponse;
import com.tamilemotion.dto.SlangStatusUpdateRequest;
import com.tamilemotion.model.ContinualAdaptationStats;
import com.tamilemotion.model.MorphologicalRule;
import com.tamilemotion.model.SlangLexiconEntry;
import com.tamilemotion.repository.MorphologicalRuleRepository;
import com.tamilemotion.service.ContinualAdaptationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContinualAdaptationController {

    @Autowired
    private ContinualAdaptationService adaptationService;

    @Autowired
    private MorphologicalRuleRepository ruleRepository;

    @GetMapping("/adaptation/stats")
    public ResponseEntity<ContinualAdaptationStats> getStats() {
        return ResponseEntity.ok(adaptationService.getStats());
    }

    @PostMapping("/adaptation/simulate")
    public ResponseEntity<SimulationResponse> runSimulation() {
        return ResponseEntity.ok(adaptationService.runAdaptationSimulation());
    }

    @GetMapping("/lexicon/slang")
    public ResponseEntity<List<SlangLexiconEntry>> getSlangLexicon() {
        return ResponseEntity.ok(adaptationService.getAllSlang());
    }

    @PostMapping("/lexicon/slang")
    public ResponseEntity<SlangLexiconEntry> addSlang(@RequestBody SlangLexiconEntry entry) {
        return ResponseEntity.ok(adaptationService.addSlang(entry));
    }

    @PutMapping("/lexicon/slang/{id}/status")
    public ResponseEntity<SlangLexiconEntry> updateStatus(@PathVariable String id, @RequestBody SlangStatusUpdateRequest req) {
        return ResponseEntity.ok(adaptationService.updateStatus(id, req.getStatus()));
    }

    @GetMapping("/lexicon/morphological-rules")
    public ResponseEntity<List<MorphologicalRule>> getRules() {
        return ResponseEntity.ok(ruleRepository.findAll());
    }
}
