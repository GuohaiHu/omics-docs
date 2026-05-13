---
sidebar_position: 1
---

#  数据格式规范

本文档定义了多组学数据库中使用的标准数据格式。

## 1. 表格数据格式

### CSV 格式
```csv
gene_id,gene_name,expression,tissue,cell_type
ENSG00000000003,TRNAP35,2.5,liver,hepatocyte
ENSG00000000005,DDLYX,1.8,liver,hepatocyte
```

### 字段要求
- 首行为列名
- UTF-8 编码
- 缺失值用 "NA" 表示

## 2. 序列数据格式

### FASTA 格式
```
>sequence_id description
ATCGATCGATCG...

>sequence_id2 description
ATCGATCGATCG...
```

### FASTQ 格式
```
@sequence_id description
ATCGATCGATCG...
+
!!!!######...
```

## 3. 元数据标准

### 必需字段

| 字段 | 类型 | 描述 | 示例 |
|------|------|------|------|
| sample_id | 字符 | 样本唯一标识 | S001 |
| organism | 字符 | 物种 | human/mouse |
| tissue | 字符 | 组织 | liver/brain |
| cell_type | 字符 | 细胞类型 | hepatocyte |
| treatment | 字符 | 处理条件 | control/stimulated |
| time_point | 数值 | 时间点（小时） | 0/24/48 |

### 可选字段

| 字段 | 类型 | 描述 |
|------|------|------|
| batch | 字符 | 批次号 |
| replicate | 数值 | 重复号 |
| age | 数值 | 年龄 |
| disease_status | 字符 | 疾病状态 |
| genotype | 字符 | 基因型 |

## 4. 表达数据矩阵

### 标准形式
```
       cell_1  cell_2  cell_3  ...
gene_1   0.5    1.2    0.8
gene_2   2.1    1.5    2.3
gene_3   0.0    0.1    0.0
...
```

### 值标准化

| 方法 | 公式 | 使用场景 |
|------|------|---------|
| **Raw Count** | 无 | 原始计数 |
| **CPM** | (count/total) × 10⁶ | 深度标准化 |
| **RPKM** | CPM / (gene_length/1000) | 基因长度校正 |
| **TPM** | RPKM / 10⁻⁶ | 样本间可比 |
| **log2(CPM+1)** | log₂(CPM+1) | 方差稳定 |

## 5. 单细胞数据格式

### H5AD 格式（推荐）
```
adata.X                 # 表达矩阵 (细胞 × 基因)
adata.obs              # 细胞元数据
adata.var              # 基因元数据
adata.obsm['X_umap']   # UMAP 坐标
adata.obsm['X_pca']    # PCA 坐标
```

### 元数据示例
```python
import pandas as pd
import anndata

# 创建
obs_df = pd.DataFrame({
    'cell_type': ['T_cell', 'B_cell', ...],
    'n_counts': [5000, 6000, ...],
    'n_genes': [2000, 2100, ...]
})

adata = anndata.AnnData(
    X=expression_matrix,
    obs=obs_df
)
```

## 6. 空间数据格式

### 坐标文件
```
cell_id,x,y,z,expression,cell_type
cell_001,100.5,200.3,0,5.2,hepatocyte
cell_002,101.2,201.1,0,4.8,immune_cell
...
```

### H5SPOT 格式（基于 HDF5）
```
/coordinates           # (n_cells, 3) 坐标
/expression_matrix     # (n_cells, n_genes) 表达
/images                # 原始图像
/metadata              # 元数据
```

## 7. 质谱数据格式

### mzXML 格式
```xml
<?xml version="1.0"?>
<mzXML xmlns="http://sashimi.sourceforge.net/schema_revision/mzXML_3.2">
  <msRun scanCount="1000">
    <scan num="1" msLevel="1" ...>
      <peaks>m/z intensity pairs</peaks>
    </scan>
  </msRun>
</mzXML>
```

### 识别结果格式 (PSM)
```
spectrum,peptide,charge,score,mass_error,intensity
S001,PEPTIDEK,2,100,0.5,50000
S002,MKTAYIAKQR,3,95,0.3,45000
```

## 8. 变异数据格式

### VCF 格式
```
##fileformat=VCFv4.2
#CHROM  POS     ID  REF ALT QUAL    FILTER  INFO
chr1    100     .   A   T   .       PASS    DP=50;AF=0.5
chr1    200     .   G   C   .       PASS    DP=60;AF=0.75
```

## 9. 命名规范

### 标准命名
```
{物种}_{组织}_{技术}_{批次}_{重复}
```

### 示例
- `human_liver_scRNAseq_batch01_rep1.h5ad`
- `mouse_brain_Visium_batch02_rep2.csv`
- `human_PBMCs_proteomics_LFQ_batch03.tsv`

## 10. 文件压缩

### 推荐压缩格式
- **Gzip (.gz)**：标准压缩
- **Bzip2 (.bz2)**：更高压缩率
- **ZIP**：跨平台兼容性

### 压缩命令
```bash
gzip large_file.csv      # 创建 large_file.csv.gz
gunzip large_file.csv.gz # 解压

tar -czf data.tar.gz data/  # 创建归档并压缩
tar -xzf data.tar.gz        # 解压归档
```

---

参考：[元数据标准](metadata) | [数据标准](../data-standards)
