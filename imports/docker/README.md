# Instructions for Running our Docker

## To Build
(from this directory)

```
version=<number>
docker build -t clowdcontrol/mindcontrol:v${version} .
```

## To Run
(from this directory, after building/pulling)

Note: the `-v` mount is **very important** as they contain:
 - the backup of the MongoDB
 - your data
 - the credentials for AWS in both useable forms

```
docker run -ti --rm -v ${PWD}/.mindcontrol/:/home/mindcontrol/mindcontrol/.meteor/local -v ${PWD}/credentials.csv:/home/mindcontrol/credentials.csv -v ${PWD}/credentials:/home/mindcontrol/.aws/credentials -v ${BIDS_DIR}:/bids -p 3000:3000 -p 8080:8080 clowdcontrol/mindcontrol:v${version}
```
