---
sidebar_position: 2
---

#  API 端点完整列表

## 酶学数据库

### 酶查询
```
GET /enzymes
GET /enzymes/{enzyme_id}
GET /enzymes/search
POST /enzymes/filter
```

| 端点 | 方法 | 描述 | 鉴权 |
|------|------|------|------|
| `/enzymes` | GET | 获取所有酶列表 | API Key |
| `/enzymes/{id}` | GET | 获取特定酶详情 | API Key |
| `/enzymes/search` | GET | 搜索酶（名称、货号） | API Key |
| `/enzymes/filter` | POST | 复杂过滤 | API Key |

### 查询参数示例

```bash
# 按类型查询
GET /enzymes?type=collagenase

# 按组织查询
GET /enzymes?tissue=liver

# 组合查询
GET /enzymes?type=collagenase&tissue=liver&organism=human

# 分页
GET /enzymes?limit=50&offset=100
```

## 组织数据库

```
GET /tissues
GET /tissues/{tissue_id}
GET /tissues/search
POST /tissues/compatibility
```

### 端点说明

| 端点 | 方法 | 返回 | 用途 |
|------|------|------|------|
| `/tissues` | GET | 组织列表 | 浏览所有组织 |
| `/tissues/{id}` | GET | 组织详细信息 | 获取组织特性 |
| `/tissues/search` | GET | 匹配结果 | 按名称搜索 |
| `/tissues/compatibility` | POST | 兼容酶列表 | 查询最佳酶 |

### 兼容性查询
```bash
curl -X POST https://api.omics-db.example.com/v1/tissues/compatibility \
  -H "Content-Type: application/json" \
  -d '{
    "tissue_id": "TISSUE001",
    "organism": "human"
  }'
```

## 单细胞数据

```
GET /scrnaseq/datasets
GET /scrnaseq/cells
GET /scrnaseq/genes
GET /scrnaseq/expression
POST /scrnaseq/query
```

### 数据集

```
GET /scrnaseq/datasets                     # 所有数据集
GET /scrnaseq/datasets/{dataset_id}        # 特定数据集
```

### 细胞查询

```
GET /scrnaseq/cells?dataset_id=xxx&cell_type=hepatocyte
GET /scrnaseq/cells/{cell_id}/metadata
```

### 基因表达

```
GET /scrnaseq/genes?dataset_id=xxx
GET /scrnaseq/expression/{gene_id}?dataset_id=xxx
```

**响应示例**
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

## 空间组学数据

```
GET /spatial/datasets
GET /spatial/positions/{dataset_id}
GET /spatial/heatmap/{gene_id}
GET /spatial/neighbors/{cell_id}
```

### 空间位置

```
GET /spatial/positions?dataset_id=xxx&resolution=55
```

**响应格式**
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

### 空间邻域

```
GET /spatial/neighbors/{cell_id}?dataset_id=xxx
```

## 蛋白质组学数据

```
GET /proteomics/datasets
GET /proteomics/proteins
GET /proteomics/modifications
GET /proteomics/interactions
```

### 蛋白质

```
GET /proteomics/proteins                    # 蛋白质列表
GET /proteomics/proteins/{protein_id}       # 蛋白质详情
```

### 修饰

```
GET /proteomics/modifications/{protein_id}
```

### 相互作用

```
GET /proteomics/interactions?protein_id=xxx
```

## 分析和可视化

```
GET /analysis/correlation
POST /analysis/enrichment
GET /analysis/visualization/{analysis_id}
```

### 富集分析

```
POST /analysis/enrichment

请求体：
{
  "gene_ids": ["ENSG00000000003", "ENSG00000000005"],
  "database": "GO",
  "ontology": "BP"
}
```

## 导出和下载

```
GET /export/enzymes?format=csv
GET /export/tissues?format=xlsx
GET /export/dataset/{dataset_id}?format=h5ad
POST /export/batch
```

### 支持的格式

| 格式 | 用途 | 文件类型 |
|------|------|---------|
| json | 数据交互 | .json |
| csv | 表格数据 | .csv |
| tsv | 制表符分隔 | .tsv |
| xlsx | Excel | .xlsx |
| h5ad | 单细胞 | .h5ad |
| h5 | 矩阵数据 | .h5 |

## 用户和权限

```
GET /user/profile
POST /user/login
POST /user/logout
GET /user/datasets
POST /user/datasets
```

## 统计和日志

```
GET /stats/usage
GET /stats/database_size
GET /logs/requests
```

---

API 概述：[API 概述](overview)
