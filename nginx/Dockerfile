FROM node:15 as build-stage
COPY client/react/ /app/
WORKDIR /app
RUN yarn
RUN yarn build

FROM nginx:1.18
COPY --from=build-stage /app/build/ /app
COPY nginx/nginx.conf /etc/nginx/nginx.conf
