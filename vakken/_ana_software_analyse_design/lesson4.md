---
layout: post
title: Les 4 - General design
lesson: 4
---
Les over het design van UML diagrammen zoals Component en class diagram. 

Bij deze les had de leraar er twee youtube video's bijgezet.

## Downloads

[Powerpoint](https://drive.google.com/file/d/1XqQZfMy8ybF9vAN85R-4UrtJeDoU0Ogx/view?usp=sharing){:target="_blank"}  
[Opdracht game description](https://drive.google.com/file/d/1c-Y6n2x-Uz3LS8PMv5iEQHpVYJww6ScE/view?usp=sharing){:target="_blank"}  
[Uitwerkingen cardgame RPG](https://drive.google.com/file/d/1Xvkp56dF1c0rW8JNqs1gwejTaYnOSzsv/view?usp=sharing){:target="_blank"}

## Video's
### Video 1 (Legt ook interfaces uit):
<iframe width="640" height="360" src="https://www.youtube.com/embed/3cmzqZzwNDM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Video 2:
<iframe width="640" height="360" src="https://www.youtube.com/embed/UI6lqHOVHic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Lesvideo:
<iframe src="https://drive.google.com/file/d/1gqNZ71ifSNmQmnCQpVvqxaYKQ6NcYG5L/preview" width="640" height="360" allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>

## Aantekeningen

### Review of Analysis 3

**Class Notations**  
A class in a class diagram looks like something below and has some things in it. It has attributes, operations and visibility. The operations are in the lowest part, the attributes are above that in the middle part and the name of the class is in the top part. You can see the visibility in front of the operations and the attributes:
- **+**: public
- **#**: protected
- **~**: package
- **-**: private

![Class](\assets\images\ana_software_analysis_design\Lesson4\Class.jpg)

#### Dependency vs Association
**Association:**
- Object from A has an attribute of type B.
- Object from A has access to the reference of B during its life-time.  
![Association](\assets\images\ana_software_analysis_design\Lesson4\association.jpg)

- **Aggregation:**
    - Special type of association (whole-part relation) indicating that a class owns objects of another class.
    - Aggregate may share its parts. So in the case below BlogAccounts shares the part blogs with Author.
        - When the author gets deleted, the blog will live on.

    ![aggregation](\assets\images\ana_software_analysis_design\Lesson4\aggregation.jpg)
- **Composition**
    - Composite owns its parts.
    - Lifetime of parts are related to the lifetime of composite.
        - A part only belongs to one composite at a time.
        - in the picture below, windows consists of a slider, a header and a panel. When window gets deleted all the parts will be deleted too.

    ![Composition](\assets\images\ana_software_analysis_design\Lesson4\composition.jpg)



**Dependency:**
- An object from A does not have an attribute of type B.
- An object from A has access to an instance of temporarily during its life-time.

![Dependency](\assets\images\ana_software_analysis_design\Lesson4\dependency.jpg)

### Abstract classes and interfaces
**Abstract class:**  
Abstract classes are classes without any implementation. All the implementation of the operations are implemented by subclasses. So in the picture below, polygon inherits the class sjape which means that it now contains the class void and it has a point which is the center.  
![AbstractClasses](\assets\images\ana_software_analysis_design\Lesson4\abstract classes.jpg)

**Interface:**  
A sort of class which contains properties which are externally visible, but have no implementation. Interface has no direct instance. Classes that inherit an interface must implement(realize) all the properties which are in the interface.  
![interface](\assets\images\ana_software_analysis_design\Lesson4\interface.jpg)

**Realization:**  
Implementation of an interface in another class.  
![realization](\assets\images\ana_software_analysis_design\Lesson4\realization.jpg)

### N-ary Relations
**Unary-relation**  
Relation between two of the same entities. So an employee can have a relation with another employee because it is his boss. Same entity (employee) but they reference eachother.  
![unary](\assets\images\ana_software_analysis_design\Lesson4\unary.jpg)

**Binary-relation**  
When two entities participate.  
![binary](\assets\images\ana_software_analysis_design\Lesson4\binary.jpg)

**Ternary-relation**  
When three entities participate.  
![ternary](\assets\images\ana_software_analysis_design\Lesson4\Ternary.jpg)

### Component diagrams
Component diagram is in the 4+1 view the development view. This is the view which is needed for the developer to see what components are used in the program.  
![component](\assets\images\ana_software_analysis_design\Lesson4\component.jpg)

**Component**  
Component is an encapsulated, reusable and replaceable part of the system. You can link classes to make components and you can link components to make larger components.
Components can be parts of a system that have a functionality and can be reused in different places in the program. changed in a component should not affect other components. Communication between components should work via interfaces.

In the lower part of the image you see the artifact of the component. In the middle part you see the provided interfaces and the required interfaces. And in the upper part you see the name of the component.

The artifact is how your component is going to be placed in the system.

The interfaces in the component is the way the component talks to other components.

![component2](\assets\images\ana_software_analysis_design\Lesson4\component2.jpg)  

In the picture below you see how you should connect two components to each other when they are talking to each other via interfaces. This is one way to do it.

![ballsAndSockets](\assets\images\ana_software_analysis_design\Lesson4\BallsAndSockets.jpg)

The other way is to use stereotypes. Way more time intensive to make, but you can understand it without knowing UML.

![StereotypeComponent](\assets\images\ana_software_analysis_design\Lesson4\stereotypescomponent.jpg)

#### Relations
**Depends on:**
![depends](\assets\images\ana_software_analysis_design\Lesson4\dependscomponent.jpg)

**Example**
![example](\assets\images\ana_software_analysis_design\Lesson4\componentexample.jpg)