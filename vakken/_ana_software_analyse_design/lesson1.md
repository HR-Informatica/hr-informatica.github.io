---
layout: post
title: Les 1 - Requirements
---

Korte uitleg over hoe de course gaat verlopen en uitleg over de requirements specification.

# Downloads

[Powerpoint](https://drive.google.com/file/d/1BxSTDDfTb6mluQv1zTdeVQYeSQNesPz5/view?usp=sharing){:target="_blank"}  
[Formative exam week 1 and 2 Questions (Without answers)](https://drive.google.com/open?id=1CAAZXGVfXks6WTClVMBFUW54ZNtP9AbD){:target="_blank"}  
[Formative exam week 1 and 2 Questions (With answers)](https://drive.google.com/open?id=1YepLWvQhzwlHTocqSigo57VURAbQ57-u){:target="_blank"}


# Aantekeningen

Because software is complex we need a methodology. This is needed so we can plan, control and give an estimate to the client.

Different roles in software development:
- Customer: Requires a computer system.
- Software engineer: Understands how the customer wants the program to be and designs it accordingly.
    - This design is not always the right way to do it. Needs to work with the programmer to find a solution.
- Programmer: Implements the design that the software engineer made. (Can be the same person as the engineer)

## Software development methods
Three different methods:
- **Waterfall**: Finish a step before moving to the next one.
- **Interative / incremental**: Develop an increment of functionality and repeat that in a feedback loop.
- **Agile**: user feedback is essential and loops with several levels of detail.

### Software development life cycle (SDLC)
- Defines the general steps that are taken to build the software.
- Defines responsibilities of the members during every step.
- Some steps overlap, but there are phases defined which has to be completed.
- If a step is not successfull you can fall back to an earlier step.

#### Waterfall
![Waterfall method](\assets\images\ana_software_analysis_design\Lesson1\350px-Waterfall_model.svg.png)

Source: [Wikipedia](https://en.wikipedia.org/wiki/Waterfall_model){:target="_blank"}

Unidirectional, there is no way back. You'll have to finish the step before moving to the next step.

#### Interative and incremental
![Iterative and incremental method](\assets\images\ana_software_analysis_design\Lesson1\1200px-Iterative_development_model.svg.png)

Source: [Wikipedia](https://en.wikipedia.org/wiki/Iterative_and_incremental_development){:target="_blank"}

The four middle steps will be repeated untill the end user is completely happy. The end user is involved in the evaluation phase.

#### Agile
Customer will be involved with everything. There are multiple methods within Agile that do the same but work in different ways. An example for a method that is agile, is Scrum.

## Requirements
There are two different sorts of requirements:
- Functional requirements
    - What should the system do.
        - As a user I need to be able to sign in.
- Non-functional requirements
    - Under what conditions does the system have to do it.
        - Sign in page needs to load within a second.
    - Constraints
        - What limitations does the system have.
            - We can only use Ubuntu as server.

## Modeling
Best way to start modeling is to step into the world of the users and the customers. This way you start to understand the problem more and you can make more accurate models.

### 4+1 view
With this view you are modeling multiple views from multiple angles of the system to be made. this way you can show your customer how the software is going to look from every standpoint. These views contain views from different stakeholders, suach as: end-users, developers and project managers.

![4+1 view](\assets\images\ana_software_analysis_design\Lesson1\4+1_Architectural_View_Model.svg)

Source: [Wikipedia](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model){:target="_blank"}

- Logical view:
    - Concerned with the functionality that the system provides to the end-users.
    - **UML**: State Diagrams, Class diagrams
- Development view:
    - Illustrates the system from the programmers perspective.
    - **UML**: Component diagram, Class diagram
- Process view:
    - Explains the systems processes and shows the runtime behavior of the system.
    - **UML**: Activity diagrams, sequence diagrams
- Physical view:
    - Concerned with how the system looks when it is deployed. Which physical connections have to be made.
    - **UML**: Deployment diagrams
- Scenarios
    - Describes the functionality of the system from the perspective of the user.
    - **UML**: Use-case diagram


**From page 61 to 78 in the slides there is a summary with some more information and tips.**