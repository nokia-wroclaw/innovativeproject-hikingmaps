FROM node:10-alpine as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY hikingmaps-angular/package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.1
COPY hikingmaps-angular/ .
RUN ng build --prod

FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
WORKDIR /tmp/
COPY hikingmaps_spring/pom.xml .
COPY hikingmaps_spring/src ./src
RUN mkdir -p ./src/main/resources/public
COPY --from=builder /usr/src/app/dist/hikingmaps-angular/* ./src/main/resources/public/
RUN ls ./src/main/resources/public


RUN mvn clean package
RUN ls target
RUN mv ./target/*.war /app.war
WORKDIR /
RUN ls
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.war"]