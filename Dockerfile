FROM node

# Create app directory
WORKDIR /GymMaster_AG

# Install app dependencies
COPY package.json /GymMaster_AG/
RUN npm install
# Bundle app source
COPY . /GymMaster_AG/
CMD ["node","index.js"]
EXPOSE 4000
