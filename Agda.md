# What I had to do to install Agda
1.
```
cabal update
cabal install Agda-executable
agda-mode setup
```
2. add some lines to `.emacs.d/init.el`
`(load "/Users/serratus/Library/Haskell/share/ghc-8.0.2-x86_64/Agda-2.5.2/Emacs-mode/agda2.el")`

``` (load-file (let ((coding-system-for-read 'utf-8))
                (shell-command-to-string "agda-mode locate")))

```
get added by `agda-mode setup`

3. clone agda-stdlib and checkout v0.13

4. create a file .agda/libraries with a path to where I cloned stdlib in it, `~/agda-stdlib/standard-library.agda-lib`
5. create a file .agda/defaults with `standard-library` identifier in it.

# Why?
I had this bright idea that having a proof checker would help me study. So far I've sunk several hundred hours into it and it did not bear fruit. All it did was get me interested in weird branches of logic and PL research. Which is not /bad/, but, like, it's a distraction. I want to do math. Actually, I'm not all that sure what it is I want to do. So whatever. It's been fun.

# How to learn agda.

There are videos of old lectures,
e.g. http://www.cs.nott.ac.uk/~psztxa/g53cfr/
or https://www.youtube.com/watch?v=shXKb2MTkUc&list=PLB7F836675DCE009C

There are tutorials

There is even a short book

There is some code towards formalization of HoTT in Agda which I want to be able to read.

I wonder whether there are more libraries...

I really need to think about the awesome things that could be done with Agda.

# Where to pick up:
http://oxij.org/note/BrutalDepTypes/
