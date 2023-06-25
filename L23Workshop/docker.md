---
title: Install Ubuntu in container
author: Gábor P. Nagy
---

### Install Ubuntu in docker container

Construct (jammy = 22.04, focal = 20.04):

```bash
docker pull ubuntu:jammy
docker create -it --name jelly ubuntu:jammy
docker start jelly
docker attach jelly
```

Check container:

```bash
cat etc/os-release
sudo apt update && sudo apt upgrade -y
```

Remove container and delete content:

```bash
docker rm jelly
```
