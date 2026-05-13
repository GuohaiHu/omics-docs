import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import styles from './EnzymeExplorer.module.css';

export default function EnzymeExplorer() {
  const [enzymes, setEnzymes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    tissue: '',
    limit: 20
  });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetchEnzymeTypes();
  }, []);

  useEffect(() => {
    fetchEnzymes();
  }, [filters]);

  const fetchEnzymeTypes = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/enzymes/types/all');
      const data = await response.json();
      setTypes(data.data || []);
    } catch (err) {
      console.error('Error fetching enzyme types:', err);
    }
  };

  const fetchEnzymes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.tissue) params.append('tissue', filters.tissue);
      params.append('limit', filters.limit);

      const response = await fetch(`http://localhost:8000/v1/enzymes?${params}`);
      const data = await response.json();
      setEnzymes(data.data || []);
    } catch (err) {
      console.error('Error fetching enzymes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <h2>
        <Translate id="enzyme.explorer.title">🔬 酶学数据浏览器</Translate>
      </h2>
      
      <div className={styles.filterPanel}>
        <div className={styles.filterGroup}>
          <label>
            <Translate id="enzyme.filter.type">酶类型：</Translate>
          </label>
          <select 
            name="type" 
            value={filters.type} 
            onChange={handleFilterChange}
            className={styles.select}
          >
            <option value="">
              <Translate id="common.all">全部</Translate>
            </option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>
            <Translate id="enzyme.filter.tissue">组织：</Translate>
          </label>
          <input 
            type="text" 
            name="tissue" 
            placeholder="搜索组织..."
            value={filters.tissue}
            onChange={handleFilterChange}
            className={styles.input}
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
            className={styles.select}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <Translate id="common.loading">加载中...</Translate>
        </div>
      ) : (
        <div className={styles.resultPanel}>
          <p className={styles.count}>
            <Translate id="common.resultsCount" values={{ count: enzymes.length }}>
              {'共找到 {count} 条结果'}
            </Translate>
          </p>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th><Translate id="enzyme.table.name">酶名称</Translate></th>
                <th><Translate id="enzyme.table.type">类型</Translate></th>
                <th><Translate id="enzyme.table.catalog">货号</Translate></th>
                <th><Translate id="enzyme.table.vendor">供应商</Translate></th>
                <th><Translate id="enzyme.table.substrate">作用底物</Translate></th>
                <th><Translate id="enzyme.table.ph">最佳 pH</Translate></th>
                <th><Translate id="enzyme.table.tissue">适用组织</Translate></th>
              </tr>
            </thead>
            <tbody>
              {enzymes.map(enzyme => (
                <tr key={enzyme.enzyme_id}>
                  <td><strong>{enzyme.enzyme_name}</strong></td>
                  <td>{enzyme.type}</td>
                  <td>{enzyme.catalog_number}</td>
                  <td>{enzyme.vendor}</td>
                  <td>{enzyme.substrate}</td>
                  <td>{enzyme.optimal_ph}</td>
                  <td>{enzyme.tissue_applicability}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {enzymes.length === 0 && (
            <div className={styles.noData}>
              <Translate id="common.noData">没有找到匹配的酶。请调整筛选条件。</Translate>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
