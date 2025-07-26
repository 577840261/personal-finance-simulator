// 标签切换功能
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const calculatorContents = document.querySelectorAll('.calculator-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            calculatorContents.forEach(content => content.classList.remove('active'));

            // 添加当前活动状态
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 添加表单输入字段
    addRetirementFormFields();
    addMortgageFormFields();
});

// 动态添加退休金计算器表单字段
function addRetirementFormFields() {
    const form = document.getElementById('retirement-form');
    form.innerHTML = `
        <div class="form-group">
            <label for="current-age">当前年龄</label>
            <input type="number" id="current-age" min="18" max="100" required value="30">
            <span class="help-text">您的当前年龄，必须大于18岁</span>
        </div>
        <div class="form-group">
            <label for="retirement-age">期望退休年龄</label>
            <input type="number" id="retirement-age" min="50" max="80" required value="65">
            <span class="help-text">您计划退休的年龄，必须大于当前年龄</span>
        </div>
        <div class="form-group">
            <label for="current-savings">现有储蓄 (¥)
                <span class="tooltip-icon" title="包括银行存款、投资账户等所有可用于退休的资金">?</span>
            </label>
            <input type="number" id="current-savings" min="0" required value="100000">
            <span class="help-text">您目前已积累的退休储蓄总额</span>
        </div>
        <div class="form-group">
            <label for="annual-income">年收入 (¥)</label>
            <input type="number" id="annual-income" min="0" required value="200000">
            <span class="help-text">您的税前年收入总额</span>
        </div>
        <div class="form-group">
            <label for="investment-return">投资回报率 (%)
                <span class="tooltip-icon" title="您期望的年平均投资回报率，通常股票市场长期平均约为5-7%">?</span>
            </label>
            <input type="number" id="investment-return" min="-100" max="100" step="0.1" required value="5">
            <span class="help-text">您预期的年投资回报率，不包含通货膨胀因素</span>
        </div>
        <div class="form-group">
            <label for="savings-rate">年储蓄率 (%)
                <span class="tooltip-icon" title="年收入中用于储蓄的比例，专家建议至少为收入的15%">?</span>
            </label>
            <input type="number" id="savings-rate" min="0" max="100" step="0.1" required value="30">
            <span class="help-text">您每年从收入中储蓄的百分比</span>
        </div>
        <div class="form-group">
            <label for="inflation-rate">通货膨胀率 (%)
                <span class="tooltip-icon" title="年均通货膨胀率，过去十年平均约为2-3%">?</span>
            </label>
            <input type="number" id="inflation-rate" min="0" max="100" step="0.1" required value="2.5">
            <span class="help-text">预期的年通货膨胀率，会影响未来资金的实际购买力</span>
        </div>
        <button type="submit">计算退休金预测</button>
    `;
}

// 动态添加购房负担能力计算器表单字段
function addMortgageFormFields() {
    const form = document.getElementById('mortgage-form');
    form.innerHTML = `
        <div class="form-group">
            <label for="income">年收入 (¥)</label>
            <input type="number" id="income" min="0" required value="200000">
            <span class="help-text">您的税前年收入总额</span>
        </div>
        <div class="form-group">
            <label for="savings">存款金额 (¥)
                <span class="tooltip-icon" title="可用于购房首付的资金总额">?</span>
            </label>
            <input type="number" id="savings" min="0" required value="500000">
            <span class="help-text">您可用于购房首付的总存款</span>
        </div>
        <div class="form-group">
            <label for="interest-rate">贷款利率 (%)
                <span class="tooltip-icon" title="当前市场的房贷利率，可咨询银行获取最新利率">?</span>
            </label>
            <input type="number" id="interest-rate" min="0" max="20" step="0.1" required value="4.5">
            <span class="help-text">房贷年利率，目前中国房贷利率通常在4-6%之间</span>
        </div>
        <div class="form-group">
            <label for="tax-rate">税率 (%)</label>
            <input type="number" id="tax-rate" min="0" max="100" step="0.1" required value="20">
            <span class="help-text">您的综合所得税率</span>
        </div>
        <div class="form-group">
            <label for="down-payment-percent">首付比例 (%)
                <span class="tooltip-icon" title="首付款占总房价的比例，通常首套房最低为20-30%">?</span>
            </label>
            <input type="number" id="down-payment-percent" min="10" max="100" step="1" required value="30">
            <span class="help-text">首付款占总房价的百分比，影响贷款金额和月供</span>
        </div>
        <div class="form-group">
            <label for="other-debts">其他月债务支出 (¥)
                <span class="tooltip-icon" title="包括信用卡还款、车贷、其他贷款等固定月支出">?</span>
            </label>
            <input type="number" id="other-debts" min="0" required value="2000">
            <span class="help-text">您每月需偿还的其他债务总额</span>
        </div>
        <div class="form-group">
            <label for="loan-term">贷款期限 (年)
                <span class="tooltip-icon" title="房贷还款期限，通常为10-30年">?</span>
            </label>
            <input type="number" id="loan-term" min="1" max="30" required value="30">
            <span class="help-text">房贷的还款年限，期限越长月供越低但总利息越高</span>
        </div>
        <button type="submit">计算购房负担能力</button>
    `;
}