#!/bin/sh

aws --endpoint-url=http://localhost:4566 sqs create-queue --queue-name jobs_queue
