FROM node:alpine 
COPY ./ /opt 
WORKDIR "/opt" 
RUN npm cache clean --force && rm -rf node_modules && npm install 

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait
CMD /wait && npm run start

CMD ["npm","run", "start"]
