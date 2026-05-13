---
sidebar_position: 1
---

#  Library Construction Overview

A sequencing library (测序文库) is a collection of DNA fragments that have been modified with platform-specific adapters, enabling them to be sequenced on high-throughput instruments.

## Core Position in Workflow

Library construction bridges raw nucleic acids and the sequencing instrument:

```
Extracted DNA/RNA → [Library Construction] → Quality Control → Sequencing
```

## General Steps

1. **Fragmentation** (or size selection for long-read)
   - Mechanical shearing (sonication), enzymatic digestion, or targeted amplification
2. **End Repair**
   - Blunt-end or A-tailing to prepare fragment ends
3. **Adapter Ligation**
   - Platform-specific adapters added to both ends
4. **Size Selection / Cleanup**
   - Magnetic bead-based or gel-based selection of desired fragment sizes
5. **Amplification (optional)**
   - PCR to enrich adapter-ligated fragments and add index/barcodes
6. **Quality Control**
   - qPCR, Bioanalyzer, or Qubit validation

## Short-Read vs Long-Read Differences

| Aspect | Short-Read Library | Long-Read Library |
|--------|-------------------|-------------------|
| **Input DNA** | Lower amount; fragmented | High amount; HMW required |
| **Fragment Size** | 150–800 bp | 10 kb–>100 kb |
| **Adapter Design** | Y-shaped, dual-index | Hairpin, bell-adapters (PacBio); ligation (ONT) |
| **PCR Cycles** | Usually 4–12 | Often 0–5 (PCR-free preferred) |
| **Library Prep Time** | 3–6 hours | 1–2 days |

---

Previous: [Nucleic Acid Detection](../nucleic_acid_detection/overview) | Next: [Short-Read Library Construction](short_read)
