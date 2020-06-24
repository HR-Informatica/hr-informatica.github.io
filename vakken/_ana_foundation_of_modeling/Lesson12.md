---
layout: post
title: Les 12 - Simulation (part 2)
lesson: 12
---

Vervolg op Simulation 1.

### Downloads
[Powerpoint](https://drive.google.com/file/d/1beq02uMcwJWqQR3xmL17xihb1a5IwVsW/view?usp=sharing){:target="_blank"}  

### Examples
#### Ticket.py
```python
import matplotlib.pyplot as plt

### GLOBAL VARIABLES AND CONSTANTS
#
#

DELAY = 20

TRIPS = 20
PRICE = 22.3
ALTERNATIVES = [(0,0),(90,40),(400,100)]
#ALTERNATIVES = []


### HELPER FUNCTIONS
#
#

def show_line(length=30):
    print('+'+'-'*length+'+')
    
    
def do_nothing():
    pass


def idx_min(*values):
    """ accepts a variable number of integers / floats and returns the
    position of the smallest one """
    
    return values.index(min(values))
 
    
def equal_len(*lists):
    """ accepts a variable number of lists and tests if all of them are
    of the same length, returning True or False """    
    test_len = len(lists[0])
    if not all(len(l) == test_len for l in lists):
        return False
    return True
    
    
### SIMULATION - BACKEND
#
#
    
def next_period(state, price, discount):
    """ calculates the stock value for the next period (trip) """
    
    discounted_price = (100 - discount) * price / 100
    res = state + discounted_price
    return round(res,2)

    
def simulate(initial_state, price, discount, duration):
    """ run simulation according to the given parameters
    initial_state: initial stock value
    price: nominal ticket price
    discount: discount percentage given as a float value
    duration: the number of trips to include in the simulation """
    
    # create lists to store results
    periods = [0]
    expenses = [initial_state]
    
    # run simulation (duration) times
    for i in range(duration):
        # get value(s) for the next time period
        new_state = next_period(expenses[i], price, discount)
        # append them to the lists
        periods.append(i+1)
        expenses.append(new_state)
    
    return periods, expenses


def print_sim(periods, expenses):
    """ print simulation results to the standard output (console) """
    
    show_line()
    if len(periods) == len(expenses):
        print("PERIOD \t EXPENSES")
        for i in periods:
            print("%3d: \t %8.2f" % (i, expenses[i]))
            

def print_alternatives(*expenses):
    """ accepts lists containing expenses for each alternative
    prints them all and also shows the best one (min)
    for each simulation period"""
    
    # n holds how many alternatives have been passed
    n = len(expenses)
    # only compare if all alternatives have the same duration
    if equal_len(*expenses):
        # form and print header
        header = "".join("\t  OPTION %d" % (i+1) for i in range(n))
        header = "TRIPS" + header + "\t\t  BEST"
        print(header)

        # for each period, get values per each alternative, print them all out,
        # find the best one (min) and print which one it is in the last column
        for j in range(len(expenses[0])):
            s = "%3d:" % (j)
            alt = []
            for i in range(n):
                temp = expenses[i][j]
                s = "%s \t %8.2f" % (s, temp)
                alt.append(temp)
            i_min = idx_min(*alt)
            s = "%s \t %8.2f (%d)" % (s, expenses[i_min][j], i_min+1)
            print(s)
    
    else:
        print("Debug message print_alternatives(): given expenses of different lengths")
    

def plot_sim(*expenses):
    """ plot simulation results using matplotlib
    note: display will be auto-closed after DELAY seconds to avoid concurency issues """
    
    if equal_len(*expenses):
        x = range(len(expenses[0]))
        fig, ax = plt.subplots()
        
        for i in range(len(expenses)):
            title = "option %d" % (i+1)
            ax.plot(x, expenses[i], label=title)
            
            ax.set_title('Trip cost analysis')
            
        ax.set_xlabel('number of trips')
        ax.set_ylabel('total price')
        ax.legend(loc='lower right')
            
        plt.draw()
        plt.waitforbuttonpress(DELAY)
        plt.close()
    
    else:
        print("Debug message print_alternatives(): given expenses of different lengths")
    

### MENU - FRONTEND
#
#

def show_alternatives():
    if len(ALTERNATIVES) == 0:
        print("NO ALTERNATIVES ENTERED")
    else:
        for i in range(len(ALTERNATIVES)):
            print("OPTION %d: subscription = %.2f%s \t dicsount = %3.2f%%" % (i+1, ALTERNATIVES[i][0], u"\N{euro sign}", ALTERNATIVES[i][1]))

def show_variables():
    show_line()
    print("SIMULATION PARAMETERS")
    print()
    print("ticket price     = %.2f" % (PRICE))
    print("number of trips  = %d" % (TRIPS))
    show_alternatives()
    print()
    print("press any key")
    input()


def change_price():
    global PRICE
    
    show_line()
    print("Input new ticket price")
    PRICE = float(input())

def change_trips():
    global TRIPS
    
    show_line()
    print("How many trips:")
    TRIPS = int(input())

def add_alternative():
    global ALTERNATIVES
    
    show_line()
    print("Please enter the package cost:")
    subscription = float(input())
    print("Please enter discount percentage:")
    discount = float(input())
    
    ALTERNATIVES.append((subscription, discount))
    
def remove_alternative():
    global ALTERNATIVES
    
    show_line()
    if len(ALTERNATIVES) == 0:
        print("There are no alternatives to remove.")
        print("press any key")
        input()
    else:
        show_alternatives()
        print("Please input the number of alternative to delete (1-%d)" % len(ALTERNATIVES))
        idx = int(input())
        if idx > 0 and idx <= len(ALTERNATIVES):
            del ALTERNATIVES[idx-1]
            
def run_sim():
    if len(ALTERNATIVES) > 0:
        expenses = []
        for scen in ALTERNATIVES:
            p, e = simulate(scen[0], PRICE, scen[1], TRIPS)
            expenses.append(e)
            
        print_alternatives(*expenses)
    else:
        print("Please enter at least one alternative before running the simulation.")
        
def run_graph():
    if len(ALTERNATIVES) > 0:
        expenses = []
        for scen in ALTERNATIVES:
            p, e = simulate(scen[0], PRICE, scen[1], TRIPS)
            expenses.append(e)
            
        plot_sim(*expenses)
    else:
        print("Please enter at least one alternative before running the simulation.")
    
    
def show_menu_options():
    show_line()
    print("\t\tMAIN MENU")
    print()
    print("(1) show sim. parameters")
    print("(2) change ticket price")
    print("(3) change number of trips")
    print("(4) add alternative")
    print("(5) remove alternative")
    print()
    print("(R) RUN SIMULATION")
    print("(G) SHOW GRAPH")
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
        
        valid = {'1', '2', '3', '4', '5', 'R', 'G', 'Q'}
        while choice.upper() not in valid:
            show_menu_options()
            choice = input_command()
            
        if choice == '1':
            show_variables()
        elif choice == '2':
            change_price()
            show_variables()
        elif choice == '3':
            change_trips()
            show_variables()
        elif choice == '4':
            add_alternative()
            show_variables()
        elif choice == '5':
            remove_alternative()
        elif choice.upper() == 'R':
            run_sim()
        elif choice.upper() == 'G':
            run_graph()
        elif choice.upper() == 'Q':
            running = False
        else:
            print("Debug: Unhandled menu choice")
            
    show_line()
    print("Thank you for using Ticket-to-Ride!")
        
    
### EXTRA
#
#

# For quick access
# p1, e1 = simulate(0, 22, 0, 15)
# p2, e2 = simulate(90, 22, 40, 15)
# print_alternatives(e1, e2)
    

    
### MAIN
#
#

if __name__ == "__main__":
    run_program()
```

#### Inventory.py
```python
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
from matplotlib.widgets import Button, Slider
from random import randint


### GLOBAL VARIABLES AND CONSTANTS
#
#

# change to True if you want the interface to print all values
# to the console after each change; not advisable (used for debug only) 
OUTPUT_TO_CONSOLE = False

# simulation specific parameters (periods, MAX_ORDER and MAX_DEMAND)
PERIODS = 20

MAX_ORDER = 100
MAX_DEMAND = 100

# scenario specific globals
# change to run the simulation with different values

# delay from order to delivery
DELIVERY_DELAY = 2
# initial warehouse stock; advisable: do not change or lost sales might not be avoidable                              
INITIAL_STOCK = DELIVERY_DELAY * MAX_DEMAND

# other price parameters (purchase price, storing cost, cost per shipment and lost sales penalty)
ITEM_COST = 3
WAREHOUSING_COST = 1
SHIPMENT_COST = 20
LOST_SALES_COST = 10

# initially generated value; will be updated the moment user makes the first choice; do not change
SUPPLY_VECTOR = [0 for _ in range(PERIODS+1)]

# demand vector - change values to experience different sales dynamics
# you can comment out the default values and use random values below
DEMAND_VECTOR = [20, 40, 60, 100, 90, 70, 80, 70, 55, 35, 20, 30, 40, 60, 70, 60, 50, 40, 30, 30]
#DEMAND_VECTOR = [randint(0,MAX_DEMAND) for _ in range(PERIODS)]



### HELPER FUNCTIONS
#
#

def show_line(length=30):
    print('+'+'-'*length+'+')    
    
def do_nothing():
    pass

# this is interface-related helper function
# reads values from bar chart and converts them into a list
def bar2list(rect):
    res = [el.get_height() for el in rect]
    return res

# this is interface-related helper function
# updates bar chart with values provided in the array
# note: it is assumed that the length of array and the number of bars is the same;
# will work will less, but may compromise the display
def update_bar(rect, arr_val):
    for r,v in zip(rect, arr_val):
        r.set_height(v)

    
    
### SIMULATION - BACKEND
#
#


def order2supply(order_vec, delivery_delay):
    """ converts order vector into delivery vector
    Essentially, shifts order vector by delivery_delay positions to the right,
    adds zeros to the missing values and appends 0 at the end
    to align the length with other vectors (needed only for the interface) """
    
    res = [0] * delivery_delay + order_vec[:] + [0]
    return res


def next_period(stock, supply, demand, purchase_price, shipment_price, wh_price, penalty_price):
    """ our 'bread and butter' function
    calculates all needed values for the next simulation period """
    
    # the period begins at X-1-t moment
    # first, warehouse expenses are calculated for the stored quantities
    expenses = stock * wh_price
    
    # then, the items are send to the clients based on the demand
    # if the demand is greater, warehouse will ship everything it has. then
    # lost sales will be counted and related expenses calculated and added
    if demand > stock:
        lost_sale = demand - stock
        stock = 0
        expenses += lost_sale * penalty_price
    # otherwise, just reduce stock quantity
    else:
        stock -= demand
        lost_sale = 0
    
    # in the next period ordered quantities will be ready
    # if there was supply scheduled, calculate purchasing expenses
    if supply > 0:
        purchasing_expenses = supply * purchase_price + shipment_price
    else:
        purchasing_expenses = 0
        
    # increase the stock with the newly received quantities
    stock += supply
    
    # return all values
    return stock, lost_sale, expenses, purchasing_expenses
    
    
def simulate(initial_stock, supply_vec, demand_vec, purchase_price, shipment_price, wh_price, penalty_price, duration):
    """ run simulation according to the given parameters """
    
    # create lists to store results
    # note: expenses and lost_sales exist after the period 'happened'
    periods = [0]
    stock = [initial_stock]
    expenses = []
    purchasing_expenses = [0]
    lost_sales = []
    
    # loop for the given simulation duration and apply formulas from the model
    for i in range(1, duration+1):
        # call next_period to obtain all needed values
        s, ls, e, pe = next_period(stock[i-1], supply_vec[i], demand_vec[i-1], purchase_price, shipment_price, wh_price, penalty_price)
        # update lists accordingly
        periods.append(i)
        stock.append(s)
        lost_sales.append(ls)
        expenses.append(e)
        purchasing_expenses.append(pe)
        
    # purchasing and other expenses do not happen at the same moment
    # but for better visualization it was altered; hence to keep the model accurate,
    # these expenses have been split in next_period;
    # Now they have to be merged into cumulative expenses for the display
    cum_expenses = [expenses[0] + purchasing_expenses[0]]
    for i in range(1, len(expenses)):
        cum_expenses.append(cum_expenses[i-1] + expenses[i] + purchasing_expenses[i])
    
    # finally, return all lists containing simulation-related values
    return periods, stock, lost_sales, cum_expenses
    
    

# this function is added to:
# 1) help debugging during development
# 2) be called from the inteface if a user wants to have exact values
#   printed in the console, instead of reading them from the charts
def print_sim(periods, order, stock, supply, demand, lost_sales, expenses):
    show_line()
    
    print("PERIOD \t ORDER \t SUPPLY\t STOCK \t DEMAND\t LOST SALES\t EXPENSES")
    for per, ord, stk, sup, dem, ls, exp in zip(periods, order+[0]*DELIVERY_DELAY, stock, supply, demand, lost_sales, expenses):
        print("%3d: \t %3d \t %3d \t %4d \t %3d \t %3d \t %9d" % (per, ord, sup, stk, dem, ls, exp))
            


    

### IPLOT - FRONTEND
#
#

    
# helper global variable storing the order currently selected by the user
current_order = 0

# frontend of the application using matplotlib and its widgets
def iplot():
    # setting up display:
    # subplots, their position in the figure, size, axis, title, ...
    # reference is kept to each plot for easier access
    fig = plt.figure()
    gs = gridspec.GridSpec(4,3)
    ax0 = plt.subplot(gs[:2, :2])
    ax0.axis([0,PERIODS-DELIVERY_DELAY,0,MAX_ORDER])
    ax0.title.set_text("orders")
    ax1 = plt.subplot(gs[3, :2])
    ax1.title.set_text("total costs")
    ax1.axis([0,PERIODS,0,4000])
    ax2 = plt.subplot(gs[2])
    ax2.axis([0,PERIODS,0,MAX_ORDER])
    ax2.title.set_text("supply")
    ax2.tick_params(labelbottom=False)
    ax3 = plt.subplot(gs[5])
    ax3.axis([0,PERIODS,0,MAX_DEMAND])
    ax3.title.set_text("demand")
    ax3.tick_params(labelbottom=False)
    ax4 = plt.subplot(gs[8])
    ax4.title.set_text("stock")
    ax4.axis([0,PERIODS,0,300])
    ax4.tick_params(labelbottom=False)
    ax5 = plt.subplot(gs[11])
    ax5.axis([0,PERIODS,0,MAX_DEMAND])
    ax5.title.set_text("lost sales")
    
    # redrawing plots is slow and 'expensive'
    # hence, default values are plotted and then each subplot is updated when needed
    # consequently, reference is needed to each of those
    orders = ax0.bar(range(PERIODS-DELIVERY_DELAY), [0 for i in range(PERIODS-DELIVERY_DELAY)])
    supply = ax2.bar(range(len(SUPPLY_VECTOR)), SUPPLY_VECTOR)
    demand = ax3.bar(range(len(DEMAND_VECTOR)), DEMAND_VECTOR, color='g')
    stock = ax4.bar(range(PERIODS), [INITIAL_STOCK] * PERIODS, color='grey')
    lost_sales = ax5.bar(range(PERIODS), [0] * PERIODS, color = 'r')
    costs = ax1.plot(range(PERIODS), [1] * PERIODS)
    
    
    
    
    # to avoid many gobal variables, as well as a great deal of function parameters ...
    # the function that updates all plots (and calls simulation) is nested inside of iplot()
    def update_sim():
        # get user's orders from the interface
        order_vec = bar2list(orders)
        SUPPLY_VECTOR = order2supply(order_vec, DELIVERY_DELAY)
        # update supply
        update_bar(supply, SUPPLY_VECTOR)
        
        # run the simulation to get all other values
        per_vec, stock_vec, ls_vec, tc_vec = simulate(INITIAL_STOCK, SUPPLY_VECTOR, DEMAND_VECTOR, ITEM_COST, SHIPMENT_COST, WAREHOUSING_COST, LOST_SALES_COST, PERIODS)
        if OUTPUT_TO_CONSOLE:
            print_sim(per_vec, order_vec, stock_vec, SUPPLY_VECTOR, DEMAND_VECTOR, ls_vec, tc_vec)
        
        # next update stock and lost sales charts
        update_bar(stock, stock_vec)
        update_bar(lost_sales, ls_vec)
        
        # to help the user visualize stocks, we adjust y-range on stock chart
        # not needed, but makes better interface
        ax4.set_ylim([0,max(stock_vec)])

        # another visual assitance to the user;
        # total costs can be read from the graph, but precise reading
        # requires zooming-in. Hence, the exact value is added after the title
        costs[0].set_ydata(tc_vec)
        ax1.title.set_text("total costs: %d"%(tc_vec[PERIODS-1]))
        # also, we auto-scale for the user
        ax1.set_ylim([0,(max(tc_vec) // 1000 + 1) * 1000])
        
        # tell matplotlib to redraw everything when possible
        fig.canvas.draw_idle()
    # update_sim() is immediately called to replace initial graph values
    update_sim()    
    
    
    
    # this part handles matplotlib widgets; position on the plot and events
    
    # --- Slider ---
    # position and reference
    axslider = plt.axes([0.14, 0.43, 0.42, 0.03])
    slider = Slider(axslider, "order( 0)", 0, MAX_ORDER, valinit=SUPPLY_VECTOR[current_order])
    # event that triggers when slider is moved
    def slider_moved(event):
        # get value, use it to update user input vector,
        val = slider.val
        orders[current_order].set_height(round(val))
        #fig.canvas.draw_idle()     # not needed as update_sim will call draw()
        # call update_sim to process new changes
        update_sim()
    # associate slider event with slider widget
    slider.on_changed(slider_moved)
    
    # --- Next button ---
    # position and reference
    axbnext = plt.axes([0.31, 0.33, 0.1, 0.075])
    bnext = Button(axbnext, "Next")
    # event that triggers when the button is clicked
    def clicknext(event):
        # increments current_order
        # colors current order bar to red to help user visually associate it
        # updates slider with the new value red from the bar
        global current_order
        if current_order < PERIODS - DELIVERY_DELAY - 1:
            orders[current_order].set_color('b')
            current_order += 1
            orders[current_order].set_color('r')
            slider.set_val(orders[current_order].get_height())
            temp_text = "order(%2d)"%(current_order)
            slider.label.set_text(temp_text)
            fig.canvas.draw_idle()
    # associate button event with button widget
    bnext.on_clicked(clicknext)
    
    # --- Next button ---
    # position and reference
    axbprev = plt.axes([0.2, 0.33, 0.1, 0.075])
    bprev = Button(axbprev, "Prev")
    # event that triggers when the button is clicked
    def clickprev(event):
        global current_order
        if current_order > 0:
            orders[current_order].set_color('b')
            current_order -= 1
            orders[current_order].set_color('r')
            slider.set_val(orders[current_order].get_height())
            temp_text = "order(%2d)"%(current_order)
            slider.label.set_text(temp_text)
            fig.canvas.draw_idle()
    # associate button event with button widget
    bprev.on_clicked(clickprev)
    
    # --- Print button ---
    # just gets all data and prints them in the console
    axprint = plt.axes([0.45, 0.33, 0.1, 0.075])
    bprint = Button(axprint, "Print")
    def clickprint(event):
        order_vec = bar2list(orders)
        SUPPLY_VECTOR = order2supply(order_vec, DELIVERY_DELAY)
        per_vec, stock_vec, ls_vec, tc_vec = simulate(INITIAL_STOCK, SUPPLY_VECTOR, DEMAND_VECTOR, ITEM_COST, SHIPMENT_COST, WAREHOUSING_COST, LOST_SALES_COST, PERIODS)
        print_sim(per_vec, order_vec, stock_vec, SUPPLY_VECTOR, DEMAND_VECTOR, ls_vec, tc_vec)
        show_line()
    bprint.on_clicked(clickprint)


    # plt.show() is called at the end
    # note: this is a blocking call!
    plt.show()
    
    

    
### MAIN
#
#

if __name__ == "__main__":
    iplot()
```