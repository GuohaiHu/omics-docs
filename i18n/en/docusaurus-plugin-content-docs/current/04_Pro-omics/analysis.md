---
sidebar_position: 3
---

#  Proteomics Data Analysis

## 1. Raw Data Processing

### Mass Spectrometry Data Processing Pipeline

```
Raw MS data (.raw/.mzXML)
    ↓ [Mass calibration]
Calibrated data
    ↓ [Spectral library search]
Peptide/protein identification
    ↓ [Quantification]
Abundance estimation
    ↓ [Filtering]
High-quality protein list
    ↓ [Statistical analysis]
Biological results
```

### Software Tools

| Tool | Function | Platform |
|------|----------|----------|
| **MaxQuant** | Full workflow analysis | Windows |
| **Mascot** | Spectral library search | Web |
| **Comet** | Fast search | Multi-platform |
| **X!Tandem** | Open-source search | Multi-platform |
| **PEAKS** | AI-enhanced analysis | Multi-platform |

## 2. Protein Quantification

### Method Comparison

| Method | Principle | Accuracy | Application |
|--------|-----------|----------|-------------|
| **Label-free** | Signal intensity comparison | Medium | Large samples |
| **TMT/iTRAQ** | Isotopic labeling | High | Multi-sample comparison |
| **SILAC** | Stable isotope labeling | High | Long-term experiments |
| **Spectral counting** | Spectrum count comparison | Low | Rough estimation |

### Quantification Analysis

```r
# R example: LimmaQuant for statistics

library(limma)

# Create design matrix
design <- model.matrix(~0 + factor(c(1,1,1,2,2,2)))

# Fit model
fit <- lmFit(log2_intensity, design)

# Contrast
contrast.matrix <- makeContrasts(
  treatments = X1 - X2,
  levels = design
)

fit2 <- contrasts.fit(fit, contrast.matrix)
fit2 <- eBayes(fit2)

# Volcano plot
volcanoplot(fit2, highlight = 10)
```

## 3. Differential Protein Analysis

### Statistical Tests

- **t-test**: Two-group comparison
- **ANOVA**: Multi-group comparison
- **Mann-Whitney U**: Non-normal distribution
- **Benjamini-Hochberg**: Multiple test correction

### Screening Criteria

```
log2(FC) > ±1 (2-fold change)
AND
FDR/P-value < 0.05
```

### Volcano Plot

```python
import matplotlib.pyplot as plt

# Calculate -log10(p-value)
p_val_log = -np.log10(p_values)

# Plot
plt.scatter(log2_fc, p_val_log, alpha=0.5)
plt.axhline(-np.log10(0.05), color='red', linestyle='--')
plt.axvline(1, color='red', linestyle='--')
plt.axvline(-1, color='red', linestyle='--')
```

## 4. Enrichment Analysis

### Pathway Analysis

| Database | Features | Tools |
|----------|----------|-------|
| **KEGG** | Metabolic pathways | DAVID, Cytoscape |
| **GO** | Functional classification | clusterProfiler |
| **Reactome** | Reaction networks | iPathwayGuide |
| **STRING** | Protein interactions | Cytoscape plugin |

### GO Enrichment (R example)

```r
library(clusterProfiler)
library(org.Hs.eg.db)

# Gene ID conversion
gene_ids <- bitr(gene_names, 
                 fromType="SYMBOL", 
                 toType="ENTREZID",
                 OrgDb=org.Hs.eg.db)

# GO enrichment
ego <- enrichGO(gene_ids$ENTREZID, 
                OrgDb = org.Hs.eg.db,
                ont = "BP",
                pAdjustMethod = "BH")

# Plot
barplot(ego)
```

## 5. Protein Interaction Analysis

### Interaction Network

```python
import networkx as nx
import matplotlib.pyplot as plt

# Build network
G = nx.Graph()
G.add_edges_from(interactions)

# Plot
pos = nx.spring_layout(G)
nx.draw_networkx(G, pos, 
                 node_color='lightblue',
                 edge_color='gray',
                 with_labels=True)
```

### Network Features
- **Degree**: Number of interacting proteins
- **Clustering coefficient**: Local clustering degree
- **Shortest path**: Protein association strength

## 6. Modification Analysis

### Phosphorylation Analysis

```
Phosphorylation site identification
    ↓ [Enrichment analysis]
Kinase enrichment
    ↓ [Network construction]
Kinase-substrate network
    ↓ [Biological interpretation]
Signal pathway activation
```

### Tools
- **PhosphoSitePlus**: Database query
- **KEASN**: Kinase enrichment analysis
- **NetKIN**: Predict kinase substrates

---

References: [Detection Technologies](methods) | [Overview](overview)
