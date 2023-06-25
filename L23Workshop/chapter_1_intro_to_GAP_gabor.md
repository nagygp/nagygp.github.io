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

# <!-- fit --> Chapter 1: Introduction to GAP

- Installation
- Basic __GAP__ objects
- __GAP__ programming
- Method selection

---

# GAP installation

<div class="columns">
<div>

## About

- __GAP__ - Groups, Algorithms, Programming - is a system for Computational Discrete Algebra
- Visit the website [gap-system.org](https://www.gap-system.org/)

## For Windows 10 or 11

- Install [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/about)
- Reboot

</div>
<div>

## For WSL, Ubuntu Linux and MacOS ([link](https://www.math.u-szeged.hu/~nagyg/RQ-workshop-2023/))

* Download and compile __GAP__
* Compile the packages 
* Download and extract the package [__RightQuasigroups__](https://gap-packages.github.io/RightQuasigroups/) 
* Test and use
* Read the documentation
* Write papers and cite us!

</div>
</div>


---

# GAP basic usage

* Command line interface
* Arbitrary precision integers and rationals
  ```gap
  gap> 2^100-1;
  1267650600228229401496703205375
  ```
* Finite fields, number fields
  ```
  gap> Z(9) in GF(27);
  false
  ```
* Polynomials, Laurent series
  ```
  gap> t:=Indeterminate(Rationals,"t");
  t
  gap> (t+1)*(t-1);
  t^2-1
  ```
--- 

# Permutation groups

* Permutations in cycle notation
  ```
  gap> (1,2,3)*(3,4);
  (1,2,4,3)
  ```
* Fast methods for permutation groups
  ```
  gap> g:=Group((1,2,3),(3,4));
  Group([ (1,2,3), (3,4) ])
  gap> Size(g);
  24
  gap> StructureDescription(g);                              
  "S4"
  ```
* Constructors and libraries
  ```
  gap> Size( MathieuGroup( 24 ) );
  244823040
  gap> AllPrimitiveGroups( NrMovedPoints, 24, Size, 244823040 );
  [ M(24) ]
  ```

---

# List, vectors and matrices

* Lists are delimited by square brackets
  ```
  gap> [1,-1,2,-2,3,-3];
  [ 1, -1, 2, -2, 3, -3 ]
  gap> List([1..10],x->x^2);
  [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
  gap> List([1..10],IsPrimeInt);
  [ false, true, true, false, true, false, true, false, false, false ]
  gap> Filtered([1..10],IsPrimeInt);
  [ 2, 3, 5, 7 ]
  ```
* Sets are sorted lists
  ```
  gap> Set( [1,-1,2,-2,3,-3] );
  [ -3, -2, -1, 1, 2, 3 ]
  ```
* Indexing starts at 1
  ```
  gap> li := [1,-2,3,-4,5,-6];; li[2];
  -2
  ```
--- 

# Vectors and matrices

* Vectors are lists
  ```
  gap> [1,2,3]+100*[4,5,6];
  [ 401, 502, 603 ]
  ```
* Matrices are lists of lists
  ```
  gap> [[1,2],[3,4]] * [[1,100],[0,1]];
  [ [ 1, 102 ], [ 3, 304 ] ]
  ```
* Row and column vectors
  ```
  gap> [[1,2],[3,4]] * [1,0];
  [ 1, 3 ]
  gap>         [1,0] * [[1,2],[3,4]];
  [ 1, 2 ]
  ```

---

# Programming: control structures

<div class="columns">
<div>

## for-do, if-then-else
```
gap> for x in GF(9) do 
>       if x in GF(3) then 
>             Print(x,"\n"); 
>       fi; 
> od;
0*Z(3)
Z(3)^0
Z(3)
```

</div>
<div>

## while-do
```
gap> n:=10^10; 
10000000000
gap> while not IsPrimeInt(n) do 
>       n:=n+1; 
> od; 
gap> Print(n);
10000000019
```

</div>
</div>

---

# Programming: functions

* Standard way: __function-return-end__
  ```
  gap> fun := function( x, y ) 
  >        return 2*x-y;
  > end;
  function( x, y ) ... end
  gap> fun( 5, 6 );
  4
  ```
* "Right arrow" `->` short syntax for functions with one variable
  ```
  gap> fun := x -> x^2/2; 
  function( x ) ... end
  gap> fun( 5 );
  25/2
  ```
* Nested functions, recursion: OK
* Functions are __GAP__ objects, `f:=g(h);` is OK

---

# Method selection

<div class="columns">
<div>

## Mathematical objects 

* Defined using the axioms of set theory
* One __defines__ the equality of sets $A=B$
* Objects are sometimes *"essentially the same"*
* It is hard to distinguish between an object and its __representation__
* **Examples:** Rational numbers, polynomials, permutations

</div>
<div>

## GAP objects

* __GAP__ objects are stored *somewhere*, *somehow* in the computer's memory
* __GAP__ objects have
  * Categories
  * Families
  * Types
  * Properties
* These enable fast selection of methods
* Must be set up correctly!!

</div>

---

# Example: a permutation

```
gap> a:=(2,3,4);
(2,3,4)
gap> FamilyObj(a);
<Family: "PermutationsFamily">
```
```
gap> TypeObj(a);
<Type: (PermutationsFamily, [ IsPerm, IsInternalRep, ... ]), data: fail>
```
```
gap> CategoriesOfObject(a);
[ "IsPerm", "IsExtLElement", "IsExtRElement", "IsMultiplicativeElement",
  "IsMultiplicativeElementWithOne", "IsMultiplicativeElementWithInverse", 
  "IsAssociativeElement", "IsFiniteOrderElement" ]
```
```
gap> KnownPropertiesOfObject(a);
[ "CanEasilyCompareElements", "CanEasilySortElements" ]
```

--- 

# Mappings vs transformations vs permutations

* A *mapping* in __GAP__ is what is called a "function" in mathematics
* The image of $x$ under the mapping $f$ is expressed as $x^f$, or `x^f`
* A *transformation*  in  __GAP__  is  a mapping from $\mathbb{Z}_{>0}$ to itself
* A  *permutation* in __GAP__ is a bijective mapping from $\{1,\ldots,n\}$ to itself
* Mathematically, these are subcategories
* In __GAP__, these categories (`IsTransformation` and `IsPerm`) are disjoint

--- 

# Mappings vs transformations vs permutations

```
gap> a:=(2,3,4);
(2,3,4)
gap> IsTransformation(a);
false
gap> b:=AsTransformation(a);
Transformation( [ 1, 3, 4, 2 ] )
```

```
gap> CategoriesOfObject(b);
[ "IsTransformation", "IsExtLElement", "IsExtRElement", 
 "IsMultiplicativeElement", "IsMultiplicativeElementWithOne", 
  "IsMultiplicativeElementWithInverse", "IsAssociativeElement" ]
gap> IsPerm(b);
false
```

* `AsTransformation` works for partial permutations and binary relations as well


