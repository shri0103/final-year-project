package com.tamilemotion.repository;

import com.tamilemotion.model.ContinualAdaptationStats;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContinualAdaptationStatsRepository extends MongoRepository<ContinualAdaptationStats, String> {
    Optional<ContinualAdaptationStats> findFirstByOrderByIdAsc();
}
