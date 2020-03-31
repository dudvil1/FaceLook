FROM nginx:1.17.1-alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/FaceLook-front /usr/share/nginx/html