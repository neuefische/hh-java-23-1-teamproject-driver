FROM openjdk:19
ENV ENVIRONMENT=prod
LABEL maintainer='admin'
EXPOSE 8080
ADD backend/target/app.jar app.jar
CMD [ "sh", "-c", "java -jar /app.jar" ]