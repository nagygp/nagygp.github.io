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

# <!-- fit --> Chapter 7: Mappings in `RightQuasigroups`

- Mappings vs functions
- Permutations vs transformations
- Parent vs canonical
- Isomorphisms vs automorphisms

---

# Mappings vs functions

* A **mapping** in __GAP__ is what is called a *"function"* in mathematics
  $$f:A\to B$$
* The *domain* $A$ of $f$ is called **source**
* The *codomain* $B$ is called **range**
* The *image* $f(A)$ is called **image**
* The image of $x\in A$ under the mapping $f$ is expressed as $x^f$, or `Image(f,x)`
  ```
  gap> A:=Domain([1..100]); B:=Domain([0..15]);
  Domain([ 1 .. 100 ])
  Domain([ 0 .. 15 ])
  gap> f:=MappingByFunction(A,B,x->(x^2) mod 10);
  MappingByFunction( Domain([ 1 .. 100 ]), Domain([ 0 .. 15 ]), ... )
  gap> 6^f;
  6
  gap> Image(f);
  [ 0, 1, 4, 5, 6, 9 ]
  ```

---

# Composition of mappings

Mappings can be composed by the operator `"*"`
```
gap> C:=GF(2);
GF(2)
gap> g:=MappingByFunction(B,C,x->Z(2)*x);
MappingByFunction( Domain([ 0 .. 15 ]), GF(2), function( x ) ... end )
gap> f*g;
CompositionMapping( MappingByFunction( Domain(
[ 0 .. 15 ]), GF(2), function( x ) ... end ), MappingByFunction( Domain(
[ 1 .. 100 ]), Domain([ 0 .. 15 ]), function( x ) ... end ) )
gap> g*f;
Error, no method found! ...
```
```
gap> Source(f*g); Range(f*g); Image(f*g);
Domain([ 1 .. 100 ])
GF(2)
[ 0*Z(2), Z(2)^0 ]
gap> IsSurjective(f*g) and not IsInjective(f*g);
true
```

---

# Mappings vs transformations vs permutations

* A *mapping* in __GAP__ is what is called a "function" in mathematics
* The image of $x$ under the mapping $f$ is expressed as $x^f$, or `x^f`
* A *transformation*  in  __GAP__  is  a mapping from $\mathbb{Z}_{>0}$ to itself
* A  *permutation* in __GAP__ is a bijective mapping from $\{1,\ldots,n\}$ to itself
* **Remainder:** In __GAP__, the categories `IsTransformation` and `IsPerm` are disjoint

---

# Example: Chein loop

* Let $G$ be a group. The **Chein loop** is a Moufang loop on $\{0,1\}\times G$. 
* Generic elements are labeled by $(i,x)$, where $i \in \{0,1\}$  and $x\in G$. 
  ```
  gap> G:=SmallGroup(21,1); StructureDescription(G);
  <pc group of size 21 with 2 generators>
  "C7 : C3"
  gap> M:=CheinLoop(G);
  <Moufang loop of size 42>
  ```
* We construct the embedding $x\mapsto (0,x)$ 
  ```
  gap> emb:=MappingByFunction(G,M,x->M[[0,x]]);
  MappingByFunction( C7 : C3, <Moufang loop of size 42>, \ 
  function( x ) ... end )
  gap> RespectsMultiplication(emb);
  true
  ```

---

# Right quasigroup element indexing

* Let $Q$ be a right quasigroup and $S$ a right subquasigroup of $S$
* Let $x$ be an element of $S$
* It is important to distinguish between 
  - the **canonical** index of $x$ in $S$, and
  - the **parent** index of $x$ in $Q$.
* **Remainder:** `S.i` refers to the index $i$ element **in the parent** $Q$
  ```
  gap> S:=Subloop(M,Image(emb,GeneratorsOfGroup(G)));
  <Moufang loop of size 21>
  gap> T:=DerivedSubloop(S);
  <Moufang loop of size 7>
  gap> ParentInd(T);
  [ 1, 3, 6, 9, 12, 15, 18 ]
  gap> T.3=S.3 and T.3=M.3 and not T.3=Elements(T)[3];
  true
  ```


---

# Transformations and permutations acting on right quasigroups

<div class="columns">
<div>

```
gap> ParentInd(T);
[ 1, 3, 6, 9, 12, 15, 18 ]
```

</div>
<div>

```
gap> RightTranslation(T,T.3);
(1,3,6,9,12,15,18)
```

</div>
</div>

* Whenever possible, **RightQuasigroups** works with parent permutations as default mappings
* Such as for right translations of quasigroups, right inner mappings of quasigroups, automorphisms, etc. 
* The default permutation action in **RightQuasigroups** treats permutations as parent permutations
* That is, if `Q` is a right quasigroup and `f` is a permutation then `(Q.i)^f` returns `Q.(i^f)`.

---

# Right quasigroup mappings

Given right quasigroups `Q1` and `Q2`, a mapping from `Q1` to `Q2` is represented in one of the following ways:

* as a __GAP__ **mapping** with source `Q1` and range `Q2` (used for mappings between two distinct right quasigroups, for instance for homomorphisms),
* as a **transformation** (for instance for left translations of right quasigroups),
  ```
  gap> Q:=AffineQuandle(10,3);
  <quandle of size 10>
  gap> LeftTranslation(Q,Q.3);
  Transformation( [ 7, 5, 3, 1, 9, 7, 5, 3, 1, 9 ] )
  ```
* as a **permutation** (used for bijective mappings when `Q1 = Q2`, for instance for translations in quasigroups, automorphisms, etc.).
  ```
  gap> RightTranslation(Q,Q.3);
  (1,7,5,9)(2,10,4,6)
  ```

---

# Parent and canonical permutations

For a fixed right quasigroup `Q`, permutations can be understood in two ways:


<div class = "columns">
<div>

### Parent permutations

* Indexing is based on the **parent indices** of elements of `Q`. 
* More precisely, a permutation `f` is a parent permutation of `Q` if it restricts to a permutation of the set `ParentInd( Q )`. 
  ```
  gap> AsParentPerm(T,(3,6));
  (6,15)
  ```

</div>

<div>

### Canonical permutations

* Indexing is based on the position of elements in `Elements( Q )`. 
* More precisely, a permutation `f` is a canonical permutation on `Q` if it restricts to a permutation on `[1..Size(Q)]`. 
  ```
  gap> AsCanonicalPerm(T,(3,6));
  (2,3)
  ```

</div>
</div>

>A permutation does not keep track of `Q`, the right quasigroup `Q` must be provided.


---

# Parent and canonical transformations

For fixed right quasigroups `Q1`, `Q2`, transformations can be understood in two ways:

<div class = "columns">
<div>

### Parent transformations
* Indexing is based on the parent indices of elements of `Q1` and `Q2`. 
* More precisely, a transformation `t` is a parent transformation from `Q1` to `Q2` if for every `i` in `ParentInt( Q1 )` we have `i^t` in `ParentInd( Q2 )`.

</div>
<div>

### Canonical transformations
* Indexing is based on the position of elements among elements of `Q1` and `Q2`. 
* More precisely, a transformation `t` is a canonical transformation from `Q1` to `Q2` if for every `i` in `[1..Size(Q1)]` we have `i^t` in `[1..Size(Q2)]`.

</div>
</div>

>A transformation does not keep track of `Q1` and `Q2`. The right quasigroups `Q1` and `Q2` must therefore be provided.

---

# Automorphisms

- *Automorphisms* of a right quasigroup are represented as **parent permutations**

```
gap> G; S; T; ParentInd(T);
C7 : C3
<Moufang loop of size 21>
<Moufang loop of size 7>
[ 1, 3, 6, 9, 12, 15, 18 ]
gap> AutomorphismGroup(T);
Group([ (3,6,12)(9,18,15), (3,9,6,18,12,15) ])
```

--- 

# Isomorphisms 

- *Isomorphisms* (and more generally *homomorphisms*) are represented by **right quasigroup mappings**

```
gap> IsomorphismRightQuasigroups(AsLoop(G),S);
MappingByFunction( <associative loop of size 21>, \ 
<Moufang loop of size 21>, function( x ) ... end )
```
