package com.tamilemotion.repository;

import com.tamilemotion.model.MorphologicalRule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MorphologicalRuleRepository extends MongoRepository<MorphologicalRule, String> {
    Optional<MorphologicalRule> findBySuffix(String suffix);
}
