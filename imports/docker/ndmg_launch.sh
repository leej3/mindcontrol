#!/bin/bash

CREDS=/home/mindcontrol/credentials.csv

python2.7 /usr/local/lib/python2.7/dist-packages/ndmg/scripts/ndmg_cloud.py participant --bucket mrneurodata --bidsdir /test_dataset --jobdir /tmp/ndmg_jobs --credentials ${CREDS} --dataset BRAINHACK
