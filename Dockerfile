FROM node:alpine as builder
WORKDIR "/app"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80 
# 80 is default nginx port, above instruction is for AWS Beanstalk only
COPY --from=builder /app/build /usr/share/nginx/html
