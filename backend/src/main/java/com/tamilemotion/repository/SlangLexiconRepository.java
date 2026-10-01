package com.tamilemotion.repository;

import com.tamilemotion.model.SlangLexiconEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SlangLexiconRepository extends MongoRepository<SlangLexiconEntry, String> {
    List<SlangLexiconEntry> findAllByOrderByCreatedAtDesc();
    List<SlangLexiconEntry> findByStatus(String status);
    Optional<SlangLexiconEntry> findByTermIgnoreCase(String term);
    long countByStatus(String status);
}
