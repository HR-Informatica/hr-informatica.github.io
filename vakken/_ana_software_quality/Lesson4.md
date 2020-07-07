---
layout: post
title: Les 4 - Output handling
lesson: 4
---

Het goed afhandelen van de output.

## Downloads

[Powerpoint](https://drive.google.com/file/d/1MCl-3vhPFcLI7O7Xx_ilIbWo8cGpf-t_/view?usp=sharing){:target="_blank"}  
[Lab 4](https://drive.google.com/file/d/1-nTXBFg_BEjfDRrXiZWlfUfFCsV2g_Rc/view?usp=sharing){:target="_blank"}

## Lesvideo (Part 1)
<iframe src="https://drive.google.com/file/d/17V3ep2NOAect4Z7aS0dS7mFhaeK90X9m/preview" width="640" height="360" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>

## Lesvideo (Part 2)
<iframe src="https://drive.google.com/file/d/1n-_zsMlCmNuFbqJPKOof6KPSNEM9U74w/preview" width="640" height="360" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>

## Aantekeningen
Handling the output from a web application is exactly the same as passing data to subsystems: The final subsystem we pass data to is the **visitor’s browser**, and the **HTML parser** in the browser is just another system.

When we send data to it, we need to pay attention to **metacharacters**.

Many programmers who are good at escaping metacharacters that get passed to internal systems, nevertheless **forget** to think about the **final destination** of the data as a system.
And given a **lack** of proper **HTML escaping**, an attacker has lots of cool attacks to choose from.

### Cross-site Scripting
XSS (Cross-site Scripting) is about tricking a web server into presenting **malicious HTML**, typically script code, to a user.
1. The intention is often to **steal session information**, and thus be able to contact the site on behalf of the victim.
2. Scripts may also be used to **change** the contents of web pages in order to displays **false information** to the visitor, and it may be used to redirect forms so that secret data are posted to the attacker’s computer.

XSS generally attacks **the user** of the web application, **not the application itself**.
The attacks are possible when the web application **lacks proper output filtering**.

**Examples**  
Suppose we have a simple guest book, which lets visitors enter whatever they like, and just appends the new text to whatever was there before.

What happen with this input? `<!--`

No critical issue, but the web application will pass this to visitors reading the guest
book:
![html comment marker](\assets\images\ana_software_quality\lesson4\html-comment-marker.jpg)

We need some kind of **control** over what a web application passes to the client.

### Session Hijacking
As cookies are available to a script, Cross-site Scripting may be used to **hijack cookie-based sessions** (discussed in lesson 1).

If a bad guy gets access to someone else’s session cookie, he may often appear as that someone to the server by installing the cookie in his own browser.
A victim logging in to a web site will get a unique session ID cookie.
The attacker wants that cookie **to impersonate the victim**.

1. The attacker first joins a discussion, entering a note that contains some **cookie-stealing JavaScript**.
The web server stores the note in its **internal database**.
Later, another user, **the victim**, logs in to the discussion site.
Upon logging in, he receives his personal **session ID** from the web server.

2. When the user asks to read the attacker’s note, the web server builds a web page
containing the note text, including **the malicious script**.
This page is then **passed** to the victim.

3. As part of displaying the web page, the victim’s browser will also **run** the script.
The script picks up the **cookie** that is associated with the web page, i.e. the cookie containing the **session ID**, and immediately **passes** the cookie to the attacker’s computer.

4. After receiving the **cookie**, the attacker **installs** it in his own browser, and visits the discussion web server.

The web server receives the **stolen session ID** from **the attacker**, and thinks it is talking to the victim.
The attacker now fully **impersonates** the victim on the discussion site.

The malicious script makes the browser of the victim pass **the cookie** to the computer owned by the attacker.
Passing the cookie is most easily done using a script that **redirects** the browser to a web server running on the attacker’s computer, taking the cookie with it on the journey.
![malicious script](\assets\images\ana_software_quality\lesson4\malicious-script.jpg)

The victim will quickly realize it, because both **URL** and the **contents** of the web page suddenly change!
To hide the theft, the attacker’s web server may **generate** a response containing a new redirect that immediately sends the browser **back to the original site**.
![stealth script](\assets\images\ana_software_quality\lesson4\stealth-malicious-script.jpg)

The steal.php page would respond with a new web page containing nothing more than this little redirection code:
```
<script>
    document.location.replace("https://www.somesite.example/")
</script>
```

The user may see a **short flicker**, but he will otherwise not be able to tell that his browser paid a quick visit to the attacker’s web server.

How about the **browser’s history**?
Not even the browser’s history will be able to tell the tale, as `document.location.replace` **overwrites** the current history entry with the new URL.

### Text Modification
Cross-site Scripting works when a web application may be tricked into passing **attacker-designed HTML** constructs to the users’ browsers.
Hence, XSS is just another **metacharacter problem**.

The most obvious Cross-site Scripting occurs when someone inserts a **new tag**, typically a script tag: `<script> ... </script>`.
This insertion works when the HTML parser is not already "**inside**" another tag.

In some cases, such as when data are inserted as **part of a tag attribute**, the parser is not ready to accept a new tag directly.
Imagine the following part of a web page, in which some user provided input will be inserted where the dots are:
![html inside tag](\assets\images\ana_software_quality\lesson4\html-inside-tag.jpg)

In this case, to be able to insert a new tag, the attacker will first have to **terminate** the input tag to have the HTML parser **switch context**.

The attacker will have to **analyze** the HTML to determine in what kind of context his insertion will be made, and insert necessary metacharacters to switch to a "**script friendly**" context.

**Solution**  
How do we make our applications stand against Cross-site Scripting attacks?

Since Cross-site Scripting is a **metacharacter problem**, we will have to do something to the metacharacters to make them lose their meaning.
We have to escape them in some way, and when dealing with HTML, the escaping is called **HTML encoding**.

When do we **escape** those characters to prevent Cross-site Scripting?
Many people choose to handle the XSS problem **at input time**.
* Either because they see it as **an input problem**,
* Or because they like to get rid of problems **as soon as possible**,
* Or because they think it is **hard to remember** doing any special treatment every time they generate some output—which typically happens quite frequently in a web application.

Cross-site Scripting is clearly a **data passing problem**, so it should be dealt with at the time data are passed.
For HTML that time is whenever **our application generates some output**.

There are at least three good reasons for **delaying** the HTML filtering to output time:
1. It is **not just user generated input** that must be HTML encoded.
When reading data from a file, from a database or any other external source, HTML encoding should be done **before passing the content to the client**.
It is easier to remember doing the filtering if the rule is "filter output when output is to be done".
2. When filtering at input time, any incoming data that is stored in a database will be HTML encoded.
Any **non-HTML part** of the application that uses the same database (e.g. an invoice printing unit, to be overly creative) will have to remove the HTML encoding.
3. HTML encoding expands **data strings**.
The expansion may give **surprising results** when incoming data are stored in restricted length database fields, which is common practice.

There are generally three options depending on the data:
1. If **data is not supposed to contain markup** at all, we simply HTML encode them before passing them to the client.
2. If **the user should be allowed** to enter some markup but not the dangerous constructs, it gets quite hard.
We will need to look at all tags and attributes and let some through, while HTML encoding others.
3. If the application should have **full trust in the users** and allow them to enter whatever markup they like, We simply just send the data as they appear. No special handling needed, but keep the consequences in mind.

HTML encoding is the **mapping** of **certain HTML metacharacters** to their character entity equivalents:
1. Map every occurrence of `&` (ampersand) to `&amp;`
2. Then replace every `"` (double quote) with `&quot;`
3. Then every `<` (less than) with `&lt;`
4. And finally replace every `>` (greater than) with `&gt;`

If the application uses single quotes to encapsulate tag attributes, you may need to replace the single quote character with `&#39;` too.

The implication of doing HTML encoding is that the browser will display data
exactly as they were written.
