---
sidebar_position: 10
---

#  DNA 组学实验方法（快速参考）

>  **提示**：本页提供 DNA 组学实验方法的快速参考。更详细的模块内容请参阅：
> - [DNA 和 RNA 提取技术](nucleic_acid_extraction/overview)
> - [核酸检测技术](nucleic_acid_detection/overview)
> - [文库构建技术](library_construction/overview)
> - [测序技术](sequencing_technology/overview)

## 样本准备

### DNA 提取

| 方法 | 优点 | 缺点 | 应用 |
|------|------|------|------|
| **苯酚/氯仿抽提** | 高纯度 | 复杂、有毒 | 科研 |
| **磁珠提取法** | 高通量、自动化 | 成本较高 | 临床/高通量 |
| **柱提取法** | 快速、标准化 | 需离心 | 常规科研 |
| **磁片法提取** | 全自动、一致性高 | 设备昂贵 | 临床检验 |

### DNA 质量检测

```
完整性：琼脂糖凝胶电泳 / 毛细管电泳
纯度：A260/A280 比值 (1.8–2.0)
浓度：Qubit 荧光定量（推荐）或分光光度计
```

## 文库制备

### 标准步骤

1. DNA 片段化（超声破碎或酶切）
2. 末端修复
3. 加 A 尾
4. 接头连接
5. PCR 扩增
6. 片段筛选与纯化

### 参数

- 片段大小：150–800 bp（短读长）；10 kb–>100 kb（长读长）
- 接头浓度：1–2 μM
- PCR 循环数：4–15 轮
- 质量控制：Qubit + Bioanalyzer / TapeStation

## 测序平台选择

| 平台 | 读长 | 通量 | 成本 | 应用 |
|------|------|------|------|------|
| **Illumina** | 2×150 bp | 超高 | 中 | 标准 NGS（WGS/WES/RNA-seq） |
| **MGI DNBSEQ** | 2×100 bp | 超高 | 低 | 人群队列、超高通量 |
| **PacBio Revio** | 10–25 kb | 中 | 高 | 组装、结构变异、全长转录本 |
| **ONT PromethION** | 10 kb–>2 Mb | 高 | 中 | 超长读长、实时测序 |

---

详细内容请参阅各专题模块：
- [DNA 和 RNA 提取技术](nucleic_acid_extraction/overview)
- [核酸检测技术](nucleic_acid_detection/overview)
- [文库构建技术](library_construction/overview)
- [测序技术](sequencing_technology/overview)
- [标准数据分析](data_analysis/overview)
