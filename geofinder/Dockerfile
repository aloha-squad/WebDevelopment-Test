FROM node:8-stretch

# Change working directory
WORKDIR /client

# Update packages and install dependency packages for services
RUN apt-get update \
 && apt-get dist-upgrade -y \
 && apt-get clean \
 && echo 'Finished installing dependencies'

# Install npm production packages
COPY package.json /client/
RUN cd /client; npm install --production

COPY . /client

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
