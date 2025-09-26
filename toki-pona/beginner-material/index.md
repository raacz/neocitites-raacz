---
layout: _layouts/texts.html
title: Home
---

A collection of free Beginner Texts in Toki Pona authored by jan Lakuse. 

Each text features literal English translations and notes to help you follow along. Most texts also have pictures!

 


{% for item in collections.lili %}
  {% render "partials/lili-block.liquid", 
    fileSlug: item.fileSlug,
    title: item.data.title,
    external: item.data.external,
    name: item.data.name,
    source: item.data.source,
    license: item.data.license,
    alt: item.data.alt,
    media: item.data.media,
    collections: collections,
    content: item.content %}
{% endfor %}

