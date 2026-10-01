package com.tamilemotion.repository;

import com.tamilemotion.model.SampleFeedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SampleFeedbackRepository extends MongoRepository<SampleFeedback, String> {
    Optional<SampleFeedback> findBySampleCode(String sampleCode);
}
