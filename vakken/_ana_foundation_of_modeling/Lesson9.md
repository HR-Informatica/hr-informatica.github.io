---
layout: post
title: Les 9 - Introduction to probability
lesson: 9
---

Probability and events.

### Downloads
[Powerpoint](https://drive.google.com/file/d/1RRhI9jkET7297aziWh97wIpfmzwnZHLT/view?usp=sharing){:target="_blank"}  

### Exercises
```python
# This file contains step-by-step exercises to practice combinatorics and probability
# The goal is to generate possible permutations and/or combinations, and employ them in probability.
# In order to generate possible cases, we are going to employ module itertools.
# [itertools] find more here https://docs.python.org/3/library/itertools.html

from itertools import *
from random import *

# Cartesian product: How to find cartesian product of several iterables?
# We already know how to implement the code for two sets (look at the slides).
# Here we present a more general solution
S1 = {'A','B','C'}
S2 = {1 , 2 , 3 }
AnlCourses = ['ANL0'+str(i) for i in range(1,9)]
DevCourses = ['DEV0'+str(i) for i in range(1,9)]

p1 = product(S1,repeat=2)        # the second argument of the function defines the number of repetitions of the iterables. Default is 1.
p2 = product(S1,repeat=3)      # repeat=3 means S1 x S1 x S1 ;
p3 = product(S1 , S2)   # S1 x S2 ; repat here is 1 (defaule)
p4 = product(S1 , S2 , repeat=3)  # calculates S1 x S2 x S1 x S2 x S1 x S2

# Todo: print the results here. What are the elements of p1, p2, p3, p4 ?
# example: print('p1 is: ', ???)  . What do you see if you print p1 directly? What is the type of p1? How would you see the elements?

# Todo: What is the cartesian product of analysis and development courses?
# call the function product here and print the result.



# r-Permutations: How to generate r-permutations from n objects?
per1 = permutations(S1,2)
per2 = permutations(S1)    # what is the result?
per3 = permutations(AnlCourses,4)

# Todo: print the results of permutations above
# Implement here ...



# Todo: In how many ways can a scrum master, a software designer and a programmer be chosen from among 6 candidates? Answer analytically (using formulas).

roles = ['PO','Designer','Programmer']
# Todo: define a list of names (6 names). Generate all possible role assignments. Compare the length of your result with your analytical answer.
# implement here


# Todo: generate all possible words (only lower case letters) with the length of of 5.
# Warning: do not print all the members. Print only 10 random members.
import string

letters = string.ascii_lowercase  # use letters to generate the words

# example: words with length 3
# Todo: check how join works. Can you employ map(...) to implement this line?
words_len_3 = [''.join(s) for s in permutations(letters,3)]
#print(list(words_len_3))


# implement your solution here ...

# Todo: A zip code contains 5 digits. How many different zip codes can be made with the digits 0–9 if no digit is used more than once and the first digit is not 0?
# Answer this question analytically: using combinatorics rules and formulas. Then, generate possible zip codes and print random 10 zip codes.


# Todo: We have a box containing some books in different topics (see below). Generate possible selections of 3 books.
books = {'History', 'Math', 'Programming Python' , 'Social Science' , 'Biology' , 'Programming Java' , 'Physics' , 'Databases'}
# Hint: First justify if it is permutation or combination?


# Todo: In a class with 30 students we would like to build groups of 5 for projects. How many possible ways project teams can be built?
# Implement your code here. Generate cases and count the elements. Check with the formula to see if the result is correct.



# Todo: Consider the list of the books defined above. We select 3 books randomly. What is the probability to have two IT-related book?
# Write your code here. Justify your answer both theoretically and empirically.
```