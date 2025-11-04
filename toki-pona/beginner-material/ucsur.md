---
layout: _layouts/bt/texts.html
title: More about UCSUR
tags: 
- article
---

## First, What Is It?

*This is an explanation of UCSUR for a non-technical audience. You can also choose to read [this high-level technical explanation on on sona.pona.la](https://sona.pona.la/wiki/Under-ConScript_Unicode_Registry), or skip to ["UCSUR Sitelen Pona vs ASCII Sitelen Pona"](#not-default) if you are already familiar with how it works.*


Sometimes when you're browsing on the internet, characters like these crop up: 

 	 	 	 	 	 	 	 	 	 	 	


It's a miracle that it doesn't happen more often. 

### Character Encoding Standards

It's a miracle that we're able to represent letters and words on computers at all. 

At the end of the day, all data is binary-- a combination of ones and zeros. 

I typed these words out on my device and now you are reading them on your device. In order for your device to show you the same letters that I intended to send, they have to agree on which combinations of ones and zeros are used to represent each letter. 

Hence computer people around the world developed character encoding standards: agreements on how to present each character in data.

You can imagine that in the beginning, they were really trying to limit how much numbers they had to send each time. The devices were only so powerful. 

Let's say that each character was represented by a group of 5 digits: each of them ones and zeros. You could do A as 10000, B as 01000, maybe C as 00100?  With 5 digits, you had a max of 32 combinations to play with: meaning that you could represent 32 letters. The UK worked out their codes. Continental Europe worked out... different codes. The French really wanted É. 

5-bit encoding, allowing a total of 32 combinations, was not enough. And so going up to 6-bit encoding allowed for 64 combinations, which also wasn't enough. 


At 7 bits, with 128 total combinations, people writing in English finally felt comfortable. **American Standard Code for Information Interchange**, also known as **ASCII**, became quite an influential standard. It allows for uppercase and lowercase letters, a wide variety of punctuation symbols and characters like 'Tab.' 

That was what was happening in the English-speaking world. Early products exported to the English-speaking world often did not support multilingual scripts. 

Massive work was done on an international level to create a universal coded character set, capable of representing scripts of all languages. 

Which brings us to **Unicode**. UTF-8, with 8 bits, is able to encode over a million characters. On the international level, most devices now use it. 

But Unicode does not currently encode Sitelen Pona.

## Sitelen Pona Fonts 

How do you make a font to represent a character that doesn't exist according to most of the devices out there?

Here's the two workarounds that fontmakers have figured out:

### First Option: Ligatures with ASCII characters

Fonts themselves are complicated. 

Font-builders have access to a feature called ligatures. 

Enabling ligatures give you the ability to combine letters. In English serif fonts, fontmaker draw out the letters 'f' and 'i' independently, but often when 'fi' occurs as a combination, they'll draw out a new combo-letter that squishes the two letters together, where the bar of the f is located over the i. 




<svg role="presentation" xmlns="http://www.w3.org/2000/svg" width="149" height="57" version="1.0">
  <path d="M120.20208 38.820598c0 3.807958-.05289 4.336846-2.00976 4.601288l-1.21643.158665c-.37022.264441-.26445 1.163544.10577 1.322209 1.58665-.105777 3.17331-.158665 5.07729-.158665 1.85109 0 3.38485.052888 5.55327.158665.37022-.158665.476-1.057768.10578-1.322209l-1.69243-.158665c-1.90398-.158665-2.00976-.79333-2.00976-4.601288V27.766929c0-1.269319.10578-1.639539 1.00488-1.639539h6.61105c2.2742 0 2.64442.264445 2.64442 3.490632v9.202576c0 3.807958-.05289 4.336846-2.00976 4.601288l-1.11066.158665c-.37021.264441-.26444 1.163544.10578 1.322209 1.48087-.105777 3.06753-.158665 4.97151-.158665 1.85109 0 3.38485.052888 4.9715.158665.37022-.158665.476-1.057768.10578-1.322209l-1.11065-.158665c-1.90398-.264442-2.00976-.79333-2.00976-4.601288v-8.832357c0-2.168421.10577-4.707067.21155-6.611046-.10578-.158665-.31733-.264442-.52888-.264442-1.26932.475995-4.60129.793325-6.92838.793325h-5.9235c-.8991 0-1.00488-.317331-1.00488-1.639539v-.581772c0-8.197689 1.90399-12.7460964 6.02928-12.7460964 1.37509 0 3.43774.8991048 4.97151 3.4906324.26444.423106.63466.793325 1.37509.793325.79333 0 2.16843-.581773 2.16843-2.168423 0-2.2213089-2.96176-4.1252923-6.55816-4.1252923-5.92349 0-9.14969 4.4426253-10.26034 7.1399293-1.21644 2.803081-1.63954 5.870612-1.63954 8.885246 0 .528883-.37022.846214-.79333 1.057767l-2.2742 1.110656c-.21155.31733-.15866.793326.15867 1.004879h1.85109c1.05776 0 1.05777.105778 1.05777 1.533762v11.159446M21.842716 26.12739c.581771-.211553.95199-1.692428.370218-2.221312H16.18366c-.899101 0-.899102-.052889-.899102-1.480874v-1.533763c0-2.644415.211554-6.505271 1.163544-8.938134.793325-1.903979 2.115536-2.9088597 3.755074-2.9088597 1.745315 0 3.226192 1.1635457 4.23107 2.3270877.370218.423107.687549.634661 1.26932.634661 1.004878 0 2.009758-.846215 2.009758-1.903981 0-1.9039796-2.379979-3.1733023-5.18306-3.1733023-5.235943 0-8.197698 3.7021883-9.519906 6.7168223-1.269319 2.961746-1.639539 6.240831-1.639539 9.308353 0 .528883-.370219.846214-.793326 1.057767l-2.2741993 1.110656c-.2115533.31733-.1586648.793326.1586651 1.004879h1.8510932c1.057766 0 1.057767.105778 1.057767 1.533762v11.159446c0 3.807958-.05289 4.336846-2.009758 4.601288l-1.2164324.158665c-.3702182.264441-.2644415 1.163544.1057767 1.322209 1.5866494-.105777 3.1733037-.158665 5.0772837-.158665 1.85109 0 3.384857.052888 5.764831.158665.370219-.158665.475995-1.057768.105777-1.322209l-1.903981-.158665c-1.903979-.158665-2.009758-.79333-2.009758-4.601288V27.661152c0-1.427984.000001-1.533762.899102-1.533762h5.659056m6.673659 12.693208c0 3.807958-.05289 4.336846-2.009758 4.601288l-1.110656.158665c-.370218.264441-.264441 1.163544.105777 1.322209 1.480873-.105777 3.067527-.158665 4.971506-.158665 1.851091 0 3.384857.052888 4.971507.158665.370218-.158665.475995-1.057768.105777-1.322209l-1.110656-.158665c-1.903979-.264442-2.009758-.79333-2.009758-4.601288v-9.519906c0-2.168421.105777-4.707067.211553-6.558158-.052888-.211553-.264442-.31733-.528883-.31733-1.216431.793325-4.231071 2.168424-5.447502 2.59153-.264442.158665-.264442.740437-.052888.951991l.475995.31733c1.427984.95199 1.427986 1.216434 1.427986 3.279079v9.255464m1.745316-27.078844c-1.586649 0-2.855972 1.110657-2.855972 2.855972 0 1.427984 1.057769 2.644418 2.697307 2.644418 1.480873 0 2.803083-.846216 2.803083-2.750195 0-1.480873-1.057769-2.750195-2.644418-2.750195" color="var(--pimeja)" font-family="Adobe Garamond Pro" font-size="52.8883667" font-weight="400" overflow="visible" style="text-indent:0;text-align:start;line-height:100%;text-transform:none;block-progression:tb;marker:none"/>
  <path fill-rule="evenodd" d="M66 31h22v-6l7 7.5-7 7V34H66v-3z"/>
</svg>



What Sitelen Pona font makers have done is assigned new combo-letter characters to every Sitelen Pona word. 

### Second Option: Make Your Own Standard

Unicode is able to encode over a million characters, but it currently only uses a fraction of that. There are many combinations which are simply unassigned, and there's actually a whole bunch of them that have been declared as being 'for private use. Anyone, including a Sitelen Pona enthusiast, can go ahead and just... pick a few to use for their private needs. 

There is more than one Sitelen Pona font-making enthusiast. How do we ensure that they pick the same ones to use for Sitelen Pona?

### Enter UCSUR

Toki Pona is not the only constructed language that wants its members to agree on which encodings to use. The UCSUR "ensures nobody steps on each other's toes" as conlang communities decide which of the combinations they'd like to use. 

Here's the UCSUR entry outlining the <a href="https://www.kreativekorp.com/ucsur/charts/sitelen.html
">claimed combinations/codepoints of Sitelen Pona</a>. 

<h3 id="not-default" tabindex="-1">UCSUR Sitelen Pona vs ASCII Sitelen Pona</h3>

UCSUR fonts do not need ligatures enabled, which is good. Ligatures are not intended for the extended use that they have in Sitelen Pona fonts. Using them can be incredibly buggy and there are known bugs in practically all browsers.

UCSUR doesn't even really need a font: someone can dump a bunch of UCSUR Sitelen Pona in Discord, and if you have a UCSUR font downloaded onto your Discord client, you will see their Sitelen Pona. If you don't have that UCSUR font, well...

 	 	 	 	 	 	 	 	 	 	 	

(That's Klingon, by the way.)

ASCII allows more choice. There's no easy way of turning UCSUR Sitelen Pona into Latin alphabet Toki Pona very quickly, but there is a very easy way to turn ASCII Latin alphabet Toki Pona into ASCII Sitelen Pona. Simply turn off the font, and voila. Not knowing Sitelen Pona or not having a UCSUR font no longer becomes a barrier to participating in the conversation. 

Perhaps, if Sitelen Pona ever enters Unicode, people will make fonts that revert Unicode Sitelen Pona into Latin alphabet-looking text using reverse-ligatures. Hah. That's probably not a thing. 


<h2 >Why is UCSUR not the Default for Beginner Texts?</h2>

<h3>Three Big Reasons:</h3>
<ol>
<li><strong>It's not accessible.</strong></li>
<li><strong>It's not convenient to my workflow.</strong></li>
<li><strong>Without configuring UCSUR on their devices, people should be able to select sitelen pona text and paste it to see how it's been formatted. </strong></li>

</ol>

### Not Accessible?

In response to the first point, someone once told me, "Well, those people can just rely on the sitelen Lasina instead." 

You're making a bold assumption that everyone who relies on a screen-reader or text-to-speech synthesizer is not interested in what Sitelen Pona has to offer. 

Once someone makes a stable and lightweight Toki Pona TTS engine capable of reading UCSUR, I might reconsider slightly. But see the other two reasons. 


