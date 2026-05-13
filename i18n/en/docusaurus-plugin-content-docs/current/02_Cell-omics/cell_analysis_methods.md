---
sidebar_position: 3
---

#  Cell Omics Analysis Methods

Cell omics data analysis covers the complete workflow from raw sequencing data to biological conclusions, involving quality control, dimensionality reduction, clustering, cell annotation, trajectory inference, and more.

## Analysis Pipeline Overview

```
Raw Data (FASTQ / Matrix)
    ↓
Quality Control (QC) → Adapter removal / Low-quality cell filtering
    ↓
Alignment / Quantification → Generate expression matrix
    ↓
Data Preprocessing → Normalization / Dimensionality reduction / Batch correction
    ↓
Clustering and Cell Type Annotation
    ↓
Downstream Analysis → Differential expression / Pathway enrichment / Trajectory inference / Cell communication
    ↓
Visualization and Reporting
```

## Core Analysis Steps

### 1. Quality Control (QC)

| Metric | Common Tools | Description |
|--------|-------------|-------------|
| **Genes per cell** | Seurat, Scanpy | Too low may indicate dead cells/empty droplets |
| **Total UMIs per cell** | Seurat, Scanpy | Reflects sequencing depth |
| **Mitochondrial gene ratio** | Seurat, Scanpy | High ratio indicates cell damage or death |
| **Doublets** | Scrublet, DoubletFinder | Two cells in one droplet |

### 2. Data Preprocessing

- **Normalization**: LogNormalize, SCTransform, scran
- **Highly variable gene selection**: Identify genes with largest variance across cells
- **Dimensionality reduction**: PCA → UMAP / t-SNE
- **Batch correction**: Harmony, Seurat CCA, Scanpy BBKNN

### 3. Clustering and Annotation

| Method | Tool | Feature |
|--------|------|---------|
| **Graph clustering** | Seurat (Louvain/Leiden) | Most commonly used, community detection |
| **Reference mapping** | Seurat MapQuery, SingleR | Map query data to reference atlas |
| **Auto-annotation** | CellTypist, scArches | Machine learning-based automatic cell type identification |

### 4. Downstream Analysis

- **Differential expression**: FindAllMarkers, Wilcoxon rank-sum test
- **Pathway enrichment**: GO/KEGG, GSEA, clusterProfiler
- **Pseudotime trajectory**: Monocle3, PAGA, scVelo
- **Cell communication**: CellPhoneDB, CellChat, NicheNet
- **Transcription factor activity**: SCENIC, dorothea

## Common Tool Ecosystem

| Tool/Platform | Language | Main Function |
|---------------|----------|---------------|
| **Seurat** | R | Most comprehensive single-cell analysis suite |
| **Scanpy** | Python | Large-scale single-cell analysis, deeply integrated with AnnData |
| **Scrublet** | Python | Doublet detection |
| **Harmony** | R | Batch effect correction |
| **Monocle3** | R | Pseudotime analysis |
| **CellChat** | R | Cell-cell communication inference |
| **SCENIC** | R/Python | Gene regulatory networks and TF activity |

>  **To be supplemented**: Detailed parameter recommendations, troubleshooting, code examples, performance optimization suggestions.

---

Previous: [Single-Cell Knowledge Base Overview](single_cell_knowledge_base/overview)
