---
layout: _layouts/bt/texts.html
title: Bite-Sized Texts
tags: generalb
---

These texts are short, simple, stand-alone narratives. Generally, Bites-Sized Texts with a higher word count are more complex. 

One story: One pages.  
One page: One picture.  
One picture: 34-216 words in Toki Pona.


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

