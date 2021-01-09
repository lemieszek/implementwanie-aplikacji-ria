FROM python:3.9

RUN apt-get update && apt-get -y upgrade &&\
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*

COPY requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt

WORKDIR /src
COPY ./src /src

ENV FLASK_APP=/src/app/app.py

RUN pip install -e /src

