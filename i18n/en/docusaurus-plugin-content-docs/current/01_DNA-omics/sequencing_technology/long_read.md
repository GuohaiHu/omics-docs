---
sidebar_position: 3
---

#  Long-Read Sequencing Technology

## SMRT / HiFi (PacBio)

**Single Molecule Real-Time (SMRT, 单分子实时测序)** sequencing monitors DNA polymerase in real time as it synthesizes complementary strands.

### HiFi Reads
- **Circular Consensus Sequencing (CCS, 环化共识测序)**: SMRTbell template is read multiple times in a loop.
- Consensus calling produces **HiFi reads** with > 99.9% accuracy and 10–25 kb length.

## Nanopore (Oxford Nanopore Technologies)

**Nanopore sequencing (纳米孔测序)** drives single-stranded DNA through a biological nanopore and measures ionic current changes to identify bases.

### Key Features
- No theoretical read-length limit; records > 2 Mb.
- Real-time data streaming.
- Portable devices (MinION) to high-throughput (PromethION).

## PacBio Workflow

```
SMRTbell Library → Zero-Mode Waveguide (ZMW) Loading → Real-Time Sequencing → CCS Consensus → HiFi Reads
```

## ONT Workflow

```
Adapter-Ligated Library → Flow Cell Priming → Nanopore Translocation → Signal Acquisition → Base Calling
```

## Comparison Table

| Feature | PacBio HiFi | ONT |
|---------|-------------|-----|
| **Read Length** | 10–25 kb (up to ~50 kb) | 10 kb–>2 Mb |
| **Accuracy** | > 99.9% (Q30) | ~99% (Q20–Q30 with R10.4) |
| **Throughput** | High | Very high (PromethION) |
| **Run Time** | 24–30 hours | 48–72 hours |
| **Portability** | No | Yes (MinION) |
| **Epigenetics** | Native (kinetic signals) | Native (current modulation) |
| **Cost per Gb** | Higher | Lower |

## Applications

- **De novo genome assembly** — chromosome-scale, telomere-to-telomere
- **Structural Variant Detection** — large indels, inversions, translocations
- **Phased Variant Calling** — haplotype-resolved genomes
- **Transcript Isoform Sequencing** — full-length RNA-seq (Iso-Seq, FLAIR)
- **Epigenetic Mapping** — 5-mC and 6-mA detection without bisulfite

---

Previous: [Short-Read Sequencing Technology](short_read) | Next: [Standard Data Analysis Pipeline Overview](../data_analysis/overview)
