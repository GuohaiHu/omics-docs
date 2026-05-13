import React, { useState, useEffect, useRef } from 'react';
import Translate from '@docusaurus/Translate';
import * as echarts from 'echarts';
import styles from './DataVisualization.module.css';

export default function DataVisualization() {
  const chartRef = useRef(null);
  const [dataset, setDataset] = useState('enzymes');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  useEffect(() => {
    if (stats) {
      renderChart();
    }
  }, [stats, dataset]);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:8000/v1/analysis/statistics');
      const data = await response.json();
      setStats(data.data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  const renderChart = () => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const chartOptions = {
      enzymes: {
        title: { text: 'Database Statistics' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
          {
            name: 'Records',
            type: 'pie',
            radius: '50%',
            data: [
              { value: stats.enzymes, name: 'Enzymes' },
              { value: stats.tissues, name: 'Tissues' },
              { value: stats.scrnaseq_datasets, name: 'scRNA-seq Datasets' },
              { value: stats.proteins, name: 'Proteins' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      bar: {
        title: { text: 'Database Statistics' },
        tooltip: { trigger: 'axis' },
        xAxis: {
          type: 'category',
          data: ['Enzymes', 'Tissues', 'scRNA-seq', 'Proteins']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [stats.enzymes, stats.tissues, stats.scrnaseq_datasets, stats.proteins],
            type: 'bar',
            itemStyle: {
              color: '#3578e5'
            }
          }
        ]
      }
    };

    chart.setOption(chartOptions.enzymes);
    window.addEventListener('resize', () => chart.resize());

    return () => {
      window.removeEventListener('resize', () => chart.resize());
      chart.dispose();
    };
  };

  if (!stats) {
    return (
      <div className={styles.loading}>
        <Translate id="common.loadingData">加载数据中...</Translate>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>
        <Translate id="dashboard.title">📊 数据可视化仪表板</Translate>
      </h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.icon}>🧬</div>
          <div className={styles.content}>
            <h3><Translate id="dashboard.enzymes">酶</Translate></h3>
            <p className={styles.number}>{stats.enzymes}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}>🧵</div>
          <div className={styles.content}>
            <h3><Translate id="dashboard.tissues">组织</Translate></h3>
            <p className={styles.number}>{stats.tissues}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}>🔬</div>
          <div className={styles.content}>
            <h3><Translate id="dashboard.scrnaseq">单细胞数据集</Translate></h3>
            <p className={styles.number}>{stats.scrnaseq_datasets}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.icon}>🧪</div>
          <div className={styles.content}>
            <h3><Translate id="dashboard.proteins">蛋白质</Translate></h3>
            <p className={styles.number}>{stats.proteins}</p>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div ref={chartRef} className={styles.chart}></div>
      </div>

      <div className={styles.info}>
        <h3><Translate id="dashboard.descriptionTitle">📈 数据统计说明</Translate></h3>
        <p><Translate id="dashboard.descriptionText">此仪表板显示多组学数据库的实时统计信息。</Translate></p>
        <ul>
          <li>
            🧬 <strong><Translate id="dashboard.enzymes">酶</Translate></strong>
            <Translate id="dashboard.enzymesDesc">：商业化酶制剂数据库</Translate>
          </li>
          <li>
            🧵 <strong><Translate id="dashboard.tissues">组织</Translate></strong>
            <Translate id="dashboard.tissuesDesc">：细胞解离相关组织信息</Translate>
          </li>
          <li>
            🔬 <strong><Translate id="dashboard.scrnaseq">单细胞数据集</Translate></strong>
            <Translate id="dashboard.scrnaseqDesc">：公开的单细胞测序数据</Translate>
          </li>
          <li>
            🧪 <strong><Translate id="dashboard.proteins">蛋白质</Translate></strong>
            <Translate id="dashboard.proteinsDesc">：蛋白质组学相关数据</Translate>
          </li>
        </ul>
      </div>
    </div>
  );
}
