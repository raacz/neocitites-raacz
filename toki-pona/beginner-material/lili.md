---
layout: _layouts/bt/texts.html
title: Bite-Sized Texts
tags: generalb
---

These texts are short, simple, stand-alone narratives featuring a single contextualizing picture. Generally, bites-sized texts with a higher word count are more complex. 


<ul class="cards">
{% for item in collections.liliwc %}
<li class="card">
  <a href="{{ item.url }}">
  <img src="{{ item.data.media }}" alt="">
  <div>
  <span lang="tok">{{ item.data.title }}
  </span>
  <span class="wordcount">{{ item.data.wordcount }} words
  </span>
  </div>
  </a>
</li>
{% endfor %}
</ul>

