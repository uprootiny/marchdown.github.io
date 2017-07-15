## Hello world!
This is my Github Pages repo. 

I've been keeping notes in emacs and then in markdown files for several years now and I've been meaning to put them online but you know how these things are... Anyhow I'm taking a leap. I'll be keeping a diary here and hopefully publish some essays and software projects as well.


I'm not sure if I'm gonna use [the GitHub editor](https://github.com/marchdown/marchdown.github.io/edit/master/index.md) or just edit the files locally and push them to github, but it's nice to have the option.

I'm told that GitHub Pages run [Jekyll](https://jekyllrb.com/); I wonder if I could use Hakyll instead or this thing from plan9/cat-v/suckless crowd.

### Markdown

Markdown, [Gruber](daringfireball.net)'s brainchild, is great and [the Bear app](http://www.bear-writer.com) I've been using for writing lately is built around. There's nice synergy with [Emacs & Org-mode](http://orgmode.org/worg/org-blog-wiki.html).

```markdown
We can do syntax highlighting! I wonder if GitHub (or is it Jekyll?) recognizes Agda and Idris?

record Monoid c ℓ : Set (suc (c ⊔ ℓ)) where
  infixl 7 _∙_
  infix  4 _≈_
  field
    Carrier  : Set c
    _≈_      : Rel Carrier ℓ
    _∙_      : Op₂ Carrier
    ε        : Carrier
    isMonoid : IsMonoid _≈_ _∙_ ε
```

### Github niceties
Apparently Github has [its own flavour of markdown](https://guides.github.com/features/mastering-markdown/).

Jekyll has themes and there's a GUI to change them in [repository settings](https://github.com/marchdown/marchdown.github.io/settings). They are stored in `_config.yml`.

There is extensive [documentation](https://help.github.com/categories/github-pages-basics/) also [humans](https://github.com/contact).
