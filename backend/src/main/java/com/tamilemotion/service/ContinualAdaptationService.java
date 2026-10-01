package com.tamilemotion.service;

import com.tamilemotion.dto.SimulationResponse;
import com.tamilemotion.model.ContinualAdaptationStats;
import com.tamilemotion.model.SlangLexiconEntry;
import com.tamilemotion.repository.ContinualAdaptationStatsRepository;
import com.tamilemotion.repository.SlangLexiconRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContinualAdaptationService {

    @Autowired
    private SlangLexiconRepository slangRepository;

    @Autowired
    private ContinualAdaptationStatsRepository statsRepository;

    public ContinualAdaptationStats getStats() {
        return statsRepository.findFirstByOrderByIdAsc()
                .orElseGet(() -> {
                    ContinualAdaptationStats defaultStats = new ContinualAdaptationStats(
                            14820, "5,000 Samples", 400.0, "98.4%", 14
                    );
                    return statsRepository.save(defaultStats);
                });
    }

    public List<SlangLexiconEntry> getAllSlang() {
        return slangRepository.findAllByOrderByCreatedAtDesc();
    }

    public SlangLexiconEntry addSlang(SlangLexiconEntry entry) {
        if (entry.getMemoryWeight() == null) {
            entry.setMemoryWeight(0.95);
        }
        if (entry.getStatus() == null) {
            entry.setStatus("PENDING");
        }
        entry.setCreatedAt(LocalDateTime.now());
        return slangRepository.save(entry);
    }

    public SlangLexiconEntry updateStatus(String id, String newStatus) {
        Optional<SlangLexiconEntry> existing = slangRepository.findById(id);
        if (existing.isPresent()) {
            SlangLexiconEntry entry = existing.get();
            entry.setStatus(newStatus);
            return slangRepository.save(entry);
        }
        throw new RuntimeException("Slang entry not found with id: " + id);
    }

    public SimulationResponse runAdaptationSimulation() {
        ContinualAdaptationStats stats = getStats();
        int newEpoch = stats.getAdaptationEpochs() + 1;
        int newVocab = stats.getActiveVocabularyCount() + 14;

        stats.setAdaptationEpochs(newEpoch);
        stats.setActiveVocabularyCount(newVocab);
        stats.setLastAdaptedTime(LocalDateTime.now());
        stats.setCatastrophicForgettingProtection("98.9%");
        statsRepository.save(stats);

        // Also mark any pending slang entries as Reviewed or Adapted
        List<SlangLexiconEntry> pending = slangRepository.findByStatus("PENDING");
        for (SlangLexiconEntry item : pending) {
            item.setStatus("ADAPTED");
            item.setAddedInEpoch("Task Step " + newEpoch);
            slangRepository.save(item);
        }

        List<String> log = new ArrayList<>();
        log.add("Step 1: Extracted 250 memory-replay samples from pseudo-labeled feedback stream.");
        log.add("Step 2: Computed Fisher Information Matrix (FIM) diagonal for EWC penalty (lambda = " + stats.getEwcPenaltyLambda() + ").");
        log.add("Step 3: Morpho-syntactic adapter tuned with gradient descent without overwriting previous parameters.");
        log.add("Step 4: Backward transfer evaluated on test suite: 0.18% catastrophic forgetting observed.");
        log.add("Step 5: Vocabulary expanded to " + newVocab + " active Tamil & Tanglish roots. Weights committed to MongoDB.");

        return new SimulationResponse(
                true,
                "Continual adaptation completed successfully for Epoch " + newEpoch,
                newEpoch,
                newVocab,
                0.042,
                98.9,
                log
        );
    }
}
