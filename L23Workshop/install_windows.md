---
title: Install GAP on Windows
author: Gábor P. Nagy
---



# Install GAP on Windows

## Option 1: Windows Subsystem for Linux (WSL)

* Install Ubuntu Linux on Windows 10/11 as given in this tutorial:
  
  [install-ubuntu-on-wsl2-on-windows-10](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview)
* The process is not complicated, but it may take up to 1 hour. 
* You need administrator access.

Once completed, you install **GAP** and **RightQuasigrous** precisely in the [same way as for Ubuntu.](./install_ubuntu.html)

## Option 2: `.exe` installer (Cygwin)

### Install GAP

* Use of the following `.exe` installer, which contains GAP and selected GAP packages.
  
  [gap-4.12.2-x86_64.exe](https://github.com/gap-system/gap/releases/download/v4.12.2/gap-4.12.2-x86_64.exe)
* The path to the GAP directory should not contain spaces. We recommend to install GAP in `C:\gap-4.12.2` (default), `D:\gap-4.12.2` or `C:\Math\GAP\gap-4.12.2`, but you must not install it in a directory named like `C:\Program files\gap-4.12.2` or `C:\Users\alice\My Documents\gap-4.12.2` etc.


You can start GAP by double clicking the `GAP` icon.

# Install RightQuasigroups

## The "windows" way

* Create a directory `_gap`  in your home directory, and the subdirectory `pkg` in `_gap`.
* Download the package by clicking
[RightQuasigroups-0.9.tar.gz](https://github.com/gap-packages/RightQuasigroups/releases/download/v0.9/RightQuasigroups-0.9.tar.gz).
* Extract in the `_gap\pkg` directory.


## Using `PackageManager`

__Caution:__ This is not working yet since file names (in /temp and /old versions) contain spaces

Start __GAP__ and type:

```
gap> LoadPackage( "PackageManager" );
gap> InstallPackage( "https://github.com/gap-packages/RightQuasigroups/releases/download/v0.9/RightQuasigroups-0.9.tar.gz" );
```

# Test

Start GAP and type `TestPackage("rightquasigroups");` You should get something like this:

```
 *********   GAP 4.12.2 of 2022-12-18
 *  GAP  *   https://www.gap-system.org
 *********   Architecture: x86_64-pc-linux-gnu-default64-kv8
 Configuration:  gmp 6.2.0, GASMAN, readline
 Loading the library and packages ...
 Packages:   AClib 1.3.2, Alnuth 3.2.1, AtlasRep 2.1.6, AutPGrp 1.11, Browse 1.8.19, CaratInterface 2.3.4, CRISP 1.4.6, 
             Cryst 4.1.25, CrystCat 1.1.10, CTblLib 1.3.4, FactInt 1.6.3, FGA 1.4.0, Forms 1.2.9, GAPDoc 1.6.6, genss 1.6.8, 
             IO 4.8.0, IRREDSOL 1.4.4, LAGUNA 3.9.5, orb 4.9.0, Polenta 1.3.10, Polycyclic 2.16, PrimGrp 3.4.3, RadiRoot 2.9, 
             recog 1.4.2, ResClasses 4.7.3, SmallGrp 1.5.1, Sophus 1.27, SpinSym 1.5.2, TomLib 1.2.9, TransGrp 3.6.3, utils 0.81
             
 Try '??help' for help. See also '?copyright', '?cite' and '?authors'
gap> TestPackage("rightquasigroups");
---------------------------------------------------------------------------------------------------------------------------------
Loading  datastructures 0.3.0 (datastructures - GAP Data Structures)
by Markus Pfeiffer (http://www.morphism.de/~markusp),
   Max Horn (https://www.quendi.de/math),
   Christopher Jefferson (http://caj.host.cs.st-andrews.ac.uk/), and
   Steve Linton (http://sl4.host.cs.st-andrews.ac.uk/).
Homepage: https://gap-packages.github.io/datastructures
Report issues at https://github.com/gap-packages/datastructures/issues
---------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------
Loading  GRAPE 4.9.0 (GRaph Algorithms using PErmutation groups)
by Leonard H. Soicher (https://webspace.maths.qmul.ac.uk/l.h.soicher/).
Homepage: https://gap-packages.github.io/grape
Report issues at https://github.com/gap-packages/grape/issues
---------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------
Loading  Digraphs 1.6.1 (Digraphs - Methods for digraphs)
by Jan De Beule (http://homepages.vub.ac.be/~jdbeule/),
   Joe Edwards (https://github.com/Joseph-Edwards),
   Julius Jonusas (http://julius.jonusas.work),
   James Mitchell (https://jdbm.me),
   Maria Tsalakou (https://mariatsalakou.github.io/),
   Wilf A. Wilson (https://wilf.me), and
   Michael Young (https://mct25.host.cs.st-andrews.ac.uk).
with contributions by:
   Marina Anagnostopoulou-Merkouri (mam49@st-andrews.ac.uk),
   Finn Buck (finneganlbuck@gmail.com),
   Stuart Burrell (https://stuartburrell.github.io),
   Graham Campbell,
   Reinis Cirpons (rc234@st-andrews.ac.uk),
   Ashley Clayton (ac323@st-andrews.ac.uk),
   Tom Conti-Leslie (https://tomcontileslie.com),
   Luke Elliott (le27@st-andrews.ac.uk),
   Isuru Fernando (isuruf@gmail.com),
   Ewan Gilligan (eg207@st-andrews.ac.uk),
   Sebastian Gutsche (gutsche@momo.math.rwth-aachen.de),
   Samantha Harper (seh25@st-andrews.ac.uk),
   Max Horn (https://www.quendi.de/math),
   Christopher Jefferson (https://caj.host.cs.st-andrews.ac.uk),
   Olexandr Konovalov (https://www.st-andrews.ac.uk/computer-science/people/obk1/),
   Andrea Lee (ahwl1@st-andrews.ac.uk),
   Markus Pfeiffer (https://www.morphism.de/~markusp/),
   Lea Racine (lr217@st-andrews.ac.uk),
   Christopher Russell,
   Artur Schaefer (as305@st-and.ac.uk),
   Isabella Scott (iscott@uchicago.edu),
   Kamran Sharma (kks4@st-andrews.ac.uk),
   Finn Smith (fls3@st-andrews.ac.uk),
   Ben Spiers (bspiers972@outlook.com), and
   Murray Whyte (mw231@st-andrews.ac.uk).
maintained by:
   James Mitchell (https://jdbm.me) and
   Wilf A. Wilson (https://wilf.me).
Homepage: https://digraphs.github.io/Digraphs
Report issues at https://github.com/digraphs/Digraphs/issues
---------------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------------
Loading  RightQuasigroups 0.9 (Computing with one-sided quasigroups in GAP.)
by Gábor P. Nagy (http://www.math.u-szeged.hu/~nagyg) and
   Petr Vojtechovský (http://www.math.du.edu/~petr/).
Homepage: https://gap-packages.github.io/RightQuasigroups/
Report issues at https://github.com/gap-packages/RightQuasigroups/issues
---------------------------------------------------------------------------------------------------------------------------------
Architecture: x86_64-pc-linux-gnu-default64-kv8

testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/CoreMethods.tst
     157 ms (54 ms GC) and 14.6MB allocated for CoreMethods.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/Elements.tst
      60 ms (53 ms GC) and 632KB allocated for Elements.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups01.tst
      65 ms (48 ms GC) and 2.46MB allocated for rightquasigroups01.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups02.tst
    5533 ms (1497 ms GC) and 862MB allocated for rightquasigroups02.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups03.tst
    7047 ms (391 ms GC) and 1.21GB allocated for rightquasigroups03.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups04.tst
     162 ms (119 ms GC) and 6.99MB allocated for rightquasigroups04.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups05.tst
     590 ms (134 ms GC) and 83.0MB allocated for rightquasigroups05.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups06.tst
    1177 ms (124 ms GC) and 55.2MB allocated for rightquasigroups06.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups07.tst
     121 ms (118 ms GC) and 232KB allocated for rightquasigroups07.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups08.tst
    1495 ms (139 ms GC) and 187MB allocated for rightquasigroups08.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups09.tst
     851 ms (337 ms GC) and 245MB allocated for rightquasigroups09.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups10.tst
     196 ms (132 ms GC) and 5.06MB allocated for rightquasigroups10.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups11.tst
     379 ms (149 ms GC) and 88.5MB allocated for rightquasigroups11.tst
testing: /root/gapdir/pkg/RightQuasigroups-0.9/tst/rightquasigroups12.tst
     176 ms (127 ms GC) and 8.25MB allocated for rightquasigroups12.tst
-----------------------------------
total     18009 ms (3422 ms GC) and 2.74GB allocated
              0 failures in 14 files

#I  No errors detected while testing
```

