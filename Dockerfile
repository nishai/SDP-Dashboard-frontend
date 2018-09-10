
# To make use of caching make sure to add the changes from:
# /Dockerfile to ./Dockerfile.serve

# ============= #
# node          #
# ============= #

# FROM node:alpine # apk (apt for alpine) does not play nicely with proxies with encoded characters
FROM node:alpine

ARG http_proxy_encoded
ARG https_proxy_encoded

# same as bash's cd
WORKDIR /app

# dependencies files
COPY package.json ./
# install dependencies
#   - behind a proxy pip and apk (apt for alpine) only requires (lowercase): http_proxy & https_proxy
#     set this with $ docker build --build-arg http_proxy="..." --build-arg https_proxy="..." ...
#   - *NB* apk (apt for alpine) does not work well when escape codes are used instead of special values
#     in the username and password, for example "%5C" instead of "\" does not work.
#     $ apk install --no-cache --update make
RUN \
    apk add --no-cache --update make && \
    if [ -n "$http_proxy_encoded" ]; then export http_proxy="$http_proxy_encoded" ; fi && \
    if [ -n "$https_proxy_encoded" ]; then export https_proxy="$https_proxy_encoded" ; fi && \
    yarn install --verbose

# binary with args to run
ENTRYPOINT ["make"]
# aditional default arguments to entrypoint
CMD ["dev"]

# Make sure to add exceptions for files that can be copied in .dockerignore
COPY . .

