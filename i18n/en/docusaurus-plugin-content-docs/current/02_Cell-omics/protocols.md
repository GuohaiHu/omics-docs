---
sidebar_position: 4
---

#  Cell Omics Protocols

## scRNA-seq Complete Protocol

### Protocol 1: 10X Genomics Chromium

#### Materials List
- Fresh or cryopreserved cells
- 10X Genomics Chromium kit
- Reverse transcription reagents
- cDNA amplification reagents

#### Steps

**Day 1: Cell Preparation**

1. Tissue dissociation (30-60 min)
   - Organ: Collagenase I, 0.5-2 mg/mL, 37°C
   - Final cell concentration: 900-1200 cells/μL

2. Cell counting and sorting
   - Trypan blue viability count
   - Target viability: >90%
   - Cell number: required cells × 1.2

3. Washing and resuspension
   - PBS/0.04% BSA wash
   - Adjust concentration to 700-1200 cells/μL

**Day 2: Droplet Encapsulation**

4. Chromium droplet generation
   - Add GEM oil and cell suspension
   - Generate approximately 10,000 droplets
   - Each droplet contains: 1 cell + 1 barcode bead

5. Reverse transcription reaction
   - 16°C, 45 min (within droplets)
   - Temperature ramp to 37°C
   - 37°C, 45 min

6. Droplet breakage and purification
   - Recover cDNA
   - Remove oil

**Day 3: cDNA Amplification and Library Preparation**

7. cDNA amplification
   - PCR amplification: 4 cycles (13 total cycles)
   - Target: full-length cDNA, high molecular weight

8. Library preparation
   - Fragmentation, end repair, A-tailing
   - Adapter ligation, PCR amplification
   - P7/P7 adapters with sample indices

### Protocol 2: Smart-seq2

#### Features
- Full-length transcript capture
- No microfluidic device required
- Relatively low cost
- Suitable for small sample sizes

#### Workflow (Simplified)

```
Single-cell sorting (flow cytometry)
    ↓
mRNA capture (Oligo-dT beads)
    ↓
First-strand synthesis (reverse transcriptase)
    ↓
Second-strand synthesis (DNA polymerase)
    ↓
cDNA amplification (PCR)
    ↓
Library preparation
    ↓
High-throughput sequencing
```

## Flow Cytometry Standard Operation

### Instrument Setup
- Laser selection: 405 nm, 488 nm, 561 nm (standard configuration)
- Detector calibration: use control beads
- Compensation matrix: use single-stain single cells

### Sample Preparation

| Step | Operation | Time | Temperature |
|------|-----------|------|-------------|
| Cell extraction | Blood or tissue | - | 4°C |
| Red blood cell removal | ACK lysis buffer | 5 min | Room temperature |
| Washing | PBS 2× | 5 min | 4°C |
| Cryopreservation | DMSO 10% | - | -80°C |

### Antibody Labeling

1. Prepare 1-2×10⁶ cells
2. Add antibody cocktail (at recommended dilution)
3. Incubate on ice for 30 minutes
4. Wash 2 times
5. Fix or measure immediately

## Technology Selection Guide

### When to choose 10X?
-  Need high-throughput sequencing (>10,000 cells)
-  Have sufficient samples
-  Need high-throughput analysis

### When to choose Smart-seq2?
-  Limited sample quantity
-  Need full-length transcripts
-  Limited budget

### When to choose flow cytometry?
-  Rapid cell phenotyping
-  Cell sorting
-  Validation of scRNA-seq results

---

Related resources: [Single-Cell Knowledge Base](single_cell_knowledge_base/overview) | [Enzyme Knowledge Base](single_cell_knowledge_base/enzyme_database) | [Tissue Database](single_cell_knowledge_base/tissue_database)
