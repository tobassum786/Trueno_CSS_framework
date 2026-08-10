FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . .
RUN npm run build
RUN node docs-site/build-docs.js

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html/dist
COPY --from=build /app/docs-site /usr/share/nginx/html/docs-site

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
