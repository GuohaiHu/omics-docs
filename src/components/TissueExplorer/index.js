import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function TissueExplorer() {
  const [tissues, setTissues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    organism: '',
    ecmComponent: '',
    limit: 20
  });

  useEffect(() => {
    const fetchTissues = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.organism) params.append('organism', filters.organism);
        if (filters.ecmComponent) params.append('ecmComponent', filters.ecmComponent);
        params.append('limit', filters.limit);
        
        const response = await fetch(`http://localhost:5000/v1/tissues?${params}`);
        const data = await response.json();
        
        setTissues(data.data || []);
      } catch (err) {
        console.error('Error fetching tissues:', err);
        setTissues([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTissues();
  }, [filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setFilters(prev => ({ ...prev, ecmComponent: e.target.value }));
    }
  };
  
  const handleExport = (format) => {
    window.open(`http://localhost:5000/v1/tissues?${new URLSearchParams(filters)}&format=${format}`);
  };
  
  return (
    <div className={styles.container}>
      <h2>
        <Translate id="tissue.explorer.component.title">🧬 组织数据浏览器</Translate>
      </h2>
      
      <div className={styles.filterPanel}>
        <div className={styles.filterGroup}>
          <label>
            <Translate id="tissue.filter.organism">物种：</Translate>
          </label>
          <select 
            name="organism" 
            value={filters.organism} 
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">
              <Translate id="common.all">全部</Translate>
            </option>
            <option value="human">
              <Translate id="organism.human">人</Translate>
            </option>
            <option value="mouse">
              <Translate id="organism.mouse">小鼠</Translate>
            </option>
            <option value="rat">
              <Translate id="organism.rat">大鼠</Translate>
            </option>
            <option value="zebrafish">
              <Translate id="organism.zebrafish">斑马鱼</Translate>
            </option>
            <option value="plant">
              <Translate id="organism.plant">植物</Translate>
            </option>
            <option value="other">
              <Translate id="organism.other">其他</Translate>
            </option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <label>
            <Translate id="tissue.filter.ecm">ECM 成分：</Translate>
          </label>
          <input
            type="text"
            name="ecmComponent"
            placeholder="搜索 ECM 成分..."
            value={filters.ecmComponent}
            onChange={handleFilterChange}
            onKeyPress={handleSearch}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filterGroup}>
          <label>
            <Translate id="common.perPage">每页数量：</Translate>
          </label>
          <select 
            name="limit" 
            value={filters.limit}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        
        <div className={styles.filterGroup}>
          <button 
            onClick={() => handleExport('csv')}
            className={styles.exportButton}
          >
            <Translate id="common.exportCSV">导出 CSV</Translate>
          </button>
          <button 
            onClick={() => handleExport('json')}
            className={styles.exportButton}
          >
            <Translate id="common.exportJSON">导出 JSON</Translate>
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className={styles.loading}>
          <Translate id="common.loading">加载中...</Translate>
        </div>
      ) : (
        <div className={styles.resultPanel}>
          <p className={styles.count}>
            <Translate id="common.resultsCount" values={{ count: tissues.length }}>
              {'共找到 {count} 条结果'}
            </Translate>
          </p>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th><Translate id="tissue.table.name">组织名称</Translate></th>
                <th><Translate id="tissue.table.organism">物种</Translate></th>
                <th><Translate id="tissue.table.ecm">ECM 成分</Translate></th>
                <th><Translate id="tissue.table.fat">脂肪含量</Translate></th>
                <th><Translate id="tissue.table.fibrosis">纤维化程度</Translate></th>
                <th><Translate id="tissue.table.density">细胞密度</Translate></th>
                <th><Translate id="tissue.table.challenges">特殊挑战</Translate></th>
                <th><Translate id="tissue.table.enzymes">推荐酶</Translate></th>
                <th><Translate id="tissue.table.reference">参考文献</Translate></th>
              </tr>
            </thead>
            <tbody>
              {tissues.map(issue => (
                <tr key={issue.tissue_id} className={styles.row}>
                  <td><strong>{issue.tissue_name}</strong></td>
                  <td>{issue.organism}</td>
                  <td>{issue.ecm_components}</td>
                  <td>{issue.fat_content}</td>
                  <td>{issue.fibrosis_level}</td>
                  <td>{issue.cell_density}</td>
                  <td>{issue.special_challenges}</td>
                  <td>{issue.recommended_enzymes || 'N/A'}</td>
                  <td>{issue.reference || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {tissues.length === 0 && (
            <div className={styles.noData}>
              <Translate id="tissue.noData">没有找到匹配的组织。请调整筛选条件。</Translate>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
