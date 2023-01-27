FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.19

COPY --from=0 /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=0 /app/nginx.conf /etc/nginx/conf.d/

EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]
CMD ["nginx", "-c", "/etc/nginx/conf.d/nginx.conf", "-g", "daemon off;"]
