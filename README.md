<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Network Flow Visualizer</h3>

  <p align="center">
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/LynnHaDo/Network-Flow/issues">Report Bug</a>
    ·
    <a href="https://github.com/LynnHaDo/Network-Flow/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#works-cited">Works Cited</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This is my attempt to create an interactive tool that helps reinforce the basic idea behind network flow algorithm.

<p align="right">(<a href="#top">back to top</a>)</p>

### Features

- [x] Allow the user to select a source vertex and a sink.
- [x] Allow the user to (repeatedly) click an edge (on one of the paths) from the source to the sink, vertex-by-vertex, to send a unit of flow across that edge. 
- [x] Check user's flow capacity constraint.
- [x] Check if the flow is valid. If yes, proceed to ask the user to calculate the flow value; check if it is correct (it should be the sum of the flow on edges out of the source = sum of flow on edges into sink).

See the [open issues](https://github.com/LynnHaDo/Network-Flow/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- Angular 16.2.12
- Cytoscape 3.28.1

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting started

### Prerequisites

- Angular CLI: 16.2.13
- Node: 18.18.2
- Package Manager: npm 9.8.1
- Angular: 16.2.12

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1602.13
@angular-devkit/build-angular   16.2.13
@angular-devkit/core            16.2.13
@angular-devkit/schematics      16.2.13
@angular/cdk                    16.2.14
@angular/cli                    16.2.13
@angular/material               16.2.14
@schematics/angular             16.2.13
rxjs                            7.8.1
typescript                      5.1.6
zone.js                         0.13.3

### Installation

Steps to run the project locally

1. Make sure you install the correct version of the packages listed above
2. Git clone the project

```
git clone https://github.com/LynnHaDo/Network-Flow.git
```

3. Navigate to the `graph` folder

```
cd graph
```

4. Install packages

```
npm install
```

5. Run the app on server

```
ng s
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Works cited

*Cytoscape.js: a graph theory library for visualisation and analysis*

Franz M, Lopes CT, Huck G, Dong Y, Sumer O, Bader GD

[Bioinformatics (2016) 32 (2): 309-311 first published online September 28, 2015 doi:10.1093/bioinformatics/btv557](https://bioinformatics.oxfordjournals.org/content/32/2/309) [(PDF)](http://bioinformatics.oxfordjournals.org/content/32/2/309.full.pdf)

- [PubMed abstract for the original 2016 article](http://www.ncbi.nlm.nih.gov/pubmed/26415722)
- [PubMed abstract for the 2023 update article](https://pubmed.ncbi.nlm.nih.gov/36645249)

## Contact

If you have any inquiries, please reach out to me via email (do24l@mtholyoke.edu).


