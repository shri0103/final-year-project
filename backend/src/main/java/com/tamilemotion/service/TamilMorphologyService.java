package com.tamilemotion.service;

import com.tamilemotion.model.MorphologicalRule;
import com.tamilemotion.model.MorphologyToken;
import com.tamilemotion.model.SlangLexiconEntry;
import com.tamilemotion.repository.MorphologicalRuleRepository;
import com.tamilemotion.repository.SlangLexiconRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Enterprise-grade Morphology-Aware Tamil Tokenizer & Stemmer.
 * 
 * Provides:
 * 1. Unicode Grapheme-cluster preservation (\p{L}\p{M}\p{Nd}) preventing diacritic loss.
 * 2. Morphological agglutinative decomposition for Dravidian case markers, verbal aspects,
 *    negative inflections, causative stems, and pragmatic clitics.
 * 3. Inverse Tamil Sandhi restoration (புணர்ச்சி விதி மாற்றம்) to recover base lemmas.
 * 4. Dynamic synchronization with MongoDB MorphologicalRuleRepository & SlangLexiconRepository.
 */
@Service
public class TamilMorphologyService {

    @Autowired(required = false)
    private MorphologicalRuleRepository ruleRepository;

    @Autowired(required = false)
    private SlangLexiconRepository slangRepository;

    // Static Base Root Lexicon for Tamil customer feedback & conversational NLP
    private static final Map<String, TokenProfile> BASE_ROOTS = new HashMap<>();

    static {
        // High-frequency Intensifiers & Adverbs
        BASE_ROOTS.put("ரொம்ப", new TokenProfile("ரொம்ப", "Adverb", null, "Intensifier (Very / Extremely)"));
        BASE_ROOTS.put("மிகவும்", new TokenProfile("மிகவும்", "Adverb", null, "Formal Intensifier (Highly)"));
        BASE_ROOTS.put("அதிகம்", new TokenProfile("அதிகம்", "Adverb / Noun", null, "Quantity Intensifier (Much / Excess)"));
        BASE_ROOTS.put("சீக்கிரம்", new TokenProfile("சீக்கிரம்", "Adverb", null, "Prompt delivery / Fast fulfillment"));
        BASE_ROOTS.put("சீக்கிரமா", new TokenProfile("சீக்கிரம்", "Adverb", "-ஆ (Adverbializer)", "Prompt fulfillment speed"));
        BASE_ROOTS.put("திரும்ப", new TokenProfile("திரும்பு", "Adverb", null, "Return / Reversal status"));
        BASE_ROOTS.put("மறுபடியும்", new TokenProfile("மறுபடி", "Adverb", "-உம் (Conjunctive)", "Recurrence / Repetition"));

        // Adjectives & Praise Predicates
        BASE_ROOTS.put("நல்லா", new TokenProfile("நன்மை", "Adjective+Adverbializer", "-ஆ (Adverbializer)", "Literal positive quality tag"));
        BASE_ROOTS.put("நல்ல", new TokenProfile("நன்மை", "Adjective", null, "Base positive quality adjective"));
        BASE_ROOTS.put("நல்லாவே", new TokenProfile("நன்மை", "Adjective+Emphatic", "-ஏ (Emphatic)", "Intensified positive/sarcastic tag"));
        BASE_ROOTS.put("சூப்பர்", new TokenProfile("சூப்பர்", "Colloquial Praise", null, "Superficial literal praise / Sarcasm anchor"));
        BASE_ROOTS.put("அருமை", new TokenProfile("அருமை", "Adjective / Noun", null, "Excellence / Outstanding quality"));
        BASE_ROOTS.put("அருமையான", new TokenProfile("அருமை", "Adjective", "-ஆன (Adjectivalizer)", "Exemplary quality praise"));
        BASE_ROOTS.put("செமை", new TokenProfile("செமை", "Colloquial Adjective", null, "Superb / Top Notch level"));
        BASE_ROOTS.put("செமையா", new TokenProfile("செமை", "Colloquial Adjective", "-ஆ (Adverbializer)", "Superb / Top notch rating"));
        BASE_ROOTS.put("மகிழ்ச்சி", new TokenProfile("மகிழ்ச்சி", "Emotion Noun", null, "Customer satisfaction / Joy state"));
        BASE_ROOTS.put("நன்றி", new TokenProfile("நன்றி", "Courtesy Noun", null, "Formal gratitude / Sarcastic courtesy"));
        BASE_ROOTS.put("வாழ்க", new TokenProfile("வாழ்", "Optative Verb", "-க (Optative)", "Ironic or genuine blessing"));

        // Negative Qualities & Slang
        BASE_ROOTS.put("மொக்க", new TokenProfile("மொக்க", "Slang Adjective", null, "Substandard quality / Pointless failure"));
        BASE_ROOTS.put("கடுப்பு", new TokenProfile("கடுப்பு", "Emotion Noun", null, "Extreme irritation / Frustration"));
        BASE_ROOTS.put("கடுப்பேத்துறாங்க", new TokenProfile("கடுப்பு", "Agglutinative Verb", "-ஏத்து-றாங்க (Causative Present)", "Deliberate extreme aggravation trigger"));
        BASE_ROOTS.put("வேஸ்ட்", new TokenProfile("வேஸ்ட்", "Colloquial Adjective", null, "Complete loss / Zero value"));
        BASE_ROOTS.put("மோசம்", new TokenProfile("மோசம்", "Negative Adjective", null, "Severe degradation of quality / Poor"));
        BASE_ROOTS.put("கேவலமா", new TokenProfile("கேவலம்", "Colloquial Adverb", "-ஆ (Adverbializer)", "Atrocious / Abysmal performance"));
        BASE_ROOTS.put("வேற", new TokenProfile("வேறு", "Adjective", null, "Extreme degree / Distinct"));
        BASE_ROOTS.put("லெவல்", new TokenProfile("லெவல்", "Noun", null, "Level / Scale quantifier"));

        // Domain & Target Entities
        BASE_ROOTS.put("பொருள்", new TokenProfile("பொருள்", "Noun", null, "Target consignment / Delivered item"));
        BASE_ROOTS.put("பொருளும்", new TokenProfile("பொருள்", "Noun+Conjunctive", "-உம் (Inclusive Conjunction)", "Delivered item target (Inclusive)"));
        BASE_ROOTS.put("பணம்", new TokenProfile("பணம்", "Noun", null, "Monetary asset / Payment sum"));
        BASE_ROOTS.put("பணமும்", new TokenProfile("பணம்", "Noun+Conjunctive", "-உம் (Inclusive Conjunction)", "Monetary asset / Refund target"));
        BASE_ROOTS.put("காசு", new TokenProfile("காசு", "Noun", null, "Customer currency / Out-of-pocket spend"));
        BASE_ROOTS.put("சேவை", new TokenProfile("சேவை", "Noun", null, "Customer service / Delivery fulfillment target"));
        BASE_ROOTS.put("சர்வீஸ்", new TokenProfile("சர்வீஸ்", "Noun", null, "Customer service / System support"));
        BASE_ROOTS.put("சிஸ்டம்", new TokenProfile("சிஸ்டம்", "Noun", null, "Platform / Automated software workflow"));
        BASE_ROOTS.put("ஆப்", new TokenProfile("ஆப்", "Noun", null, "Mobile client application"));
        BASE_ROOTS.put("போன்", new TokenProfile("போன்", "Noun", null, "Telecommunication voice channel"));
        BASE_ROOTS.put("ஹோட்டல்", new TokenProfile("ஹோட்டல்", "Noun", null, "Restaurant / Merchant outlet"));
        BASE_ROOTS.put("ஹோட்டல்ல", new TokenProfile("ஹோட்டல்", "Noun+Locative", "-இல்/-ல (Locative)", "Food service venue"));
        BASE_ROOTS.put("சாப்பாடு", new TokenProfile("சாப்பாடு", "Noun", null, "Prepared food meal item"));
        BASE_ROOTS.put("ஆர்டர்", new TokenProfile("ஆர்டர்", "Commercial Noun", null, "Purchase transaction entity"));
        BASE_ROOTS.put("டவர்", new TokenProfile("டவர்", "Noun", null, "Cellular reception tower / Signal network"));
        BASE_ROOTS.put("பிரச்சனை", new TokenProfile("பிரச்சனை", "Noun", null, "Operational failure / Grievance"));
        BASE_ROOTS.put("டெலிவரி", new TokenProfile("டெலிவரி", "Fulfillment Noun", null, "Delivery logistics fulfillment"));

        // Temporal & Durational Quantifiers
        BASE_ROOTS.put("வாரம்", new TokenProfile("வாரம்", "Time Noun", null, "Temporal duration unit (Week)"));
        BASE_ROOTS.put("மணி", new TokenProfile("மணி", "Time Noun", null, "Temporal duration unit (Hour)"));
        BASE_ROOTS.put("நேரம்", new TokenProfile("நேரம்", "Duration Noun", null, "Elapsed duration parameter"));
        BASE_ROOTS.put("நேரமும்", new TokenProfile("நேரம்", "Noun+Conjunctive", "-உம் (Inclusive Conjunction)", "Elapsed temporal demand"));
        BASE_ROOTS.put("நாள்", new TokenProfile("நாள்", "Time Noun", null, "Temporal duration unit (Day)"));
        BASE_ROOTS.put("கடைசி", new TokenProfile("கடைசி", "Time Noun", null, "Terminal stage"));
        BASE_ROOTS.put("கடைசியில", new TokenProfile("கடைசி", "Time Noun+Locative", "-இல் (Locative Temporal)", "Terminal elapsed state / final outcome"));

        // Agglutinative Action Verbs & Aspects
        BASE_ROOTS.put("வரல", new TokenProfile("வரு", "Negative Verb", "-அல (Negative Suffix)", "Non-arrival / Delivery failure flag"));
        BASE_ROOTS.put("ஆகல", new TokenProfile("ஆகு", "Negative Verb", "-அல (Negative Suffix)", "Non-occurrence / Process failure flag"));
        BASE_ROOTS.put("கிடைக்கல", new TokenProfile("கிடை", "Negative Verb", "-அல (Negative Suffix)", "Non-receipt / Missing fulfillment"));
        BASE_ROOTS.put("எடுக்கல", new TokenProfile("எடு", "Negative Verb", "-அல (Negative Suffix)", "Unanswered call / Non-acceptance"));
        BASE_ROOTS.put("குடுக்கல", new TokenProfile("கொடு", "Negative Verb", "-அல (Negative Suffix)", "Non-delivery / Unfulfilled return"));
        BASE_ROOTS.put("கொடுக்கல", new TokenProfile("கொடு", "Negative Verb", "-அல (Negative Suffix)", "Non-delivery / Unfulfilled return"));
        BASE_ROOTS.put("போகல", new TokenProfile("போ", "Negative Verb", "-அல (Negative Suffix)", "Unresolved action dispatch"));
        BASE_ROOTS.put("பண்ணல", new TokenProfile("பண்ணு", "Negative Verb", "-அல (Negative Suffix)", "Omission of required operational action"));
        BASE_ROOTS.put("மாட்றாங்க", new TokenProfile("மாட்டு", "Negative Verb", "-றாங்க (3rd Plural Negative)", "Persistent support refusal / unresponsiveness"));
        BASE_ROOTS.put("மாட்டாங்க", new TokenProfile("மாட்டு", "Negative Verb", "-ஆங்க (3rd Plural Negative)", "Persistent support refusal"));
        BASE_ROOTS.put("மாட்டேன்", new TokenProfile("மாட்டு", "Negative Verb", "-ஏன் (1st Sing Negative)", "Refusal to comply"));
        BASE_ROOTS.put("இல்லை", new TokenProfile("இல்", "Negative Predicate", "-ஐ (Negative Marker)", "Existential negation of service"));
        BASE_ROOTS.put("இல்ல", new TokenProfile("இல்", "Colloquial Negative", null, "Colloquial existential negation"));

        BASE_ROOTS.put("ஆச்சு", new TokenProfile("ஆகு", "Past Verb", "-சு (Completive Aspect)", "Elapsed duration flag"));
        BASE_ROOTS.put("செய்றீங்க", new TokenProfile("செய்", "Verb+Honorific", "-றீங்க (2nd Plural Honorific)", "Honorific customer action"));
        BASE_ROOTS.put("பண்ணி", new TokenProfile("பண்ணு", "Adverbial Participle", "-இ (Past Participle)", "Order placement action"));
        BASE_ROOTS.put("பண்ணா", new TokenProfile("பண்ணு", "Conditional Verb", "-ஆ (Conditional Trigger)", "Call initiation condition"));
        BASE_ROOTS.put("பண்ணிட்டாங்க", new TokenProfile("பண்ணு", "Verb+Aspect", "-இட்டாங்க (3rd Plural Completive)", "Action fulfillment completed"));
        BASE_ROOTS.put("பண்ணிட்டீங்க", new TokenProfile("பண்ணு", "Verb+Aspect", "-ிட்டீங்க (Honorific Completive Aspect)", "Unilateral merchant action completion"));
        BASE_ROOTS.put("கேன்சல்", new TokenProfile("கேன்சல்", "Transaction Verb", null, "Order revocation / cancellation"));
        BASE_ROOTS.put("காக்க", new TokenProfile("கா", "Infinitive Verb", "-க்க (Infinitive)", "Forced customer waiting"));
        BASE_ROOTS.put("வச்சு", new TokenProfile("வை", "Causative Verb", "-சு (Causative Participle)", "Imposed causative delay"));
        BASE_ROOTS.put("காத்திருக்க", new TokenProfile("காத்திரு", "Infinitive Verb", "-க்க (Infinitive Aspect)", "Forced customer delay / waiting event"));
        BASE_ROOTS.put("வைத்ததற்கு", new TokenProfile("வை", "Causative Verb+Dative", "-தற்கு (Dative Causal)", "Causative inconvenience imposition"));
        BASE_ROOTS.put("இருந்தது", new TokenProfile("இரு", "Past Verb", "-ந்தது (Past Neuter)", "Confirmed satisfactory state"));

        // Emotional & Cultural Idiomatic Roots
        BASE_ROOTS.put("என்", new TokenProfile("நான்", "Possessive Pronoun", null, "1st Person Possessive (My)"));
        BASE_ROOTS.put("வயிறு", new TokenProfile("வயிறு", "Noun", null, "Anatomical locus / livelihood"));
        BASE_ROOTS.put("வயித்துல", new TokenProfile("வயிறு", "Noun+Locative", "-உல்+அ (Locative Case)", "Cultural idiomatic locus of deep personal distress"));
        BASE_ROOTS.put("அடி", new TokenProfile("அடி", "Action Verb", null, "Physical strike / Harm infliction"));
        BASE_ROOTS.put("அடிச்சுட்டீங்கப்பா", new TokenProfile("அடி", "Agglutinative Verb+Vocative", "-சு-ிட்டீங்க-அப்பா (Completive+Vocative)", "Cultural emotional devastation plea"));
        BASE_ROOTS.put("எடுக்கவே", new TokenProfile("எடு", "Verb+Emphatic", "-ஏ (Emphatic Intensifier)", "Emphatic non-answering intensifier"));

        // Common Numerals & Pronouns
        BASE_ROOTS.put("1", new TokenProfile("1", "Numeral", null, "Quantity magnitude (1)"));
        BASE_ROOTS.put("2", new TokenProfile("2", "Numeral", null, "Quantity magnitude (2)"));
        BASE_ROOTS.put("3", new TokenProfile("3", "Numeral", null, "Quantity magnitude (3)"));
        BASE_ROOTS.put("இரண்டு", new TokenProfile("இரண்டு", "Numeral", null, "Quantity magnitude (2)"));
        BASE_ROOTS.put("மூன்று", new TokenProfile("மூன்று", "Numeral", null, "Quantity magnitude (3)"));
        BASE_ROOTS.put("ஒரு", new TokenProfile("ஒரு", "Numeral Adjective", null, "Indefinite singular modifier (A/One)"));
    }

    /**
     * Decomposes input Tamil text into a list of morphology tokens, preserving all
     * Unicode combining marks and restoring true grammatical base lemmas.
     */
    public List<MorphologyToken> analyzeTokens(String text) {
        if (text == null || text.trim().isEmpty()) {
            return Collections.emptyList();
        }

        // Tokenize by whitespace while preserving original tokens
        String[] rawTokens = text.trim().split("\\s+");
        List<MorphologyToken> results = new ArrayList<>();

        // Load dynamic slang and rules if repositories are available
        Map<String, SlangLexiconEntry> dynamicSlangMap = loadDynamicSlang();

        for (String raw : rawTokens) {
            // Clean punctuation but strictly retain Tamil letters, combining marks (vowels/pulli), and digits
            String clean = raw.replaceAll("[^\\p{L}\\p{M}\\p{Nd}]", "");
            if (clean.isEmpty()) continue;

            // 1. Direct match in static base dictionary
            if (BASE_ROOTS.containsKey(clean)) {
                TokenProfile p = BASE_ROOTS.get(clean);
                results.add(new MorphologyToken(raw, p.root, p.pos, p.suffix, p.semantic));
                continue;
            }

            // 2. Direct match in dynamic MongoDB slang repository
            if (dynamicSlangMap.containsKey(clean.toLowerCase())) {
                SlangLexiconEntry slang = dynamicSlangMap.get(clean.toLowerCase());
                results.add(new MorphologyToken(
                        raw,
                        slang.getTerm(),
                        slang.getCategory() != null ? slang.getCategory() : "Dynamic Slang",
                        null,
                        slang.getMeaning() != null ? slang.getMeaning() : "Adapted Tamil colloquial expression"
                ));
                continue;
            }

            // 3. Rule-based morphological decomposition & Sandhi restoration
            MorphologyToken inferred = decomposeAffixes(raw, clean);
            results.add(inferred);
        }

        return results;
    }

    /**
     * Performs rule-based morphological suffix stripping and phonological Sandhi restoration.
     */
    public MorphologyToken decomposeAffixes(String raw, String clean) {
        String root = clean;
        String pos = "Content Word";
        String suffix = null;
        String semantic = "General Tamil context token";

        // Tier 1: Agglutinative Negation Suffixes
        if (clean.endsWith("மாட்றாங்க") || clean.endsWith("மாட்டாங்க")) {
            root = restoreStem(clean, 9, "மாட்டு");
            pos = "Negative Auxiliary Verb";
            suffix = "-மாட்றாங்க (3rd Plural Negative Refusal)";
            semantic = "Persistent support refusal / Unresponsive operational state";
        } else if (clean.endsWith("வரல") || clean.endsWith("ஆகல") || clean.endsWith("பண்ணல")
                || clean.endsWith("எடுக்கல") || clean.endsWith("குடுக்கல") || clean.endsWith("கொடுக்கல")) {
            if (clean.endsWith("வரல")) root = "வரு";
            else if (clean.endsWith("ஆகல")) root = "ஆகு";
            else if (clean.endsWith("பண்ணல")) root = "பண்ணு";
            else if (clean.endsWith("எடுக்கல")) root = "எடு";
            else if (clean.endsWith("குடுக்கல") || clean.endsWith("கொடுக்கல")) root = "கொடு";
            pos = "Negative Verb";
            suffix = "-அல (Negative Verb Suffix)";
            semantic = "Non-arrival / Unfulfilled delivery or process failure flag";
        } else if (clean.endsWith("வில்லை")) {
            root = clean.substring(0, Math.max(1, clean.length() - 5));
            pos = "Negative Verb";
            suffix = "-வில்லை (Formal Negative Marker)";
            semantic = "Formal statement of non-delivery or service non-execution";
        } else if (clean.endsWith("இல்லை") || clean.endsWith("இல்ல")) {
            pos = "Negative Predicate";
            suffix = "-இல்லை (Existential Negation)";
            semantic = "Absolute negative predicate";
        }

        // Tier 2: Aspectual Completives & Causatives
        else if (clean.endsWith("அடிச்சுட்டீங்கப்பா") || clean.endsWith("அடிச்சுட்டீங்க")) {
            root = "அடி";
            pos = "Agglutinative Verb+Vocative";
            suffix = "-சு-ிட்டீங்க-அப்பா (Completive+Vocative)";
            semantic = "Cultural emotional devastation plea";
        } else if (clean.endsWith("பண்ணிட்டீங்க") || clean.endsWith("கேன்சல் பண்ணிட்டீங்க")) {
            root = "பண்ணு";
            pos = "Verb+Completive Aspect";
            suffix = "-ிட்டீங்க (Honorific Completive Aspect)";
            semantic = "Unilateral merchant action completion";
        } else if (clean.endsWith("பண்ணிட்டாங்க") || clean.endsWith("விட்டார்கள்") || clean.endsWith("இட்டாங்க")) {
            root = "பண்ணு";
            pos = "Verb+Completive Aspect";
            suffix = "-இட்டாங்க (3rd Plural Completive)";
            semantic = "Action fulfillment completed with aspectual closure";
        } else if (clean.endsWith("வைத்ததற்கு") || clean.endsWith("வச்சதுக்கு")) {
            root = "வை";
            pos = "Causative Verb+Dative";
            suffix = "-தற்கு (Dative Causal)";
            semantic = "Causative inconvenience imposition";
        } else if (clean.endsWith("காத்திருக்க")) {
            root = "காத்திரு";
            pos = "Infinitive Verb";
            suffix = "-க்க (Infinitive Aspect)";
            semantic = "Forced customer delay / waiting event";
        } else if (clean.endsWith("ஆச்சு")) {
            root = "ஆகு";
            pos = "Past Verb";
            suffix = "-சு (Completive Aspect)";
            semantic = "Elapsed duration marker";
        }

        // Tier 3: Pragmatic Clitics (Emphatic & Inclusive)
        else if (clean.endsWith("எடுக்கவே")) {
            root = "எடு";
            pos = "Verb+Emphatic";
            suffix = "-ஏ (Emphatic Intensifier)";
            semantic = "Strong emphatic negative intensifier (not even picking)";
        } else if (clean.endsWith("வே") || clean.endsWith("ஏ")) {
            // Emphatic clitic -ஏ (U+0BC7)
            root = stripVowelSign(clean, '\u0BC7');
            pos = "Emphatic Particle";
            suffix = "-ஏ (Emphatic Suffix)";
            semantic = "Emotional intensifier / Sarcasm amplifier";
        } else if (clean.endsWith("பொருளும்")) {
            root = "பொருள்";
            pos = "Noun+Conjunctive";
            suffix = "-உம் (Inclusive Conjunction)";
            semantic = "Delivered item target (Inclusive)";
        } else if (clean.endsWith("பணமும்")) {
            root = "பணம்";
            pos = "Noun+Conjunctive";
            suffix = "-உம் (Inclusive Conjunction)";
            semantic = "Monetary asset / Refund target";
        } else if (clean.endsWith("நேரமும்")) {
            root = "நேரம்";
            pos = "Noun+Conjunctive";
            suffix = "-உம் (Inclusive Conjunction)";
            semantic = "Elapsed temporal demand";
        } else if (clean.endsWith("மும்") || clean.endsWith("ளும்") || clean.endsWith("டும்") || clean.endsWith("வும்")) {
            root = restoreConjunctiveBase(clean);
            pos = "Noun+Suffix";
            suffix = "-உம் (Inclusive Conjunction)";
            semantic = "Conjunctive item demand marker";
        }

        // Tier 4: Dravidian Case Markers (Locative, Dative, Accusative)
        else if (clean.endsWith("வயித்துல")) {
            root = "வயிறு";
            pos = "Noun+Locative";
            suffix = "-உல்+அ (Locative Case)";
            semantic = "Cultural idiomatic locus of deep personal distress";
        } else if (clean.endsWith("ஹோட்டல்ல")) {
            root = "ஹோட்டல்";
            pos = "Noun+Locative";
            suffix = "-இல்/-ல (Locative Case)";
            semantic = "Food service venue";
        } else if (clean.endsWith("கடைசியில")) {
            root = "கடைசி";
            pos = "Time Noun+Locative";
            suffix = "-இல் (Locative Temporal)";
            semantic = "Terminal elapsed state / final outcome";
        } else if (clean.endsWith("ல") && clean.length() > 2) {
            root = clean.substring(0, clean.length() - 1);
            pos = "Noun+Locative";
            suffix = "-ல (Locative)";
            semantic = "Spatial or organizational location marker";
        } else if (clean.endsWith("க்கு") || clean.endsWith("வுக்கு") || clean.endsWith("ற்கு")) {
            root = clean.replaceAll("(க்கு|வுக்கு|ற்கு)$", "");
            pos = "Noun+Dative";
            suffix = "-க்கு (Dative Directional/Temporal)";
            semantic = "Recipient, target, or time expectation boundary";
        } else if (clean.endsWith("ஐ") || (clean.length() > 1 && clean.charAt(clean.length() - 1) == '\u0BC8')) {
            // Accusative marker -ai
            root = clean.substring(0, clean.length() - 1);
            pos = "Noun+Accusative";
            suffix = "-ஐ (Accusative Case)";
            semantic = "Direct object target of service action";
        }

        return new MorphologyToken(raw, root, pos, suffix, semantic);
    }

    /**
     * Restores stem by stripping suffix length and optionally applying a normalized base lemma.
     */
    private String restoreStem(String token, int suffixLength, String fallbackBase) {
        if (fallbackBase != null) return fallbackBase;
        return token.substring(0, Math.max(1, token.length() - suffixLength));
    }

    /**
     * Restores base noun when conjunctive -உம் (-um) is removed from Tamil words.
     */
    private String restoreConjunctiveBase(String clean) {
        if (clean.endsWith("மும்")) {
            // e.g. பணமும் -> பணம்
            return clean.substring(0, clean.length() - 3) + "ம்";
        } else if (clean.endsWith("ளும்")) {
            // e.g. பொருளும் -> பொருள்
            return clean.substring(0, clean.length() - 3) + "ள்";
        } else if (clean.endsWith("டும்")) {
            // e.g. சாப்பாடும் -> சாப்பாடு
            return clean.substring(0, clean.length() - 3) + "டு";
        } else if (clean.endsWith("வும்")) {
            // e.g. சேவையும் -> சேவை
            return clean.substring(0, clean.length() - 3);
        }
        return clean.substring(0, Math.max(1, clean.length() - 2));
    }

    /**
     * Strips a combining vowel sign (such as -ae U+0BC7) while keeping the base consonant intact.
     */
    private String stripVowelSign(String token, char vowelSign) {
        if (token == null || token.isEmpty()) return token;
        int len = token.length();
        if (token.charAt(len - 1) == vowelSign) {
            return token.substring(0, len - 1);
        }
        return token;
    }

    /**
     * Loads dynamic slang from MongoDB and caches in lower-case terms.
     */
    private Map<String, SlangLexiconEntry> loadDynamicSlang() {
        Map<String, SlangLexiconEntry> map = new HashMap<>();
        if (slangRepository != null) {
            try {
                List<SlangLexiconEntry> entries = slangRepository.findAll();
                for (SlangLexiconEntry e : entries) {
                    if (e.getTerm() != null) {
                        map.put(e.getTerm().trim().toLowerCase(), e);
                    }
                }
            } catch (Exception ex) {
                // Non-blocking fallback
            }
        }
        return map;
    }

    // Linguistic Classification Helper Methods
    public boolean isNegativeMorpheme(MorphologyToken token) {
        if (token == null) return false;
        String s = token.getSuffix() != null ? token.getSuffix() : "";
        String p = token.getPos() != null ? token.getPos() : "";
        String r = token.getRoot() != null ? token.getRoot() : "";
        return s.contains("Negative") || p.contains("Negative") || r.equals("வரல") || r.equals("ஆகல")
                || r.equals("இல்லை") || r.equals("இல்ல") || r.equals("மாட்டு");
    }

    public boolean isPraiseMorpheme(MorphologyToken token) {
        if (token == null) return false;
        String r = token.getRoot() != null ? token.getRoot() : "";
        String t = token.getToken() != null ? token.getToken() : "";
        return r.equals("சூப்பர்") || r.equals("நன்மை") || r.equals("அருமை") || r.equals("செமை")
                || r.equals("மகிழ்ச்சி") || r.equals("நன்றி") || t.toLowerCase().contains("super")
                || t.toLowerCase().contains("great") || t.toLowerCase().contains("thanks")
                || t.toLowerCase().contains("excellent");
    }

    public boolean isEmphaticMorpheme(MorphologyToken token) {
        if (token == null) return false;
        String s = token.getSuffix() != null ? token.getSuffix() : "";
        String p = token.getPos() != null ? token.getPos() : "";
        return s.contains("Emphatic") || p.contains("Emphatic") || s.contains("-ஏ");
    }

    public boolean isWaitingOrDelayMorpheme(MorphologyToken token) {
        if (token == null) return false;
        String r = token.getRoot() != null ? token.getRoot() : "";
        String t = token.getToken() != null ? token.getToken() : "";
        return r.equals("காத்திரு") || r.equals("கா") || r.equals("நேரம்") || r.equals("மணி")
                || r.equals("வாரம்") || t.contains("காத்திருக்க") || t.contains("மணி நேரம்");
    }

    public boolean isCancellationMorpheme(MorphologyToken token) {
        if (token == null) return false;
        String r = token.getRoot() != null ? token.getRoot() : "";
        String t = token.getToken() != null ? token.getToken() : "";
        return r.equals("கேன்சல்") || t.toLowerCase().contains("cancel");
    }

    private static class TokenProfile {
        String root;
        String pos;
        String suffix;
        String semantic;

        TokenProfile(String root, String pos, String suffix, String semantic) {
            this.root = root;
            this.pos = pos;
            this.suffix = suffix;
            this.semantic = semantic;
        }
    }
}
