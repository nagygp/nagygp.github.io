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

# Chapter 5: Nilpotency and solvability

* Commutator of normal subloops
* Series
* Nilpotency
* Demonstration: _All nilpotent loops in a given variety_
* Demonstration: _The Frattini subloop_
* Congruence Solvability vs congruence solvability
* Demonstration: _A loop that is classically solvable but not congruence solvable_
---

## Commutator of normal subloops

* There is a general theory of commutators of normal subloops in congruence modular varieties, due to Gumm, Smith and Freese-McKenzie.

* It was specialized to loops by Stanovský and Vojtěchovský. A key result was improved by Barnes:

**Theorem:** (S+V, B)
Let $A$, $B$ be normal subloops of a loop $Q$. The commutator $[A,B]_Q$ is the normal closure of
$$
\{ T_{u}(a)/T_v(a),\,R_{u_1,u_2}(a)/R_{v_1,v_2}(a),\,
L_{u_1,u_2}(a)/L_{v_1,v_2}(a): u_i/v_i\in B, a\in A\}.$$
---

## Series

* Lower central series: $Q_0=Q$, $Q_{i+1}=[Q,Q_i]_Q$

* Upper central series: as usual

* Congruence derived series: $Q_0=Q$, $Q_{i+1}=[Q_i,Q_i]_Q$

* Classical derived series: $Q_0=Q$, $Q_{i+1} = [Q_i,Q_i]_{Q_i}$

* This leads to nilpotency, congruence solvability and classical solvability
---

## Nilpotency

```gap
gap> Q := MoufangLoop( 64, 10 );
MoufangLoop( 64, 10 )
gap> IsNilpotent( Q );
true
gap> NilpotencyClassOfLoop( Q );
2
gap> LowerCentralSeries( Q );
[ MoufangLoop( 64, 10 ), <Moufang loop of size 4>, <trivial group with 1 generator> ]
gap> UpperCentralSeries( Q );
[ <Moufang loop of size 64>, <Moufang loop of size 8>, <trivial group with 0 generators> ]
```
---

## Demonstration: _All nilpotent loops in a given variety_

* Suppose we want to find all nilpotent left Bol loops $Q$ of order 20 up to isomorphism.

* The center of $Q$ contains a cyclic group of order 2 or 5. So it suffices to find all nilpotent Bol loops of order 10 and 4, and their central extensions with those cyclic loops. Etc.
---

## All nilpotent left Bol loops: AllLoopCentralExtensions

```gap
AllLoopCentralExtensions( F, p, identities )
```

* It calculates coboundaries $\mathrm{Cob}( F, p )$, cocycles $\mathrm{Coc}( F, p )$ in the variety (given by identities), and representatives of a certain action of $\mathrm{Aut}( F )\times\mathrm{Aut}( \mathbb Z_p )$ on the space of cocycles modulo coboundaries.

```gap
leftbol := "x*(y*(x*z))=(x*(y*x))*z";
f := AllLoopCentralExtensionsInVariety;
```
---

## All nilpotent left Bol loops: Order 10

* order 10 = 2x5 = 5x2
```gap
C2 := AsLoop( CyclicGroup( 2 ) );
C5 := AsLoop( CyclicGroup( 5 ) );
lps10a := f( C2, 5, [ leftbol ] );
lps10b := f( C5, 2, [ leftbol ] );
lps10 := LoopsUpToIsomorphism( Concatenation( lps10a, lps10b ) );
```
---

## All nilpotent left Bol loops : Order 20

* order 20 = 10x2 = 4x5
```gap
C4 := AsLoop( CyclicGroup( 4 ) );
V4 := AsLoop( Group( (1,2), (3,4) ) );
lps20a := List( lps10, F -> f( F, 2, [ leftbol ] ) );
lps20a := Concatenation( lps20a );
lps20b := f( C4, 5, [ leftbol ] );
lps20c := f( V4, 5, [ leftbol ] );
lps20 := LoopsUpToIsomorphism( Concatenation( lps20a, lps20b, lps20c ) );
```

* Guess what is found?
---

## Demonstration: _Frattini subloop_

* $\Phi(Q)$ is the intersection of all maximal subloops of $Q$

* **Theorem:** (Nagy) Let $Q$ be a finite loop such that $\mathrm{Mlt}(Q)$  is nilpotent. Then $\Phi(Q)$ is the orbit of $\Phi(\mathrm{Mlt}(Q))$ containing $1$.

* **Theorem:** (Bruck) If $Q$ is nilpotent of prime power order then $\mathrm{Mlt}(Q)$ is nilpotent.

* **Theorem:** (Glauberman-Wright, Drápal) A Moufang loop of prime power order is nilpotent.
---

## Frattini subloop

* from definition

```gap
gap> Q := MoufangLoop( 64, 100 );;
gap> F1 := Intersection( AllMaximalSubloops( Q ) );
<Moufang loop of size 8>
```

* from theory
```
gap> G := MultiplicationGroup( Q );;
gap> orb := Orbit( FrattiniSubgroup( G ), 1 );;
gap> F2 := Subloop( Q, List( orb, i -> Q.(i) ) );;
gap> F1 = F2;
true
```

* from documentation

```
gap> FrattiniSubloop( Q );;
```
---

## Congruence solvability vs classical solvability

* A congruence derived subloop is classically solvable. The converse does not hold in general. It is open in Moufang loops, say.

* Consider a normal series

$$ Q = Q_0 > Q_1 > \cdots > Q_n = 1,\qquad\qquad F_i = Q_i/Q_{i+1}\quad\quad      (1) $$

* A loop $Q$ is classically solvable if it contains (1) where every $F_i$ is an abelian group, that is, $[F_i,F_i]_{F_i}=1$.

* A loop $Q$ is conguence solvable if it contains (1) where every $F_i$ induces an abelian congruence of $Q/Q_{i+1}$, that is, $[F_i,F_i]_{Q/Q_{i+1}}=1$.
---

## Demonstration: _A loop that is classically solvable but not congruence solvable_

```gap
gap> Q := LeftBolLoop( 16, 1 );;
gap> [ IsSolvableLoop( Q ), IsCongruenceSolvableLoop( Q ) ];
[ true, false ]
```

* derived series and congruence derived series (could call them directly)
```gap
gap> D := DerivedSubloop( Q );
<left Bol loop of size 8>
gap> DerivedSubloop( D );
<trivial group with 1 generator>
gap> CommutatorOfNormalSubloops( Q, D, D );
<left Bol loop of size 8>
gap> IsCongruenceSolvableLoop( D );
true
gap> IsAbelianNormalSubloop( Q, D );
false
```