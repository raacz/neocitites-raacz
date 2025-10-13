---
layout: _layouts/bt/texts.html
title: suli
---
## Theme Texts

<ul class="stories">
{% for item in collections.suli %}


<li>


  <a href="{{ item.url }}">
  <span lang="tok">{{ item.data.title }}</span>
  </a>
  {{ item.content }}

</li>
{% endfor %}
</ul>



