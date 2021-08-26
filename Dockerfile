FROM node:13.12.0 as build
WORKDIR /fourv-build

COPY package.json /fourv-build
RUN yarn

# COPY . /fourv-build
COPY . .
RUN yarn build:test

# FROM node:13.12.0 as run
# WORKDIR /fourv-run

# COPY --from=build /fourv-build/build  ./build

# CMD ["next", "start", "-p", "80"]
CMD ["yarn", "start"]
