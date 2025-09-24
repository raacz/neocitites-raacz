---
layout: _layouts/base.html
title: Toki Pona
background: toki-pona
---

is a language that has less than 200 words and was made by a French Canadian woman in 2001. I first started learning in 2019. I have since done a lot of things with it and I consider myself to be pretty knowledgeable about the language and the microcommunities that surround it. 

<hr class="intro-end"> 

See the following subpages:

<ul>
{%- for post in collections.tok -%}
<li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>

