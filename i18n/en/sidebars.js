// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'getting-started',
        'data-standards',
        'faq',
      ],
    },
    {
      type: 'category',
      label: 'DNA Omics',
      collapsible: true,
      collapsed: false,
      items: [
        'DNA-omics/overview',
        {
          type: 'category',
          label: 'DNA/RNA Extraction',
          collapsible: true,
          collapsed: true,
          items: [
            'DNA-omics/nucleic_acid_extraction/overview',
            'DNA-omics/nucleic_acid_extraction/magnetic_bead_blood_dna',
            'DNA-omics/nucleic_acid_extraction/column_tissue_dna',
            'DNA-omics/nucleic_acid_extraction/magnetic_sheet_blood_dna',
            'DNA-omics/nucleic_acid_extraction/trizol_tissue_rna',
          ],
        },
        {
          type: 'category',
          label: 'Nucleic Acid Detection',
          collapsible: true,
          collapsed: true,
          items: [
            'DNA-omics/nucleic_acid_detection/overview',
          ],
        },
        {
          type: 'category',
          label: 'Library Construction',
          collapsible: true,
          collapsed: true,
          items: [
            'DNA-omics/library_construction/overview',
            'DNA-omics/library_construction/short_read',
            'DNA-omics/library_construction/long_read',
          ],
        },
        {
          type: 'category',
          label: 'Sequencing Technology',
          collapsible: true,
          collapsed: true,
          items: [
            'DNA-omics/sequencing_technology/overview',
            'DNA-omics/sequencing_technology/short_read',
            'DNA-omics/sequencing_technology/long_read',
          ],
        },
        {
          type: 'category',
          label: 'Standard Data Analysis',
          collapsible: true,
          collapsed: true,
          items: [
            'DNA-omics/data_analysis/overview',
          ],
        },
        'DNA-omics/methods',
        'DNA-omics/analysis',
      ],
    },
    {
      type: 'category',
      label: 'Cell Omics',
      collapsible: true,
      collapsed: false,
      items: [
        'Cell-omics/overview',
        {
          type: 'category',
          label: 'Single-Cell Knowledge Base',
          collapsible: true,
          collapsed: true,
          items: [
            'Cell-omics/single_cell_knowledge_base/overview',
            'Cell-omics/single_cell_knowledge_base/enzyme_database',
            'Cell-omics/single_cell_knowledge_base/tissue_database',
          ],
        },
        'Cell-omics/cell_analysis_methods',
        'Cell-omics/protocols',
      ],
    },
    {
      type: 'category',
      label: 'Spatial Omics',
      collapsible: true,
      collapsed: false,
      items: [
        'STOmics/overview',
        'STOmics/methods',
        'STOmics/analysis',
      ],
    },
    {
      type: 'category',
      label: 'Proteomics',
      collapsible: true,
      collapsed: false,
      items: [
        'Pro-omics/overview',
        'Pro-omics/methods',
        'Pro-omics/analysis',
      ],
    },
    {
      type: 'category',
      label: 'Data Standards',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'data-format/overview',
          label: 'Data Format Standards',
        },
        {
          type: 'doc',
          id: 'data-format/metadata',
          label: 'Metadata Standards',
        },
      ],
    },
    {
      type: 'category',
      label: 'API Docs',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'api/overview',
          label: 'API Overview',
        },
        {
          type: 'doc',
          id: 'api/endpoints',
          label: 'Endpoints',
        },
      ],
    },
  ],
};

export default sidebars;
