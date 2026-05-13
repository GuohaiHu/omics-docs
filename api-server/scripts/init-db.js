const db = require('../config/database');
const fs = require('fs');
const path = require('path');

// 示例数据
const sampleEnzymes = [
  {
    enzyme_name: 'Collagenase I',
    type: 'collagenase',
    catalog_number: 'C0130',
    vendor: 'Sigma',
    substrate: 'Collagen I, II, III',
    optimal_ph: '7.0-8.0',
    temperature: '37°C',
    cofactors: JSON.stringify(['Ca2+']),
    tissue_applicability: JSON.stringify(['liver', 'heart', 'tumor']),
    working_concentration: '0.5-2 mg/mL',
    inhibitors: JSON.stringify(['EDTA']),
    reference: 'PMID: 31092422'
  },
  {
    enzyme_name: 'Collagenase IV',
    type: 'collagenase',
    catalog_number: 'C5138',
    vendor: 'Sigma',
    substrate: 'Collagen IV (basement membrane)',
    optimal_ph: '7.0-7.5',
    temperature: '37°C',
    cofactors: JSON.stringify(['Ca2+']),
    tissue_applicability: JSON.stringify(['kidney', 'brain', 'pancreatic islet']),
    working_concentration: '0.5-1 mg/mL',
    inhibitors: JSON.stringify(['EDTA']),
    reference: 'PMID: 31092422'
  },
  {
    enzyme_name: 'Papain',
    type: 'protease',
    catalog_number: 'P4762',
    vendor: 'Sigma',
    substrate: 'Broad spectrum protein (non-specific)',
    optimal_ph: '6.0-7.0',
    temperature: '37°C',
    cofactors: JSON.stringify(['Cysteine']),
    tissue_applicability: JSON.stringify(['brain', 'embryonic tissue']),
    working_concentration: '10-20 U/mL',
    inhibitors: JSON.stringify(['oxidizers', 'heavy metals']),
    reference: 'PMID: 29649711'
  }
];

const sampleTissues = [
  {
    tissue_name: 'liver',
    organism: 'human',
    ecm_components: JSON.stringify(['Collagen I', 'Collagen IV', 'Laminin', 'Fibronectin']),
    fat_content: '5%',
    fibrosis_level: 'medium',
    cell_density: 'high',
    special_challenges: 'High hemoglobin, red blood cell contamination',
    recommended_enzymes: JSON.stringify(['Collagenase IV', 'DNase I']),
    reference: 'PMID: 31092422'
  },
  {
    tissue_name: 'brain',
    organism: 'human',
    ecm_components: JSON.stringify(['Low ECM', 'High lipids', 'Proteoglycans']),
    fat_content: '10%',
    fibrosis_level: 'low',
    cell_density: 'medium',
    special_challenges: 'Cell fragility, high mitochondrial RNA',
    recommended_enzymes: JSON.stringify(['Papain', 'DNase I']),
    reference: 'PMID: 29649711'
  },
  {
    tissue_name: 'kidney',
    organism: 'human',
    ecm_components: JSON.stringify(['Collagen IV', 'Laminin', 'Nidogen']),
    fat_content: '3%',
    fibrosis_level: 'medium',
    cell_density: 'high',
    special_challenges: 'Complex glomeruli structure',
    recommended_enzymes: JSON.stringify(['Collagenase IV', 'Dispase']),
    reference: 'PMID: 31537962'
  }
];

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database with sample data...\n');

    // 插入酶数据
    console.log('📊 Inserting enzyme data...');
    for (const enzyme of sampleEnzymes) {
      await db.run(
        `INSERT INTO enzymes (
          enzyme_name, type, catalog_number, vendor, substrate,
          optimal_ph, temperature, cofactors, tissue_applicability,
          working_concentration, inhibitors, reference
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          enzyme.enzyme_name,
          enzyme.type,
          enzyme.catalog_number,
          enzyme.vendor,
          enzyme.substrate,
          enzyme.optimal_ph,
          enzyme.temperature,
          enzyme.cofactors,
          enzyme.tissue_applicability,
          enzyme.working_concentration,
          enzyme.inhibitors,
          enzyme.reference
        ]
      );
    }
    console.log(`✅ Inserted ${sampleEnzymes.length} enzyme records\n`);

    // 插入组织数据
    console.log('📊 Inserting tissue data...');
    for (const tissue of sampleTissues) {
      await db.run(
        `INSERT INTO tissues (
          tissue_name, organism, ecm_components, fat_content,
          fibrosis_level, cell_density, special_challenges,
          recommended_enzymes, reference
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          tissue.tissue_name,
          tissue.organism,
          tissue.ecm_components,
          tissue.fat_content,
          tissue.fibrosis_level,
          tissue.cell_density,
          tissue.special_challenges,
          tissue.recommended_enzymes,
          tissue.reference
        ]
      );
    }
    console.log(`✅ Inserted ${sampleTissues.length} tissue records\n`);

    console.log('✨ Database initialization complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error initializing database:', err);
    process.exit(1);
  }
}

// 检查数据库是否已初始化
async function checkAndInitialize() {
  try {
    const enzymeCount = await db.get('SELECT COUNT(*) as count FROM enzymes');
    
    if (enzymeCount.count === 0) {
      console.log('ℹ️  Database is empty. Adding sample data...\n');
      await initializeDatabase();
    } else {
      console.log('✅ Database already contains data.');
      console.log(`   Enzymes: ${enzymeCount.count}`);
      process.exit(0);
    }
  } catch (err) {
    console.error('Error checking database:', err);
    process.exit(1);
  }
}

checkAndInitialize();
