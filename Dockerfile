FROM nginx
LABEL maintainer="segment-oj"
COPY dist/ /var/www/segmentoj_frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf