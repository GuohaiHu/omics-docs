---
sidebar_position: 2
---

#  API Endpoint Complete List

## Enzyme Database

### Enzyme Queries
```
GET /enzymes
GET /enzymes/{enzyme_id}
GET /enzymes/search
POST /enzymes/filter
```

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| `/enzymes` | GET | Get all enzyme list | API Key |
| `/enzymes/{id}` | GET | Get specific enzyme details | API Key |
| `/enzymes/search` | GET | Search enzymes (name, catalog number) | API Key |
| `/enzymes/filter` | POST | Complex filtering | API Key |

### Query Parameter Examples

```bash
# Query by type
GET /enzymes?type=collagenase

# Query by tissue
GET /enzymes?tissue=liver

# Combined query
GET /enzymes?type=collagenase&tissue=liver&organism=human

# Pagination
GET /enzymes?limit=50&offset=100
```

## Tissue Database

```
GET /tissues
GET /tissues/{tissue_id}
GET /tissues/search
POST /tissues/compatibility
```

### Endpoint Descriptions

| Endpoint | Method | Returns | Purpose |
|----------|--------|---------|---------|
| `/tissues` | GET | Tissue list | Browse all tissues |
| `/tissues/{id}` | GET | Tissue details | Get tissue characteristics |
| `/tissues/search` | GET | Matching results | Search by name |
| `/tissues/compatibility` | POST | Compatible enzyme list | Query best enzymes |

### Compatibility Query
```bash
curl -X POST https://api.omics-db.example.com/v1/tissues/compatibility \
  -H "Content-Type: application/json" \
  -d '{
    "tissue_id": "TISSUE001",
    "organism": "human"
  }'
```

## Single-Cell Data

```
GET /scrnaseq/datasets
GET /scrnaseq/cells
GET /scrnaseq/genes
GET /scrnaseq/expression
POST /scrnaseq/query
```

### Datasets

```
GET /scrnaseq/datasets                     # All datasets
GET /scrnaseq/datasets/{dataset_id}        # Specific dataset
```

### Cell Queries

```
GET /scrnaseq/cells?dataset_id=xxx&cell_type=hepatocyte
GET /scrnaseq/cells/{cell_id}/metadata
```

### Gene Expression

```
GET /scrnaseq/genes?dataset_id=xxx
GET /scrnaseq/expression/{gene_id}?dataset_id=xxx
```

**Example Response**
```json
{
  "data": {
    "gene_id": "ENSG00000000003",
    "gene_name": "TRNAP35",
    "cells": 5000,
    "tissue": "liver",
    "expression_statistics": {
      "mean": 2.5,
      "median": 2.0,
      "min": 0,
      "max": 10,
      "expressing_cells": 0.95
    }
  }
}
```

## Spatial Omics Data

```
GET /spatial/datasets
GET /spatial/positions/{dataset_id}
GET /spatial/heatmap/{gene_id}
GET /spatial/neighbors/{cell_id}
```

### Spatial Positions

```
GET /spatial/positions?dataset_id=xxx&resolution=55
```

**Response Format**
```json
{
  "data": {
    "positions": [
      {
        "cell_id": "C001",
        "x": 100.5,
        "y": 200.3,
        "z": 0,
        "expression": {...},
        "cell_type": "hepatocyte"
      }
    ],
    "grid_resolution": "55 micrometers"
  }
}
```

### Spatial Neighbors

```
GET /spatial/neighbors/{cell_id}?dataset_id=xxx
```

## Proteomics Data

```
GET /proteomics/datasets
GET /proteomics/proteins
GET /proteomics/modifications
GET /proteomics/interactions
```

### Proteins

```
GET /proteomics/proteins                    # Protein list
GET /proteomics/proteins/{protein_id}       # Protein details
```

### Modifications

```
GET /proteomics/modifications/{protein_id}
```

### Interactions

```
GET /proteomics/interactions?protein_id=xxx
```

## Analysis and Visualization

```
GET /analysis/correlation
POST /analysis/enrichment
GET /analysis/visualization/{analysis_id}
```

### Enrichment Analysis

```
POST /analysis/enrichment

Request body:
{
  "gene_ids": ["ENSG00000000003", "ENSG00000000005"],
  "database": "GO",
  "ontology": "BP"
}
```

## Export and Download

```
GET /export/enzymes?format=csv
GET /export/tissues?format=xlsx
GET /export/dataset/{dataset_id}?format=h5ad
POST /export/batch
```

### Supported Formats

| Format | Purpose | File Type |
|--------|---------|-----------|
| json | Data exchange | .json |
| csv | Tabular data | .csv |
| tsv | Tab-delimited | .tsv |
| xlsx | Excel | .xlsx |
| h5ad | Single-cell | .h5ad |
| h5 | Matrix data | .h5 |

## User and Permissions

```
GET /user/profile
POST /user/login
POST /user/logout
GET /user/datasets
POST /user/datasets
```

## Statistics and Logs

```
GET /stats/usage
GET /stats/database_size
GET /logs/requests
```

---

API Overview: [API Overview](overview)
