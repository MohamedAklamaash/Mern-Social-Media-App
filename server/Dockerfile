FROM node as build

WORKDIR /server
COPY package-lock.json package-lock.json
COPY package.json package.json
RUN ["npm","install"]

COPY . .

ENTRYPOINT [ "node" , "index.js" ]

CMD [ "npm" ,"run","start"]