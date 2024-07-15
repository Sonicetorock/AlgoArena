#base image -> alpine means a lighter version of onde by rmoving uncessary things
FROM node:18-alpine
# where we ill store code inside the container
WORKDIR /algoarena-backend 

# we need to add g++,jdk,python
# Install necessary packages
RUN apk update && \
    apk add --no-cache \
    g++ \
    openjdk11 \
    python3 \
    py3-pip && \
    ln -sf /usr/bin/python3 /usr/bin/python && \
    ln -sf /usr/bin/pip3 /usr/bin/pip
# Ensure Python and pip are correctly linked


# src:inside folder to dst: inside container
# if copy . /app we need to mention wrokdir
# if there is change in dependecies then only run npm i
COPY package.json .
RUN npm i
COPY . .



# Install Python dependencies if any
# RUN pip install -r requirements.txt
#entrypoint and cmd are same

# Expose the port your app runs on
EXPOSE 8000

CMD [ "node","server.js" ]
