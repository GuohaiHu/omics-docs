---
sidebar_position: 3
---

#  细胞组学分析方法

细胞组学（Cell Omics）数据分析涵盖从原始测序数据到生物学结论的全流程，涉及质量控制、降维聚类、细胞注释、轨迹推断等多个关键步骤。

## 分析流程概览

```
原始数据 (FASTQ / Matrix)
    ↓
质量控制 (QC) → 去接头 / 去低质量细胞
    ↓
比对 / 定量 → 生成表达矩阵
    ↓
数据预处理 → 归一化 / 降维 / 批次校正
    ↓
聚类与细胞类型注释
    ↓
下游分析 → 差异表达 / 通路富集 / 轨迹推断 / 细胞通讯
    ↓
可视化与报告
```

## 核心分析步骤

### 1. 质量控制 (QC)

| 指标 | 常用工具 | 说明 |
|------|---------|------|
| **每个细胞检测到的基因数** | Seurat, Scanpy | 过低可能是死细胞/空液滴 |
| **每个细胞总 UMI 数** | Seurat, Scanpy | 反映测序深度 |
| **线粒体基因比例** | Seurat, Scanpy | 过高提示细胞损伤或死亡 |
| **双细胞 (Doublet)** | Scrublet, DoubletFinder | 一个液滴中包含两个细胞 |

### 2. 数据预处理

- **归一化**：LogNormalize, SCTransform, scran
- **高变基因选择**：寻找跨细胞变异最大的基因
- **降维**：PCA → UMAP / t-SNE
- **批次校正**：Harmony, Seurat CCA, Scanpy BBKNN

### 3. 聚类与注释

| 方法 | 工具 | 特点 |
|------|------|------|
| **图聚类** | Seurat (Louvain/Leiden) | 最常用，社区发现算法 |
| **参考映射** | Seurat MapQuery, SingleR | 将查询数据映射到参考图谱 |
| **自动注释** | CellTypist, scArches | 基于机器学习的自动细胞类型识别 |

### 4. 下游分析

- **差异表达分析**：FindAllMarkers, Wilcoxon rank-sum test
- **通路富集分析**：GO/KEGG, GSEA, clusterProfiler
- **拟时序轨迹推断**：Monocle3, PAGA, scVelo
- **细胞通讯分析**：CellPhoneDB, CellChat, NicheNet
- **转录因子活性**：SCENIC, dorothea

## 常用工具生态

| 工具/平台 | 语言 | 主要功能 |
|-----------|------|---------|
| **Seurat** | R | 最全面的单细胞分析套件 |
| **Scanpy** | Python | 大规模单细胞分析，与 AnnData 深度集成 |
| **Scrublet** | Python | 双细胞检测 |
| **Harmony** | R | 批次效应校正 |
| **Monocle3** | R | 拟时序分析 |
| **CellChat** | R | 细胞间通讯推断 |
| **SCENIC** | R/Python | 基因调控网络与转录因子活性 |

>  **待补充**：各分析步骤的详细参数推荐、常见问题排查、代码示例、性能优化建议。

---

Previous: [单细胞知识库概述](single_cell_knowledge_base/overview)
