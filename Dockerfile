# Use Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your app's source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start your app
CMD [ "yarn", "dev" ]