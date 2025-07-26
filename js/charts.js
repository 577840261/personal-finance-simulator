// 存储图表实例，以便更新时销毁旧图表
let retirementChartInstance = null;
let mortgageChartInstance = null;

// 绘制退休金预测图表
function renderRetirementChart(data) {
    const ctx = document.getElementById('retirement-chart').getContext('2d');

    // 销毁旧图表
    if (retirementChartInstance) {
        retirementChartInstance.destroy();
    }

    // 提取绘图数据
    const labels = data.map(item => item.year);
    const balances = data.map(item => item.balance);
    const inflationAdjustedBalances = data.map(item => item.inflationAdjustedBalance);

    // 创建新图表
    retirementChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '储蓄金额',
                data: balances,
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                fill: true,
                tension: 0.1
            }, {
                label: '扣除通胀后实际价值',
                data: inflationAdjustedBalances,
                borderColor: '#FF9800',
                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: '金额 (¥)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 10000) {
                                return '¥' + (value / 10000).toFixed(1) + '万';
                            }
                            return '¥' + value;
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '年龄'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '退休金增长预测'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ¥' + context.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// 绘制房贷明细图表
function renderMortgageChart(principalInterest, tax, insurance) {
    const ctx = document.getElementById('mortgage-chart').getContext('2d');

    // 销毁旧图表
    if (mortgageChartInstance) {
        mortgageChartInstance.destroy();
    }

    // 创建新图表
    mortgageChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['本金和利息', '房产税', '房屋保险'],
            datasets: [{
                data: [principalInterest, tax, insurance],
                backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: '月供组成比例'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw.toFixed(2) || '';
                            const percentage = ((context.raw / (principalInterest + tax + insurance)) * 100).toFixed(1);
                            return `${label}: ¥${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// 将绘图函数暴露到全局，供计算器调用
window.renderRetirementChart = renderRetirementChart;
window.renderMortgageChart = renderMortgageChart;