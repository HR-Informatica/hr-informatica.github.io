---
layout: post
title: Les 1 - Computer architecture
lesson: 1
---

Hoe een computer werkt en de Von Neumann Architecture.

## Downloads
[Powerpoint](https://drive.google.com/file/d/1PC8j23QVMJzpTeTczzRLV-FEZpTJkbtA/view?usp=sharing){:target="_blank"}  
[Notes](https://drive.google.com/file/d/1Phcsci_8s9EaO8El5hbNXYC2mq1AnR-r/view?usp=sharing){:target="_blank"}  
[Exercises](https://drive.google.com/file/d/1DE1DtMfZyc4_z9AvSjoRK6KW6O_6ah0l/view?usp=sharing){:target="_blank"}  
[hamlet.txt](https://drive.google.com/file/d/1d2YB7pLdnxpgyShgYiAJE9an8Yg2-wWG/view?usp=sharing){:target="_blank"}  


## Video
<iframe width="640" height="360" src="https://drive.google.com/file/d/1T93jUITFT0E-kHNnl1oz4-vrGx08Nh16/preview" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Aantekeningen

### Von Neumann Architecture
![NeumannArchitecture](\assets\images\ana_operating_systems\lesson1\The-von-Neumann-Architecture.png)

- **In/Output**
    - Input: Mouse, keyboard
    - Output: Monitor
    - In- or Output: Hard Drive Disk (HDD), Compact Disk (CD), Digital Video Drive (DVD), Solid State Drive (SSD), Network
- **Memory**
    - Permanent:
        - Disks: USB disks, Hard drives (Mostly pretty slow)
        - SSD: Solid state disks (Already somewhat faster)
    - Volatile (deletes data after you turn the pc off):
        - RAM: Random access memory. (Very fast)
        - Cache: Memory on the CPU itself. (Super lightning fast)
- **Processor (CPU)**
    - Executes the instructions of the Instruction Set Architecture (ISA).
        - CISC (Complex instruction set computing):
            - IBM 370/168 (1970), VAX 11/780 (1977), X86: 32-bit (1989), X86-64 / AMD64 / X64 / Intel 64: 64-bit version of x86 (2003)
        - RISC (Reduced instruction set computing):
            - Mostly cpu's in small devices like: iPhones, android devices, Raspberry Pi. But can also be in bigger pcs like the new apple laptops that are coming out in 2020 with apple silicon which is based on an ARM architecture.
            - ARM, AVR, MIPS, ARC, PIC
    - Datapath:
        - The part that actually operates things. Contains functional units like the ALU (arithmetic logic unit) and processes data.
    - Control:
        - Program counters and registers
- **BUS**
    - Connection between two parts of the computer. For example: Between the cpu and the memory.

