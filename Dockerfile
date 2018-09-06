
# To make use of caching make sure to add the changes from:
# /Dockerfile to ./Dockerfile.serve

# ============= #
# node          #
# ============= #

FROM node:alpine

# same as bash's cd
WORKDIR /app

# dependencies files
COPY package.json package-lock.json ./
# behind a proxy pip only requires (lowercase): http_proxy & https_proxy
# set this with $ docker build --build-arg http_proxy="..." --build-arg https_proxy="..." ...
RUN apk add --update make && \
    npm install

# binary with args to run
ENTRYPOINT ["npm", "run"]
# aditional default arguments to entrypoint
CMD ["dev"]

# Make sure to add exceptions for files that can be copied in .dockerignore
COPY . .

