---
sidebar_position: 1
---

#  Data Format Specifications

This document defines the standard data formats used in the Multi-Omics Database.

## 1. Tabular Data Format

### CSV Format
```csv
gene_id,gene_name,expression,tissue,cell_type
ENSG00000000003,TRNAP35,2.5,liver,hepatocyte
ENSG00000000005,DDLYX,1.8,liver,hepatocyte
```

### Field Requirements
- First row contains column names
- UTF-8 encoding
- Missing values represented by "NA"

## 2. Sequence Data Format

### FASTA Format
```
>sequence_id description
ATCGATCGATCG...

>sequence_id2 description
ATCGATCGATCG...
```

### FASTQ Format
```
@sequence_id description
ATCGATCGATCG...
+
!!!!######...
```

## 3. Metadata Standards

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| sample_id | string | Unique sample identifier | S001 |
| organism | string | Species | human/mouse |
| tissue | string | Tissue | liver/brain |
| cell_type | string | Cell type | hepatocyte |
| treatment | string | Treatment condition | control/stimulated |
| time_point | numeric | Time point (hours) | 0/24/48 |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| batch | string | Batch number |
| replicate | numeric | Replicate number |
| age | numeric | Age |
| disease_status | string | Disease status |
| genotype | string | Genotype |

## 4. Expression Data Matrix

### Standard Form
```
       cell_1  cell_2  cell_3  ...
gene_1   0.5    1.2    0.8
gene_2   2.1    1.5    2.3
gene_3   0.0    0.1    0.0
...
```

### Value Normalization

| Method | Formula | Use Case |
|--------|---------|----------|
| **Raw Count** | None | Raw counts |
| **CPM** | (count/total) × 10⁶ | Depth normalization |
| **RPKM** | CPM / (gene_length/1000) | Gene length correction |
| **TPM** | RPKM / 10⁻⁶ | Cross-sample comparable |
| **log2(CPM+1)** | log₂(CPM+1) | Variance stabilization |

## 5. Single-Cell Data Format

### H5AD Format (Recommended)
```
adata.X                 # Expression matrix (cells × genes)
adata.obs              # Cell metadata
adata.var              # Gene metadata
adata.obsm['X_umap']   # UMAP coordinates
adata.obsm['X_pca']    # PCA coordinates
```

### Metadata Example
```python
import pandas as pd
import anndata

# Create
obs_df = pd.DataFrame({
    'cell_type': ['T_cell', 'B_cell', ...],
    'n_counts': [5000, 6000, ...],
    'n_genes': [2000, 2100, ...]
})

adata = anndata.AnnData(
    X=expression_matrix,
    obs=obs_df
)
```

## 6. Spatial Data Format

### Coordinate File
```
cell_id,x,y,z,expression,cell_type
cell_001,100.5,200.3,0,5.2,hepatocyte
cell_002,101.2,201.1,0,4.8,immune_cell
...
```

### H5SPOT Format (HDF5-based)
```
/coordinates           # (n_cells, 3) coordinates
/expression_matrix     # (n_cells, n_genes) expression
/images                # Raw images
/metadata              # Metadata
```

## 7. Mass Spectrometry Data Format

### mzXML Format
```xml
<?xml version="1.0"?>
<mzXML xmlns="http://sashimi.sourceforge.net/schema_revision/mzXML_3.2">
  <msRun scanCount="1000">
    <scan num="1" msLevel="1" ...>
      <peaks>m/z intensity pairs</peaks>
    </scan>
  </msRun>
</mzXML>
```

### Identification Result Format (PSM)
```
spectrum,peptide,charge,score,mass_error,intensity
S001,PEPTIDEK,2,100,0.5,50000
S002,MKTAYIAKQR,3,95,0.3,45000
```

## 8. Variant Data Format

### VCF Format
```
##fileformat=VCFv4.2
#CHROM  POS     ID  REF ALT QUAL    FILTER  INFO
chr1    100     .   A   T   .       PASS    DP=50;AF=0.5
chr1    200     .   G   C   .       PASS    DP=60;AF=0.75
```

## 9. Naming Conventions

### Standard Naming
```
{species}_{tissue}_{technology}_{batch}_{replicate}
```

### Examples
- `human_liver_scRNAseq_batch01_rep1.h5ad`
- `mouse_brain_Visium_batch02_rep2.csv`
- `human_PBMCs_proteomics_LFQ_batch03.tsv`

## 10. File Compression

### Recommended Compression Formats
- **Gzip (.gz)**: Standard compression
- **Bzip2 (.bz2)**: Higher compression ratio
- **ZIP**: Cross-platform compatibility

### Compression Commands
```bash
gzip large_file.csv      # Create large_file.csv.gz
gunzip large_file.csv.gz # Decompress

tar -czf data.tar.gz data/  # Create archive and compress
tar -xzf data.tar.gz        # Extract archive
```

---

References: [Metadata Standards](metadata) | [Data Standards](../data-standards)
