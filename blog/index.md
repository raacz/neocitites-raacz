---
layout: _layouts/base.html
title: Writing
background: clear-lake
---

Bits and bobs, composed in English. 


<ul>
{% assign pages = collections.writing | reverse %}
  {% for post in pages %}
  <li>{{ post.date | shortDate }} <a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {%- endfor -%}
</ul>

Here's my [ASL Learning Log](/blog/asl/asl-log/).
