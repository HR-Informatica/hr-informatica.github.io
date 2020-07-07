---
layout: post
title: Les 3 - Operating systems
lesson: 3
---

Hoe operating systems werken en hoe je code wordt uitgevoerd.

## Downloads
[Powerpoint](https://drive.google.com/file/d/1ljwPfHv8ri7VdCp3uiON6Tcqyp1R15mi/view?usp=sharing){:target="_blank"}  
[Exercises](https://drive.google.com/file/d/17Q0acu2zPW08SrwAdgi1Leguot647ThG/view?usp=sharing){:target="_blank"}  
[Notes](https://drive.google.com/file/d/1WSHdFfTpDrYOOsTLmZ1_kLSp1TAoe-ay/view?usp=sharing){:target="_blank"}  

## Video
<iframe width="640" height="360" src="https://drive.google.com/file/d/1S7Bl2UAtFknFpdbpeKAE4gcIGx2eyB-f/preview" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Aantekeningen
There are a lot of operating systems, but there are a few big ones:
- Windows
- Linux / Linux-based distros
    - Ubuntu
    - Android
    - MacOS
- iOS
- BSD
- Solaris
- Etc.

We need the OS to give us:
- Top down view (from the software)
    - Provide abstractions to application programs of how the hardware is working. This makes it easier for the programmer to interact with the computer.
- Bottom up view (from the hardware)
    - Manage pieces of complex systems.
- Alternative view
    - Provide orderly, controlled allocation of resources.

![layerStructure](\assets\images\ana_operating_systems\lesson3\layerstructure.png)

Interfaces inside of an Operating system:
- **API:**
    - Aplication programming interface (offered from a service or a library. Can also be from the OS itself)
- **ISA:**
    - Instruction set architecture.

This is a general structure and can differ depending on what OS you are using.

**Everything an OS does:**
- Manages the resources
    - process management
    - memory management
    - File/resources management
- Offer an interface for all the functionalities that can be used in the Operating system.
    - Run programs without the programmer having to handle all the hardware as well.
- Respond and manage interrupts on the lowest level. Interrupt handling:
    - **Handling:** timers, new hardware discovered, memory full, input device triggered.
    - **Interrupts:**
        1. Interrupt the current operation.
        2. Make the kernel save the current state.
        3. Make the kernel execute the instruction needed.
        4. Go back to normal restoring privileges and memory.

**System calls:**
- Process management
    - Create process, terminate process
- File management
    - Open file, close, create, write, etc.
- Directory and file-system management
    - Create directory, delete directory, mount file system, etc.
- Miscellaneous
    - Change working directory, get elapsed time, send signal.

System calls provide the interface between a process and an operating system. A system call is how a process requests a service from a kernel that it does not normally have permission to run.
- Creating space in memory
- creating directories
- etc.

Every operating system uses its own system calls.

**POSIX**
Family of standards for compatibility between operating systems. This will define a command line interface based on the programming interface. Almost all OS's use POSIX.
- POSIX defines how you make a thread, a process and almost everything else.
- Threads are handled the same way in POSIX OS's.
- CLI's contain all the necessary tools to perform the tasks.
- All operatings systems have a system like POSIX even though not all operating systems use POSIX.

We will do this with a kernel.
- Core of the OS and thereby handles almost everything in the OS.
- It manages the modalities of execution:
    - User mode
    - Kernel mode

![KernelUserMode](\assets\images\ana_operating_systems\lesson3\KernelUserMode.png)

**Kernel Structures**
- Monolithic
    - Single structure (Compact in size)
    - Less software switching and calling.
    - All OS services run within the main kernel thread, also residing in the same memory area.
    - Difficult to maintain
    - Difficult to debug
    - Not portable
- Microkernel
    - As less as possible in the kernel.
    - Lot of modules
    - Client server relation (They call each other and wait)
    - Maintenance is easier
    - Kernel is very complex
    - In kernel mode only the skeleton of the structures. This will reduce bugs and possible critical errors.
    - The kernel gets all the interrupts and calls the right module to operate these.
- Virtual machine
    - Allow to abstract the processes dependency on the machine (emulation)
    - The hypervisor is a virtual machine process that handles who is accessing what
        - Makes sure that the Guest OS cant access the hardware directly.
            - Give protecting to the Host OS
        - Handle all the calls and processes.
        - **Type 1**
            - Run the operating without the abstraction of the machine.
        - **Simulator**
            - Emulate the whole virtual machine.
        - **Type 2**
            - Use the host operating system as a kernel for better performance.
            - Most VM programs use this method as it has the best performance and absytraction.


**Compilers**
- Compiled
    - C/C++, Fortran, obj-c, assembly etc.
        - Follow the whole procedure
    - Just in time compilers (JIT):
        - C#
        - Compiles into an intermediate language which is then compiled at runtime and executed in the machine in its evironment.
        - JIT: Programs are compiles in a language at the moment of being executed, only at that point.

![Compiler](\assets\images\ana_operating_systems\lesson3\compiler.png)

- Preprocessor:
    - Takes source code and makes intermediate translations that prepare the file.
- Compiler:
    - Translate the preprocessed language into a language. (Assembly)
- Assembler:
    - Translate from assembly into object code. (Hardware binary language)
- Linker:
    - Takes each file at its binary level and liks them together into one.
    - Reads headers that tells the linker to link to required external libraries.
    - Arranging the objects in a program's address space.
        - This can involve relocating code that assumes a specific base address to another base.
        - Relocate machine code mat involve retargeting of absolute jumps, loads and stores.

- Interpreted
    - Generate bytecode:
        - Python, Java, etc.
        - Java uses a virtual machine, it is compiled to bytecode but is not a compiled language, because there is no machine language.
    - Scripted
        - Bash, PHP, perl etc.
        - A language which performs operations that can be done by a human one by one.

![Interpreter](\assets\images\ana_operating_systems\lesson3\Interpreter.png)

**Python**

![PythonInterpreter](\assets\images\ana_operating_systems\lesson3\pythoninterpreter.png)


- Python is an interpreted language
- Internally, almost completely hidden from us, Python first compiles the source code (the statements in your file) into a format known as byte code.
- Compilation is simply a translation step, and byte code is a lower-level, and platform-independent, representation of source code.
    - Each of the source statements is translated into a group of byte code instructions. This byte code translation is performed to speed execution
    - Byte code can be run much quicker than the original source code statements.
    - Byte code is stored in files that end with a .pyc extension (“.pyc” means compiled “.py”).
    - The byte code can be written on the disk or just kept in memory, then executed.
- The interpreter might evolve in a JIT (just in time) compiler, and it becomes difficult to distinguish from a compiled language.

All the languages hook up to API's and system calls from the OS.