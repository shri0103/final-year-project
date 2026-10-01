package com.tamilemotion.repository;

import com.tamilemotion.model.EmotionAnalysisRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmotionAnalysisRepository extends MongoRepository<EmotionAnalysisRecord, String> {
    List<EmotionAnalysisRecord> findAllByOrderByCreatedAtDesc();
    long countByPrimaryEmotion(String primaryEmotion);
    long countBySarcasmDetected(boolean sarcasmDetected);
    List<EmotionAnalysisRecord> findTop10ByOrderByCreatedAtDesc();
}
