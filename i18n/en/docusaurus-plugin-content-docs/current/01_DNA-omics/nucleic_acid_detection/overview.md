---
sidebar_position: 1
---

#  Nucleic Acid Detection Overview

Nucleic acid detection (核酸检测) is the quality control checkpoint between sample preparation and library construction. Accurate quantification and integrity assessment ensure that only qualified material proceeds to downstream workflows.

## Detection Position in Workflow

```
Sample Collection → Nucleic Acid Extraction → [Detection] → Library Construction → Sequencing
```

## Key Metrics

| Metric | What It Measures | Typical Threshold |
|--------|-----------------|-------------------|
| **Concentration** | Total yield (ng/µL) | Platform-dependent |
| **Purity (A260/A280)** | Protein contamination | 1.8–2.0 (DNA); 1.8–2.1 (RNA) |
| **Purity (A260/A230)** | Organic/carbohydrate contamination | 2.0–2.2 |
| **Integrity** | Fragment size distribution | No smearing (DNA); RIN ≥ 7 (RNA) |

## Technology Categories

| Category | Method | Application |
|----------|--------|-------------|
| **Spectrophotometry** | UV absorbance (Nanodrop) | Quick purity and concentration estimate |
| **Fluorometry** | Qubit, PicoGreen/RiboGreen | Accurate, specific quantification |
| **Electrophoresis** | Agarose gel, Bioanalyzer, Fragment Analyzer | Integrity and size profiling |
| **Capillary Electrophoresis** | TapeStation, LabChip | High-resolution size and quality metrics |

## Comparison Table

| Technology | Sensitivity | Accuracy | Throughput | Cost |
|------------|-------------|----------|------------|------|
| UV Spectrophotometry | Low | Moderate | High | Low |
| Fluorometry | High | High | Medium | Medium |
| Gel Electrophoresis | Moderate | Low | Low | Low |
| Capillary / Microfluidic | High | High | Medium | High |

---

Previous: [Trizol Tissue RNA Extraction](../nucleic_acid_extraction/trizol_tissue_rna) | Next: [Library Construction Overview](../library_construction/overview)
