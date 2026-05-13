---
sidebar_position: 2
---

#  Short-Read Sequencing Technology

## Core Principles

### Sequencing by Synthesis (SBS, 合成测序法)
Used by **Illumina**:
1. Cluster generation via bridge amplification on flow cell.
2. Reversible terminator nucleotides incorporate one base per cycle.
3. Fluorescent imaging identifies each base.
4. Chemical cleavage prepares for next cycle.

### cPAS / DNBSEQ (Combinatorial Probe Anchor Synthesis)
Used by **MGI (BGI)**:
1. DNA Nanoball (DNB) generation via rolling-circle amplification.
2. Patterned array loading for high-density clustering.
3. Probe-anchor hybridization with fluorescence detection.

## Workflow

```
Library Preparation → Cluster / DNB Generation → Sequencing → Image Analysis → Base Calling
```

## Performance Metrics

| Metric | Typical Value |
|--------|---------------|
| **Read Length** | 50–300 bp (paired-end) |
| **Accuracy (Q30)** | > 85% |
| **Run Time** | 1–4 days |
| **Data Output** | Up to 6 Tb per run (NovaSeq X) |

## Instrument Comparison

| Instrument | Manufacturer | Output / Run | Best Application |
|------------|-------------|--------------|------------------|
| MiSeq | Illumina | 0.3–15 Gb | Targeted panels, validation |
| NextSeq 1000/2000 | Illumina | 20–330 Gb | WES, medium WGS |
| NovaSeq X/X Plus | Illumina | 1–6 Tb | Large WGS, population |
| DNBSEQ-T7 | MGI | 1–6 Tb | High-throughput WGS |
| DNBSEQ-G99 | MGI | 8–96 Gb | Rapid, small-scale |

## Applications

- **Whole Genome Sequencing (WGS)** — variant discovery, population genetics
- **Whole Exome Sequencing (WES)** — coding-region focused, cost-effective
- **RNA-seq** — gene expression, splice variant detection
- **ChIP-seq / ATAC-seq** — epigenetic profiling
- **Metagenomics** — microbial community composition

---

Previous: [Sequencing Technology Overview](overview) | Next: [Long-Read Sequencing Technology](long_read)
