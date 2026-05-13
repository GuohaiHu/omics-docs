---
sidebar_position: 11
---

#  DNA 组学数据分析（快速参考）

>  **提示**：本页提供数据分析的快速参考。详细的数据分析流程请参阅 [标准数据分析流程概述](data_analysis/overview)。

## 分析流程概览

```
原始数据 (FASTQ)
    ↓ [质量控制]
质量报告 (FastQC / MultiQC)
    ↓ [序列比对 / 组装]
比对文件 (BAM) / 组装结果 (Contig)
    ↓ [变异 / 表达 / 修饰检测]
特征集 (VCF / Count Matrix / BED)
    ↓ [注释与功能分析]
结果 & 报告
```

## 1. 质量控制 (QC)

### FastQC
```bash
fastqc sample_R1.fastq.gz sample_R2.fastq.gz
```

检查指标：
- 碱基质量分布（Per base sequence quality）
- 接头污染（Adapter content）
- GC 含量（Per sequence GC content）
- 序列重复水平（Sequence duplication levels）

### MultiQC
```bash
multiqc ./results/
```

## 2. 序列比对

### 常用比对工具

| 工具 | 最佳应用 | 特点 |
|------|---------|------|
| **BWA-MEM** | WGS / WES | 快速、准确，行业标准 |
| **Bowtie2** | 常规 DNA-seq | 灵活、支持局部比对 |
| **STAR** | RNA-seq | 剪接感知（Splice-aware） |
| **Minimap2** | 长读长 | 支持 PacBio / ONT |

### BWA 比对示例
```bash
bwa mem -t 16 -R "@RG\tID:sample\tSM:sample\tPL:ILLUMINA" \
  reference.fa sample_R1.fq.gz sample_R2.fq.gz | \
  samtools sort -@ 4 -o sample.sorted.bam
```

## 3. 变异检测

### 工具对比

| 工具 | SNP | INDEL | CNV | SV | 速度 |
|------|-----|-------|-----|-----|------|
| GATK |  |  |  |  | 中 |
| DeepVariant |  |  |  |  | 中 |
| Samtools |  |  |  |  | 快 |
| DELLY |  |  |  |  | 中 |
| Manta |  |  |  |  | 快 |
| CNVnator |  |  |  |  | 中 |

## 4. 注释和解释

### 注释工具
- **VEP**（Ensembl Variant Effect Predictor）
- **SnpEff**
- **ANNOVAR**

### 常用数据库
- ClinVar：临床变异注释
- COSMIC：癌症体细胞突变
- gnomAD：人群变异频率
- dbNSFP：功能预测综合数据库

## 5. RNA-seq 分析

| 步骤 | 工具 | 输出 |
|------|------|------|
| 比对 | STAR / HISAT2 | BAM |
| 定量 | featureCounts / Salmon | 基因计数矩阵 |
| 差异表达 | DESeq2 / edgeR | DEG 列表 |
| 功能富集 | clusterProfiler | GO / KEGG 富集结果 |

## 6. 长读长数据分析

| 分析任务 | 推荐工具 |
|---------|---------|
| 比对 | Minimap2 |
| 结构变异 | Sniffles2, PBSV, cuteSV |
| 从头组装 | Canu, Flye, Shasta |
| 甲基化检测 | Nanopolish, Megalodon, Remora |

---

详细分析流程请参阅：[标准数据分析流程概述](data_analysis/overview)

Previous: [标准数据分析流程概述](data_analysis/overview)
