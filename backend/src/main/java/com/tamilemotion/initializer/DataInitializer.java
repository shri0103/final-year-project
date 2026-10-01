package com.tamilemotion.initializer;

import com.tamilemotion.model.*;
import com.tamilemotion.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SlangLexiconRepository slangRepository;

    @Autowired
    private MorphologicalRuleRepository ruleRepository;

    @Autowired
    private ContinualAdaptationStatsRepository statsRepository;

    @Autowired
    private SampleFeedbackRepository sampleRepository;

    @Autowired
    private EmotionAnalysisRepository analysisRepository;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedContinualLearningStats();
        seedMorphologicalRules();
        seedSlangLexicon();
        seedSampleFeedback();
        seedInitialAnalyses();
        System.out.println(">> [DataInitializer] MongoDB Collections verified and seeded successfully!");
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            userRepository.save(new User("admin", "admin@tamilemotion.ai", passwordEncoder.encode("admin123"), "ADMIN", "Lead NLP Researcher"));
            userRepository.save(new User("researcher", "research@tamilemotion.ai", passwordEncoder.encode("tamilai2026"), "RESEARCHER", "Tamil AI Analyst"));
            userRepository.save(new User("demo", "demo@tamilemotion.ai", passwordEncoder.encode("demo123"), "RESEARCHER", "Demo Evaluator"));
            System.out.println(">> [DataInitializer] Default Users seeded with BCrypt passwords: admin / admin123, researcher / tamilai2026");
        } else {
            // Upgrade any existing users that have plain text passwords
            List<User> existing = userRepository.findAll();
            for (User u : existing) {
                if (u.getPassword() != null && !u.getPassword().startsWith("$2a$") && !u.getPassword().startsWith("$2b$") && !u.getPassword().startsWith("$2y$")) {
                    u.setPassword(passwordEncoder.encode(u.getPassword()));
                    userRepository.save(u);
                    System.out.println(">> [DataInitializer] Upgraded user '" + u.getUsername() + "' password to BCrypt hash.");
                }
            }
        }
    }

    private void seedContinualLearningStats() {
        if (statsRepository.count() == 0) {
            ContinualAdaptationStats stats = new ContinualAdaptationStats(
                    14820, "5,000 Samples", 400.0, "98.4%", 14
            );
            statsRepository.save(stats);
            System.out.println(">> [DataInitializer] Continual Adaptation Stats seeded.");
        }
    }

    private void seedMorphologicalRules() {
        saveRuleIfMissing("-அல (-ala)", "Negative verb suffix", "வரல (Didn't arrive)", "Elevates Frustration & Dissatisfaction (+0.35)");
        saveRuleIfMissing("-உம் (-um)", "Inclusive particle", "பணமும் (Money also)", "Triggers escalation when attached to unfulfilled demands");
        saveRuleIfMissing("-இட்டாங்க (-ittaanga)", "Aspectual completive", "பண்ணிட்டாங்க (Done completely)", "Action completion marker");
        saveRuleIfMissing("-உல்+அ (-ulla)", "Locative case marker", "வீட்டுக்குள்ள (Inside home)", "Spatial boundary indicator for signal/service failures");
        saveRuleIfMissing("-ஏ (-ae)", "Emphatic suffix", "ரொம்பவே (Excessively)", "Sarcasm indicator when paired with opposite sentiment root");
        saveRuleIfMissing("-மாட்றாங்க (-maattraanga)", "Negative refusal auxiliary", "எடுக்கவே மாட்றாங்க (Refusing to attend)", "Flags implicit customer frustration and support abandonment");
        saveRuleIfMissing("-வைத்ததற்கு (-vaithadharku)", "Causative dative suffix", "காத்திருக்க வைத்ததற்கு (For making me wait)", "Sarcastic causal justification in complaints");
        saveRuleIfMissing("-ஆச்சு (-aachu)", "Completive aspectual duration", "3 வாரம் ஆச்சு (3 weeks elapsed)", "Amplifies delivery delay severity score");
        saveRuleIfMissing("-ஐ (-ai)", "Accusative case marker", "பொருளை / ஆர்டரை (The product/order)", "Direct patient/object target of service failure");
        saveRuleIfMissing("-க்கு (-kku)", "Dative case marker", "டைமுக்கு / எனக்கு (On time / to me)", "Expectation boundary marker");
        saveRuleIfMissing("-இல்லை (-illai)", "Existential negation", "வொர்த்தே இல்ல (No worth at all)", "Absolute quality negation");
        saveRuleIfMissing("-வில்ல (-villai)", "Formal verbal negation", "வரவில்லை (Did not arrive)", "Formal statement of non-delivery");
        System.out.println(">> [DataInitializer] Comprehensive Tamil Morphological Rules verified and updated.");
    }

    private void saveRuleIfMissing(String suffix, String functionName, String example, String emotionImpact) {
        if (ruleRepository.findBySuffix(suffix).isEmpty()) {
            ruleRepository.save(new MorphologicalRule(suffix, functionName, example, emotionImpact));
        }
    }

    private void seedSlangLexicon() {
        if (slangRepository.count() == 0) {
            slangRepository.save(new SlangLexiconEntry("மொக்க", "Slang", "Extremely Negative", "Useless / Low Quality", "Task Step 1", 0.94, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("கடுப்பேத்துறாங்க", "Agglutinative Verb", "High Frustration", "Deliberately annoying / aggravating", "Task Step 1", 0.96, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("வேற லெவல்", "Code-Mixed Idiom", "High Delight", "Next Level / Unmatched Excellence", "Task Step 2", 0.98, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("செமையா", "Colloquial Adjective", "Positive Praise", "Superb / Top Notch", "Task Step 2", 0.92, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("வொர்த்தே இல்ல", "Tanglish Code-Mix", "Disappointment", "Zero value for money", "Task Step 3", 0.95, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("டவர் காலி", "Domain Idiom", "Implicit Frustration", "Complete signal loss", "Task Step 3", 0.91, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("வயித்துல அடித்தல்", "Cultural Idiom", "Severe Grief/Anger", "Depriving livelihood/meal", "Core Memory", 0.99, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("சூப்பர் சிஸ்டம்", "Sarcasm Marker", "Inverted (Negative)", "Ironic mockery of failure", "Core Memory", 0.97, "ADAPTED"));
            slangRepository.save(new SlangLexiconEntry("vera level waiting", "Code-Mixed Slang", "High Frustration", "Extremely long wait time", "Task Step 14", 0.88, "PENDING"));
            slangRepository.save(new SlangLexiconEntry("semma service da", "Colloquial Praise", "Satisfaction", "Great informal praise for service", "Task Step 14", 0.90, "REVIEWED"));
            System.out.println(">> [DataInitializer] Slang Lexicon seeded.");
        }
    }

    private void seedSampleFeedback() {
        if (sampleRepository.count() == 0) {
            SampleFeedback s1 = new SampleFeedback();
            s1.setSampleCode("sample-1");
            s1.setTitle("Sarcastic E-Commerce Delay Feedback");
            s1.setText("ரொம்ப நல்லா சேவை செய்றீங்க! 3 வாரம் ஆச்சு, பொருளும் வரல, பணமும் திரும்ப வரல. சூப்பர் சிஸ்டம்!");
            s1.setTransliteration("Romba nalla sevai seiringa! 3 vaaram aachu, porulum varala, panamum thirumba varala. Super system!");
            s1.setChannel("Zomato / E-Commerce Review");
            s1.setBrand("ExpressKart Tamil");
            s1.setExplicitEmotion("Joy / Praise (Literal text reads 'Super system')");
            s1.setActualEmotion("Sarcasm & Extreme Frustration");
            s1.setConfidence(96.8);
            s1.setSarcasmDetected(true);
            s1.setUrgency("HIGH");

            Map<String, Integer> dist1 = new HashMap<>();
            dist1.put("Frustration", 65);
            dist1.put("Sarcasm", 88);
            dist1.put("Anger", 72);
            dist1.put("Disappointment", 80);
            dist1.put("Joy", 5);
            dist1.put("Satisfaction", 2);
            s1.setEmotionDistribution(dist1);

            s1.setBaselineResult(new ModelComparisonResult("MuRIL / mBERT Baseline", "Positive / Joy (Literal match)", false, "Foiled by superficial praise words"));
            s1.setOurModelResult(new ModelComparisonResult("Morphology-Aware Tamil Reasoner", "Sarcasm & High Frustration", true, "Contextual contradiction detected: delay tokens contradict praise"));
            s1.setSuggestedAction("Immediate CS Escalation (Ticket Priority #1) & Refund Confirmation SMS in Tamil.");
            sampleRepository.save(s1);

            SampleFeedback s2 = new SampleFeedback();
            s2.setSampleCode("sample-2");
            s2.setTitle("Idiomatic Deep Frustration (Agglutinative)");
            s2.setText("என் வயித்துல அடிச்சுட்டீங்கப்பா! ஹோட்டல்ல ஆர்டர் பண்ணி 2 மணி நேரம் காக்க வச்சு கடைசியில கேன்சல் பண்ணிட்டீங்க.");
            s2.setTransliteration("En vayithula adichutteengappa! Hotella order panni 2 mani neram kaakka vachu kadaisiyila cancel pannitteenga.");
            s2.setChannel("Food Delivery App");
            s2.setBrand("Swiggy / Zomato Tamil");
            s2.setExplicitEmotion("Neutral / Action description");
            s2.setActualEmotion("Deep Frustration & Distress");
            s2.setConfidence(94.2);
            s2.setSarcasmDetected(false);
            s2.setUrgency("CRITICAL");

            Map<String, Integer> dist2 = new HashMap<>();
            dist2.put("Frustration", 92);
            dist2.put("Anger", 84);
            dist2.put("Sadness", 76);
            dist2.put("Sarcasm", 12);
            dist2.put("Joy", 0);
            s2.setEmotionDistribution(dist2);

            s2.setBaselineResult(new ModelComparisonResult("Standard XLM-R", "Sadness (Misses agglutinative idiom)", false, "Lacked cultural idiom grounding"));
            s2.setOurModelResult(new ModelComparisonResult("Morphology-Aware Tamil Reasoner", "Severe Frustration & Distress", true, "Morpho-syntactic adapter isolated root 'வயிறு' + verb 'அடி' with emotional intensifier '-ப்பா'"));
            s2.setSuggestedAction("Full order refund + ₹150 apology voucher + Priority Call from Customer Operations Manager.");
            sampleRepository.save(s2);

            SampleFeedback s3 = new SampleFeedback();
            s3.setSampleCode("sample-3");
            s3.setTitle("Genuine Customer Delight");
            s3.setText("ரொம்ப நல்லா இருந்தது, சீக்கிரமா டெலிவரி பண்ணிட்டாங்க. அருமையான சர்வீஸ்!");
            s3.setTransliteration("Romba nalla irundhathu, seekirama delivery pannittaanga. Arumaiyaana service!");
            s3.setChannel("Quick Commerce Delivery");
            s3.setBrand("Blinkit Tamil");
            s3.setExplicitEmotion("Satisfaction & Delight");
            s3.setActualEmotion("Genuine Satisfaction & Joy");
            s3.setConfidence(98.1);
            s3.setSarcasmDetected(false);
            s3.setUrgency("LOW");

            Map<String, Integer> dist3 = new HashMap<>();
            dist3.put("Satisfaction", 95);
            dist3.put("Joy", 90);
            dist3.put("Frustration", 0);
            dist3.put("Anger", 0);
            s3.setEmotionDistribution(dist3);

            s3.setBaselineResult(new ModelComparisonResult("Standard XLM-R", "Positive", true, "Surface praise matches sentiment"));
            s3.setOurModelResult(new ModelComparisonResult("Morphology-Aware Tamil Reasoner", "Genuine Satisfaction & Delight", true, "Praise morphemes verified with absence of negative delay contradiction"));
            s3.setSuggestedAction("Send customer appreciation discount coupon.");
            sampleRepository.save(s3);

            System.out.println(">> [DataInitializer] Sample Tamil Feedback dataset seeded.");
        }
    }

    private void seedInitialAnalyses() {
        if (analysisRepository.count() == 0) {
            // Seed a few initial historical records so Dashboard starts with live data
            EmotionAnalysisRecord r1 = new EmotionAnalysisRecord();
            r1.setRawText("ரொம்ப நல்லா சேவை செய்றீங்க! 3 வாரம் ஆச்சு, பொருளும் வரல, பணமும் திரும்ப வரல. சூப்பர் சிஸ்டம்!");
            r1.setPrimaryEmotion("FRUSTRATION");
            r1.setSecondaryEmotion("SARCASM & ANGER");
            r1.setConfidence(94.8);
            r1.setSarcasmDetected(true);
            r1.setUrgency("HIGH");
            r1.setAnalyzedBy("admin");
            r1.setCreatedAt(LocalDateTime.now().minusHours(3));
            analysisRepository.save(r1);

            EmotionAnalysisRecord r2 = new EmotionAnalysisRecord();
            r2.setRawText("என் வயித்துல அடிச்சுட்டீங்கப்பா! ஹோட்டல்ல ஆர்டர் பண்ணி 2 மணி நேரம் காக்க வச்சு கடைசியில கேன்சல் பண்ணிட்டீங்க.");
            r2.setPrimaryEmotion("ANGER & DISTRESS");
            r2.setSecondaryEmotion("FRUSTRATION");
            r2.setConfidence(96.2);
            r2.setSarcasmDetected(false);
            r2.setUrgency("CRITICAL");
            r2.setAnalyzedBy("researcher");
            r2.setCreatedAt(LocalDateTime.now().minusHours(2));
            analysisRepository.save(r2);

            EmotionAnalysisRecord r3 = new EmotionAnalysisRecord();
            r3.setRawText("ரொம்ப நல்லா இருந்தது, சீக்கிரமா டெலிவரி பண்ணிட்டாங்க.");
            r3.setPrimaryEmotion("SATISFACTION");
            r3.setSecondaryEmotion("JOY");
            r3.setConfidence(93.5);
            r3.setSarcasmDetected(false);
            r3.setUrgency("LOW");
            r3.setAnalyzedBy("demo");
            r3.setCreatedAt(LocalDateTime.now().minusHours(1));
            analysisRepository.save(r3);

            EmotionAnalysisRecord r4 = new EmotionAnalysisRecord();
            r4.setRawText("போன் பண்ணா எடுக்கவே மாட்றாங்க...");
            r4.setPrimaryEmotion("FRUSTRATION");
            r4.setSecondaryEmotion("DISAPPOINTMENT");
            r4.setConfidence(89.4);
            r4.setSarcasmDetected(false);
            r4.setImplicitEmotionDetected(true);
            r4.setUrgency("MEDIUM");
            r4.setAnalyzedBy("researcher");
            r4.setCreatedAt(LocalDateTime.now().minusMinutes(30));
            analysisRepository.save(r4);

            System.out.println(">> [DataInitializer] Initial historical emotion analyses seeded.");
        }
    }
}
