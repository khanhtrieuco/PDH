FROM node:18.16.0
WORKDIR /app/node
COPY ./source .
RUN pwd && ls
RUN echo "====== BUILD APPS ======"
RUN yarn
RUN yarn build
ENV NODE_ENV=production
ENV NUXT_ENV_STAGE=production
CMD [ "yarn", "start:production" ]