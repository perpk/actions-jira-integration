FROM node:12.9.0

WORKDIR /

ARG JIRA_USER
ARG JIRA_PASSWORD
ARG JIRA_PROJECT
ARG JIRA_URI
ARG INPUT_JSON
ARG REPORT_INPUT_KEYS
ARG IS_NPM_AUDIT
ARG JIRA_ISSUE_TYPE

ENV JIRA_USER=$JIRA_USER \
    JIRA_PASSWORD=$JIRA_PASSWORD \
    JIRA_PROJECT=$JIRA_PROJECT \ 
    JIRA_URI=$JIRA_URI \
    INPUT_JSON=$INPUT_JSON \
    REPORT_INPUT_KEYS=$REPORT_INPUT_KEYS \
    IS_NPM_AUDIT=$IS_NPM_AUDIT \
    JIRA_ISSUE_TYPE=$JIRA_ISSUE_TYPE

COPY index.js package.json package-lock.json ./
COPY config/ ./config
COPY helpers/ ./helpers
COPY templates/ ./templates
COPY utils/ ./utils

RUN npm install

ENTRYPOINT ["node", "/index.js"]
