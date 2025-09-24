---
layout: _layouts/base.html
title: Writing
background: clear-lake
---

  {%- for post in collections.writing -%}
    <li> <a href="{{ post.url }}">{{ post.data.title }}</a></li>
  {%- endfor -%}
