FROM eclipse-temurin:17-jdk-alpine as build
WORKDIR /workspace/app

COPY backend/mvnw .
COPY backend/.mvn .mvn
COPY backend/pom.xml .
COPY backend/src src

RUN ./mvnw install -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM eclipse-temurin:17-jre-alpine
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.sentinelrisk.SentinelRiskApplication"] 