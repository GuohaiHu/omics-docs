---
sidebar_position: 2
---

#  Magnetic Bead Blood DNA Extraction

<img src="/img/magnetic_bead_blood_dna.png" alt="Magnetic bead blood DNA extraction schematic" width="80%" />

#  MGI Magnetic Bead Blood DNA Extraction Protocol

DNA extraction is the cornerstone of genomics research. Its core objective is to efficiently release nucleic acids and remove proteins, lipids, and other inhibitors. This protocol uses the MGI (BGI) magnetic bead blood genomic DNA extraction kit as a reference to detail its molecular principles and operational workflow.

## I. Core Technical Principles

Magnetic bead extraction utilizes the adsorption characteristics of **superparamagnetic nanoparticles** under specific biochemical conditions. Compared to traditional spin-column methods, it offers high automation compatibility and requires no repeated centrifugation, causing less mechanical damage to high-molecular-weight DNA.

### 1. Lysis Stage
* **Core Reagents**: Proteinase K, Lysis Buffer (containing chaotropic salts such as guanidine hydrochloride)
* **Mechanism**: Strong denaturants disrupt cell membranes and nuclear envelopes, while Proteinase K simultaneously degrades histones and nucleases.
* **Result**: Genomic DNA is released from the nucleus and becomes free in the lysis system.

### 2. Binding Stage
* **Core Reagents**: Specific magnetic beads, Binding Buffer (usually containing isopropanol)
* **Mechanism**: Under "high-salt, low-pH" conditions, water molecules detach from the nucleic acid surface, exposing the negatively charged phosphate backbone.
* **Magnetic Bead Interaction**: Magnetic beads surface-modified with specific functional groups (such as hydroxyl or silanol groups) bind specifically to DNA through electrostatic attraction and hydrogen bonding.

### 3. Washing Stage
* **Core Reagents**: Wash Buffer 1 & 2 (mainly containing 70%-80% ethanol)
* **Mechanism**: An external magnetic field immobilizes the "magnetic bead-DNA complex", and ethanol-containing wash buffer removes residual proteins, inorganic salts, and metabolites.
* **Key Point**: The ethanol environment maintains the tight binding between DNA and magnetic beads while physically flushing away impurities.

### 4. Elution Stage
* **Core Reagents**: Elution Buffer (e.g., Tris-HCl or nuclease-free water)
* **Mechanism**: Switching to a "low-salt, high-pH" elution buffer.
* **Result**: Repulsion between the magnetic beads and DNA increases, the hydration layer is re-established, and high-purity DNA is re-dissolved and recovered.

---

## II. Brief Experimental Workflow (using 200 μL whole blood as an example)

> **Note:** Please strictly follow the official version of the instruction manual for the purchased kit (e.g., V1.2 or later).

| Step | Operation | Key Reagent Addition | Key Parameters |
| :--- | :--- | :--- | :--- |
| **1. Sample Pre-treatment** | Transfer 200 μL anticoagulated whole blood to a reaction tube/plate | Blood sample | Mix thoroughly |
| **2. Digestion & Lysis** | Add Proteinase K and lysis buffer | **20 μL Pro K + 200 μL Lysis Buffer** | Incubate at 56°C for 10-15 min |
| **3. Nucleic Acid Binding** | Add magnetic bead suspension and binding buffer, vortex to mix | **20-30 μL magnetic beads + 200 μL Binding Buffer** | Bind at room temperature for 5-10 min |
| **4. Magnetic Separation** | Place on magnetic stand, let it stand until the liquid is clear, aspirate and discard the supernatant | None | Do NOT aspirate the magnetic beads |
| **5. Multi-round Washing** | Add wash buffer to resuspend the beads, magnetically separate again and discard the supernatant | **500 μL Wash Buffer (containing ethanol)** | Usually wash 2-3 times |
| **6. Drying Beads** | Let it stand on the magnetic stand, allow ethanol to evaporate using residual heat or air | None | Observe the bead surface changing from shiny to matte |
| **7. Elution & Recovery** | Add elution buffer, resuspend and incubate | **50-100 μL Elution Buffer** | Incubate at 56°C for 5 min |
| **8. Transfer & Storage** | After magnetic separation, transfer the supernatant containing DNA to a new tube | None | A260/280 should be 1.8-2.0 |
