---
marp: true
theme: freud 
size:
class: 
math: mathjax
paginate: true
style: |
  .columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
---

# <!-- fit --> Chapter 8: Isotopisms and autotopisms

- Homotopy, isotopy
- Set of ordered triples of a quasigroup
- Topisms via graphs
- Implementation in __GAP__
- Graph Isomorphism (GI) problem

---

# Homotopisms 

> **Definition** Let $(Q,\circ)$ and $(R,*)$ be two right quasigroups. Let $f,g,h:Q\to R$ be mappings such that 
>$$x^f * y^g = (x\circ y)^h$$
>holds for all $x,y\in Q$. Then the triple $(f,g,h)$ is called a **homotopism** from $Q$ to $R$. 

* We use the "right upper" notation $x^f$ for mappings 
* The definition is fine for arbitrary magmas
* $f,g,h$ are the **components** of the homotopism
* Homotopisms can be composed **component-wise**
* Homotopisms with $f=g=h$ are precisely the **homomorphisms**

---

# Isotopisms

> **Definition** Let $(Q,\circ)$ and $(R,*)$ be two right quasigroups. Let $f,g,h:Q\to R$ be mappings such that
>$$x^f * y^g = (x\circ y)^h$$
>holds for all $x,y\in Q$. Then the triple $(f,g,h)$ is called a **homotopism** from $Q$ to $R$. 

* The most important case is when $f,g,h$ are bijections
* Then, we speak of an **isotopism**
* Isotopisms with $f=g=h$ are precisely the **isomorphisms**
* **From now on:** 
  * Only isotopisms!!
  * No homotopisms!! No paratopisms!!

---

# Isotopy

* The notion of *isotopy* is motivated by geometry
* Isotopisms can be composed
* Isotopy is an equivalence relation
* Isotopisms for **latin squares** mean *permuting the rows, columns* and *symbols*
  
---

# Homotopism objects in GAP

```
gap> Q1 := ProjectionRightQuasigroup( 3 );;
gap> Q2 := ProjectionRightQuasigroup( 2 );;
gap> f := Transformation( [1,1,2] );; 
gap> g := Transformation( [2,1,2] );; 
gap> h := f;;
gap> t := HomotopismRightQuasigroups( Q1, Q2, f, g, h );
<homotopism of right quasigroups>
```

* Homotopism, isotopisms and autotopisms are special __GAP__ categories, following their mathematical build-up
* Their arithmetics has been speeded up by some __GAP__ magic :smiley:

---

# Defining new isotopes

* One can use the formula 
  $$x^f * y^g = (x\circ y)^h$$
  to define new right quasigroups
* More precisely:
  >**Claim** Let $(Q,\circ)$ be a right quasigroups, $R$ a set, and $f,g,h:Q\to R$ bijections. Define the operation "$*$" on $R$ by
  >$$x * y = (x^{f^{-1}}\circ y^{g^{-1}})^h.$$
  >Then $(R,*)$ is a right quasigroup, isotopic to $(Q,\circ)$. 
* We call $(R,*)$ the **isotope of $Q$ by $(f,g,h)$.**

---

# Action on triples of right quasigroups

* Isotopisms do not act on elements
* Isotopisms **act on triples:**
  $$Q^3\ni (x,y,z) \mapsto (x^f,y^g,z^h) \in R^3$$
* We define the **ordered triple set** 
  $$T_1(Q,\circ) = \{(x,y,x\circ y) \mid x,y \in Q \}$$
  of the right quasigroup $(Q,\circ)$
* $T_1(Q,\circ)$ is a subset of cardinality $|Q|^2$ in $Q^3$  
* **Remark 1:** If the underlying set or the operation is obvious from the context, then we may write $T_1(\circ)$ or $T_1(Q)$ 
* **Remark 2:** In the context of **orthogonal arrays,** $T_1(Q)$ is the set of rows of the $OA(n^2,3,n,2)$, associated to $Q$

---

# Characterization of isotopisms via ordered triples

>**Lemma** The first two coordinates $x,y$ uniquely determines an element of
>$$T_1(Q,\circ) = \{(x,y,x\circ y) \mid x,y \in Q \}$$

>**Theorem T (for "triples")** Let $(Q,\circ)$, $(R,*)$ be right quasigroups and $f,g,h:Q\to R$ be bijections. Then $(f,g,h)$ is an isotopism iff it maps the set $T_1(Q,\circ)$ to $T_1(R,*)$. 

**Proof** By the Lemma, 
$$\begin{align}
(x^f,y^g,(x\circ y)^h) \in T_1(R) &\Longleftrightarrow (x^f,y^g,(x\circ y)^h) = (x^f,y^g,x^f * y^g) \\
&\Longleftrightarrow (x\circ y)^h = x^f * y^g. \qquad\square
\end{align}$$

---

# Autotopisms via ordered triples

- We denote by $\mathrm{Sym}(Q)$ the set of bijections of $Q$ onto itself
- $\mathrm{Sym}(Q)^3$ acts on $Q^3$

>**Corollary to Theorem T** The autotopism group of $(Q,\circ)$ is the **set-wise stabilizer** of $T_1(Q,\circ)$ in $\mathrm{Sym}(Q)^3$

<hr/>

* **Bad news:** If $X$, $Y$ and $G$ are large, then the following problem has no **easy solution**
* Given group $G$, acting on the set $X$. Given a subset $Y$ of $X$. Find the set-wise stabilizer subgroup $G_Y$ of $Y$ in $G$

---

# Example

* $(Q,\circ) = (\{0,1\}, \oplus)$ 
* $\mathrm{Sym}(Q)$ consists of the identity $\iota = ()$ and the transposition $\tau=(0,1)$
* $\mathrm{Sym}(Q)^3$ has order 8
* $T_1=\{[000],[011],[101],[110]\}$
* Beside the identity $(\iota,\iota,\iota)$, $T_1$ is left invariant by the triples
  $$(\tau,\tau,\iota),\quad (\tau,\iota,\tau),\quad (\iota,\tau,\tau)$$
* The autotopism group has order 4

--- 

# Vertex-colored graphs

* We deal with **simple graphs:** no multiple edges and no loops :stuck_out_tongue_winking_eye: 
* Edges are 2-element subsets
* $G=(V,E)$, $E\subseteq \binom{V}{2}$
* A **vertex-coloring with $k$ colors** is a map 
  $$c:V\to \{1,\ldots,k\}$$
* $V_i=c^{-1}(i)$ are the **color classes** ($i=1,\ldots,k$)
* A vertex coloring with $k$ colors is equivalent with an **ordered partition**
  $$V=(V_1,\ldots,V_k)$$
  of the vertices, with $k$ (possibly empty) parts 

--- 

# Isomorphisms of vertex-colored graphs

* Let $G=(V,E,c)$ and $G'=(V',E',c')$ be two simple graphs with $k$-colorings $c,c'$
* An **color-preserving isomorphism**  of two vertex-colored graphs is a bijective map $\varphi:V\to V'$, such that 
  $$\varphi(E)=E' \quad\text{and}\quad c(v)=c'(\varphi(v))$$ 
  for all $v\in V$. 
* In other words, $\varphi$ maps the $i$th color class $V_i$ to the $i$th color class $V'_i$
* The automorphism group of a vertex-colored graph $(V,E,c)$ consists of color-preserving automorphisms
* Your favorite vertex coloring: **degree**

---

# Vertex-colored graph of a right quasigroup

* Let $(Q,\circ)$ be a right quasigroup
* Define the sets
  $$  V_i = \{(i,x) \mid x \in Q\} \qquad (i=1,2,3), \text{ and } \qquad V_4 = T_1(Q) $$
* Put $V=V_1\cup V_2\cup V_3\cup V_4$ as set of vertices
* There are no vertices in $V_1\cup V_2\cup V_3$ and in $V_4$
* The triple $(x,y,x\circ y)\in V_4$ is connected to the vertex $(i,z)$ if and only if
  $$z=\begin{cases}
  x & \text{for $i=1$} \qquad \text{\textit{("rows")}}\\
  y & \text{for $i=2$} \qquad \text{\textit{("columns")}}\\
  x\circ y & \text{for $i=3$} \qquad \text{\textit{("symbols")}}\\
  \end{cases}$$
* We denote the vertex $4$-colored graph $(V,E)$ by $G_1(Q,\circ)$

---

# Topisms via graphs

Recall: 

>**Theorem T (for "triples")** Let $f,g,h:(Q,\circ)\to (R,*)$ be bijections. Then $(f,g,h)$ is an isotopism iff it maps the set $T_1(Q,\circ)$ to $T_1(R,*)$. 

>**Theorem G (for "graphs")** Two right quasigroups are isotopic if and only if the associated vertex 4-colored graphs are isomorphic.

>**Corollary to Theorem G** The automorphism group of a right quasigroup is isomorphic to the automorphism group of the associated vertex 4-colored graph.

* The method is explicit: A graph ismorphism 
  $$\varphi:G_1(Q,\circ) \to G_1(R,*)$$
  maps $V_1=\{1\}\times Q$ to $V'=\{1\}\times R$, hence induces the map $f:Q\to R$.

---

# Implementation in GAP

```
gap> LoadPackage( "RightQuasigroups", false );
true
gap> q := RightBolLoop( 16, 3 );
RightBolLoop( 16, 3 )
gap> ag := AutotopismGroup( q );
<group with 5 generators>
gap> Size( ag );
768
```

* There are several __GAP__ packages for graphs, most importantly **GRAPE** and **Digraphs**
* In the present version, we use **Digraphs**, but this may change later
  ```
  gap> KnownAttributesOfObject( q );
  [ "Name", "Size", ... , "AutotopismGroup", "RQ_Digraph" ]
  gap> RQ_Digraph( q );
  <immutable digraph with 304 vertices, 768 edges>
  ```

---

# Graph Isomorphism (GI) problem 

The following problems are (essentially) equivalent:

* Given two simple graphs. Decide if they are isomorphic. 
* Given two simple graphs. Find an isomorphism or return `fail`
* Given two simple graphs with vertex colorings. Find a color-preserving isomorphism or return `fail`
* Given a simple graph. Find a generating set of its automorphism group.
* Theoretical result:
  > **Theorem (L Babai, 2015)** GI has quasi-polinomal time complexity. 
* Quasi-polynomial means $\sim e^{(\log n)^c}$

---

# Canonical labelings of graphs

* A **labeling** of a graph $G=(V,E)$




---

# Canonical Labeling Algorithm

![bg contain right:33%](Brendan_McKay.jpg)

* The algorithm and its first implementation is due to **Brendan McKay**
* 1978-1981, improved continuously
* `nauty` (No AUTomorphism, Yes?)
* Recent reimplementation: `Bliss`
* Other attempts: `saucy`, `conauto`, `Traces`
* `Traces` by **Piperno** is distributed with `nauty` since 2014
* SageMath, __GAP__ and Magma interfaces

--- 

