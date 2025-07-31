# Use Java 21 instead of 17
FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/demo-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
