---
layout: post
title: Lesson 6 - Class diagram to ERD and other UML diagrams
---

De les gaat vooral over verschillende UML diagrammen, zoals een ERD of een class diagram.

## Downloads

[Powerpoint](https://drive.google.com/file/d/1X1TN4GCTz8sd92oC41hTGuPuZhFjJ3N0/view?usp=sharing){:target="_blank"}  
[Activity case](https://drive.google.com/file/d/1rzJP8SMSXYtEoRzBZQbuGQPSCbA7vESl/view?usp=sharing){:target="_blank"}  
[Answers to activity case](https://drive.google.com/file/d/1dHO1WqLLVNgGa_0FIg3f7WxrnQ4l4d46/view?usp=sharing){:target="_blank"}

## Video 1:
<iframe width="640" height="360" src="https://www.youtube.com/embed/QpdhBUYk7Kk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Video 2:
<iframe width="640" height="360" src="https://www.youtube.com/embed/-CuY5ADwn24" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Aantekeningen

### ERDs
* A model is a depiction of a **part** of reality.
* Modeling data: the first step in **designing database**.
* We use Entity Relationship Diagrams (ERD) to model the structure and relations between data: data model.
* An ERD includes: **Entity sets** ( containing Attributes) and **Relationship sets**.

**Building blocks of an ERD**  
* Entities
    * An entity is an object in the real world that is distinguishable from other objects.
    * Examples:
        * the student: any specific student is distinguishable from other students.
        * ANL02-2-1718: A specific course code distinguishable from other courses.
        * the teacher: any specific teacher is distinguishable from other teachers.
* Attributes
    * An entity is described using a set of attributes.  
    The values given for the attributes makes it distinguishable.
    * Example:
        * Attributes for a student: First Name, Last Name, Student Number, email, ... .
* Entity-relations
* Business Rules

**Entity Set**  
We are interested in a collection of entities: **Entity Set**.
* A Set of entities that share the same attributes.
* Example: Entity set “Student”: the set of all the students that are sharing the same attributes; name, std number, email, ... .

**Primary Key**  
A Primary Key is a **minimal** set of attributes whose values uniquely identify an entity in the set.

* Examples:
    * Entity set “Student”: student number is the minimal set of attributes that uniquely can identify a student.
    * Entity set “Student”: combination of **name** and **address** can also make a student unique, but it is not **minimal**.

**Relationship sets**  
Relations: Entities are associated with each other through relations.
![relations](\assets\images\ana_software_analysis_design\Lesson6\relationship.jpg)

Relationship: A Relationship is an **association** among two or more **entities**.
* Examples:
    * **John** _works_ in **pharmacy department**.
    * Working _relates_ members from **Employee** to members from **Department**.

Relationship Set: A set of relationships involving the same entity sets is defined as a Relationship Set.
* Example: Collect all working relations between employees and departments. Then we will have “Works” Relationship Set.

![relationship set](\assets\images\ana_software_analysis_design\Lesson6\relationship-set.jpg)

Remember that a relation between sets is a subset of the cartesian product.
* Consider the example in the image above: the relationship set connects together pairs (but not all the possible pairs) of entities from both the entity sets.
* It is a subset of the cartesian product
* Relationship sets = relations among sets.

**Cardinality**  
IE notation (Martin notation):
![IE notation](\assets\images\ana_software_analysis_design\Lesson6\ie-notation.jpg)

One-to-Many: “the relationship set associates one entity from one entity set to many entities from other entity set."  
![one-to-many](\assets\images\ana_software_analysis_design\Lesson6\one-to-many.jpg)

Many-to-Many: “the relationship set associates many entities from one entity set to many entities from other entity set."  
![many-to-many](\assets\images\ana_software_analysis_design\Lesson6\many-to-many.jpg)

Unary: A relationship set can be between entities of one entity set.  
![unary](\assets\images\ana_software_analysis_design\Lesson6\unary.jpg)

Binary: A relationship set can be between entities of two different entity sets.  
![binary](\assets\images\ana_software_analysis_design\Lesson6\binary.jpg)

Ternary: A relationship set can be between entities of three different entity sets.
![ternary](\assets\images\ana_software_analysis_design\Lesson6\ternary.jpg)

**Participation and Cardinality**
Key Constraints
* Problem: A department has at most one manager.
* Note: This means, given a department from entity set department we can uniquely identify its manager from Employee entity set.
![key constraints](\assets\images\ana_software_analysis_design\Lesson6\constraints.jpg)
