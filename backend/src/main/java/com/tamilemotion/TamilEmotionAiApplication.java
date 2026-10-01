package com.tamilemotion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class TamilEmotionAiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TamilEmotionAiApplication.class, args);
        System.out.println("===============================================================");
        System.out.println("  Tamil Emotion Reasoner AI - Spring Boot Backend Running!   ");
        System.out.println("  Connected to MongoDB: mongodb://localhost:27017/tamilemotedb ");
        System.out.println("  Port: 8080 | Health: http://localhost:8080/api/system/health ");
        System.out.println("===============================================================");
    }
}
