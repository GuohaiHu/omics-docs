---
sidebar_position: 2
---

#  元数据标准

元数据是描述数据特征的信息，确保数据的可追溯性和再现性。

## 核心元数据类别

### 1. 样本信息

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

### 2. 采集信息

```json
{
  "collection_date": "2024-05-01",
  "collection_method": "biopsy",
  "storage_condition": "-80C",
  "collection_site": "Lab A, Room 101"
}
```

### 3. 技术方法

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

### 4. 处理信息

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

### 5. 质量指标

```json
{
  "cell_viability": 0.92,
  "cell_count": 45000,
  "library_concentration": 50.5,
  "sequencing_saturation": 0.75,
  "sequencing_quality_score": 30
}
```

## 推荐的元数据模板

### MIAME 标准 (Minimum Information About a Microarray Experiment)

适用于表达数据：

```yaml
实验标题:
实验描述:
实验时间:

样本信息:
  - 物种
  - 组织
  - 细胞类型
  - 处理条件
  - 时间点
  - 生物学重复

技术信息:
  - 平台
  - 试剂盒版本
  - 提供商
  - 批次号

处理流程:
  - 样本制备
  - 质量控制
  - 数据处理
  - 标准化方法

联系信息:
  - 研究人员
  - 机构
  - Email
```

### MINSEQE 标准 (Minimum Information about Next-generation Sequencing Experiments)

适用于测序数据：

```yaml
测序元数据:
  测序仪器:
  读长:
  配对类型: paired/single-end
  预期深度:
  数据格式: fastq/bam/vcf

文库制备:
  材料: DNA/RNA
  浓度:
  片段大小:
  接头序列:

比对参考:
  基因组:
  版本:
  注释:

QC:
  - 去接头
  - 质量过滤
  - 读长分布
  - GC 含量
```

## 验证检查清单

- [ ] 所有样本都有唯一 ID
- [ ] 物种和组织信息完整
- [ ] 处理条件明确记录
- [ ] 质量指标可用
- [ ] 处理者和日期记录
- [ ] 联系信息可追溯
- [ ] 使用受控词汇表（如果可用）
- [ ] 缺失值用 "NA" 或 "unknown" 标记

## 受控词汇表

### 组织类型
```
liver, brain, heart, kidney, lung,
pancreas, spleen, lymph_node, ...
```

### 细胞类型 (CL ontology)
```
hepatocyte, neuron, cardiomyocyte,
immune_cell, fibroblast, ...
```

### 疾病状态
```
normal, disease, infected, treated, ...
```

---

数据格式参考：[数据格式规范](overview)
