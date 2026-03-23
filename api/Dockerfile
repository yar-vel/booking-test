FROM node:24-alpine AS base
ARG HOME_DIR=/usr/src/app
WORKDIR ${HOME_DIR}
COPY ./package*.json .

FROM base AS development
ENV NODE_ENV=development
RUN npm install
CMD ["npm", "run", "start:dev"]

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM base AS production
ENV NODE_ENV=production
ARG USER=node
ARG GROUP=node
COPY --from=builder --chown=${USER}:${GROUP} ${HOME_DIR}/node_modules ./node_modules
COPY --from=builder --chown=${USER}:${GROUP} ${HOME_DIR}/dist ./dist
USER ${USER}
ENTRYPOINT ["node", "./dist/src/main.js"]
