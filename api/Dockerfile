FROM node:16.20.1
WORKDIR /app/node
COPY ./source .
RUN pwd && ls
RUN yarn
RUN yarn build
CMD [ "yarn", "start" ]