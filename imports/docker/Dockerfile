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


# Installing and setting up miniconda
RUN curl -sSLO https://repo.continuum.io/miniconda/Miniconda3-4.3.11-Linux-x86_64.sh && \
    bash Miniconda3-4.3.11-Linux-x86_64.sh -b -p /usr/local/miniconda && \
    rm Miniconda3-4.3.11-Linux-x86_64.sh

ENV PATH=/usr/local/miniconda/bin:$PATH \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8

# Installing precomputed python packages
RUN conda install -c conda-forge -y \
                     awscli \
                     boto3 \
                     dipy \
                     git \
                     matplotlib \
                     numpy \
                     python=3.6 \
                     scikit-image \
                     scikit-learn \
                     wget; \
    sync &&  \
    chmod +x /usr/local/miniconda/bin/* && \
    conda clean --all -y; sync && \
    python -c "from matplotlib import font_manager" && \
    sed -i 's/\(backend *: \).*$/\1Agg/g' $( python -c "import matplotlib; print(matplotlib.matplotlib_fname())" )

RUN npm install http-server -g

ENV MC_DIR /home/mindcontrol
ENV LC_ALL C


COPY entrypoint.sh /home/entrypoint.sh
COPY  ndmg_launch.sh /home/ndmg_launch.sh

RUN useradd  --create-home --home-dir ${MC_DIR} mindcontrol
RUN chown mindcontrol:mindcontrol /home/entrypoint.sh
RUN chmod +x /home/entrypoint.sh

RUN mkdir -p ${MC_DIR}/mindcontrol &&\
    chown -R mindcontrol /home/mindcontrol &&\
    chmod -R a+rx /home/mindcontrol


USER mindcontrol

RUN cd ${MC_DIR}/mindcontrol &&\
    git clone https://github.com/clowdcontrol/mindcontrol.git ${MC_DIR}/mindcontrol

####### Attempt at nginx security

WORKDIR /opt
COPY ./settings/auth.conf /etc/nginx/conf.d/auth.conf
COPY ./settings/auth.htpasswd /etc/nginx
COPY ./settings/nginx.conf /etc/nginx/nginx.conf
USER root
RUN chmod 777 /var/log/nginx
USER mindcontrol
COPY launch.sh /home
######

WORKDIR ${MC_DIR}/mindcontrol

ENTRYPOINT ["/home/entrypoint.sh"]


EXPOSE 3000
ENV PORT 3000

