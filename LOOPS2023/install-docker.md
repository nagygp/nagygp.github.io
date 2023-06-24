---
title: "Installation of docker + ubuntu + jupyter"
keywords:
  - Docker
  - Ubuntu
  - Jupyter
author:
  - Gábor P. Nagy
---



# Installation of docker + ubuntu + jupyter

## Install Ubuntu in docker container

Construct (jammy = 22.04, focal = 20.04):

```bash
docker pull ubuntu
docker create -it --name mc-base -p 80:80 ubuntu







docker run -it -p 8888:8888 ubuntu /bin/bash

docker create -it --name jelly ubuntu:jammy
docker start jelly
docker attach jelly
```

Check container:

```bash
cat etc/os-release
apt update && sudo apt upgrade -y
apt install python3 pip


```

Remove container and delete content:

```bash
docker rm jelly
```

# GAP in Jupyter notebook

Install:

```bash
sudo apt install python3 pip
cd ${GAPDIR}/pkg/jupyterkernel
pip install --user notebook
pip install . --user
```

Run and start new notebook with "GAP4" kernel:

```bash
export JUPYTER_GAP_EXECUTABLE=${GAPDIR}/gap
jupyter notebook
```

