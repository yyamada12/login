FROM golang:1.16-alpine
WORKDIR /app
RUN apk add --no-cache \
    git \
    && go get github.com/pilu/fresh
EXPOSE 5000
CMD ["fresh"]
