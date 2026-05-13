---
sidebar_position: 1
---

#  Sequencing Technology Overview

## Evolution of Sequencing

```
Sanger Sequencing (1977) → Next-Generation Sequencing (NGS, ~2005) → Third-Generation Sequencing (TGS, ~2010+)
```

| Generation | Read Length | Throughput | Key Platforms |
|------------|-------------|------------|---------------|
| **First (Sanger)** | 500–1,000 bp | Very low | ABI 3730 |
| **Second (NGS)** | 50–300 bp | Ultra-high | Illumina, MGI, Element |
| **Third (TGS)** | 10 kb–>2 Mb | Medium | PacBio, Oxford Nanopore |

## Short-Read vs Long-Read

| Aspect | Short-Read (短读长) | Long-Read (长读长) |
|--------|---------------------|---------------------|
| **Accuracy** | Very high (> 99.9%) | High (> 99.9% HiFi; ~99% ONT) |
| **Read Length** | 50–300 bp | 10 kb–>100 kb |
| **Throughput** | Massive | Large |
| **Cost per Base** | Very low | Moderate |
| **Structural Variants** | Poor | Excellent |
| **Repetitive Regions** | Difficult | Excellent |
| **Phasing** | Limited | Full chromosome-scale |

## Platform Overview

| Platform | Technology | Read Length | Best For |
|----------|------------|-------------|----------|
| **Illumina** | Sequencing by Synthesis (SBS) | 2×150 bp | WGS, WES, RNA-seq |
| **MGI (BGI)** | cPAS / DNBSEQ | 2×100 bp | WGS, population-scale |
| **PacBio** | SMRT / HiFi | 10–25 kb | Assembly, SV, epigenetics |
| **Oxford Nanopore** | Nanopore | 10 kb–>2 Mb | Real-time, ultra-long, field |

## Decision Tree

```
What is your primary goal?
├── High accuracy + low cost per base → Short-Read (Illumina / MGI)
├── De novo assembly / structural variants → Long-Read (PacBio HiFi)
├── Real-time / ultra-long / portability → Long-Read (ONT)
└── Balanced cost and resolution → Hybrid (Short + Long)
```

---

Previous: [Long-Read Library Construction](../library_construction/long_read) | Next: [Short-Read Sequencing Technology](short_read)
