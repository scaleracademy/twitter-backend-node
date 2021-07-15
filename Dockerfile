FROM node:alpine 
COPY ./ /opt 
WORKDIR "/opt" 
RUN npm cache clean --force && rm -rf node_modules && npm install
RUN ["npm","i"]
CMD ["npm","run", "start:dev"]


