---
sidebar_position: 4
---

#  Frequently Asked Questions

##  General Questions

### Q1: What is multi-omics?
Multi-omics is a comprehensive research approach that simultaneously measures multiple molecular layers within the same sample. It includes genomics, transcriptomics, proteomics, metabolomics, and more.

### Q2: Which technology should I choose?
It depends on your research question:
-  Need genetic information? → DNA Omics
-  Studying cell types? → Cell Omics
-  Need spatial information? → Spatial Omics
-  Need protein information? → Proteomics

### Q3: What are the advantages of multi-omics?
- Comprehensive understanding of biological systems
- Discovery of multi-level regulation
- Improved prediction accuracy
- Revelation of new biomarkers

---

##  DNA Omics Questions

### Q: WGS vs WES, how to choose?
- **WGS**: Need complete genome, structural variation
- **WES**: Limited budget, only focusing on coding regions

### Q: How deep should sequencing be?
- Tumor: 30-100×
- Genetic disease: 30-50×
- Population study: 5-10×

### Q: How to handle sequencing errors?
Use multi-sample error correction tools:
- Local assembly
- Duplicate checking
- Population calibration

---

##  Cell Omics Questions

### Q: What is the difference between scRNA-seq and bulk RNA-seq?
| Feature | scRNA-seq | Bulk RNA-seq |
|---------|-----------|--------------|
| Resolution | Single-cell | Tissue average |
| Sample size | Many cells | Few samples |
| Cell heterogeneity | Detectable | Undetectable |
| Cost | High | Low |

### Q: My cell viability is low, what should I do?
Checklist:
-  Is the dissociation condition optimized?
-  Is the cold chain maintained?
-  Is the cell number too high/low?
-  Is the correct enzyme being used?

### Q: How many cells are sufficient for analysis?
- Pilot: 1,000-5,000 cells
- Standard: 10,000-50,000 cells
- Deep analysis: 100,000+ cells

---

##  Spatial Omics Questions

### Q: Visium vs MERFISH, how to choose?
- **Visium**: Need global analysis, limited budget
- **MERFISH**: Need high resolution, focused on specific genes

### Q: What does spatial resolution mean?
Resolution represents the minimum distance that can be distinguished.
- Visium: 55 μm
- MERFISH: 300-500 nm
- Higher resolution means more detailed information but higher cost

### Q: How to preserve spatial information?
- Cryosectioning instead of paraffin embedding
- Rapid processing to minimize diffusion
- Use targeted spatial capture methods

---

##  Proteomics Questions

### Q: LC-MS/MS vs antibody method, which to choose?
| Metric | LC-MS/MS | Antibody |
|--------|----------|----------|
| Accuracy | High | Variable |
| Throughput | Medium | High |
| Cost | High | Low |
| Speed | Slow | Fast |

### Q: How to store protein samples?
- **Short-term** (< 1 week): 4°C, PBS
- **Long-term** (> 1 month): -80°C, 80% glycerol/DMSO
- Avoid repeated freeze-thaw cycles

### Q: How to deal with low-abundance proteins?
Methods:
- Sample concentration
- Immunoprecipitation enrichment
- Targeted quantification (PRM)

---

##  Technical Questions

### Q: Why is data normalization important?
- Eliminate batch effects
- Make samples comparable
- Improve statistical power

### Q: What normalization methods are recommended?
- **Mass spectrometry data**: TMM, DESeq2 normalization
- **Imaging data**: Background subtraction + intensity normalization
- **Sequencing data**: CPM, RPKM, TPM

### Q: How to handle missing values?
- Random imputation
- KNN imputation
- Minimum value replacement
- Deletion (if too many missing)

---

##  Data Questions

### Q: Can I download data?
Supports download in multiple formats:
- CSV/TSV
- JSON
- HDF5
- Raw files

### Q: How to access the API?
See [API Documentation](/api/overview)

### Q: Data update frequency?
Core database: Monthly updates
Experimental data: Real-time updates
For details, see [Data Standards](/data-standards)

---

##  Reference Resources

- [Literature List](#)
- [Tool Recommendations](#)
- [Database Links](/DNA-omics/overview#database-resources)
- [Contact](#)

---

Can't find an answer? [Submit a question](#) or [check the blog](/blog)
