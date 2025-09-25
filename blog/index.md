---
layout: _layouts/base.html
title: Writing
background: clear-lake
---

Bits and bobs, composed in English. 

<ul>
{%- for post in collections.writing -%}
<li>{{ post.date | shortDate }} <a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {%- endfor -%}
  </ul>
