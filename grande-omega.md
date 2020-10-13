---
layout: page
title: Grande Omega
permalink: /grande-omega/
---

Grande Omega is het programma waarmee meeste development opdrachten beschikbaar zijn.
Ook worden hier de examens in gegeven.

***

## Inhoudsopgave

1. [Downloads](#downloads)
2. [Installatie instructies](#installatie-instructies)
    1. [Windows](#windows)
        1. [Niet-auto-updater versie](#niet-auto-updater-versie-windows)
        2. [Auto-updater versie](#auto-updater-versie-windows)
    2. [MacOS](#macos)
        1. [Niet-auto-updater versie](#niet-auto-updater-versie-macos)
        2. [Auto-updater versie](#auto-updater-versie-macos)
    3. [Linux](#linux)
        1. [Niet-auto-updater versie](#niet-auto-updater-versie-linux)
        2. [Auto-updater versie](#auto-updater-versie-linux)

***

## Downloads

#### Installation guide

**Deze installation guide hieronder is gegeven vanuit de leraren van de Hogeschool Rotterdam. Deze vonden wij onoverzichtelijk en mist het stukje voor Linux.**

[Installation guide (vanuit de leraren)](https://drive.google.com/file/d/1VXy1BzQrsTUkZeqw1qJjX4e_TI2lVYGi/view?usp=sharing){:target="_black"}  

#### Programma's die nodig zijn om Grande Omega te gebruiken

[Node.js (10 LTS)](https://nodejs.org/en/download/){:target="_black"}  
[Mono 6.8.0 (32bit)](https://www.mono-project.com/download){:target="_black"}  
[Python 3 (Windows)](https://www.python.org/downloads/){:target="_black"}  
[Python 3 (MacOS / Linux)](https://www.anaconda.com/products/individual){:target="_black"}  
[.NET Core SDK](https://dotnet.microsoft.com/download){:target="_black"}

#### Grande Omega (kies een download geschikt voor jouw OS)
[GO Windows](https://www.grandeomega.com/downloads/go_student_win.zip){:target="_black"}  
[GO Mac / Linux](https://www.grandeomega.com/downloads/go_student_mac.zip){:target="_black"}  
[GO installer (auto updater voor MacOS / Windows 10 / Linux)](https://www.grandeomega.com/downloads/go_student_app.zip){:target="_black"}

***

**Let op linux gebruikers:** Je kan Grande Omega gebruiken door de mac versie of de auto updater versie te downloaden. Om grande omega te installeren wordt aangeraden om alles behalve de "node_modules" map te unzippen. Daarna kan je `npm install` uitvoeren om de node_modules opnieuw te downloaden maar dan voor jouw linux distro i.p.v. Mac. Ook moet je ervoor zorgen dat je de rechten hebt om Grande Omega uit te voeren. Dit kan je doen door in de map van Grande Omega de volgende command uit te voeren:
- Voor niet-auto-updater: `chmod +x start.command`
- Voor auto-updater: `chmod +x start-mac.command`

***

## Installatie instructies

### Windows

**Let op:** 
- Er zijn voor windows twee versies die je kan installeren. Stap 1 is bij beide versies hetzelfde.
- Zorg dat je installatie van Grande Omega in een pad staat waar geen spatie in zit. Grande Omega werkt dan niet meer. Ook mogen er geen diakrieten in het pad staan. `C:\Users\User1\Desktop\Grande_Omega` mag dus omdat het geen spaties en diakrieten bevat, maar `C:\Users\User1\Desktop\Grande Omega` mag dus niet omdat het een spatie heeft in de naam.

1. Installeer alle programma's die nodig zijn voor het gebruiken van Grande Omega. Deze zijn Node.js, Mono, Python 3 en .NET Core SDK. De links naar de download pagina's staat hierboven. Bij Node.js, python en .NET Core SDK zou tijdens de installatie het programma in je Path moeten worden gezet. Dit moet gebeuren anders kan Grande Omega sommige programma's niet vinden. Bij Python staat dit standaard uit en moet aan worden gezet.
    - Om ervoor te zorgen dat Mono wordt herkent in Grande Omega moet je de path naar mono in je Environment variables zetten:
        1. Druk op `WIN + R` en vul dan `SystemPropertiesAdvanced.exe` in. Als het goed is opent dan System Properties.
        2. Druk in dat venster onderin op `Environment Variables...` (`Omgevingsvariabelen...` in NL).
        3. In het nieuw geopende venster druk je onder `System variables` (`Systeemvariabelen` in NL) twee keer op de variabele `Path`.
        4. Druk dan in het nieuw geopende venster op `New` (`Nieuw` in NL).
        5. Voeg dan op de nieuwe regel dit pad toe: `C:\Program Files (x86)\Mono\bin`. Als je het ergens anders geïnstalleerd heb moet je dat pad aangeven. let wel op dat je dan het pad moet geven naar de `bin` map in Mono. Als je mono hebt geïnstalleerd maar het niet kan vinden in de map `Program Files (x86)` dan kan het zijn dat je de 64-bit versie hebt geïnstalleerd. Deinstalleer dan de 64-bit versie en download dan de 32-bit versie.
        6. Druk nu in alle drie de schermen op `OK`.

#### Niet-auto-updater versie Windows

{:start="2"}
2. Download de GO Windows zip vanaf de link hierboven en pak het uit naar een plek op jou computer waar je het terug kan vinden. Omdat ze alle Node Modules mee leveren kan dit uitpakken even duren. Vooral als je de unzipper van Verkenner (File Explorer) gebruikt. Voor beter performance kan je het uitpakken met 7zip. Deze is sneller en efficienter dan bijvoorbeeld WinRar en de ingebouwde unzipper van Windows. 
3. Als dit allemaal gelukt is kan je het programma starten door het bestand `GrandeOmega.exe` uit te voeren. Hierna kan je inloggen en is Grande Omega klaar voor gebruik. Druk wel in Grande Omega op de `i` zodat je kan checken of alles goed is geïnstalleerd.

#### Auto-updater versie Windows

{:start="2"}
2. Download de go installer vanaf de link hierboven en pak het uit naar een plek op jouw computer waar je het terug kan vinden.
3. Start het programma door het bestand `start-windows.bat` uit te voeren. Hierna gaat de updater een tijdje Grande Omega downloaden. Uiteindelijk zal het een pop-up geven dat Grande Omega gedownload is en dat je het kan openen. Druk op `Ok`. Hierna is het nog goed om even te kijken of alles geïnstalleerd is door op de `i` te drukken.

***

### MacOS

**Let op:**
- Er zijn voor MacOS twee versies die je kan installeren. Stap 1 is bij beide versies hetzelfde.
- Zorg dat je installatie van Grande Omega in een pad staat waar geen spatie in zit. Grande Omega werkt dan niet meer. Ook mogen er geen diakrieten in het pad staan. `/Users/User1/Documents/Grande_Omega` mag dus omdat het geen spaties en diakrieten bevat, maar `/Users/User1/Documents/Grande Omega` mag dus niet omdat het een spatie heeft in de naam.
- Als Anaconda voor een of andere reden niet werkt kan je [pyenv](https://github.com/pyenv/pyenv/blob/master/README.md) uitproberen.

1. Download alle benodigde programma's vanaf de downloads hierboven. Deze zijn Node.js, Mono, Anaconda (Python 3.7) en .NET Core SDK. In principe hoef je ze alleen maar te installeren en dan is het goed. Het enige programma waar je nog iets bij moet doen is Mono. Deze staat na installeren namelijk niet in je path. Om het in je path te zetten moet je de volgende stappen volgen.
    1. Open terminal door te drukken op `⌘ + space`. Hierna kan je `terminal.app` intypen totdat de terminal app verschijnt, op dat moment kan je op enter drukken.
    2. Vul het volgende command in: `export PATH=/usr/local/bin:${PATH}`.
    3. Hierna kan je de command `which mono` gebruiken. Hier zou het volgende uit moeten komen:

    ```bash
    Mono JIT compiler version 6.8.0 (explicit/2701b19 Mon Aug 31 09:57:28 EDT 2019)
    Copyright (C) 2002-2020 Novell, Inc, Xamarin Inc and Contributors. www.mono-project.com
    ```
    Als dit niet het geval is moet je kijken of je mono goed geïnstalleerd hebt.

#### Niet-auto-updater versie MacOS

{:start="2"}
2. Download de GO Mac zip vanaf de downloads hierboven en pak het uit naar een plek op je computer.
3. Nu kan je het programma starten door het bestand `start.command` uitvoeren. Klik hierna op de `i` om te kijken of alles goed is geïnstalleerd. Als er ergens staat `(not found)` moet je kijken of je dit nog een keer kan installeren.

#### Auto-updater versie MacOS

{:start="2"}
2. Download de GO Installer en pak het uit naar een plek op je computer.
3. Je kan nu het programma uitvoeren door het bestand `start-mac.command` uit te voeren. Hierna zou de updater moeten starten en moet je even wachten totdat alles is geïnstalleerd. klik hierna op de `i` om te kijken of alles goed is geïnstalleerd. Als er ergens staat `(not found)` moet je kijken of je dit nog een keer kan installeren.

***

## Linux

**Let op:**
- **Grande Omega wordt niet officieel ondersteund door de developers van Grande Omega. Wij hebben een omweg gevonden door de mac versie te gebruiken en wat dingen aan te passen. Wij weten niet of dit officieel mag van de leraren en wij zijn er dan niet verantwoordelijk voor als het opeens niet mag. Gebruik op linux is op eigen risico.**
- Wij hebben dit getest op Ubuntu 18.04 LTS en 20.04 LTS. Elke versie daar tussenin zou ook moeten werken.
- Er zijn voor Linux twee versies die je kan installeren.
- Zorg dat je installatie van Grande Omega in een pad staat waar geen spatie in zit. Grande Omega werkt dan niet meer. Ook mogen er geen diakrieten in het pad staan. `/home/user1/documents/Grande_Omega` mag dus omdat het geen spaties en diakrieten bevat, maar `/home/user1/documents/Grande Omega` mag dus niet omdat het een spatie heeft in de naam.
- Als Anaconda voor een of andere reden niet werkt kan je [pyenv](https://github.com/pyenv/pyenv/blob/master/README.md) uitproberen.

#### Niet-auto-updater versie Linux

1. Download alle programma's en installeer deze. Je zou in principe niks verder moeten doen dan het installeren van deze programma's.
2. Download de zip en pak alles uit behalve de `node_modules` map en zet dit in een map op je computer.
3. Open een terminal en gebruik `cd` om in deze map te komen met je terminal.
4. Gebruik vervolgens de volgende commands om ervoor te zorgen dat je Grande Omega kan uitvoeren:
    ```bash
    $ npm install
    $ chmod +x start.command
    $ ./start.command
    ```
5. Als het goed is zou Grande Omega nu open moeten staan en kan je op de `i` drukken om te kijken of alle programma's goed zijn geïnstalleerd.

#### Auto-updater versie Linux

1. Download alle programma's en installeer deze. Je zou in principe niks verder moeten doen dan het installeren van deze programma's.
2. Download de zip en pak alles uit behalve de `node_modules` map en zet dit in een map op je computer.
3. Open een terminal en gebruik `cd` om in deze map te komen met je terminal.
4. Gebruik vervolgens de volgende commands om ervoor te zorgen dat je Grande Omega kan uitvoeren:
    ```bash
    $ npm install
    $ chmod +x start-mac.command
    $ ./start-mac.command
    ```
5. Dit zou een venster moeten openen met een installer die dan Grande Omega gaat downloaden. Als deze klaar is opent Grande Omega zelf en kan je op de `i` drukken om te kijken of alle programma's goed geïnstalleerd zijn.
