---
layout: post
title: Les 3 - Use case modelling
---

Het maken van een Use Case Model in UML.

# Downloads

[Powerpoint](https://drive.google.com/file/d/1iebIqMig5wrrguxFbuN31Xmuz1ndjaSy/view?usp=sharing){:target="_blank"}


# Aantekeningen
## User Story
A user story is a card where you put on a simple scenario. This contains Who, What and Why.
Basic User Story looks somthing like this:

```
As a {actor} I want to {action} so that {outcome}.
```
- `{Actor}`:
    - The person who is going to use the product (or user story).
- `{Action}`:
    - The action the `{actor}` is going to perform with that user story.
- `{Outcome}`:
    - The outcome the `{actor}` wants after doing the  `{action}`.

## Modeling
A model captures the important espects of a part of a system that is going to be modeled. It will model the system parts and simplify or omit the rest.
We model systems to make it easier to understand what has to be implemented. There are multiple goals for a model:
- Visualization
- Specification
- Guideline
- Documentation

There are a few different forms of models which all have their own purposes:
- High-level models (conceptual)
- Analysis models (logical)
- Implementation models (physical)

### UML
UML is a visual modeling language to create models for object-oriented systems.

#### Use case diagram
Describes the functionality of the systems being modeled from the perspective of the outside world. You can model what a system is supposed to do.

**From userstory to use case**  
Modeling requirements in UML  
- Relations
    - between actors
    - between actors and use cases
    - between use cases

A Use Case diagram consists of:
- Actors
- Use cases
- Relations

**Actor**  
An Actor is a third party to the (sub)system, but has significant interactions with the system. An Actor must have an unique name.

![Actor](\assets\images\ana_software_analysis_design\Lesson3\Actor.jpg)

Actors can be:
- a human
- a device
- an executable process
- a system

You can identify actors as entities that are using your system.

**Use case**  
A use case is a case where your system is fulfilling one or more of your actors requirements. A use case is a bit of functionality of a whole system. A use case cannot be a non-functional requirement. Each use case is a complete course of events in the system from the actors perspective.

![use-case](\assets\images\ana_software_analysis_design\Lesson3\usecase.jpg)

**Association:**  
Class of interactions between an actor and a use case. This would be the arrow:

![association](\assets\images\ana_software_analysis_design\Lesson3\Association.jpg)

**Inheritance:**  
The relation between two actors.

![inheritance](\assets\images\ana_software_analysis_design\Lesson3\inheritance.jpg)


**Relationship between use cases:**
Break your system in managable chunks. While you are doing this, you may encounter similarities between use cases. Use cases can connect via:
- Generalization
    - A relationship between a general use case and a more specific use case that inherits abnd add features to it.
    - Good example in the slides on page 50
- Dependency
    - Stereotyped as <<extend>>
        - The sequence of events in the Extension Use case (optionally) extemds the steps of the base use case.
        - Good example in the slides on page 49
        ![extend](\assets\images\ana_software_analysis_design\Lesson3\extend.jpg)
    - Stereotyped as <<include>>
        - Marks a relationship us case to an inclusion use case. You are specifying that the behaviour for the inclusion use case is to be inserted into the behaviour defined for the base use case.
        - Good example is in the slides on page 48
        ![Include](\assets\images\ana_software_analysis_design\Lesson3\include.jpg)

