---
layout: post
title: Les 5 - Web trojans
lesson: 5
---

Alle soorten van schadelijke software.

## Downloads

[Powerpoint](https://drive.google.com/file/d/1Kawj4QD1NsvyyVvgQSDZOtVG9vLummFJ/view?usp=sharing){:target="_blank"}  
[Lab 5](https://drive.google.com/file/d/1IO8wUFM9-ZN_VchoZg3tDUOGVSp5FEcu/view?usp=sharing){:target="_blank"}

## Lesvideo
<iframe src="https://drive.google.com/file/d/1lBosk6MXAi5pTTmSPxXNtBlZHYfBnExm/preview" width="640" height="360" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>

## Aantekeningen
Malicious Software (Malware):
* Viruses
* Trojans
* Bots
* ...
* Thing that bad guys use to compromise your system
    * Steal your resources
    * Steal your personal stuff
    * ...

Not all types of Malware are destructive.
But they may cause very **annoying** behaviors.
* Generate bunch of ads
* Cause your computer run slowly

These types of programs are not classified as Malware, by some experts.
They are known as **Potentially Unwanted Programs** (PUP) or **Potentially Unwanted Applications** (PUA).
Sometimes, Bundled in legitimate software as a package, but
* Negatively affect a computer
* Introduce other security risks
* Buy something that you do not need

**Adware**  
Adware is software that displays unwanted **advertising** on a computer or mobile device.
* Usually in the form of pop-up ads
* Redirect your browser to a certain website

While it usually does not cause any direct harm to the user's device, but it can be
very annoying behaviour
* Can sometimes contain **spyware**.

**Browser Hijacker**  
Hijacking a browser means that the malicious software has **redirected** your computer's browser to a **different website**, generally used to display advertising.

It can be used to:
* **Generate visits** to a certain website.
* Lead you to a **malicious website** that will **download malware** onto your computer.

**Spyware**  
It is designed to **spy**.
It hides on your computer and **monitors** everything you do.

It can:
* Track the **web activity**
* Access **email**
* **Steal** your username and password

**Ransomeware**  
With ransomware, someone can **lock up** your computer.
Holding it hostage and forcing you to **pay** a lot of money just to get your files back.

Regularly **backup** the important things on your computer

**Virus**  
Almost all viruses are attached to an **executable file** which means the virus may exist on a system, but will not spread **until a user run the infected program**.

Viruses often originate on the internet and spread when:
* Downloading a file infected with a virus
* Peer-to-peer file sharing
* Email attachment
* ...

![virus](\assets\images\ana_software_quality\lesson5\virus.jpg)

**Macro Virus**  
Macro viruses are written specifically to alter **macros** which are common commands that word processing programs use.

Once opened macros can cause changes in the text documents such as
* Removing or inserting words
* Changing the font
* ...

Some macros can even access email accounts and send out copies of itself to a users contacts.

**Worm**  
A computer worm’s main objective is to **spread** as many **copies** of itself in any way possible from computer to computer.
A worm can replicate itself without any human interaction.
It does not need to attach itself to a program in order to cause damage.

Worms can
* Modify and delete files
* Inject additional malware onto the computer
* ...

**Scareware/Scamware/Rogueware/Fake Alert**  
A malware that says there is a **problem** on your machine and offers to solve it, if you pay them.

Often, it will **pretend to be an antivirus software**, popping up on your screen to tell you that your machine:
* Is full of malware
* Operating system has errors
* Is running slowly
* Could crash

### Computer Trojan
Trojan horse is something that appears to be a **gift**, but that actually is a **trap**.
In the context of computer security, the term has materialized into "**a program that appears to be cool, but perform some scary damages, e.g. erases all files.**"

The "Trojan" part comes from the **Greek legend** of the **Trojan horse**.

Depended on the purpose of the trojan, they can be classified into different types:
* Banking Trojan
* Backdoor Trojan
* Downloader Trojan
* Information Stealer
* Remote Access Trojan
* DDoS Trojan

**The problem**  
Many web sites, including banks, shops, discussion sites, and whatnot are **vulnerable** to some kind of **Web Trojan** trickery.
To see how to design **a web solution that is not vulnerable**, we need to understand the problem.

When someone browses our site, we typically generate web pages that contain **URLs** and **forms** inviting the user to **do** something.
Web Trojans work because it is possible for attackers to give victims these **offers** on our behalf.

To avoid the threat, we need to make sure **the action** a user takes really is based on **an offer we once gave him**, rather than on an offer given him by someone else.

Many developers think that the **Referer** header is a good thing to check to make sure the visitor came from our site.
In general, the Referer header should not be used for security, as it comes from the **client-side**.

But in the Web Trojan case it could have been useful, **if** it was not for the fact that many **filter it out** for privacy reasons.
Referer headers are thus often **missing** in totally legitimate requests, so we need to find a method that **does not depend on it**.

An approach that would work would be to require **reauthentication** of the user for **every** action that changes something.
This solution includes adding a **password** field to every form presented to the client — an approach taken by many online banks.

Unfortunately, giving passwords all the time is **cumbersome**, so we will try a different approach.

**Solution: Ticket System**  
To protect against Web Trojans, developers should implement a "**ticket system**".
Central to this system are nonpredictable, random numbers, called **tickets**.

A web page may typically contain **one or more offers** to do an action that has **side effects**.
For each such offer, generate a **unique**, **random string**, and **connect** it with the offer.

If the offer is a form:
![form offer](\assets\images\ana_software_quality\lesson5\offer-form.jpg)

If the offer is a link:
![link offer](\assets\images\ana_software_quality\lesson5\offer-link.jpg)

For each ticket generated, add a string naming the action it refers to, and store the combined string in a **ticket pool** in the session of the user who receives the offer.
If the action in question is, for instance, to confirm deletion of a note numbered 1234, and the ticket is represented as `LZE9QfzQK5mgysK`, the string to store could be `delnote-1234-LZE9QfzQK5mgysK`.

You now have the same ticket on both the client-side and the server side.

Whenever a request to perform an action arrives from the user, **extract the ticket** from the request.
Then add **the name of the action** that is about to be performed to the beginning of the string, and look for a match in the session ticket pool.

If a **matching** ticket is found, you may assume that the offer was given by your web site.
* In that case, **perform** the action, and **remove** the ticket from the pool.

The ticket system works because attackers **will not be able to guess** what ticket values you may have given to the user, and they will not be able to insert tickets into the victim’s ticket pool on the server side.
1. If you include the tickets in **GET requests**, so that they become part of URLs, you risk **ticket leakage** through Referer headers if the user follows a link from your site to other web servers.
2. The system will break if your application is vulnerable to **Cross-site Scripting**.
If an attacker is able to insert JavaScript in a page generated by your server, he will be able to extract tickets from the page.

**Hints in ticket system implementation**  
1. Web pages with tickets in them **cannot be cacheable**, as each ticket can only be used once.
Tell browsers and proxies not to cache pages with tickets in them to make sure every page comes with **fresh, valid** tickets.
2. Put an **upper limit** on the number of tickets in a pool.
There will be left-over tickets, as users do not necessarily follow up on all the offers we give them.
When the limit is reached, remove the oldest ticket and add the new one.
The limit will stop people from deliberately filling up memory with unused tickets.
3. Session **timeouts** make the server-side ticket pools disappear.
The result is that we may get **legitimate incoming requests** with **no matching ticket** on the server, for instance from a user who has spent an hour filling in lots of details in a web form.
Users won’t be happy if we **throw away** their input.
Instead we could **redisplay** the web page with a **new ticket** and all the incoming text filled in, tagged with an explanatory message that asks him to confirm that he really intends to perform the action.
4. Tickets are needed only for requests that actually **change** something on the server.
A user who wants to edit a note, for example, will first request the note editing form, typically by **clicking a link**.
This request **does not change** anything, so it need not be protected by a ticket.
When he has finished editing, he **POSTs** his changes.
The second request **updates** the server-side database, so it should be **protected by a ticket**.
