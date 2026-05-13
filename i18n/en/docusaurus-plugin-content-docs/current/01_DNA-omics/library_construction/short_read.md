---
sidebar_position: 2
---

#  Short-Read Library Construction

## Complete Workflow

```
Input DNA
    ↓ [Fragmentation]
Fragmented DNA (150–800 bp)
    ↓ [End Repair + A-Tailing]
Repaired fragments with 3'-A overhang
    ↓ [Adapter Ligation]
Adapter-ligated fragments
    ↓ [Size Selection / Cleanup]
Target-size enriched library
    ↓ [PCR Amplification]
Indexed library
    ↓ [QC]
Qualified sequencing library
```

## Platform-Specific Types

| Platform | Library Type | Key Feature |
|----------|-------------|-------------|
| **Illumina** | TruSeq, Nextera, DNA Prep | Y-adapters with flow-cell binding sequences |
| **MGI (BGI)** | DNBSEQ | Rolling-circle amplification; patterned arrays |
| **Element** | AVITI | Avidity sequencing; unique adapter chemistry |

## Common Library Types

| Application | Insert Size | Notes |
|-------------|-------------|-------|
| WGS (Whole Genome Sequencing) | 150–500 bp | Standard shotgun |
| WES (Whole Exome Sequencing) | 150–250 bp | Probe capture after prep |
| ChIP-seq | 150–300 bp | Requires ChIP prior to library prep |
| Amplicon | 150–600 bp | PCR-based target enrichment |
| RNA-seq | 150–300 bp | Requires reverse transcription |

## Key Parameters

| Parameter | Typical Value | Impact |
|-----------|---------------|--------|
| **Input DNA** | 1–500 ng | Lower input increases PCR bias risk |
| **Fragment Size** | 150–800 bp | Determines read overlap and resolution |
| **Adapter Concentration** | 1–2 µM | Excess causes adapter dimer artifacts |
| **PCR Cycles** | 4–12 | More cycles increase duplication rate |
| **Library Concentration** | 2–20 nM | Platform-specific loading requirement |

## QC Checkpoints

| Stage | Method | Pass Criteria |
|-------|--------|---------------|
| Post-fragmentation | Bioanalyzer / TapeStation | Expected peak size |
| Post-ligation | Qubit + qPCR | Yield > threshold; no adapter dimers |
| Final library | Bioanalyzer + qPCR | Correct size; concentration verified |

---

Previous: [Library Construction Overview](overview) | Next: [Long-Read Library Construction](long_read)
