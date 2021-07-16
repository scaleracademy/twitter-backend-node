FROM node:alpine 
COPY ./ /opt 
WORKDIR "/opt" 
RUN npm cache clean --force && rm -rf node_modules && npm install 
CMD ["npm","run", "start"]
