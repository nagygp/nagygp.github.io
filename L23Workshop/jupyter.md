---
title: Use GAP in Jupyter notebook
author: Gábor P. Nagy
---

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

