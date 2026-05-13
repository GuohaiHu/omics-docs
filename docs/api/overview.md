---
sidebar_position: 1
---

#  API 概述

多组学数据库提供了 RESTful API，允许程序化访问和查询数据。

## API 基础

### 基 URL
```
https://api.omics-db.example.com/v1
```

### 认证
当前支持两种认证方式：

1. **API Key**（用于公开数据）
```bash
curl -H "X-API-Key: your_api_key" https://api.omics-db.example.com/v1/enzymes
```

2. **OAuth 2.0**（用于受保护数据）
```
Authorization: Bearer {access_token}
```

## 数据端点

### 1. 酶学数据库

#### 查询酶信息
```
GET /enzymes
GET /enzymes/{enzyme_id}
```

**参数**
| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| type | string |  | 酶类型 (collagenase, protease, etc.) |
| tissue | string |  | 组织类型 |
| organism | string |  | 物种 |
| limit | integer |  | 返回结果数 (默认: 20, 最大: 100) |
| offset | integer |  | 分页偏移 |

**示例请求**
```bash
curl "https://api.omics-db.example.com/v1/enzymes?type=collagenase&tissue=liver&limit=10"
```

**响应**
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

### 2. 组织数据库

#### 查询组织信息
```
GET /tissues
GET /tissues/{tissue_id}
```

**示例**
```bash
curl "https://api.omics-db.example.com/v1/tissues?organism=human&name=liver"
```

**响应**
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

### 3. 单细胞数据

#### 查询单细胞表达数据
```
GET /scrnaseq/data
GET /scrnaseq/expression/{gene_id}
```

**参数**
```
dataset_id: 数据集标识
cell_type: 细胞类型过滤
tissue: 组织过滤
```

**示例**
```bash
curl "https://api.omics-db.example.com/v1/scrnaseq/expression/ENSG00000000003?dataset_id=DST001&tissue=liver"
```

### 4. 空间组学数据

#### 查询空间表达信息
```
GET /spatial/positions
GET /spatial/heatmap/{gene_id}
```

**响应示例**
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

### 5. 蛋白质组学数据

#### 查询蛋白质信息
```
GET /proteomics/proteins
GET /proteomics/proteins/{protein_id}
```

## HTTP 状态码

| 代码 | 意义 | 描述 |
|------|------|------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 需要认证 |
| 403 | Forbidden | 无权限访问 |
| 404 | Not Found | 资源不存在 |
| 500 | Server Error | 服务器错误 |

## 速率限制

```
X-RateLimit-Limit: 1000          # 每小时最大请求数
X-RateLimit-Remaining: 999       # 剩余请求数
X-RateLimit-Reset: 1609459200    # 重置时间戳
```

## 错误处理

### 错误响应示例
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

## SDK / 客户端库

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

## 批量操作

### 批量查询
```bash
curl -X POST https://api.omics-db.example.com/v1/enzymes/batch \
  -H "Content-Type: application/json" \
  -d '{
    "enzyme_ids": ["ENZ001", "ENZ002", "ENZ003"]
  }'
```

## 导出功能

### 支持的格式
- JSON
- CSV
- TSV
- Excel (.xlsx)
- HDF5（适用于矩阵数据）

### 导出示例
```bash
curl "https://api.omics-db.example.com/v1/enzymes/export?format=csv&type=collagenase" \
  -o enzymes.csv
```

---

详细端点列表：[端点参考](endpoints)
