---
sidebar_position: 1
---

#  标准数据分析流程概述

数据分析是将原始测序数据转化为生物学见解的核心环节。一个规范的分析流程能够确保结果的可靠性、可重复性和生物学可解释性。

## 整体分析流程

```
原始测序数据（FASTQ）
    ↓
质量控制（QC）→ FastQC / MultiQC
    ↓
数据预处理 → 去接头 / 去低质量碱基 / 去重复
    ↓
序列比对 / 组装 → BWA / Minimap2 / de novo assembler
    ↓
变异 / 表达 / 修饰检测 → GATK / featureCounts / MACS2
    ↓
注释与功能分析 → ANNOVAR / VEP / GO / KEGG
    ↓
可视化与报告 → IGV / R / Python
    ↓
生物学结论
```

## 分析层级

| 层级 | 核心任务 | 常用工具 |
|------|---------|---------|
| **原始数据处理** | 质控、过滤、去接头 | FastQC, Trimmomatic, Cutadapt, SOAPnuke |
| **比对 / 组装** | 序列定位到参考基因组或从头组装 | BWA, Bowtie2, STAR, Minimap2, SPAdes, Canu |
| **特征检测** | SNP/InDel、CNV/SV、表达量、甲基化位点 | GATK, Samtools, DELLY, DESeq2, Bismark |
| **注释与解读** | 变异功能注释、通路富集 | VEP, SnpEff, ANNOVAR, clusterProfiler |
| **可视化** | 基因组浏览器、统计图表 | IGV, UCSC Genome Browser, R (ggplot2) |

## 常用分析工具生态概览

### 比对工具

| 工具 | 最佳应用 | 特点 |
|------|---------|------|
| **BWA-MEM** | WGS / WES 比对 | 快速、准确，行业标准 |
| **Bowtie2** | 常规 DNA-seq | 灵活、支持局部比对 |
| **STAR** | RNA-seq 比对 | 剪接-aware，ENCODE 推荐 |
| **HISAT2** | RNA-seq 比对 | 基于图的索引，内存效率高 |
| **Minimap2** | 长读长比对 | 支持 PacBio / ONT，速度快 |

### 变异检测工具

| 工具 | 检测类型 | 特点 |
|------|---------|------|
| **GATK HaplotypeCaller** | SNP / InDel | 金标准，BQSR + VQSR 校正 |
| **DeepVariant** | SNP / InDel | 深度学习驱动，准确性高 |
| **Samtools mpileup** | SNP / InDel | 轻量、快速 |
| **DELLY** | SV | 基于 paired-end + split-read |
| **Manta** | SV | 速度快，适合临床 |
| **CNVnator** | CNV | 基于 read depth |

### RNA-seq 定量工具

| 工具 | 定量方式 | 特点 |
|------|---------|------|
| **featureCounts** | 基因水平计数 | 快速、简单 |
| **HTSeq** | 基因水平计数 | 与 featureCounts 类似 |
| **Salmon** | 伪比对 + 定量 | 无需完整比对，速度快 |
| **Kallisto** | 伪比对 + 定量 | 极快，适合大样本 |

## 数据类型对应分析策略

| 数据类型 | 核心分析目标 | 关键分析步骤 |
|---------|-------------|-------------|
| **WGS** | 全面变异检测 | 比对 → 去重复 → BQSR → 变异检测 → 注释 |
| **WES** | 编码区变异检测 | 同 WGS + 捕获效率评估 |
| **RNA-seq** | 表达定量 + 剪接分析 | 比对/伪比对 → 定量 → 差异表达 → 功能富集 |
| **宏基因组** | 物种组成 + 功能注释 | 组装/比对 → 物种分类 → 功能注释 → 差异分析 |
| **甲基化（WGBS）** | 甲基化位点检测 | 比对（BS 转化参考）→ 甲基化位点提取 → DMR 分析 |
| **ChIP-seq** | 蛋白结合峰检测 | 比对 → 峰 calling → Motif 分析 → 注释 |

## 质控与可重复性

- **分析流程版本控制**：使用 Snakemake / Nextflow / WDL 封装分析流程
- **参考基因组版本**：明确标注（如 GRCh38/hg38、GRCm39）
- **软件版本记录**：确保结果可重复
- **原始数据归档**：符合 FAIR 原则，上传至公共数据库（SRA/CNGBdb）

>  **待补充**：各数据类型的详细分析流程（WGS/WES/RNA-seq/宏基因组/甲基化）、常见问题排查、性能优化建议、以及具体的代码示例和参数推荐。

---

Previous: [长读长测序技术](../sequencing_technology/long_read) | Next: [DNA 组学实验方法](../methods)
