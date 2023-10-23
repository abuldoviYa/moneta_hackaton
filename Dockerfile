FROM node:16-alpine AS build
WORKDIR /app


COPY . .
RUN npm install
RUN npm install @angular/cli
RUN $(npm bin)/ng build


# Serve Application using Nginx Server
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/asasdasdasd/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
