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

# Chapter 6: Racks and quandles

There is general support for one-sided quasigroups in RightQuasigroups. Given GAP conventions (acting on the right), it makes more sense to work with right quasigroups than with left quasigroups.

Racks and quandles are instances of right quasigroups.

* Classes of racks and quandles
* Affine right quasigroups
* Joyce-Blackburn representation and enumeration
* Displacement groups

---

## Racks and quandles

* A groupoid $(Q,*)$ is a **rack** if all right translations $R_x$ are automorphisms of $(Q,*)$.
* An idempotent rack is a **quandle**.
* A rack is **connected** if $\mathrm{RMLt}(Q) = \langle R_x:x\in Q\rangle$ acts transitively on $Q$.
* A rack is **homogeneous** if $\mathrm{Aut}(Q)$ acts transitively on $Q$.
* A rack is **latin** if also all left translations $L_x$ are bijections. Note: A latin rack is a quandle since $(xx)x=(xx)(xx)$, now cancel $xx$ on the left.
* A rack is **faithful** if $x\mapsto R_x$ is injective.
---

## Permutational racks

* permutational rack: $x*y = f(x)$ for some $f\in S_X$.

```gap
gap> PermutationalRack( 10, (3,4,5) );
<rack of size 10>
gap> Q := PermutationalRack( 100000, (1,100000), ConstructorStyle( false, true ) );
<rack of size 100000>
gap> Q[1]*Q[2];
r100000
```
---

## Affine right quasigroups

There is no standard definition of affine right quasigroup. Here are some of the arithmetic forms of affine right quasigroups recognized by RQ:

* $(n,f,g,c)$ for four integers such that $n>0$ and $Gcd(n,f)=1$, with multiplication $(f*x + g*y +c)\ \mathrm{mod}\ n$

* $(F,f,g,c)$, where F is a field, f is a nonzero element of F and g, c are elements of F, with multiplication $f*x + g*y +c$

* $(G,f,g,c)$, where $(G,+)$ is an abelian group, $f$ is an automorphism of $G$, $g$ is an endomorphism of $G$, and $c\in G$, with multiplication $x^f+y^g+c$

* $(G,f,u,g,v)$, where $G$ is a loop, $f$ is an automorphisms of $G$, $g$ is an endomorphisms of $G$ and $u,v\in G$, with multiplication $(x^f+u)+(y^g+v)$
---

## Affine right quasigroups (constructors)

* modulo $n$

```gap
gap> IsAffineRightQuasigroupArithmeticForm( 10, 3, 5, 1 ); # (3*x+5*y+1) mod 10
true
gap> Q := AffineRightQuasigroup( 10, 3, 5, 1 );
<right quasigroup of size 10>
```
* on a loop

```gap
gap> G := AutomorphicLoop( 10, 1 );; # inner mappings are automorphisms
gap> f := AsRightQuasigroupMapping( G, LeftInnerMapping( G, G.2, G.3 ) );;
gap> g := f*f;; u := G.1;; v := G.2;;
gap> IsAffineQuasigroupArithmeticForm( G, u, f, v, g ); # (u*x^f)*(v*y^g)
true
gap> Q := AffineQuasigroup( G, u, f, v, g ); 
<quasigroup of size 10>
```
---

## Affine racks and quandles

* over a finite field

```gap
gap> F := GF(9);; f := 2*Z(9);; g := Z(9)+One(F);; c := Zero(F);;
gap> AffineRack( F, f, g, c ); 
<latin quandle of size 9>
```

* on a cyclic group

Note: $x*y = f(x)+g(y)+c$ is a quandle iff $c=0$ and $g=\mathrm{id}-f$

```gap
gap> G := CyclicGroup(5);; f := Elements( AutomorphismGroup( G ) )[2];
[ f1 ] -> [ f1^2 ]
gap> AffineQuandle( G, f );
<latin quandle of size 5>
```
---

## More constructors

* dihedral quandle: $x*y = (-x+2y)\ \mathrm{mod}\ n$

```gap
gap> DihedralQuandle( n );
```

* core of a group or right Bol loop: $x*y = (yx^{-1})y$

```gap
gap> CoreOfRightBolLoop( Q );
```

* conjugation quandle: $x*y = y^{-m}*x*y^m$

```gap
gap> ConjugationQuandle( G, m )
```
---

## All homogeneous quandles

**Theorem:** (Joyce, Galkin)
Every homogeneous quandle is of the form $(G/H,*)$ with multiplication
$Hx*Hy = H f(xy^{-1})y$, where $G$ is a group, $H\le G$, $f\in\mathrm{Aut}(G)$ such that $f(x)=x$ for all $x\in H$.

```gap
gap> G := SymmetricGroup( 4 );; H := Subgroup( G, [(1,2)] );;
gap> f := Filtered( AutomorphismGroup( G ), g -> (1,2)^g = (1,2) )[3];
^(3,4)
gap> Q := GalkinQuandle( G, H, f );
<quandle of size 12>
```
---

## All racks and quandles: Joyce-Blackburn representation

**Theorem:** (Blackburn)
The triple $(G,S,R)$ is a rack (resp. quandle) envelope if
* $G$ is a permutation group,
* $S$ is a set of orbit representatives of $G$,
* $R=(r_x:x\in S)$ is a collection of elements of $G$ such that $r_x\in C_G(G_x)$ (resp. $r_x\in Z(G_x)$) for every $x\in S$, and $\langle\bigcup_{x\in S}r_x^G\rangle = G$. 
There is a one-to-one correspondence between rack (resp. quandle) envelopes and racks (resp. quandles).
---

## One quandle envelope

```gap
gap> env :=[ Group([ (1,3,2)(7,8) ]),
  [ 1, 4, 5, 6, 7, 9, 10 ], 
  [ (), (), (1,2,3), (1,3,2)(7,8), (1,2,3), (1,3,2)(7,8), (1,3,2)(7,8) ]
];
gap> Q := QuandleByQuandleEnvelope( env );
<quandle of size 10>
```
---

## Racks and quandles up to isomorphism

r(n): 1 2 6 19 74 353 2080 16023 159526 2093244 36265070 836395102 25794670618 

* small racks up to order 10 are in the library

```gap
gap> SmallRack( 10, 123456 );
```

q(n): 1 1 3 7 22 73 298 1581 11079 102771 1275419 21101335 469250886 

* small quandles up to order 11 are in the library

```gap
gap> SmallQuandle( 11, 999999 );
```
---

## Displacement groups

There are various **displacement groups** associated with (right) quasigroups, for instance:

$$ \mathrm{Dis}^+_\ell(Q)=\langle L_xL_y^{-1}:x,y\in Q\rangle $$

**Theorem:** A quasigroup $(Q,*)$ is isotopic to a group iff $\mathrm{Dis}^+_\ell(Q)$ acts regularly on $Q$, in which case $(Q,*)$ is isotopic to $\mathrm{Dis}^+_\ell(Q)$.

```gap
gap> IsIsotopicToGroup( Q );;
gap> IsIsotopicToAbelianGroup( Q );;
```