---
sidebar_position: 2
---

#  Proteomics Detection Technologies

## 1. LC-MS/MS Mass Spectrometry Analysis

### Working Principle

```
Protein extraction
    ↓ [Protein digestion]
Trypsin cleavage
    ↓ [Liquid chromatography]
Peptide separation
    ↓ [Mass analysis]
m/z measurement
    ↓ [Fragment analysis]
Sequence determination
```

### Sample Preparation

1. **Protein Extraction**
   - Lysis buffer: 150 mM NaCl, 1% Triton X-100, 0.5% sodium deoxycholate
   - Protease inhibitors: PMSF, protease inhibitor cocktail
   - Extraction temperature: 4°C

2. **Protein Quantification**
   - BCA method (recommended)
   - Bradford method
   - Standard: BSA standard

3. **Protein Digestion**
   ```
   Protein (200-500 μg)
       ↓ [DTT reduction]
   5 mM, 56°C, 30 min
       ↓ [IAA alkylation]
   25 mM, dark, 30 min
       ↓ [Buffer exchange]
   pH 8.0
       ↓ [Trypsin digestion]
   Enzyme-to-protein ratio 1:50, 37°C, 16 h
       ↓ [Stop reaction]
   0.1% TFA
   ```

### LC Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Column | 2.1 × 150 mm, 3 μm | C18 reversed-phase |
| Flow rate | 300 μL/min | Standard flow rate |
| Temperature | 40°C | Optimized separation |
| Gradient | 5-95% B (80 min) | Linear gradient |

### MS Parameters

- **Ionization method**: ESI (electrospray) or MALDI
- **Mass range**: m/z 100-2000
- **Resolution**: >30,000 (Orbitrap)
- **Scan rate**: > 10 Hz

## 2. Flow Cytometry

### Antibody Selection

```
Antibody characteristics
├── Target antigen relevance
├── Fluorophore selection
│   ├── FITC (488 nm)
│   ├── PE (561 nm)
│   ├── APC (635 nm)
│   └── Alexa Fluor series
├── Cross-reactivity
└── Batch variation
```

### Labeling Strategies

| Strategy | Number of Labels | Pros | Cons |
|----------|-----------------|------|------|
| **Single-stain** | 1-2 | Simple, clear | Low throughput |
| **Multicolor** | 3-8 | Balanced | Requires compensation |
| **Hyper-multicolor** | 10+ | Ultra-high throughput | Complex, requires experience |

### Operation Workflow

1. Cell preparation (1-2×10⁶ cells)
2. Surface marker antibodies (4°C, 30 min)
3. Washing (PBS 2×)
4. Optional: Intracellular labeling
5. Fixation or direct measurement

## 3. Immunohistochemistry (IHC)

### Antigen Retrieval Methods

| Method | Principle | Time | Applicability |
|--------|-----------|------|---------------|
| **High pressure/high temperature** | 97°C, pH 6.0 buffer | 20 min | Most antigens |
| **Microwave** | 750 W, 10 min | Fast | Common use |
| **Enzyme digestion** | Proteinase K/Pepsin | 20-30 min | Specific antigens |

### Detection Systems

- **HRP-DAB**: Chromogenic in situ display, low cost
- **Fluorescence**: Multiplex detection, low background
- **Enhanced systems**: Signal amplification, high sensitivity

### Scoring Criteria

```
Intensity score (0-3):
0: No staining
1: Weak staining
2: Moderate staining
3: Strong staining

Positive cell percentage (0-4):
0: 0%
1: <10%
2: 10-50%
3: 50-80%
4: >80%

Final score = Intensity + Positive rate
```

## 4. Western Blot

### Operation Steps

1. **Sample preparation** (50-100 μg protein)
2. **Loading buffer** (4× sample buffer)
3. **Denaturation** (95°C, 5 min)
4. **Electrophoresis** (constant voltage or current)
5. **Transfer** (wet or dry)
6. **Blocking** (5% milk or BSA, 1 h)
7. **Primary antibody incubation** (4°C overnight)
8. **Secondary antibody incubation** (room temperature 1 h)
9. **Development**

---

Next: [Data Analysis](analysis)
