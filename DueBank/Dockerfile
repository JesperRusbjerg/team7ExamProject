FROM continuumio/anaconda3

WORKDIR /dueBank

COPY *.py .

ENV BANK-PROXY-HOST="rabbitmq"

RUN pip install pika


ENTRYPOINT [ "python", "main.py" ]
