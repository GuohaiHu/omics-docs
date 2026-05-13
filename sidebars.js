// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: '📖 入门指南',
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
      label: '🧬 DNA 组学',
      collapsible: true,
      collapsed: false,
      items: [
        'DNA-omics/overview',
        {
          type: 'category',
          label: '🧪 DNA/RNA 提取',
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
          label: '🔬 核酸检测',
          collapsible: true,
          collapsed: true,
          items: [
            'DNA-omics/nucleic_acid_detection/overview',
          ],
        },
        {
          type: 'category',
          label: '📚 文库构建',
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
          label: '🧬 测序技术',
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
          label: '📊 标准数据分析',
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
      label: '🔬 细胞组学',
      collapsible: true,
      collapsed: false,
      items: [
        'Cell-omics/overview',
        {
          type: 'category',
          label: '📖 单细胞知识库',
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
      label: '🌌 空间组学',
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
      label: '🧪 蛋白质组学',
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
      label: '📊 数据规范',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'data-format/overview',
          label: '数据格式规范',
        },
        {
          type: 'doc',
          id: 'data-format/metadata',
          label: '元数据标准',
        },
      ],
    },
    {
      type: 'category',
      label: '🔗 API 文档',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'api/overview',
          label: 'API 概述',
        },
        {
          type: 'doc',
          id: 'api/endpoints',
          label: '端点列表',
        },
      ],
    },
  ],
};

export default sidebars;
