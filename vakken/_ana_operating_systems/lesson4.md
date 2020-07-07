---
layout: post
title: Les 4 - Processes and threads
lesson: 4
---

Gaat over processes en threads en hoe dit werkt binnen je OS.

## Downloads
[Powerpoint](https://drive.google.com/file/d/1eDBdhstWfl2ejv_rsTFk67WcDZZNuLfA/view?usp=sharing){:target="_blank"}  
[Exercises](https://drive.google.com/file/d/1fdNZ1cTsq8Xj-6_ahMdr7FfRNRJRbu8n/view?usp=sharing){:target="_blank"}  
[Notes](https://drive.google.com/file/d/1x8x0zFUab8hz7wUYEApcpV2ykB6VI-4D/view?usp=sharing){:target="_blank"}  

## Video
<iframe width="640" height="360" src="https://drive.google.com/file/d/1AgR9_FkfF-ybVmcQ5-rUcj13dYr0bMB6/preview" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Aantekeningen

### Process
**Multiprogramming**
- Having multiple programs, processes, tasks, threads, etc. running at the same time.
- Whenever one program needs to sop another runs in the meantime.
- Execution time of a program may overlap with I/O time of other programs.
- A program as a whole keeps running on the CPU until it stops itself. Then another progran can use the CPU.

**Multitasking**
- Same meaning of multiprogramming but in a more general sense.
- Term is used when multiple programs are using the CPU or Memory.
- A program shares turns with other programs fairly. This is used in newer OS's.
- **Task**
    - A single execution of a program and is not a whole program.
    - Each smaller task does not hijack the CPU but gets a fair amount of the CPU.

**Multiprocessing**
- Executing multiple programs at the same time.
- Refers to the hardware instead of the software.
- If there is more than one processor available for the software it is multiprocessing.
- A system can be both multiprogrammed and multiprocessed.

**Program vs Process**
- Process is a part of a program.
- Program is a set of instructions that perform a designated task.
- Process is entirely dependent on the Program.

