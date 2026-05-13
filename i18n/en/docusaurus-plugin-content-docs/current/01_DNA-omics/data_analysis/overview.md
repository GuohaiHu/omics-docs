---
sidebar_position: 1
---

#  Standard Data Analysis Pipeline Overview

The data analysis pipeline transforms raw sequencing reads into biologically meaningful insights through a series of standardized computational steps.

## Overall Pipeline

```
Raw Reads (FASTQ)
    ↓ [Quality Control]
Clean Reads
    ↓ [Alignment / Assembly]
BAM / Assembly
    ↓ [Variant Calling / Quantification]
VCF / Expression Matrix
    ↓ [Annotation & Interpretation]
Biological Insights & Reports
```

## Analysis Layers

| Layer | Description | Typical Outputs |
|-------|-------------|-----------------|
| **Primary Analysis** | Base calling, demultiplexing | FASTQ, Run QC reports |
| **Secondary Analysis** | Alignment, variant calling, QC | BAM, VCF, coverage metrics |
| **Tertiary Analysis** | Annotation, interpretation, visualization | Annotated variants, pathway analysis |

## Tool Ecosystem

| Step | Common Tools |
|------|--------------|
| **QC** | FastQC, MultiQC, NanoPlot |
| **Trimming** | fastp, Trimmomatic, Cutadapt |
| **Alignment** | BWA-MEM, Minimap2, Bowtie2 |
| **Variant Calling** | GATK, DeepVariant, Clair3, SAMtools |
| **SV Calling** | Sniffles, cuteSV, SVIM, PBSV |
| **Annotation** | VEP, SnpEff, ANNOVAR |
| **Visualization** | IGV, JBrowse, Circos |

## Data Type Strategies

| Data Type | Primary Strategy | Key Considerations |
|-----------|------------------|--------------------|
| **Short-Read WGS** | BWA-MEM → GATK / DeepVariant | Duplicate marking, BQSR |
| **Long-Read WGS** | Minimap2 → Clair3 / DeepVariant | Haplotype phasing, SV integration |
| **WES** | BWA-MEM → GATK HaplotypeCaller | Capture efficiency, off-target |
| **RNA-seq** | STAR / HISAT2 → featureCounts / Salmon | Splice-aware alignment, normalization |
| **Amplicon** | BWA-MEM → bcftools / GATK | UMI deduplication, primer trimming |

---

Previous: [Long-Read Sequencing Technology](../sequencing_technology/long_read) | Next: [DNA Omics Methods](../methods) | [Analysis Quick Reference](../analysis)
