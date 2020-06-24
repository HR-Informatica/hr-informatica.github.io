---
layout: post
title: Les 10 - Empirical probability
lesson: 10
---

Python dictionaries and simulation of probabilistic experiments

### Downloads
[Powerpoint](https://drive.google.com/file/d/1v8r8G_BJOV6cjMI0EtuLIrYrFFCHL_JB/view?usp=sharing){:target="_blank"}  
[Excercises](https://drive.google.com/file/d/1YPkada3FjH8sln8ieOy6480xXGwgLjay/view?usp=sharing){:target="_blank"}  
[Solutions](https://drive.google.com/file/d/1zb1dtplMAxmFFYQmyLivjM_-JQN7s59C/view?usp=sharing){:target="_blank"}  

### Excercises
```python
import random



### GENERALIZING EVENT FROM ANY SAMPLE SPACE
# We will start by writing a function that returns random sample
# from any given sample space

# IDEA: count the number of elements in sample space,
# use random number for given range to select one sample
def event(sample_space):
    sample_index = random.randint(0, len(sample_space)-1)
    sample = list(sample_space)[sample_index]
    
    return sample
    
# To test the function we create 2 sample spaces, one for die and one for coin
dice_sample_space = {1, 2, 3, 4, 5, 6}
coin_sample_space = {"H", "T"}

# Time to test the function. Uncomment the line and run the program
#s1 = event(dice_sample_space)
#s2 = event(dice_sample_space)
#s3 = event(coin_sample_space)
#s4 = event(coin_sample_space)
#print(s1, s2, s3, s4)

# EXERCISE 1:
# Define your own sample space (e.g. 4 sided die) or use one from the above
# Run event() function in a loop 100 times and print the return values

# ... write your code here ...










### GENERALIZING EVENTs with functional programming
# Let's generalize even further.
# Using functional programming, we write a function that returns event generating function

def make_event(sample_space):
    def my_evt():
        sample_index = random.randint(0, len(sample_space)-1)
        sample = list(sample_space)[sample_index]
        return sample
    return my_evt 

# in case we destroyed test sample spaces, we put them again (not needed)    
dice_sample_space = {1, 2, 3, 4, 5, 6}
coin_sample_space = {"H", "T"}

# We create one 6 sided die function above
d6 = make_event(dice_sample_space)

# Time to test the function. Uncomment the line and run the program
#print("Testing function ... The result returned is: ", d6())

# or just type:     d6()    in console

# EXERCISE 2:
# call d6() function in a loop 100 times and print the results

# ... write your code here ...


# EXERCISE 3a:
# Let's use the same function to make a coin. Finish the code below
#c2 = make_event(...)

# ... write your code here ...

# EXERCISE 3b:
# call c2() function in a loop 100 times and print the results

# ... write your code here ...










### ADDING VARYING WEIGHTs
# The function used above assumes "fair" selection, with all elements conforming to UNIFORM DISTRIBUTION
# However, we want to simulate biased dice and coin. Therefore, we have to introduce variable weights - chances
# for picking each element

# Before doing that, let's create two helper functions ...

# We can use this function to convert any dictionary to function
def dict2fun(d):
    def f_(k):
        return d[k] if k in d else 0
    return f_

# Also, it is common to make mistakes when using different weights.
# Therefore, we create a function to test if all probabilities add up to 1.0
# NOTE: we assume that argument weights is always a function and skip type checking
def dist_test(sample_space, weights):
    sum = 0
    for el in sample_space:
        sum += weights(el)
    return sum


# Time to extend make_event function to incorporate weights
def make_weight_event(sample_space, weights):
    # before creating a function we will test distribution
    # AND convert weights to function if given as dictionary
    
    ERROR_TOLERANCE = 0.01      # this could be skipped, but we add this to allow small imprecision with fractions
    
    if type(weights) == dict:
        weights = dict2fun(weights)
    if abs(dist_test(sample_space, weights)-1) > ERROR_TOLERANCE:
        print ("Error! Given weights exceed tolerance levels for this sample space!")
        return None
        
    # Finally, here we create the function
    # IDEA: calculate cumulative probability; then pick random value [0-1)
    #   finally, return one element with cumulative probability corresponding to the picked value
    def my_w_evt():
        selection = random.random()
        sum = 0
        for el in sample_space:
            sum += weights(el)
            if sum > selection:
                return el
    return my_w_evt

# Alternatively, you can try using built-in random.choices() function

# Time to test our function ...
# First let's create 2 dictionaries containing weights and 2 lambda functions with weights
die_dict1 = {1: 1/6, 2: 1/6, 3: 1/6, 4: 1/6, 5: 1/6, 6: 1/6}
die_dict2 = {1: 1/10, 2: 1/10, 3: 1/10, 4: 1/10, 5: 1/10, 6: 1/2}
l1 = lambda x: 1/6
l2 = lambda x: 1/4 if x == 1 or x == 2 else 1/8

# Uncomment the line(s) and run the program
#d6 = make_weight_event(dice_sample_space, die_dict1)
#print(d6())
#d6 = make_weight_event(dice_sample_space, die_dict2)
#print(d6())
#d6 = make_weight_event(dice_sample_space, l1)
#print(d6())
#d6 = make_weight_event(dice_sample_space, l2)
#print(d6())


# EXERCISE 4:
# Use make_weight_event() to generate two coins.
# The first one should have equal chances to return "HEAD" or "TAIL",
# while the second one should be biased to return "HEAD" 80% time

#c2_fair = ... ADD YOUR CODE HERE ...
#c2_bias = ... ADD YOUR CODE HERE ...










### GENERIC EXPERIMENTS
# Next, we need a function that can simulate statistical experiment.
# It should be able to take any generalized sample function as argument,
# execute it N times, counting occurrences and returning them as dictionary with frequencies

def experiment(event, N = 10000):
    res_dict = {}
    for i in range(N):
        sample = event()
        if sample in res_dict:
            res_dict[sample] += 1
        else:
            res_dict[sample] = 1
            
    return res_dict

# Testing experiment() function is much easier with visualization
# Here, we add one more function that uses matplotlib to create bar chart    
def bar_graph(dict):
    import matplotlib.pyplot as plt
    
    height = [v for v in dict.values()]
    bars = [k for k in dict.keys()]
    x_pos = range(0,len(bars))
    
    plt.bar(x_pos, height, align='center')
    plt.xticks(x_pos, bars)
    plt.margins(0.05, 0)
    
    plt.show()


# Time to test the function. Uncomment the line(s) and run the program
EXPERIMENT_NO = 100000

#d6 = make_weight_event(dice_sample_space, lambda x: 1/4 if x == 1 or x == 2 else 1/8)
#freq = experiment(d6, EXPERIMENT_NO)
#print(freq)
#bar_graph(freq)


# EXERCISE 5:
# Use c2_bias you created in exercise 4 as argument for experiment() function
# Run experiment() for biased coin EXPERIMENT_NO times and print frequencies and display bar chart

# ... write your code here ...










### CALCULATING PROBABILITY
# Above, we used statistical experiments to determine probability and probability distribution
# In the same manner we can use analytical method to calculate probability
# Here, we will generalize such function

def a_prob(sample_space, outcome):
    # NOTE: since python doesn't support argument overloading
    # and we want this function to take as OUTCOME either another function or a set
    # we have to check if OUTCOME is function first. To that end we use callable() function
    # that returns TRUE if OUTCOME is function and we store it in boolean variable IS_FUNCTION
    IS_FUNCTION = callable(outcome)
        
    favorable = 0
    for el in sample_space:
        if IS_FUNCTION:
            #if outcome was function, we just call it here
            if outcome(el):
                favorable += 1
        else:
            # else, if outcome was set, we test if element exists in a set
            if el in outcome:
                favorable += 1
            
    probability = favorable / len(sample_space)
    
    return probability
    

# To test a_prob() function, lets create some outcomes both as lambda functions and as sets
# We may want to find out all probabilities for: f1 - even numbers, f2 - values greater than 4,
# f3 - when result is only 6, set1 - also when result is only 6,
# and set2 - all outcomes that can be either 2 or 5
f1 = lambda x: x%2==0
f2 = lambda x: x>4
f3 = lambda x: x==6
set1 = {6}
set2 = {2,5}

p1 = a_prob(dice_sample_space, f1)
p2 = a_prob(dice_sample_space, f2)
p3 = a_prob(dice_sample_space, f3)
p4 = a_prob(dice_sample_space, set1)
p5 = a_prob(dice_sample_space, set2)
# we can also write our desired outcome directly as argument:
p6 = a_prob(dice_sample_space, lambda x: x<3)
p7 = a_prob(dice_sample_space, {1,3,4})

# Uncomment the line below to print probabilities
#print("Probability that we get even number: ", p1)
#print("Probability that we get number greater than 4: ", p2)
#print("Probability that we get 6: ", p3)
#print("Probability that we get 6: ", p4)
#print("Probability that we get 2 or 5: ", p5)
#print("Probability that we get number lower than 3: ", p6)
#print("Probability that we get either 1 or 3 or 4: ", p7)



# EXERCISE 6:
# Using a_prob() function, answer the following questions:
# 1) What is the probability of getting either 1 or 6 from rolling one 6 sided die?
# 2) What is the probability of getting TAIL when flipping fair 2 sided coin?

# ... write your code here ...










### CALCULATING PROBABILITY WITH BIAS
# Calculating probability with uniform distribution is not difficult.
# However, introducing bias / weights complicates the problem.
# We can extend a_prob() function to handle arbitrary weights

def aw_prob(sample_space, weights, outcome):
    # first, we need two checks: is outcome function or set AND are weights dictionary or function
    IS_FUNCTION = callable(outcome)
    if type(weights) == dict:
        weights = dict2fun(weights)
       
    # as we are dealing with DISJOINT EVENTS ...
    # ... we can calculate probability simply by summing probabilities of all favorable outcomes
    probability = 0
    for el in sample_space:
        if IS_FUNCTION:
            if outcome(el):
                probability += weights(el)
        else:
            if el in outcome:
                probability += weights(el)
            
    return probability
    
# Let's run few tests ...

# This is a "fair" dice (uniform distribution, all events have 1/6 prob).
# We want to know all outcomes where the number is even (should be 0.5)
p10 = aw_prob(dice_sample_space, lambda x: 1/6, f1)
# Next we use "biased" die that has 50% chance of returning 6, and the equal opportunity for the remaining outcomes ( (1-0.5)/5 = 1/10 = 0.1)
# Therefore, for outcome '1' we must get 10% probability and for outcome '6' we must get 50% probability
p11 = aw_prob(dice_sample_space, die_dict2, {1})
p12 = aw_prob(dice_sample_space, die_dict2, {6})
# For the same "biased" die we want to know the probability of getting an even number
p13 = aw_prob(dice_sample_space, die_dict2, f1)
# And also to get either 2 or 6
p14 = aw_prob(dice_sample_space, die_dict2, {2,6})

# Uncomment the line to print probabilities
#print(p10, p11, p12, p13, p14)



# FINAL EXERCISE:
# It is your turn now. :)
# Assume that you are given a biased die with 1/3 probability to get either 1 or 2 and 1/12 prob. for the remaining numbers
w = lambda x: 1/3 if x == 1 or x == 2 else 1/12
# Answer the following questions:
# 1) What is the probability of getting an even number?
# 2) What is the probability of getting a number smaller than 4?
# 3) What is the probability of getting either 2 or 4?
# 4) Confirm all your answers through statistical experiment and plotting a bar chart

# ... write your code here ...



# BONUS:
# Write a decorator function for aw_prob so that result is given as percentage rounded to 2 decimal values

# ... write your code here ...
```