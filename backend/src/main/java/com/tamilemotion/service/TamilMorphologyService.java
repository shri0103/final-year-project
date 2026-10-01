package com.tamilemotion.service;

import com.tamilemotion.model.MorphologyToken;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TamilMorphologyService {

    private static final Map<String, TokenProfile> KNOWN_TOKENS = new HashMap<>();

    static {
        // High-frequency Tamil emotion tokens and their morphological profiles
        KNOWN_TOKENS.put("ரொம்ப", new TokenProfile("ரொம்ப", "Adverb", null, "Intensifier (Very / Extremely)"));
        KNOWN_TOKENS.put("நல்லா", new TokenProfile("நன்மை", "Adjective", null, "Literal positive quality tag"));
        KNOWN_TOKENS.put("நல்லாவே", new TokenProfile("நன்மை", "Adjective+Emphatic", "-ஏ (Emphatic)", "Intensified positive/sarcastic tag"));
        KNOWN_TOKENS.put("இல்லை", new TokenProfile("இல்", "Negative Verb", "-ஐ (Negative marker)", "Negation predicate"));
        KNOWN_TOKENS.put("செய்றீங்க", new TokenProfile("செய்", "Verb+Inflection", "-றீங்க (2nd Person Plural)", "Honorific action marker"));
        KNOWN_TOKENS.put("வாரம்", new TokenProfile("வாரம்", "Noun", null, "Temporal duration unit (week)"));
        KNOWN_TOKENS.put("ஆச்சு", new TokenProfile("ஆகு", "Past Verb", "-சு (Past completive)", "Elapsed duration marker"));
        KNOWN_TOKENS.put("பொருளும்", new TokenProfile("பொருள்", "Noun+Suffix", "-உம் (Inclusive conjunction)", "Delivered item target"));
        KNOWN_TOKENS.put("வரல", new TokenProfile("வரு", "Negative Verb", "-அல (Negative suffix)", "Non-arrival / Delivery failure flag"));
        KNOWN_TOKENS.put("பணமும்", new TokenProfile("பணம்", "Noun+Suffix", "-உம் (Conjunction)", "Refund / Monetary asset"));
        KNOWN_TOKENS.put("திரும்ப", new TokenProfile("திரும்பு", "Adverb", null, "Return / Reversal status"));
        KNOWN_TOKENS.put("சூப்பர்", new TokenProfile("சூப்பர்", "Colloquial Praise", null, "Superficial literal praise"));
        KNOWN_TOKENS.put("சிஸ்டம்", new TokenProfile("சிஸ்டம்", "Noun", null, "Platform / System entity"));
        KNOWN_TOKENS.put("சாப்பாடு", new TokenProfile("சாப்பாடு", "Noun", null, "Food item entity"));
        KNOWN_TOKENS.put("காசு", new TokenProfile("காசு", "Noun", null, "Money / Expenditure"));
        KNOWN_TOKENS.put("வேஸ்ட்", new TokenProfile("வேஸ்ட்", "Colloquial Adjective", null, "Complete waste / Loss"));
        KNOWN_TOKENS.put("சர்வீஸ்", new TokenProfile("சர்வீஸ்", "Noun", null, "Customer service target"));
        KNOWN_TOKENS.put("இரண்டு", new TokenProfile("இரண்டு", "Numeral", null, "Quantity marker (2)"));
        KNOWN_TOKENS.put("மணி", new TokenProfile("மணி", "Noun", null, "Time unit (Hour)"));
        KNOWN_TOKENS.put("நேரம்", new TokenProfile("நேரம்", "Noun", null, "Duration parameter"));
        KNOWN_TOKENS.put("காத்திருக்க", new TokenProfile("காத்திரு", "Infinitive Verb", "-க்க (Infinitive)", "Forced waiting event"));
        KNOWN_TOKENS.put("வைத்ததற்கு", new TokenProfile("வை", "Causative Verb", "-தற்கு (Dative causal)", "Causative inconvenience marker"));
        KNOWN_TOKENS.put("நன்றி", new TokenProfile("நன்றி", "Noun / Courtesy", null, "Sarcastic or genuine courtesy token"));
        KNOWN_TOKENS.put("போன்", new TokenProfile("போன்", "Noun", null, "Telecommunication device"));
        KNOWN_TOKENS.put("பண்ணா", new TokenProfile("பண்ணு", "Conditional Verb", "-ஆ (Conditional)", "Call initiation condition"));
        KNOWN_TOKENS.put("எடுக்கவே", new TokenProfile("எடு", "Verb+Emphatic", "-ஏ (Negative intensifier)", "Non-answering emphasis"));
        KNOWN_TOKENS.put("மாட்றாங்க", new TokenProfile("மாட்டு", "Negative Verb", "-றாங்க (3rd Person Plural)", "Refusal / Unresponsive tag"));
        KNOWN_TOKENS.put("என்", new TokenProfile("நான்", "Possessive Pronoun", null, "First person possessive"));
        KNOWN_TOKENS.put("வயித்துல", new TokenProfile("வயிறு", "Noun+Locative", "-உல்+அ (Locative case)", "Cultural idiomatic locus"));
        KNOWN_TOKENS.put("அடிச்சுட்டீங்கப்பா", new TokenProfile("அடி", "Agglutinative Verb", "-ச்சு-உட்டீங்க-அப்பா", "Cultural extreme distress marker"));
        KNOWN_TOKENS.put("ஹோட்டல்ல", new TokenProfile("ஹோட்டல்", "Noun+Locative", "-இல்/ல", "Restaurant venue"));
        KNOWN_TOKENS.put("ஆர்டர்", new TokenProfile("ஆர்டர்", "Noun / Verb", null, "Order transaction entity"));
        KNOWN_TOKENS.put("கடைசியில", new TokenProfile("கடைசி", "Time Noun", "-இல்", "Final elapsed state"));
        KNOWN_TOKENS.put("கேன்சல்", new TokenProfile("கேன்சல்", "Verb", null, "Order cancellation"));
        KNOWN_TOKENS.put("பண்ணிட்டீங்க", new TokenProfile("பண்ணு", "Verb+Aspect", "-இட்டீங்க (Honorific completive)", "Unilateral action completed"));
        KNOWN_TOKENS.put("மொக்க", new TokenProfile("மொக்க", "Slang", null, "Substandard / Low quality slang"));
        KNOWN_TOKENS.put("கடுப்பேத்துறாங்க", new TokenProfile("கடுப்பு", "Agglutinative Verb", "-ஏத்து-றாங்க", "Extreme irritation trigger"));
        KNOWN_TOKENS.put("செமையா", new TokenProfile("செமை", "Colloquial Adjective", "-ஆ (Adverbializer)", "Superb / Top notch rating"));
        KNOWN_TOKENS.put("வேற", new TokenProfile("வேறு", "Adjective", null, "Different / Extraordinary level"));
        KNOWN_TOKENS.put("லெவல்", new TokenProfile("லெவல்", "Noun", null, "Level / Scale"));
    }

    public List<MorphologyToken> analyzeTokens(String text) {
        if (text == null || text.trim().isEmpty()) {
            return Collections.emptyList();
        }

        // Clean punctuation for tokenization while retaining original
        String[] rawTokens = text.trim().split("\\s+");
        List<MorphologyToken> results = new ArrayList<>();

        for (String raw : rawTokens) {
            String clean = raw.replaceAll("[^\\p{L}\\p{Nd}]", "");
            if (clean.isEmpty()) continue;

            if (KNOWN_TOKENS.containsKey(clean)) {
                TokenProfile p = KNOWN_TOKENS.get(clean);
                results.add(new MorphologyToken(raw, p.root, p.pos, p.suffix, p.semantic));
            } else {
                // Rule-based morphological heuristic decomposition
                MorphologyToken inferred = inferMorphology(raw, clean);
                results.add(inferred);
            }
        }

        return results;
    }

    private MorphologyToken inferMorphology(String raw, String clean) {
        String root = clean;
        String pos = "Content Word";
        String suffix = null;
        String semantic = "General Tamil context token";

        if (clean.endsWith("இட்டாங்க") || clean.endsWith("ிட்டீங்க")) {
            root = clean.substring(0, Math.max(1, clean.length() - 6));
            pos = "Verb+Completive Aspect";
            suffix = "-இட்டாங்க (Completive)";
            semantic = "Action completion with inflection";
        } else if (clean.endsWith("வரல") || clean.endsWith("ஆகல") || clean.endsWith("அல")) {
            root = clean.substring(0, Math.max(1, clean.length() - 3));
            pos = "Negative Verb";
            suffix = "-அல (Negative suffix)";
            semantic = "Unfulfilled state / Negative event";
        } else if (clean.endsWith("உம்")) {
            root = clean.substring(0, Math.max(1, clean.length() - 2));
            pos = "Noun+Suffix";
            suffix = "-உம் (Inclusive)";
            semantic = "Conjunctive marker";
        } else if (clean.endsWith("இல்") || clean.endsWith("ல")) {
            root = clean.substring(0, Math.max(1, clean.length() - 2));
            pos = "Noun+Locative";
            suffix = "-இல்/-ல (Locative)";
            semantic = "Spatial or state location";
        } else if (clean.endsWith("வே") || clean.endsWith("ஏ")) {
            root = clean.substring(0, Math.max(1, clean.length() - 1));
            pos = "Emphatic Particle";
            suffix = "-ஏ (Emphasis)";
            semantic = "Emphatic emotional intensifier";
        }

        return new MorphologyToken(raw, root, pos, suffix, semantic);
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
