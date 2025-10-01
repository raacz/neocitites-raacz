---
layout: _layouts/child.html
title: mooooooooooooooo.
backto: ..
background: toki-pona
eleventyImport:
  collections: ["moo"]
---

<hr class="intro-end">
{%- for post in collections.moo -%}
  <h2 id="{{ post.data.title | slugify }}">{{ post.data.title }}</h2>
  <small>{{ post.date | postDate }}</small>
  {{ post.content }}
  <hr>
{%- endfor -%}
