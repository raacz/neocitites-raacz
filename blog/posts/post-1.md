---
title: I bought an IdeaPad Flex 5

date: 2023-12-03
updated: true
---




<div class="toc">
    <h2>Index</h2>
<ul>
    <li><a href="a">Model Info</a></li>
    <li><a href="b">Why This One?</a></li>
    <li><a href="c">First Impressions</a></li>
    <ul>
        <li><a href="d">The Good</a></li>
        <li><a href="e">The Not-Great</a></li>
    </ul>
    <li><a href="f">Part Two: Linux Hell</a></li>
    <ul>
        <li><a href="g">Volume Levels Random</a></li>
        <li><a href="h">Battery Life</a></li>
        <li><a href="i">Discord</a></li>
        <li><a href="j">Bluetooth</a></li>
    </ul>
</ul>


</div>

As the title indicates, I bought an IdeaPad Flex 5. It cost me $1000 CAD. It's still serving me well, but it has some rocky days, and it was a truly rocky start.



<hr class="intro-end">



<h2 id="a"> Model Info
</h2>
IdeaPad Flex 5 14ABR8 in Arctic Grey

- CPU: AMD R7 7730U 20GHz
- RAM: 16GB
- Storage: 1TB SSD
- Display: 14 0" WUXGA TS
- Battery: 3 CELL
- OS: Windows 11 Home


<h2 id="b"> Why This One?
</h2>
I selected this model out of fear. My brother recommended it to me. He actually has an almost identical model, except his is Intel and not AMD. He let me cradle his device and try out the fancy stylus and touch the touchscreen and key on the keyboard. It was a very quick decision after that. Buying a laptop in 2023 as a person with not a lot of technical knowledge is actually a nightmare. YouTube is full of shitty and profit motivated reviewers. Google is making it harder to even find the most relevant Reddit posts. The process was anxiety-inducing. I hated it, so choosing this device was the easiest way out. I told my brother that I'd blame him if it sucked. It makes the process easier if you have someone else to blame than just yourself.

In selecting a device, my major consideration was the quality of video calling. I often speak sign language to my friends online, and my previous device was making that task really difficult to do. I also do a fair amount of presentations for the online communities I'm in, at my workplace, and at school. I've had so many embarrassing experiences on account of my poor old chromebook being unable to handle my amazing charisma and sophisticated presentation slides. So that needed to be corrected.

Battery life is also a priority of mine.

<hr>

<h2 id="c"> First Impressions
</h2>
<h3 id="d"> The Good
</h3>
The performance outranks my old device by leaps and bounds. Although the camera is about the same quality as on my old device, my video transmits so much more smoothly and detailed when I'm doing video calls! I remember feeling similarly when I first got my old device. I am more concerned about this device's longevity, and whether I will still feel the same 6 years from now.

My previous device was a 2-in-1 as well, and I was impressed by the 2-in-1 functionalities that this laptop offered. The transition between tablet mode and laptop mode is nearly seamless. If you put it into tablet mode and then lock the orientation mode on vertical, and then turn it back to laptop mode, the screen appears sideways, which is kinda fun!


<h2 id="e"> The Not Great
</h2>
The microphone is very subpar, made even more subpar by the so-called 'powerful-background-noise-cancelling' that was initially on. Initially the thing had this setting of 'Enhance Audio' on my microphone, and it would cut out every second word that I said when I talked. Turned it off and it was fine. I have a pretty small voice so I've had issues with noise-cancelling features before (Discord mainly). But this is probably the worse that I've ever had it. Even with that setting off, it's just not a great microphone. I'm glad that I still have my snowball around for recording podcasts.

Upon first booting it up, it made me sign into a Microsoft 365 account. Using the device on that account was full of bugs. I downloaded Firefox, but then it didn't let me sign into my Outlook account on FireFox for whatever reason? I am a person that uses multiple accounts for everything, and apparently Microsoft doesn't expect you to do that or whatever so it started freaking out. When I finally logged on with a native user account and ditched the 365 account, a lot of the software issues were immediatly resolved. I'm going to be meeting up with a friend soon who will help me transition the entire thing to Linux. We'll so how well the device does with that.

Also, Windows 11 is just janky. There's so many bells and whistles that I don't need and that make me feel like I'm being watched by the government.

Biggest gripe is with the stylus that comes with this device. It is squeaky as fuck and it kinda sounds like styrofoam squeaking, which is the absolute worse kind of squeaking. I have gotten semi-used to it and am learning to write in ways that mitigate the squeaking. Also, the built-in eraser on the stylus is placed so it's very easy to trigger it by accident. It's located right at the center of the pen, where you would put your hand. I wish it was on the top of the pen instead. Configuring the pen was also a nightmare. The stylus doesn't connect via Bluetooth, but all of the Lenovo instructions for styluses indicate that the stylus would need to be Bluetooth connected, so that's a communication failure there.

The camera has a privacy shutter and that's convenient and all. However, there's internal hardware that detects whether the shutter is deployed or not and whenever I try to video call in stark darkness, the camera will occasionally think that the shutter's deployed and completely cut off my video. Unsure if this will be able to be fixed with a conversion to Linux. We shall see.
Going Forward

In the very close future, I'll be shifting this device over to Linux. I'm a little uneasy going in on how that will impact everything, but I'm optimistic that this little guy will take the transition well.

My primary concern is with the longevity of this machine. I want it to last a long time. The laptop-buying experience is horrible. I never want to buy a laptop again. Likely, I will not be able to avoid that. But how long can I avoid it? This document will hopefully serve as a point for me to drop in periodically and reflect on this device and how I use it.

I'll likely update next when the Linux installation is finished.

<hr>


<h2 id="f"> Part Two: Linux Hell
</h2>
So I am being partially dramatic, but also not. My optimism was for naught and the past few days have been quite up and down. Short disclaimer before I start describing what actually happened: I am not the resident Linux expert, my friend is, and they're the one trying to beat my Ideapad into submission, not myself. So I may not be describing the issue completely accurately.

The first issue lies in the trackpad. Someone somewhere changed something in AMD that made a bunch of trackpads in AMD laptops be unresponsive in certain versions of Linux. Linux 5.15 is when it starts breaking, and it doesn't get resolved until 6.5. Same thing goes for any wifi connection. Broken in all versions until 6.3. We were off to a strong start.

Naturally, in selecting our distro, the fact that we had to accomodate a 6.5 kernel greatly limited our options. We decided on Debian Testing (which had a kernel of 6.4) and installed 6.5 manually. We figured that a switch from 6.4 to 6.5 wouldn't be as drastic as other options that were available.

I spent a couple of days exploring my new device and found a lot that I disliked. Battery life had been cut in half and cut in half again. Listening to audio on my bluetooth earbuds was choppy and staticky and intolerable. When not using my earbuds, the system's maximum volume would get lowered to extremely quiet levels randomly. I felt insane. Was I just losing my hearing? Was my battery life like this on Windows? There were other oddities. When I wanted to send screenshots to my fried who was helping me debug, I couldn't screenshot using the 'screenshot' button on my laptop. I had no idea how to install an APT, or whatever that means. When I eventually learned how to install other apps via APT, Discord still refused to install. On top of that, my device would randomly reset on its own without me having done anything. I had truly entered Linux hell.

All of these problems were eventually resolved. I'll talk through the solutions for each.

<h3 id="g"> 1. System-wide volume levels suddenly decrease dramatically at random.</h3>

This was a result of GNOME and KDE environments interacting weirdly. When we first installed Debian, my friend turned to me and was like, okay, what do you want your thing to look like? I had run KDE Plasma on another device of mine and was flip-floppy on whether I wanted it again. So we downloaded every possible interface and had me try each of them out in turn. We eventually decided on Plasma, but never got rid of GNOME or anything. And this is the cause for the sound issue. The system had defaulted to the GNOME login screen, which has its own volume control, which was constantly overriding the volume set by the KDE volume control. No matter what I did on KDE, it had no effect. In fact, KDE was equally confused and started displaying duplicate entries for the output/input controls when I tried to change them in system settings.

Through lots of trial and error, we finally overrid this manually and it got fixed. And then the same issue started happening again. The cause of the issue was similar, but different. Somehow, when I was trying to fix the initial interference, I had set my audio profile to 'Pro.' It worked for a long time, for multiple days, until it decided to act up. 'Pro' can have its system maximums set by either Pipewire or ALSA, and one of them had decided that it wanted me to be unable to hear my device again. When I switched my profile back to 'Duplex,' I was finally able to hear again.

Other smaller sound problems came up that were resolved quickly, but they merit a mention. Initially, the system outputed absolutely no sound from the speakers because it had defaulted to direct all sound output to a non-existent second screen. Additionally, my microphone was completely incomprehensible at first, because the internal microphone defaulted to 100% amplification. It still does this! And I have to adjust it manually every damn time!

<h3 id="h"> 2. Battery life down to non-workable levels.</h3>

As a student, I need enough battery life for me to be able to take notes for two back-to-back 90-minute lectures. But I was now unsure if I could even get through one of those lectures. Why exactly did I lose so much battery life? My friend thinks that if my device had an Intel chip, it wouldn't have been so bad. But my chip was AMD. This distinction came into play in our solution as well.

Having Linux take up more battery than Windows is a pretty common problem! (Though I don't think most have it as bad as I had it.) Some person made [TLP](https://linrunner.de/tlp/index.html) in order to gain back some of that battery life. My friend installed it and quickly found out that TLP is mostly made for Intel processors. They went in and set the graphic processor and CPU maximum capacities manually. I gained back a lot of battery life, but I am told that now, if I want to play games or do something that takes a lot of GPU power, I am going to need to plug my laptop in as I do that.

<h3 id="i"> 3. Discord doesn't like Linux users.
</h3>
I've learned so many different ways to install new programs. On Windows, they spoon-feed you everything you need to do. Linux just assumes you know; I often don't know. Whenever something asks me to append something to the end of a file, I still get chills that run through my body. But I can do it. I no longer get scared by APT installations. But Discord...

Discord's APT installation did not work. On their website, they offer both .deb and .tar.gz files, with absolutely no guidance on what to do with them. The traditional route didn't work, so I asked my friend to help me. They ended up taking the .tar.gz version and guessed at how it was supposed to work (again, no read-me file or anything, it was just guesswork) and voila! It came together!

And the Discord pushed an update. I could not open Discord until the new version had been installed. This.. was not sustainable. I had no idea how to do the same magic stuff that my friend did. I had almost resigned myself to using the web version for all perpetuity until I spoke to another Linux geek friend of mine who suggested just using a flatpak. It worked. Deep exhale.

But there were issues with it. I couldn't screenshare, and I couldn't screenshare audio. Apparently, this is just a thing that Linux users have to deal with. The workaround that most people use would be switching to X instead of Wayland, but we found this [nifty Wayland-X-Bridger doohickey](http://blog.davidedmundson.co.uk/blog/xwaylandvideobridge/) that seemed to do the job just as well. I still won't be able to share audio from my screenshare (but apparently there is another Discord client called discord-screenaudio that I could use if I really really needed to do so.)

<h3 id="j"> 4. Bluetooth.
</h3>
We don't know why the Bluetooth audio is so choppy. We can guess it is because the IdeaPad itself is relatively new, and so the right fix for Bluetooth hasn't been pushed into the kernel yet. We have tried everything and the choppiness remains consistent. Occasional respite can be found by doing sudo systemctl restart bluetooth after shifting the latency slightly, but sometimes this only amounts to it working for 10 seconds before the choppiness resumes.

For now, our solution is to have a dongle to interface between whatever Bluetooth device I want to use and the IdeaPad. We hope another fix can come for this soon. But in the meantime we have tried all of the following, to no avail:

- Experimenting with every Bluetooth audio profile and codec available.
- Testing different firmware versions, even sideloading firmware from the Windows driver.
- Turning the device off and on again.
- Consliting a Bluetooth stack expert, who came up with nothing.
- Converting to Pastafarianism.
- Scolding the device very firmly with very strong unprofessional language.
- Etc, etc, etc.

It remains a total mystery. This is by far the most unfixable problem we've run into, besides the fact that the fingerprint sensor is inoperable (but I have never used it anyway so that doesn't bug me).
Going Forward

I've certainly learned a lot from this process. A couple upsides have come from using Linux- I've been able to completely get rid of seeing all of Microsoft's advertisements for their shitty programs and subscription services. I also had some random Xbox Live popup that I am glad to be rid of. LibreOffice Suite looks pretty great, and I appreciate the window management on Plasma more than on Windows 11.

There's been a lot of DIY-ing. I had to set my screenshot key to replicate what it does on Windows because I got too used to that.When I manually adjust for brightness, it doesn't give me the option to completely shut the screen off, so I had to manually set a separate hotkey to do that. I also have yet to grab a screen-reader, which I will need for my job. My techy friend is going to be going away for a while, so any future issues that crop up, I'll have to deal with myself. The next entry in this series will likely deal with that.
