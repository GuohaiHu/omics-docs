---
sidebar_position: 2
---

#  Metadata Standards

Metadata is information that describes the characteristics of data, ensuring data traceability and reproducibility.

## Core Metadata Categories

### 1. Sample Information

```json
{
  "sample_id": "S001",
  "sample_name": "Liver_Control_Rep1",
  "organism": "Homo sapiens",
  "organism_ncbi_tax_id": 9606,
  "tissue": "liver",
  "cell_type": "hepatocyte",
  "developmental_stage": "adult",
  "disease_status": "normal",
  "treatment": "control"
}
```

### 2. Collection Information

```json
{
  "collection_date": "2024-05-01",
  "collection_method": "biopsy",
  "storage_condition": "-80C",
  "collection_site": "Lab A, Room 101"
}
```

### 3. Technical Methods

```json
{
  "technology": "scRNA-seq",
  "platform": "10X Genomics Chromium",
  "sequencing_type": "paired-end",
  "read_length": "150bp",
  "expected_cells": 5000,
  "sequencing_depth": "50000_reads_per_cell"
}
```

### 4. Processing Information

```json
{
  "processing_date": "2024-05-02",
  "processor": "Dr. Smith",
  "dissociation_enzyme": "Collagenase IV",
  "enzyme_concentration": "0.5 mg/mL",
  "enzyme_incubation_time": "30 min",
  "cell_sorting": "flow_cytometry",
  "sorting_antibodies": ["CD45-FITC", "CD19-PE"]
}
```

### 5. Quality Metrics

```json
{
  "cell_viability": 0.92,
  "cell_count": 45000,
  "library_concentration": 50.5,
  "sequencing_saturation": 0.75,
  "sequencing_quality_score": 30
}
```

## Recommended Metadata Templates

### MIAME Standard (Minimum Information About a Microarray Experiment)

Applicable to expression data:

```yaml
Experiment Title:
Experiment Description:
Experiment Date:

Sample Information:
  - Species
  - Tissue
  - Cell Type
  - Treatment Condition
  - Time Point
  - Biological Replicate

Technical Information:
  - Platform
  - Kit Version
  - Vendor
  - Batch Number

Processing Workflow:
  - Sample Preparation
  - Quality Control
  - Data Processing
  - Normalization Method

Contact Information:
  - Researcher
  - Institution
  - Email
```

### MINSEQE Standard (Minimum Information about Next-generation Sequencing Experiments)

Applicable to sequencing data:

```yaml
Sequencing Metadata:
  Sequencing Instrument:
  Read Length:
  Pair Type: paired/single-end
  Expected Depth:
  Data Format: fastq/bam/vcf

Library Preparation:
  Material: DNA/RNA
  Concentration:
  Fragment Size:
  Adapter Sequence:

Alignment Reference:
  Genome:
  Version:
  Annotation:

QC:
  - Adapter trimming
  - Quality filtering
  - Read length distribution
  - GC content
```

## Validation Checklist

- [ ] All samples have unique IDs
- [ ] Species and tissue information is complete
- [ ] Treatment conditions are clearly documented
- [ ] Quality metrics are available
- [ ] Processor and date are recorded
- [ ] Contact information is traceable
- [ ] Controlled vocabularies are used (if available)
- [ ] Missing values are marked with "NA" or "unknown"

## Controlled Vocabularies

### Tissue Types
```
liver, brain, heart, kidney, lung,
pancreas, spleen, lymph_node, ...
```

### Cell Types (CL ontology)
```
hepatocyte, neuron, cardiomyocyte,
immune_cell, fibroblast, ...
```

### Disease Status
```
normal, disease, infected, treated, ...
```

---

Data format reference: [Data Format Specifications](overview)
