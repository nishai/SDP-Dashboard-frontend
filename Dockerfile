
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
# install dependencies
RUN npm install

# documentation only
EXPOSE 8080
# binary with args to run
ENTRYPOINT ["npm", "run"]
# aditional default arguments to entrypoint
CMD ["dev"]

# Make sure to add exceptions for files that can be copied in .dockerignore
COPY . .
