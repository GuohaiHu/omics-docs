---
sidebar_position: 3
---

#  Long-Read Library Construction

## HMW DNA Requirements

Long-read sequencing (长读长测序) demands **High Molecular Weight (HMW) DNA** (高分子量DNA) with minimal fragmentation:

| Parameter | Ideal Range |
|-----------|-------------|
| **DNA Size** | > 30 kb (PacBio HiFi); > 10 kb (ONT) |
| **Purity (A260/A280)** | 1.8–2.0 |
| **Concentration** | Platform-specific (µg scale) |
| **Integrity** | No smearing on pulsed-field gel |

## PacBio HiFi Workflow

1. **HMW DNA QC**
   - FemtoPulse or pulsed-field gel to confirm size.
2. **Shearing (optional)**
   - Megaruptor or g-TUBE for target size distribution.
3. **Damage Repair & End Repair**
   - Remove abasic sites and nicks; polish ends.
4. **SMRTbell Adapter Ligation**
   - Hairpin adapters form circular templates.
5. **Nuclease Treatment**
   - Remove failed products; enrich complete SMRTbells.
6. **Size Selection**
   - BluePippin or SageELF for tight size distribution.
7. **Binding Polymerase**
   - Load onto Sequel / Revio instruments.

## ONT Workflow

1. **HMW DNA QC**
   - Similar assessment as PacBio.
2. **DNA Repair (optional)**
   - FFPE or damaged sample repair.
3. **End Prep / A-Tailing**
   - Prepare for adapter ligation.
4. **Adapter Ligation**
   - Ligation sequencing kit (SQK-LSK) with motor protein-bound adapters.
5. **Priming & Loading**
   - R9.4.1 or R10.4.1 flow cell loading.

## Comparison with Short-Read

| Feature | Short-Read | Long-Read |
|---------|------------|-----------|
| **Input Requirement** | ng scale | µg scale |
| **Prep Time** | Half day | 1–2 days |
| **PCR Bias Risk** | Higher | Lower (PCR-free options) |
| **Coverage Uniformity** | Good | Better for SV / repetitive regions |
| **Cost per Sample** | Lower | Higher |

## Sample Prep Requirements

- **No vortexing or harsh pipetting** — shears DNA.
- **Wide-bore tips** — preserve HMW molecules.
- **Gentle mixing** — invert or roll tubes.
- **Fresh samples preferred** — FFPE yields shorter molecules.

---

Previous: [Short-Read Library Construction](short_read) | Next: [Sequencing Technology Overview](../sequencing_technology/overview)
