---
sidebar_position: 2
---

#  Spatial Omics Technical Methods

## 1. Visium Technology

### Principle
- Developed by 10X Genomics
- Based on in situ sequencing
- Capture array: 55 μm spacing
- Up to 4 samples per slide

### Workflow

#### Step 1: Sample Preparation
- Fresh frozen tissue
- Section thickness: 10 μm
- Tissue section H&E staining

#### Step 2: In Situ Hybridization and Reverse Transcription
1. Tissue fixation and permeabilization
2. Add Visium kit
3. In situ reverse transcription (RT)
4. Second-strand synthesis

#### Step 3: Spatial Barcode Capture
- Each position contains a unique DNA barcode
- Capture local mRNA

#### Step 4: Sequencing
- High-throughput sequencing
- Obtain transcript-to-position mapping

### Data Analysis

```bash
# Process raw data using Space Ranger
spaceranger count --id=sample_id \
                  --transcriptome=reference \
                  --fastqs=fastq_dir \
                  --slide=V19L01-041 \
                  --area=A1
```

## 2. MERFISH (Multiplexed Error-Robust FISH)

### Features
- **High multiplexity**: Can detect 500+ genes simultaneously
- **High resolution**: ~300-500 nm
- **Quantitative**: Single-molecule detection

### Operation Workflow

1. **Probe Design**
   - 18-25 probes per gene
   - Multiplexed barcode labeling

2. **Sample Processing**
   - Fixation and permeabilization
   - Background removal

3. **Multi-round Imaging**
   - Each round images a different gene set
   - Total 10-20 rounds

4. **Image Processing**
   - Registration and merging
   - Single-cell segmentation

## 3. ISS (In Situ Sequencing)

### Principle
- In situ DNA sequence synthesis and reading within tissue
- Ultra-high resolution: 200-300 nm
- 3D imaging capability

### Workflow

```
Fixed tissue
    ↓ Capture spots
DNA strand synthesis
    ↓ Synthesis & imaging cycles
Base information acquisition
    ↓ Multiple cycles
Complete sequence
    ↓ Spatial mapping
```

## 4. Imaging Quality Standards

| Metric | Standard | Evaluation |
|--------|----------|------------|
| Signal-to-noise ratio | `>3` | Good |
| Background | `<20%` | Acceptable |
| Drift | `<100 nm` | Excellent |
| Overlap | `>90%` | Good |

## Technology Comparison Table

| Feature | Visium | MERFISH | ISS | IMC |
|---------|--------|---------|-----|-----|
| Resolution | Medium | High | High | Medium |
| Gene Number | 1-5K | 100-500 | Variable | 30-40 |
| Throughput | Medium | High | Medium | Low |
| Cost | Low | Medium | High | Medium |
| Difficulty | Low | High | High | Medium |

---

Next: [Data Analysis](analysis)
