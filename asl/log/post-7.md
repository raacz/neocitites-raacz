---
title: Vocab Management System
date: 2025-12-27
---

### Reflecting on Reviewing

Part of learning all of this really disparate vocabulary is that I have no larger organizing framework to put in, hence the risk of me not remembering some words increases. It's also true that I have an easier time producing signs that I learn in Vicars lectures (harder time with reception), but an easier time receiving signs that I learn in FB reels (harder time with production). I do think the FB Reels signs do tend to be a little harder in general though...

Perhaps I should take some time to organize the existing signs that I've learned so far into a TP-style framework.


<style>
    .tp-org dt{
        font-weight: 800;
    }
    .tp-org dd {
        margin-inline-start: 2em;
    }
    dl.tp-org {
        padding: 2em;
    }
</style>

<dl class="tp-org">
    <dt>akesi</dt>
    <dd>Snake</dd>
    <dt>alasa</dt>
    <dd>Research, Experiment</dd>
    <dt>ante</dt>
    <dd>Conflicts</dd>
    <dt>esun</dt>
    <dd>Cost, Corporation, Change-out, Deserve, Bet</dd>
    <dt>ike</dt>
    <dd>Human Trafficking, Kidnap</dd>
    <dt>ilo</dt>
    <dd>Telescope, Printer, Lock, Metro, Binder, Backpack, Balloon, Belt, Degree, Gas-empty, Gas-full
    </dd>
    <dt>jan</dt>
    <dd>Pirate, Leprechaun, Human</dd>
    <dt>ken</dt>
    <dd>Chance, License</dd>
    <dt>kili</dt>
    <dd>Potato, Strawberry, Melon, Corn, Garlic, Lettuce, Cherry</dd>
    <dt>ko</dt>
    <dd>Smoothie, Jelly</dd>
    <dt>kon</dt>
    <dd>Tornado, Inspiration</dd>
    <dt>lili</dt>
    <dd>Blah-blah-blah</dd>
    <dt>luka</dt>
    <dd>Fingerprints</dd>
    <dt>lukin</dt>
    <dd>Attention, Narrowed-Attention, Visually-take-it-all-in</dd>
    <dt>ma</dt>
    <dd>Mexico, Australia, Europe, England, Boston, Ireland-International, Ireland-Iowa</dd>
    <dt>mani</dt>
    <dd>Welfare, Medicare</dd>
    <dt>moku</dt>
    <dd>Mashed-Potato</dd>
    <dt>mun</dt>
    <dd>Space, Galaxy</dd>
    <dt>mute</dt>
    <dd>Tablespoon, Pound, Cup-(Measurement)</dd>
    <dt>namako</dt>
    <dd>Vinegar</dd>
    <dt>nasa</dt>
    <dd>Mischevious, Alcohol</dd>
    <dt>nasin</dt>
    <dd>Tradition, Repulican, Planner, Prepare, Conservative, Democrat, Liberal, Leadership, Government
    </dd>
    <dt>pakala</dt>
    <dd>Trauma, Darn-it, Fake, Jammed, Lose-Fail, Dimwit</dd>
    <dt>pan</dt>
    <dd>Pie</dd>
    <dt>pana</dt>
    <dd>Spread, </dd>
    <dt>pilin</dt>
    <dd>Anxiety, Empathy, Concerned-about</dd>
    <dt>pona</dt>
    <dd>Kindness, Lucky, Official, Value
    </dd>
    <dt>sama</dt>
    <dd>Identical</dd>
    <dt>sijelo</dt>
    <dd>In-person</dd>
    <dt>sona</dt>
    <dd>Shared-Understanding</dd>
    <dt>soweli</dt>
    <dd> Donkey, Bacon, Sheep
    </dd>
    <dt>suli</dt>
    <dd>In-your-face, Boringly-prolong
    </dd>
    <dt>taso</dt>
    <dd>Flat</dd>
    <dt>tawa</dt>
    <dd>Twirl, Travel-Whirlwind, Transfer-(public-transport), Skating, Figure Skating, Ballet
    </dd>
    <dt>telo</dt>
    <dd>Sweat, </dd>
    <dt>tenpo</dt>
    <dd>Three-days-ago, St Patrick's day, Honeymoon</dd>
    <dt>toki</dt>
    <dd>Telepathy, Poetry, Exaggerate, Dwell-on</dd>
    <dt>tomo</dt>
    <dd>Bar</dd>
    <dt>utala</dt>
    <dd>Rebel, Resist</dd>
    <dt>wile</dt>
    <dd>Willing, Goal</dd>
</dl>

I actually really like this. This is going to be really helpful for me. 

### New Systems?

I'm going to need to find a more robust system to keep all my vocab in order, and it's looking like a spreadsheet of some kind is likely going to be the best way to do so. 

In a completely dreamlike spreadsheet, it would be automated pretty naturally from the entries I have here. It would have the date that I learned it, the source that I learned it from, a screenshot of the general sign, the toki pona word it can be most associated with, and a place for additional notes. And it has to be sustainable, something that I can keep up with not much additional work. 

Yesterday I already spent some time making a script that goes and yoinks all of the vocab from all of the lists with a level 4 heading called 'Vocab.' 

It's likely possible that I can write something that goes through and zoinks all the vocab and the vids they are associated with and shoves it in a spreadsheet??? But then I'm offshoring the enterprise. HMM. 

HMMM. 

HMMMMMMMM. 

Potentially, we're now talking about-- HMMM. 

You might be like, Chelsea, stop thinking about this and just learn the language already. But you have to understand- I have lost so so many signs that I've learned in the past. I really do feel that if I put some extra investment into creating a better system now, I will be generally more able to retain things throughout these next couple of years of my life. 

Okay. I think I have the beginnings of a plan. 

### Brainstorm

Currently Eleventy treats ``vocab`` as an object with both a ``word`` and a ``date`` (the date being in the format of YYYY-MM) that is associated with a particular post. It generates this automatically based on the presence of a heading level 4 titled 'Vocab'. 

It then uses this within Eleventy Collections to generate this index...

I could instead have it write directly to file... 

I could also have it scan for notes for glosses that match the assigned gloss. 

And then I could add any tp classes I want later, to the raw files. I could then photo capture every sign into one large folder and match by gloss name... HMMM. 

But how do I get it to not do duplicate work? I only want it to do this kind of processing like... once. I also want it to be able to take in just straight up words, in case I learn stuff in the wild that isn't associated with a particular material. 

### A New System!

So I didn't change anything about the way I have my Eleventy set up. I did use Claude to make a python script that will extract vocab from a markdown file I give it along with various associated metadata and send it to a [Google Sheet](https://docs.google.com/spreadsheets/d/1PZkXV90E3THTB1z_XxOXNBsz8KYsKVZaJ2KHJTOCk-8/edit?usp=sharing).

I then manually went back and screencapped the vocab and things. Obviously, the screencaps are not CC-BY. 

So I can run the script and it will update my sheet, as I want to. Doing this whole thing was good review. I actually culled a few vocabulary items that were likely just misreadings, and fixed a broken link. 

This is a very good and robust set up to start out with. In the future, this will help me to make an Anki deck, or something resemmbling an Anki deck. 

Here's what I have to remember to do in the future:

To execute save to Google Sheets: <pre><code>cd /home/lakuse/VSCodium/asl-sheet-vocab
source venv/bin/activate
python add_vocab.py post-X.md
</code></pre>

To exit virtual machine: <pre><code>deactivate
</code></pre>

I also have to remember to NOT leave the table sorted by anything else by the default. I unfortunately didn't work in some kind of indexing system so if I want to preserve the order of signs in each vocab list, I have to maintain the order they are loaded in.

But while I am mid study session, I can totally go ahead and sort the table to accommodate different needs- alphabetical, by tp word, etc. 

The downside is that I require the internet to access this sheet, which is why the Eleventy system needs to stay here as back-up. 
