---
sidebar_position: 1
---

#  API Overview

The Multi-Omics Database provides a RESTful API for programmatic access and data querying.

## API Basics

### Base URL
```
https://api.omics-db.example.com/v1
```

### Authentication
Two authentication methods are currently supported:

1. **API Key** (for public data)
```bash
curl -H "X-API-Key: your_api_key" https://api.omics-db.example.com/v1/enzymes
```

2. **OAuth 2.0** (for protected data)
```
Authorization: Bearer {access_token}
```

## Data Endpoints

### 1. Enzyme Database

#### Query Enzyme Information
```
GET /enzymes
GET /enzymes/{enzyme_id}
```

**Parameters**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string |  | Enzyme type (collagenase, protease, etc.) |
| tissue | string |  | Tissue type |
| organism | string |  | Species |
| limit | integer |  | Number of results (default: 20, max: 100) |
| offset | integer |  | Pagination offset |

**Example Request**
```bash
curl "https://api.omics-db.example.com/v1/enzymes?type=collagenase&tissue=liver&limit=10"
```

**Response**
```json
{
  "data": [
    {
      "enzyme_id": "ENZ001",
      "enzyme_name": "Collagenase I",
      "type": "collagenase",
      "catalog_number": "C0130",
      "vendor": "Sigma",
      "substrate": "Collagen I, II, III",
      "optimal_ph": "7.0-8.0",
      "temperature": "37C",
      "cofactors": ["Ca2+"],
      "tissue_applicability": ["liver", "heart"],
      "working_concentration": "0.5-2 mg/mL"
    }
  ],
  "pagination": {
    "total": 50,
    "limit": 10,
    "offset": 0
  }
}
```

### 2. Tissue Database

#### Query Tissue Information
```
GET /tissues
GET /tissues/{tissue_id}
```

**Example**
```bash
curl "https://api.omics-db.example.com/v1/tissues?organism=human&name=liver"
```

**Response**
```json
{
  "data": [
    {
      "tissue_id": "TISSUE001",
      "name": "liver",
      "organism": "human",
      "ecm_components": ["Collagen I", "Collagen IV"],
      "fat_content": "5%",
      "fibrosis_level": "medium",
      "cell_density": "high",
      "special_challenges": ["high hemoglobin"],
      "recommended_enzymes": ["Collagenase IV", "DNase I"],
      "reference": "PMID: 31092422"
    }
  ]
}
```

### 3. Single-Cell Data

#### Query Single-Cell Expression Data
```
GET /scrnaseq/data
GET /scrnaseq/expression/{gene_id}
```

**Parameters**
```
dataset_id: Dataset identifier
cell_type: Cell type filter
tissue: Tissue filter
```

**Example**
```bash
curl "https://api.omics-db.example.com/v1/scrnaseq/expression/ENSG00000000003?dataset_id=DST001&tissue=liver"
```

### 4. Spatial Omics Data

#### Query Spatial Expression Information
```
GET /spatial/positions
GET /spatial/heatmap/{gene_id}
```

**Example Response**
```json
{
  "data": {
    "positions": [
      {"x": 100.5, "y": 200.3, "cell_id": "C001", "intensity": 5.2},
      {"x": 101.2, "y": 201.1, "cell_id": "C002", "intensity": 4.8}
    ],
    "resolution": "55_micrometers"
  }
}
```

### 5. Proteomics Data

#### Query Protein Information
```
GET /proteomics/proteins
GET /proteomics/proteins/{protein_id}
```

## HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | No permission to access |
| 404 | Not Found | Resource does not exist |
| 500 | Server Error | Server error |

## Rate Limiting

```
X-RateLimit-Limit: 1000          # Maximum requests per hour
X-RateLimit-Remaining: 999       # Remaining requests
X-RateLimit-Reset: 1609459200    # Reset timestamp
```

## Error Handling

### Error Response Example
```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid tissue type: xyz",
    "details": {
      "parameter": "tissue",
      "valid_values": ["liver", "brain", "heart"]
    }
  }
}
```

## SDK / Client Libraries

### Python
```python
import requests

api_key = "your_api_key"
headers = {"X-API-Key": api_key}

response = requests.get(
    "https://api.omics-db.example.com/v1/enzymes",
    params={"type": "collagenase"},
    headers=headers
)

enzymes = response.json()["data"]
```

### R
```r
library(httr)

api_key <- "your_api_key"
url <- "https://api.omics-db.example.com/v1/enzymes"

response <- GET(url,
                query = list(type = "collagenase"),
                add_headers("X-API-Key" = api_key))

enzymes <- content(response, as = "parsed")
```

## Batch Operations

### Batch Query
```bash
curl -X POST https://api.omics-db.example.com/v1/enzymes/batch \
  -H "Content-Type: application/json" \
  -d '{
    "enzyme_ids": ["ENZ001", "ENZ002", "ENZ003"]
  }'
```

## Export Functionality

### Supported Formats
- JSON
- CSV
- TSV
- Excel (.xlsx)
- HDF5 (for matrix data)

### Export Example
```bash
curl "https://api.omics-db.example.com/v1/enzymes/export?format=csv&type=collagenase" \
  -o enzymes.csv
```

---

Detailed endpoint list: [Endpoint Reference](endpoints)
