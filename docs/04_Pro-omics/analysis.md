---
sidebar_position: 3
---

#  蛋白质组学数据分析

## 1. 原始数据处理

### 质谱数据处理流程

```
原始 MS 数据 (.raw/.mzXML)
    ↓ [质量校准]
校准后数据
    ↓ [谱库搜索]
多肽/蛋白质鉴定
    ↓ [定量]
丰度估计
    ↓ [过滤]
高质量蛋白列表
    ↓ [统计分析]
生物学结果
```

### 软件工具

| 工具 | 功能 | 平台 |
|------|------|------|
| **MaxQuant** | 全流程分析 | Windows |
| **Mascot** | 谱库搜索 | Web |
| **Comet** | 快速搜索 | 多平台 |
| **X!Tandem** | 开源搜索 | 多平台 |
| **PEAKS** | AI 增强分析 | 多平台 |

## 2. 蛋白质定量

### 方法对比

| 方法 | 原理 | 准确性 | 应用 |
|------|------|--------|------|
| **Label-free** | 信号强度比较 | 中等 | 大样本 |
| **TMT/iTRAQ** | 同位素标记 | 高 | 多样本比较 |
| **SILAC** | 稳定同位素 | 高 | 长期实验 |
| **Spectral counting** | 谱数比较 | 低 | 粗略估计 |

### 定量分析

```r
# R 示例：LimmaQuant 进行统计

library(limma)

# 创建设计矩阵
design <- model.matrix(~0 + factor(c(1,1,1,2,2,2)))

# 拟合模型
fit <- lmFit(log2_intensity, design)

# 对比
contrast.matrix <- makeContrasts(
  treatments = X1 - X2,
  levels = design
)

fit2 <- contrasts.fit(fit, contrast.matrix)
fit2 <- eBayes(fit2)

# 火山图
volcanoplot(fit2, highlight = 10)
```

## 3. 差异蛋白分析

### 统计检验

- **t 检验**：两组比较
- **ANOVA**：多组比较
- **Mann-Whitney U**：非正态分布
- **Benjamini-Hochberg**：多重检验矫正

### 筛选标准

```
log2(FC) > ±1 (2倍变化)
AND
FDR/P-value < 0.05
```

### 火山图绘制

```python
import matplotlib.pyplot as plt

# 计算 -log10(p-value)
p_val_log = -np.log10(p_values)

# 绘制
plt.scatter(log2_fc, p_val_log, alpha=0.5)
plt.axhline(-np.log10(0.05), color='red', linestyle='--')
plt.axvline(1, color='red', linestyle='--')
plt.axvline(-1, color='red', linestyle='--')
```

## 4. 富集分析

### 通路分析

| 数据库 | 特点 | 工具 |
|--------|------|------|
| **KEGG** | 代谢通路 | DAVID, Cytoscape |
| **GO** | 功能分类 | clusterProfiler |
| **Reactome** | 反应网络 | iPathwayGuide |
| **STRING** | 蛋白互作 | Cytoscape 插件 |

### GO 富集（以 R 为例）

```r
library(clusterProfiler)
library(org.Hs.eg.db)

# 基因 ID 转换
gene_ids <- bitr(gene_names, 
                 fromType="SYMBOL", 
                 toType="ENTREZID",
                 OrgDb=org.Hs.eg.db)

# GO 富集
ego <- enrichGO(gene_ids$ENTREZID, 
                OrgDb = org.Hs.eg.db,
                ont = "BP",
                pAdjustMethod = "BH")

# 绘制
barplot(ego)
```

## 5. 蛋白质互作分析

### 互作网络

```python
import networkx as nx
import matplotlib.pyplot as plt

# 构建网络
G = nx.Graph()
G.add_edges_from(interactions)

# 绘制
pos = nx.spring_layout(G)
nx.draw_networkx(G, pos, 
                 node_color='lightblue',
                 edge_color='gray',
                 with_labels=True)
```

### 网络特征
- **度数**：互作蛋白数量
- **聚类系数**：局部聚集程度
- **最短路径**：蛋白间关联强度

## 6. 修饰分析

### 磷酸化分析

```
磷酸化位点识别
    ↓ [富集性分析]
kinase 富集
    ↓ [网络构建]
Kinase-substrate 网络
    ↓ [生物学解释]
信号通路激活
```

### 工具
- **PhosphoSitePlus**：数据库查询
- **KEASN**：激酶富集分析
- **NetKIN**：预测 kinase 底物

---

参考：[检测技术](methods) | [概述](overview)
