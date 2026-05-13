---
sidebar_position: 3
---

#  空间组学数据分析

## 数据处理流程

```
原始成像数据
    ↓ [图像处理]
处理后的图像
    ↓ [分割]
细胞掩膜
    ↓ [定量]
细胞 × 基因矩阵
    ↓ [注释]
细胞类型标签
    ↓ [空间分析]
空间模式与相互作用
```

## 1. 图像处理

### 预处理
- 背景减除
- 光漂白补正
- 配准和校准

### 工具
- **FIJI/ImageJ**：基础图像处理
- **Stitcher**：图像拼接
- **WARP**：配准

## 2. 细胞分割

### 方法

| 方法 | 优点 | 缺点 | 工具 |
|------|------|------|------|
| 阈值分割 | 快速 | 准确度低 | ImageJ |
| 分水岭 | 自动分离 | 过度分割 | OpenCV |
| 深度学习 | 高准确度 | 需标注数据 | Cellpose |
| 主动轮廓 | 自适应 | 计算慢 | Icy |

### 推荐工作流

```python
import cellpose
from cellpose import models

# 加载预训练模型
model = models.Cellpose(gpu=True, model_type='nuclei')

# 分割核
masks, _, _, _ = model.eval(images, 
                             diameter=50,
                             channels=[0,0])
```

## 3. 定量分析

### 单细胞定量
```
每个分割的细胞：
- 基因表达量（荧光强度）
- 空间位置（x, y, z）
- 细胞形态特征
```

### 统计分析
- 基因表达分布
- 细胞类型丰度
- 空间自相关分析

## 4. 空间分析

### 空间聚类
```python
import scanpy as sc
import squidpy as sq

# 聚类
sc.tl.leiden(adata, resolution=0.5)

# 空间邻域图
sq.gr.spatial_neighbors(adata)

# 空间自相关
sq.gr.spatial_autocorr(adata)
```

### 热点检测
- 识别基因表达聚类
- 定位细胞类型富集区

### 相互作用分析
- 细胞-细胞接触
- 信号通路局部化
- 微环境特征

## 5. 可视化

### 标准输出

```
空间图：
├── 基因表达热图
├── 细胞类型分布
├── 聚类图谱
└── 交互作用网络图
```

### 工具
- **Seurat**：R 包
- **Squidpy**：Python 库
- **Giotto**：综合分析

## 应用案例

### 案例 1：肿瘤微环境分析
- 免疫浸润区域识别
- 间质成分定位
- 血管密度分析

### 案例 2：神经回路研究
- 神经元亚型定位
- 突触位置确定
- 胶质细胞分布

---

参考：[技术方法](methods) | [概述](overview)
