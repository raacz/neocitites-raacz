---
layout: _layouts/base.html
title: ASL Learning Log
background: clear-lake
---

<style>

   @font-face {
    font-family: InterTight;
    src: url(/assets/Inter_Tight/InterTight-Regular.ttf);
   }

    main {
        font-family: InterTight;


    }
    .log-entry div{
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        justify-content: space-between;
        border: 0.1em solid var(--laso);
        padding: 1em 0.25em;
        margin-block-end: 1.5em;
    }
    .log-entry div *{
        padding: 0;
        margin: 0;
    }
    .log-entry small {
        font-size: 0.7em;
    }
    .toc h2{
        margin: 0 0 0 1em;
    }
    article{
        max-width: 26em;
    }
    article p{

    }
         
</style>
  {%- assign posts = collections["asl"] | reverse -%}


<div class="toc">
  <h2>Index</h2>
    <ul>
  {%- for post in posts -%}
    <li> {{ post.data.date | shortDate }} <a href="#{{ post.data.title | slugify }}">{{ post.data.title }}</a></li>
  {%- endfor -%}
  </ul>
  
</div>
<hr class="intro-end"> 


{% for item in posts %}

<article class="log-entry">
<div>
    <h2 tabindex="-1" id="{{ item.data.title | slugify }}">{{ item.data.title }}</h2>
    <small>{{ item.data.date | postDate }}</small>
</div>
{{ item.content }}

</article>

{% endfor %}

