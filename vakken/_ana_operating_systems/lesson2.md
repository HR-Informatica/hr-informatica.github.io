---
layout: post
title: Les 2 - Memory
lesson: 2
---

Alles over verschillende soorten memory.

## Downloads
[Powerpoint](https://drive.google.com/file/d/17H89LstxFBsgAKAgQK85dXK4i4bZJboG/view?usp=sharing){:target="_blank"}  
[Exercises](https://drive.google.com/file/d/1deD5NKGUjy4qGrvYNRoEovjFdL8G_XcH/view?usp=sharing){:target="_blank"}  
[Notes](https://drive.google.com/file/d/1cf8tn-q4wP8FtasAUN0iylicrbAzJk1P/view?usp=sharing){:target="_blank"}  

## Video
<iframe width="640" height="360" src="https://drive.google.com/file/d/1vFzoiiXQoKKeP8U5D5cVhkksAkYK2u27/preview" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Aantekeningen

![InsideCPU](\assets\images\ana_operating_systems\lesson2\InsideCPU.png)

### Memory (fast to slow)
- Registers (L0-cache)
- Internal CPU Cache (also LLC)
    - L1, L2, L3
- Main memory
    - DRAM
- Disks
    - HDD, SSD

#### RAM
Flat set of ordered bytes (Single dimension array of bytes). Each cell has a specific address and can be of a different size than others. It depens on the kind of memory. Random access means that you have the same speed accessing every cell. Not all memory access time is the same though.
- SRAM (Static Random Access Memory), Cache
    - Small fast memory that acts as a buffer for a slower larger memory. This has multiple levels.
        - High level: Cache from the browser.
        - Lower level: Swap partition (Linux) or page file (Mac/Windows).
        - Lowest level: CPU Memory.
    - You want this memory to be as close to the thing you are working on. How higher the level how further away it is.
    - This memory expires after an amount of time.
- DRAM (Dynamic Random Access Memory)
    - Relatively fast big memory.

When you want to retrieve a bit of data that is stored in memory you start with searching in the fastest layer and you will go then through every layer until you find the bit of memory you are searching for.

**Cache Hit:**  
When you want to access a bit in memory that actually exists.

**Cache Miss:**  
When you want to access a bit of memory that does not exist anymore. You then have to create it again in memory.


### Paging
Every process has its own memory. To make and keep this continuous we use the Memory Manager Unit (MMU) which uses algorithms and data structures to fix this for us. The MMU will use Virtual memory and paging systems to manage the allocation of the real memory.

- **Vitual Memory:**  
    ![VirtualMemory](\assets\images\ana_operating_systems\lesson2\virtualmemory.png)
    - The virtual memory is managed by the CPU and the Physical memory by the MMU.
- **Paging:**
    - Memory management system that permits the physical memory to be non-continuous.
    - When there is no place left on the physical memory the system has to find a way to store the memory. This will be done in a Page file or a SWAP partition. This is generally slower because this is on a disk (SSD or HDD).
    - The system has two problems which it has to fix in order to use all the memory space:
        - External fragmantation: Give all chunks of data the same size. This way a chunk can always be fitted in.
        - Internal fragmantation: Use a small page size. But how smaller the page size how many more cache misses you will get.


- **Pages:**
    - We need to organise memory to access and load (only) the part that we want
    - We divide memory in blocks of fixed size (frame/pages)
    - Each block’s size is a power of 2
    - Most of the management and working is done from our HW.
    - There is a place where we can find a page table with all the addresses
- A Page Table is the data structure that contains the mapping physical memory/virtual memory so the collection of the Page Address (made of 2 parts):
    - p-> number of page (index of the array)
    - d-> offset page, that specify the offset to the physical address