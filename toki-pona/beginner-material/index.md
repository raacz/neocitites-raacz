---
layout: _layouts/bt/texts.html
title: Home
---


A collection of free Beginner Texts in Toki Pona authored by jan Lakuse. 

Each text features literal English translations and notes to help you follow along. Most texts also have pictures!

 
## Bite-Sized
<ul class="cards">
{% for item in collections.lili %}
<li class="card">
  <a href="{{ item.url }}">
  <img src="{{ item.data.media }}" alt="">
  <span lang="tok">{{ item.data.title }}</span>
  </a>
</li>
{% endfor %}
</ul>

## Stories

<ul class="cards">
{% for item in collections.suli %}
<li class="card">
  <a href="{{ item.url }}">
  <img src="{{ item.data.media }}" alt="">
  <span lang="tok">{{ item.data.title }}</span>
  </a>
</li>
{% endfor %}
</ul>

