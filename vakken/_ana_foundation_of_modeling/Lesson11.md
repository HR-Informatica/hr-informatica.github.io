---
layout: post
title: Les 11 - Simulation (part 1)
lesson: 11
---

Introduction to simulation.

### Downloads
[Powerpoint](https://drive.google.com/file/d/1o8PAdhhl5p0NdCKNQ-yN3ftaa-lfh2a4/view?usp=sharing){:target="_blank"}

### Examples
#### Interest.py
```python
import matplotlib.pyplot as plt

### GLOBAL VARIABLES AND CONSTANTS
# 
#

DELAY = 20

INITIAL_STATE = 100
INTEREST = 3
YEARS = 5


### HELPER FUNCTIONS
#
#

def show_line(length=30):
    print('+'+'-'*length+'+')
    
    
def do_nothing():
    pass
    
    
### SIMULATION - BACKEND
#
#
    
def next_period(previous, interest):
    """ calculates the stock value for the next time period """
    
    result = round(previous + previous * interest / 100, 2)
    return result
  
    
def simulate(initial_state, interest, years):
    """ run simulation according to the given parameters
    initial_state: initial stock value
    interest: flow (increase)
    years: duration of the simulation """
    
    periods = [0]
    savings = [initial_state]
    for i in range(years):
        new_state = next_period(savings[i],interest)
        periods.append(i+1)
        savings.append(new_state)
    
    return periods, savings


def print_sim(periods, savings):
    """ print simulation results to the standard output (console) """
    
    show_line()
    if len(periods) == len(savings):
        print("PERIOD \t STATE")
        for i in periods:
            print("%3d: \t %3.2f" % (i, savings[i]))

    
def plot_sim(periods, savings):
    """ plot simulation results using matplotlib
    note: display will be auto-closed after DELAY seconds to avoid concurency issues """
    
    if len(periods) == len(savings):
        plt.bar(periods, savings, align='center')
        
        # note: to prevent blocking call from plt.show(), we use plt.draw() and then close it after DELAY
        plt.draw()
        plt.waitforbuttonpress(DELAY)
        plt.close()



### MENU - FRONTEND
#
#
 
def show_variables():
    show_line()
    print("SIMULATION PARAMETERS")
    print()
    print("savings  = %d%s" % (INITIAL_STATE,u"\N{euro sign}"))
    print("interest = %.2f%%" % (INTEREST))
    print("years    = %d" % (YEARS))
    print()
    print("press any key")
    input()

    
def change_savings():
    global INITIAL_STATE
    
    show_line()
    print("Input new savings value:")
    INITIAL_STATE = float(input())


def change_interest():
    global INTEREST
    
    show_line()
    print("Input new interest perentage:")
    INTEREST = float(input())


def change_duration():
    global YEARS
    
    show_line()
    print("Input the number of years:")
    YEARS = int(input())
    
    
def show_menu_options():
    show_line()
    print("\t\tMAIN MENU")
    print()
    print("(1) show sim. parameters")
    print("(2) change savings")
    print("(3) change interest")
    print("(4) change simulation duration")
    print()
    print("(R) RUN SIMULATION")
    print()
    print("(Q) quit program")

    
def input_command():
    show_line()
    print()
    print("Please input your choice:")
    choice = input()
    return choice

    
def run_program():
    running = True
    while running:        
        show_menu_options()
        choice = input_command()
        
        valid = {'1', '2', '3', '4', 'R', 'Q'}
        while choice.upper() not in valid:
            show_menu_options()
            choice = input_command()
            
        if choice == '1':
            show_variables()
        elif choice == '2':
            change_savings()
            show_variables()
        elif choice == '3':
            change_interest()
            show_variables()
        elif choice == '4':
            change_duration()
            show_variables()
        elif choice.upper() == 'R':
            periods, states = simulate(INITIAL_STATE, INTEREST, YEARS)
            print_sim(periods, states)
            plot_sim(periods, states)
            
        elif choice.upper() == 'Q':
            running = False
        else:
            print("Debug: This line should not trigger!")
            
    show_line()
    print("Thank you for using InterestSim!")

        
    
### EXTRA
#   Examples: using simulation to answer "what-if" questions
#

def goal_double(initial_state, interest):
    """ answers how many time periods are needed to double the investment
    with the given interest """
    
    state = initial_state
    target = state * 2
    year = 0
    while state < target:
        state = next_period(state, interest)
        year += 1
        
    # either return value or print all (time) steps of the simulation
    #return year
    
    p,s = simulate(initial_state, interest, year)
    print_sim(p,s)
    plot_sim(p,s)
    
    
def goal_target(initial_state, interest, target):
    """ answers how many time periods are needed to reach a certain goal
    (target) with the given interest """
    
    state = initial_state
    year = 0
    while state < target:
        state = next_period(state, interest)
        year += 1
    
    # either return value or print all (time) steps of the simulation    
    #return year
    
    p,s = simulate(initial_state, interest, year)
    print_sim(p,s)
    plot_sim(p,s)
    
    
    
### MAIN
#
#

if __name__ == "__main__":
    run_program()
```

#### Demograph.py
```python
import matplotlib.pyplot as plt

### GLOBAL VARIABLES AND CONSTANTS
#
#

DELAY = 20

INITIAL_STATE = 17180000
NATALITY = 1.09
MORTALITY = 3.8
DURATION = 20

#IMMIGRATION_RATE = 0.19  (extra: add implement imigartion rate to increase the stock)


### HELPER FUNCTIONS
#
#

def show_line(length=60):
    print('+'+'-'*length+'+')
    
    
def do_nothing():
    pass
    
    
### SIMULATION - BACKEND
#
#
    
def next_period(state, decrease, increase):
    """ calculates the stock value for the next time period """
    
    res = state - decrease + increase
    if res < 0:
        res = 0
    return res

    
def get_inflow(state, natality_rate):
    return round(state * natality_rate / 100)


def get_outflow(state, mortality_rate):
    return round(state * mortality_rate / 100)

    
def simulate(initial_state, natality_rate, mortality_rate, duration):
    """ run simulation according to the given parameters
    initial_state: initial stock value
    natality_rate: flow (increase)
    mortality_rate: flow (decrease)
    duration: duration of the simulation """
    
    # create lists to store results
    periods = [0]
    population = [initial_state]
    mortality = []
    natality = [0]
    
    # run simulation (duration) times
    for i in range(duration):
        inflow = get_inflow(population[i], natality_rate)
        outflow = get_outflow(population[i], mortality_rate)
        
        # get value for the next time period
        new_state = next_period(population[i], outflow, inflow)
        
        # add results to lists
        periods.append(i+1)
        population.append(new_state)
        mortality.append(outflow)
        natality.append(inflow)
    
    # note: for period t inflow t already happened, while mortality t yet has to happen
    # hence natality and mortality will not have the same length; this is an adjustment
    # for plotting
    mortality.append(0)
    
    return periods, population, natality, mortality


def print_sim(periods, population, births, deaths):
    """ print simulation results to the standard output (console) """
    
    show_line()
    if len(periods) == len(population):
        print("PERIOD \t POPULATION \t\t BIRTHS \t\t DEATHS")
        for i in periods:
            print("%3d: \t %10d \t\t %8d \t\t %8d" % (i, population[i], births[i], deaths[i]))

    

def plot_sim(periods, population, births, deaths):
    """ plot simulation results using matplotlib
    note: display will be auto-closed after DELAY seconds to avoid concurency issues """
    
    # local variables to adjust bar chart
    bar_width = 0.4
    pos1 = [i-bar_width/2 for i in periods]
    pos2 = [i+bar_width/2 for i in periods]
    
    if len(periods) == len(population):
        # set 2 subplots, one above the other
        fig, ax = plt.subplots(2)

        # subplot 1 - stock value (population)
        ax[0].plot(periods, population, label='population')
        ax[0].legend()
        ax[0].set_xticks(periods)
        ax[0].set_xticklabels(periods)

        # subplot 2 - flow values
        ax[1].bar(pos1, births, bar_width, color = 'g', align='center', label='births')
        ax[1].bar(pos2, deaths, bar_width, color = 'b', align='center', label='deaths')
        ax[1].legend()
        ax[1].set_xticks(periods)
        ax[1].set_xticklabels(periods)
        
        # draw and delayed close to prevent concurency issues
        plt.draw()
        plt.waitforbuttonpress(DELAY)
        plt.close()


### MENU - FRONTEND
#
#
 

def show_variables():
    show_line()
    print("SIMULATION PARAMETERS")
    print()
    print("population     = %d" % (INITIAL_STATE))
    print("natality rate  = %.2f%%" % (NATALITY))
    print("mortality rate = %.2f%%" % (MORTALITY))
    print("sim. duration  = %d" % (DURATION))
    print()
    print("press any key")
    input()


def change_population():
    global INITIAL_STATE
    
    show_line()
    print("Input new value for the initial population:")
    INITIAL_STATE = int(input())

def change_natality():
    global NATALITY
    
    show_line()
    print("Input new natality percentage:")
    NATALITY = float(input())

def change_mortality():
    global MORTALITY
    
    show_line()
    print("Input new mortality percentage:")
    MORTALITY = float(input())


def change_duration():
    global DURATION
    
    show_line()
    print("Input the number of years:")
    DURATION = int(input())
    
    
def show_menu_options():
    show_line()
    print("\t\tMAIN MENU")
    print()
    print("(1) show sim. parameters")
    print("(2) change population")
    print("(3) change natality rate")
    print("(4) change mortality rate")
    print("(5) change simulation duration")
    print()
    print("(R) RUN SIMULATION")
    print()
    print("(Q) quit program")

    
def input_command():
    show_line()
    print()
    print("Please input your choice:")
    choice = input()
    return choice

    
def run_program():
    running = True
    while running:        
        show_menu_options()
        choice = input_command()
        
        valid = {'1', '2', '3', '4', '5', 'R', 'Q'}
        while choice.upper() not in valid:
            show_menu_options()
            choice = input_command()
            
        if choice == '1':
            show_variables()
        elif choice == '2':
            change_population()
            show_variables()
        elif choice == '3':
            change_natality()
            show_variables()
        elif choice == '4':
            change_mortality()
            show_variables()
        elif choice == '5':
            change_duration()
            show_variables()
        elif choice.upper() == 'R':
            per, pop, born, died = simulate(INITIAL_STATE, NATALITY, MORTALITY, DURATION)
            print_sim(per, pop, born, died)
            plot_sim(per, pop, born, died)
            
        elif choice.upper() == 'Q':
            running = False
        else:
            print("Debug: This line should not trigger!")
            
    show_line()
    print("Thank you for using DemographicSim!")
        
    
### EXTRA
#
#

# if you need values only without menu and graphics, call simulate directly
"""
t, p, n, m = simulate(INITIAL_STATE, NATALITY, MORTALITY, DURATION)
t2, p2, n2, m2 = simulate(INITIAL_STATE, 4, 2.8, DURATION)
"""
    

    
### MAIN
#
#

if __name__ == "__main__":
    run_program()
```