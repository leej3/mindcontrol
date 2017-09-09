FROM nginx:1.9.12

MAINTAINER Michael Shang

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        curl \
        git \
        vim \
        supervisor \
        && rm -rf /var/lib/apt/lists/*

ENV METEOR_RELEASE 1.4.2.3
RUN curl  https://install.meteor.com/ 2>/dev/null | sed 's/^RELEASE/#RELEASE/'| RELEASE=$METEOR_RELEASE sh

RUN ln -s ~/.meteor/packages/meteor-tool/*/mt-os.linux.x86_64/dev_bundle/bin/node /usr/bin/ && \
        ln -s ~/.meteor/packages/meteor-tool/*/mt-os.linux.x86_64/dev_bundle/bin/npm /usr/bin/ && \
        rm /etc/nginx/conf.d/default.conf


RUN apt-get update
RUN apt-get install -y git python3
RUN apt-get install -y python-dev python-setuptools python-numpy python-scipy
RUN easy_install pip
RUN pip install numpy wget nibabel dipy awscli==1.11.31 boto3==1.3.1 python-dateutil==2.5 requests==2.5.3 matplotlib==1.5.1 scikit-learn scikit-image nilearn
RUN pip install ndmg==0.0.49-1
RUN npm install http-server -g



ENV MC_DIR /home/mindcontrol
ENV LC_ALL C


ADD entrypoint.sh /home/entrypoint.sh
ADD ndmg_launch.sh /home/ndmg_launch.sh

RUN useradd  --create-home --home-dir ${MC_DIR} mindcontrol
RUN chown mindcontrol:mindcontrol /home/entrypoint.sh
RUN chmod +x /home/entrypoint.sh

RUN mkdir -p ${MC_DIR}/mindcontrol &&\
    chown -R mindcontrol /home/mindcontrol &&\
    chmod -R a+rx /home/mindcontrol

USER mindcontrol

RUN cd ${MC_DIR}/mindcontrol &&\
    git clone https://github.com/clowdcontrol/mindcontrol.git ${MC_DIR}/mindcontrol

EXPOSE 3000
WORKDIR ${MC_DIR}/mindcontrol

ENTRYPOINT ["/home/entrypoint.sh"]


ENV PORT 3000

