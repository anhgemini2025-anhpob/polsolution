/**
 * VIETHOATALK (VIETHOA PRO) - POL SOLUTION
 * Interactive Application Engine & Business Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initDynamicTextScaling();
  initPhoneTabSwitcher();
  initCultureGuardTester();
  initCurriculumSystem();
  initAiPromptBuilder();
  initDeviceBindingTester();
  initCurrencyConverter();
  initModals();
  initAudioSimulation();
  initSmoothScroll();
});

/* ==========================================================================
   1. Dynamic Text Scaling System (A- / A+)
   ========================================================================== */
function initDynamicTextScaling() {
  const sizes = ['font-size-sm', 'font-size-base', 'font-size-lg', 'font-size-xl'];
  let currentIdx = 1; // default 'font-size-base'
  
  const btnDec = document.getElementById('btnFontDecrease');
  const btnInc = document.getElementById('btnFontIncrease');
  const labelIndicator = document.getElementById('fontScaleIndicator');

  function updateFontClass() {
    sizes.forEach(cls => document.body.classList.remove(cls));
    document.body.classList.add(sizes[currentIdx]);
    if (labelIndicator) {
      const percentage = [85, 100, 115, 130][currentIdx];
      labelIndicator.textContent = `${percentage}%`;
    }
  }

  if (btnDec) {
    btnDec.addEventListener('click', () => {
      if (currentIdx > 0) {
        currentIdx--;
        updateFontClass();
        showToast(`Cỡ chữ: ${[85, 100, 115, 130][currentIdx]}% (Tối ưu cho nhà xưởng)`);
      }
    });
  }

  if (btnInc) {
    btnInc.addEventListener('click', () => {
      if (currentIdx < sizes.length - 1) {
        currentIdx++;
        updateFontClass();
        showToast(`Cỡ chữ: ${[85, 100, 115, 130][currentIdx]}% (Dễ nhìn ngoài trời)`);
      }
    });
  }
}

/* ==========================================================================
   2. Interactive Phone Mockup Tab Switcher
   ========================================================================== */
function initPhoneTabSwitcher() {
  const phoneTabs = document.querySelectorAll('.phone-nav-btn');
  const screenContents = document.querySelectorAll('.phone-tab-content');

  phoneTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      phoneTabs.forEach(b => {
        b.classList.remove('text-[#07C160]', 'font-bold');
        b.classList.add('text-gray-400');
      });
      btn.classList.remove('text-gray-400');
      btn.classList.add('text-[#07C160]', 'font-bold');

      screenContents.forEach(content => {
        content.classList.add('hidden');
        if (content.id === `phone-screen-${targetTab}`) {
          content.classList.remove('hidden');
        }
      });
    });
  });

  // Shadowing 3s button inside phone
  const btnShadowing = document.getElementById('phoneShadowingTrigger');
  const timerDisplay = document.getElementById('phoneShadowingTimer');
  if (btnShadowing && timerDisplay) {
    let countdownInterval = null;
    btnShadowing.addEventListener('click', () => {
      if (countdownInterval) clearInterval(countdownInterval);
      let count = 3.0;
      btnShadowing.classList.add('bg-red-500', 'text-white');
      btnShadowing.innerHTML = `<i class="fa-solid fa-microphone-lines animate-pulse mr-1"></i> Đang nghe nhại âm...`;
      timerDisplay.textContent = `3.0s`;
      timerDisplay.classList.remove('hidden');

      countdownInterval = setInterval(() => {
        count -= 0.1;
        if (count <= 0) {
          clearInterval(countdownInterval);
          timerDisplay.textContent = `0.0s`;
          btnShadowing.classList.remove('bg-red-500', 'text-white');
          btnShadowing.innerHTML = `<i class="fa-solid fa-check text-green-500 mr-1"></i> Chuẩn âm 98%!`;
          showToast('🎉 Vietnamese Phonetic Alignment: Chuẩn Tứ thanh & Âm z/c/s!');
          setTimeout(() => {
            btnShadowing.innerHTML = `<i class="fa-solid fa-rotate-right mr-1"></i> Nhại âm 3s tiếp`;
            timerDisplay.classList.add('hidden');
          }, 2000);
        } else {
          timerDisplay.textContent = `${count.toFixed(1)}s`;
        }
      }, 100);
    });
  }
}

/* ==========================================================================
   3. Culture Guard Live Engine (Taboo Scanner & Auto-Fix)
   ========================================================================== */
function initCultureGuardTester() {
  const input = document.getElementById('cultureGuardInput');
  const resultBox = document.getElementById('cultureGuardResult');
  const fixBtn = document.getElementById('cultureGuardFixBtn');
  const quickTestButtons = document.querySelectorAll('.culture-test-chip');

  const TABOO_RULES = [
    {
      regex: /^\s*知道了\s*$/i,
      keyword: '知道了',
      severity: 'taboo',
      message: 'LỖI THẤT LỄ VĂN PHÒNG: Từ "知道了" (Biết rồi) dùng đơn độc thể hiện thái độ cộc lốc, vô cảm hoặc xem thường cấp trên.',
      suggestion: '收到经理，5分钟内发给您。',
      pinyin: 'Shōudào jīnglǐ, wǔ fēnzhōng nèi fā gěi nín.',
      vi: 'Đã nhận thưa giám đốc, sẽ gửi tới ngài trong vòng 5 phút.'
    },
    {
      regex: /^\s*嗯+\s*$/i,
      keyword: '嗯',
      severity: 'taboo',
      message: 'CẤM KỴ CÔNG SỞ TRUNG QUỐC: Nhắn "嗯" (Ừ) đơn độc bị coi là bất lịch sự, lười nhác và thiếu nhiệt huyết hợp tác.',
      suggestion: '好的，没问题！我马上去办。',
      pinyin: 'Hǎo de, méi wèntí! Wǒ mǎshàng qù bàn.',
      vi: 'Dạ được, không vấn đề gì! Tôi sẽ đi xử lý ngay lập tức.'
    },
    {
      regex: /^\s*干嘛\s*$/i,
      keyword: '干嘛',
      severity: 'taboo',
      message: 'VĂN PHONG GẮT GỎNG: "干嘛" (Làm gì đấy?) dễ gây hiểu nhầm là bạn đang bực tức hoặc chất vấn sếp/khách hàng.',
      suggestion: '请问有什么需要我协助的吗？',
      pinyin: 'Qǐngwèn yǒu shénme xūyào wǒ xiézhù de ma?',
      vi: 'Xin hỏi ngài có điều gì cần tôi hỗ trợ không ạ?'
    }
  ];

  function evaluateText(text) {
    if (!text || text.trim() === '') {
      resultBox.innerHTML = `
        <div class="text-sm text-gray-500 italic p-3 bg-gray-50 rounded-lg">
          <i class="fa-solid fa-circle-info mr-1 text-blue-500"></i> Hãy nhập câu tiếng Trung hoặc bấm các ví dụ mẫu bên dưới để kiểm tra bộ lọc Culture Guard.
        </div>`;
      if (fixBtn) fixBtn.classList.add('hidden');
      return;
    }

    const trimmed = text.trim();
    let matchedRule = null;

    for (const rule of TABOO_RULES) {
      if (rule.regex.test(trimmed)) {
        matchedRule = rule;
        break;
      }
    }

    if (matchedRule) {
      resultBox.innerHTML = `
        <div class="p-4 rounded-xl border border-red-300 bg-red-50 text-red-900 animate-pulse">
          <div class="flex items-center gap-2 font-bold text-red-700 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-ping"></span>
            <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
            <span>CẢNH BÁO CULTURE GUARD: PHÁT HIỆN TỪ CẤM KỴ</span>
          </div>
          <p class="text-sm mb-3">${matchedRule.message}</p>
          <div class="p-3 bg-white rounded-lg border border-red-200">
            <div class="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Gợi ý câu chuẩn bản xứ (Polite & Professional):</div>
            <div class="text-base font-bold text-emerald-700 font-chinese">${matchedRule.suggestion}</div>
            <div class="text-xs text-emerald-600 font-mono mt-0.5">${matchedRule.pinyin}</div>
            <div class="text-xs text-gray-600 mt-1">Dịch nghĩa: ${matchedRule.vi}</div>
          </div>
        </div>
      `;
      if (fixBtn) {
        fixBtn.classList.remove('hidden');
        fixBtn.onclick = () => {
          input.value = matchedRule.suggestion;
          evaluateText(matchedRule.suggestion);
          showToast('✅ Đã tự động thay thế bằng câu chuẩn công sở lịch sự!');
        };
      }
    } else {
      resultBox.innerHTML = `
        <div class="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900">
          <div class="flex items-center gap-2 font-bold text-emerald-700 mb-1">
            <i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
            <span>VĂN PHONG AN TOÀN & LỊCH SỰ (SAFE CULTURE RATING: 100%)</span>
          </div>
          <p class="text-sm text-emerald-800">
            Câu thoại phù hợp với quy chuẩn giao tiếp công xưởng, tôn trọng cấp trên và tạo ấn tượng đáng tin cậy.
          </p>
        </div>
      `;
      if (fixBtn) fixBtn.classList.add('hidden');
    }
  }

  if (input) {
    input.addEventListener('input', (e) => evaluateText(e.target.value));
  }

  quickTestButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const phrase = btn.getAttribute('data-phrase');
      if (input) {
        input.value = phrase;
        evaluateText(phrase);
      }
    });
  });
}

/* ==========================================================================
   4. Curriculum 86 Lessons System (VCSF 4 Tiers & Lesson 3 Paywall)
   ========================================================================== */
const LESSONS_DATABASE = [
  // Tầng 1 (1 - 20): Sinh tồn công xưởng & Phonics
  { id: 1, tier: 1, title: 'Dừng máy khẩn cấp & Báo sự cố', pinyin: 'Jǐnjí tíngjī yǔ gùzhàng bàogào', cn: '紧急停机与故障报告', tags: ['Cứu hộ', 'Điện', 'An toàn'], free: true, desc: 'Khẩu lệnh dừng máy khẩn cấp ngay khi phát hiện chập cháy, lệch trục.' },
  { id: 2, tier: 1, title: 'Phonics: Sửa lỗi ngọng âm vị z/c/s vs zh/ch/sh', pinyin: 'Shēngmǔ z/c/s yǔ zh/ch/sh jiūzhèng', cn: '声母 z/c/s 与 zh/ch/sh 纠正', tags: ['Phát âm', 'Tứ thanh'], free: true, desc: 'Bản đồ khẩu hình lưỡi, dứt điểm lỗi nói ngọng khiến AI chấm sai.' },
  { id: 3, tier: 1, title: 'An toàn lao động & Đồ bảo hộ cá nhân (PPE)', pinyin: 'Láodòng ānquán yǔ fánghù yòngpǐn', cn: '劳动安全与防护用品', tags: ['Nhà xưởng', 'PPE'], free: false, paywall: true, desc: 'Yêu cầu mũ bảo hiểm, găng tay cách điện, kính chắn bụi.' },
  { id: 7, tier: 1, title: 'Giao nhận ca sản xuất & Kiểm đếm bán thành phẩm', pinyin: 'Jiāobān yǔ bànchéngpǐn diǎnyàn', cn: '交班与半成品点验', tags: ['Giao ca', 'Kho'], free: false, desc: 'Bàn giao số lượng, ghi chép biên bản giao ca công nhân.' },
  { id: 14, tier: 1, title: 'Vận hành lò nhiệt luyện & Khí nén nhà xưởng', pinyin: 'Rèchǔlǐ lú yǔ qìyā cāozuò', cn: '热处理炉与气压操作', tags: ['Cơ khí', 'Khí nén'], free: false, desc: 'Điều chỉnh đồng hồ áp suất, cảnh báo rò rỉ van khí cao áp.' },
  { id: 19, tier: 1, title: 'Khai khoáng Bauxite & Tuyển quặng kim loại', pinyin: 'Lǚtǔkuàng kāicǎi yǔ xuǎnkuàng', cn: '铝土矿开采与选矿', tags: ['Khai khoáng', 'Bauxite'], free: false, desc: 'Báo cáo thông số độ ẩm, tạp chất và điều vận xe tải hạng nặng.' },

  // Tầng 2 (21 - 45): Văn phòng, WeChat Work & Thương mại
  { id: 21, tier: 2, title: 'Văn phong WeChat Work: Báo cáo đầu ngày (早会)', pinyin: 'Qǐyè Wēixìn zǎohuì huìbào', cn: '企业微信早会汇报', tags: ['WeChat', 'Họp ca'], free: false, desc: 'Cách xưng hô tôn kính, trình bày 3 gạch đầu dòng tiến độ.' },
  { id: 28, tier: 2, title: 'Mặc cả phí vận chuyển sỉ trên Taobao / 1688', pinyin: '1688 Pīfā bāoyóu yǔ kǎnjià', cn: '1688 批发包邮与砍价', tags: ['1688', 'Thương mại'], free: false, desc: 'Nhắn tin shop 1688 đòi chiết khấu đơn lớn, xin miễn ship nội địa.' },
  { id: 34, tier: 2, title: 'Xuất khẩu sầu riêng Monthong & Ri6 qua cửa khẩu', pinyin: 'Liúlián chūkǒu kǒugàn tōngguān', cn: '榴莲出口口岸通关', tags: ['Nông sản', 'Sầu riêng'], free: false, desc: 'Đặc tả độ đường Brix, cơm vàng hạt lép, kiểm dịch thực vật.' },
  { id: 40, tier: 2, title: 'Sự cố đứt chuỗi lạnh xe container (断链事故)', pinyin: 'Lěngliàn duànliàn shìgù chǔlǐ', cn: '冷链断链事故处理', tags: ['Logistics', 'Chuỗi lạnh'], free: false, desc: 'Lập biên bản chênh lệch nhiệt độ container âm 18 độ C, đòi bồi thường.' },
  { id: 44, tier: 2, title: 'Kê khai mã số vùng trồng & Mã đóng gói GACC', pinyin: 'GACC Zhòngzhíyuán yǔ bāozhuāng chǎng bèicàn', cn: 'GACC 种植源与包装厂备案', tags: ['GACC', 'Hải quan'], free: false, desc: 'Đối chiếu chứng thư chất lượng xuất khẩu chính ngạch sang Trung Quốc.' },

  // Tầng 3 (46 - 70): Chuyên môn ngách & Xử lý sự cố
  { id: 48, tier: 3, title: 'Cân chỉnh thông số máy ép nhựa (注塑机)', pinyin: 'Zhùsùjī cānshù tiáozhěng yǔ bókōng', cn: '注塑机参数调整与拔空', tags: ['Ép nhựa', 'Khuôn mẫu'], free: false, desc: 'Khắc phục lỗi cong vênh, bọt khí và áp suất phun keo.' },
  { id: 53, tier: 3, title: 'Dây chuyền linh kiện điện tử SMT & Kiểm tra AOI', pinyin: 'SMT Tiēpiàn fāngxiàng yǔ AOI jiǎnchá', cn: 'SMT 贴片方向与 AOI 检查', tags: ['SMT', 'Điện tử'], free: false, desc: 'Đọc mã lỗi hàn chì nguội, chạm mạch IC trên bo mạch chủ.' },
  { id: 62, tier: 3, title: 'Quy trình hoàn thuế VAT xuất khẩu (退税流程)', pinyin: 'Chūkǒu tuìshuì yǔ Fāpiào héchá', cn: '出口退税与发票核查', tags: ['Tài chính', 'Thuế VAT'], free: false, desc: 'Làm việc với kế toán trưởng đối tác về hóa đơn đỏ và Form E.' },
  { id: 67, tier: 3, title: 'Thủ tục cấp Giấy phép đầu tư IRC & Doanh nghiệp ERC', pinyin: 'Wàizi qǐyè IRC yǔ ERC zhízhào shēnqǐng', cn: '外资企业 IRC 与 ERC 执照申请', tags: ['Pháp lý', 'IRC/ERC'], free: false, desc: 'Tư vấn giải trình kinh tế kỹ thuật cho nhà đầu tư Thâm Quyến/Đài Loan.' },

  // Tầng 4 (71 - 86): Đàm phán chiến lược & Pháp lý
  { id: 72, tier: 4, title: 'Đàm phán hợp đồng cung ứng B2B & Điều khoản phạt', pinyin: 'B2B Gōngyìng hétong tánpàn', cn: 'B2B 供应合同谈判', tags: ['Hợp đồng', 'B2B'], free: false, desc: 'Thương thảo tỷ lệ đặt cọc 30-70, bảo lãnh thanh toán LC.' },
  { id: 78, tier: 4, title: 'Giải quyết tài khoản ngân hàng / Alipay bị đóng băng', pinyin: 'Yínháng kǎ yǔ Zhīfùbǎo dòngjié shēnsu', cn: '银行卡与支付宝冻结申诉', tags: ['Alipay', 'Ngân hàng'], free: false, desc: 'Nộp sao kê chứng minh dòng tiền thương mại sạch, gỡ phong tỏa.' },
  { id: 82, tier: 4, title: 'Đón tiếp đoàn lãnh đạo VIP & Thuê xe điện EV Taxi', pinyin: 'Jiēdài VIP yǔ Diàndòng chūzūchē yùdìng', cn: '接待 VIP 与电动出租车预订', tags: ['VIP', 'EV Taxi'], free: false, desc: 'Đặt xe công nghệ cốp rộng 2 vali lớn, đưa đón sân bay Tân Sơn Nhất / Nội Bài.' },
  { id: 86, tier: 4, title: 'Đại tiệc chiêu đãi doanh nghiệp & Kính rượu đúng lễ nghi', pinyin: 'Shāngwù yànhuì yǔ Jiǔzhuō lǐyí', cn: '商务宴会与酒桌礼仪', tags: ['Ngoại giao', 'Văn hóa'], free: false, desc: 'Các câu chúc thâm sâu, cách đỡ chén rượu ngang hàng sếp lớn.' }
];

function initCurriculumSystem() {
  const container = document.getElementById('curriculumList');
  const filterButtons = document.querySelectorAll('.tier-filter-btn');
  const searchInput = document.getElementById('curriculumSearch');
  let currentTier = 'all';
  let searchTerm = '';

  function renderLessons() {
    if (!container) return;

    let filtered = LESSONS_DATABASE.filter(item => {
      const matchTier = (currentTier === 'all') || (item.tier === parseInt(currentTier));
      const matchSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cn.includes(searchTerm) ||
        item.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchTier && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
          <i class="fa-solid fa-book-open text-4xl text-gray-300 mb-3"></i>
          <p class="text-gray-500 font-medium">Không tìm thấy bài học phù hợp với từ khóa "${searchTerm}".</p>
          <button class="mt-3 text-sm text-emerald-600 font-bold hover:underline" onclick="document.getElementById('curriculumSearch').value=''; document.getElementById('curriculumSearch').dispatchEvent(new Event('input'))">Xóa bộ lọc tìm kiếm</button>
        </div>`;
      return;
    }

    container.innerHTML = filtered.map(item => {
      const isFree = item.free;
      const isGate = item.paywall;

      return `
        <div class="bg-white rounded-2xl p-5 border ${isGate ? 'border-amber-400 shadow-md ring-2 ring-amber-100' : 'border-gray-200'} hover:border-emerald-500 hover:shadow-lg transition-all duration-200 relative flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full ${
                item.tier === 1 ? 'bg-blue-100 text-blue-700' :
                item.tier === 2 ? 'bg-emerald-100 text-emerald-700' :
                item.tier === 3 ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-800'
              }">TẦNG ${item.tier} • BÀI ${String(item.id).padStart(2, '0')}</span>
              
              ${isFree ? 
                `<span class="text-xs font-semibold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200"><i class="fa-solid fa-lock-open mr-1"></i> Trải Nghiệm Free</span>` :
                isGate ?
                `<span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-sm animate-pulse"><i class="fa-solid fa-key mr-1"></i> Điểm Chặn Kích Hoạt</span>` :
                `<span class="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-500"><i class="fa-solid fa-lock mr-1"></i> Bản Quyền VIP</span>`
              }
            </div>

            <h4 class="font-bold text-gray-900 text-base mb-1 group-hover:text-emerald-600">${item.title}</h4>
            <div class="font-chinese text-sm font-semibold text-emerald-800 mb-0.5">${item.cn}</div>
            <div class="font-mono text-xs text-gray-500 italic mb-2">${item.pinyin}</div>
            <p class="text-xs text-gray-600 line-clamp-2 mb-3">${item.desc}</p>
          </div>

          <div>
            <div class="flex flex-wrap gap-1 mb-3">
              ${item.tags.map(t => `<span class="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded">#${t}</span>`).join('')}
            </div>

            <button 
              onclick="handleLessonClick(${item.id}, ${item.free})" 
              class="w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isFree ? 
                'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-300' :
                isGate ?
                'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:brightness-110 shadow-sm' :
                'bg-gray-100 text-gray-700 hover:bg-emerald-500 hover:text-white'
              }">
              ${isFree ? '<i class="fa-solid fa-play"></i> Học Thử 3 Phút Ngay' :
                isGate ? '<i class="fa-solid fa-gift"></i> Đăng Ký Mở Khóa +14 Ngày VIP' :
                '<i class="fa-solid fa-lock"></i> Kích Hoạt Bản Quyền'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'text-gray-700');
      });
      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-gray-700');

      currentTier = btn.getAttribute('data-tier');
      renderLessons();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderLessons();
    });
  }

  window.handleLessonClick = function(id, isFree) {
    if (isFree) {
      // Free preview
      showToast(`🎧 Đang mở Bài học #${id}: Nghe mô phỏng ngữ cảnh 30 giây...`);
      openModal('demoModal');
    } else {
      // Trigger Paywall / Registration gate
      showToast(`🔒 Bài học #${id}: Đăng ký 1-chạm để mở khóa 14 TUẦN FREE + 14 NGÀY VIP!`);
      openModal('registerModal');
    }
  };

  renderLessons();
}

/* ==========================================================================
   5. Interactive AI Prompt Builder & Advisor (Section 6)
   ========================================================================== */
const PROMPT_PRESETS = {
  engineer: {
    role: 'Kỹ sư Phân xưởng SMT & Ép Nhựa (Bắc Ninh / Hải Phòng)',
    title: 'Báo cáo khẩn cấp: Máy ép nhựa bị nghẹt đầu phun keo',
    dialogue: {
      userVi: 'Giám đốc ơi, máy ép nhựa số 3 đang bị nghẹt vòi phun keo, nhiệt độ khuôn quá cao cần dừng máy gấp để bảo dưỡng.',
      userPinyin: 'Jīnglǐ, sān hào zhùsùjī shèzuǐ dǔsè, mójù wēndù guò gāo, xūyào lìjí tíngjī jiǎnxiū.',
      userCn: '经理，3号注塑机射嘴堵塞，模具温度过高，需要立即停机检修。',
      hanViet: 'Kinh lý, tam hào chú tố cơ xạ chủy đỗ tắc, mô cụ ôn độ quá cao, nhu yếu lập tức đình cơ kiểm tu.'
    },
    chunks: ['射嘴堵塞 (nghẹt vòi phun)', '模具温度过高 (nhiệt độ khuôn quá cao)', '立即停机检修 (dừng máy bảo dưỡng gấp)'],
    guardNote: '⚠️ Lưu ý: Khi báo tin xấu cho sếp Trung, bắt đầu bằng "经理，汇报一个紧急情况" (Báo cáo tình huống khẩn) để thể hiện sự bình tĩnh và chuyên nghiệp.',
    promptSystem: `[POL-SOLUTION-ROLEPLAY: SMT_INJECTION_ENGINEER]
Bạn là Kỹ sư trưởng xưởng ép nhựa người Trung Quốc. Hãy kiểm tra báo cáo sự cố máy móc của kỹ sư Việt Nam. Chú trọng thuật ngữ ép nhựa (射嘴, 模具, 气泡), sửa ngọng Tứ thanh và nhắc nhở an toàn điện.`
  },
  durian: {
    role: 'Chủ vựa Sầu Riêng Xuất Khẩu (Tiền Giang / Đắk Lắk)',
    title: 'Khiếu nại cửa khẩu: Đứt chuỗi lạnh container sầu riêng Monthong',
    dialogue: {
      userVi: 'Thương vụ Lưu, container sầu riêng Monthong đến Bằng Tường bị đứt chuỗi lạnh làm tăng 5 độ C, đề nghị giám định độc lập lập biên bản.',
      userPinyin: 'Liú zǒng, Píngxiáng kǒugàn de Jīnzhěn liúlián guì fāshēng duànliàn, wēndù shàngshēng wǔ dù, qǐng dāofāng jiàndìng chū jù bàogào.',
      userCn: '刘总，凭祥口岸的金枕榴莲柜发生断链，温度上升5度，请第三方鉴定出具报告。',
      hanViet: 'Lưu tổng, Bằng Tường khẩu ngạn đích Kim Chẩm lưu liên quỹ phát sinh đoạn liên, ôn độ thượng thăng ngũ độ, thỉnh đệ tam phương giám định xuất cụ báo cáo.'
    },
    chunks: ['金枕榴莲 (sầu riêng Monthong)', '断链事故 (sự cố đứt chuỗi lạnh)', '第三方鉴定 (giám định bên thứ 3)'],
    guardNote: '⚠️ Khuyên dùng: Dùng từ "协商处理" (thương lượng xử lý) thay vì "赔偿" (bồi thường ngay lập tức) để giữ thể diện và giữ mối làm ăn lớn.',
    promptSystem: `[POL-SOLUTION-ROLEPLAY: DURIAN_BORDER_BROKER]
Bạn là Thương vụ thu mua nông sản tại Cửa khẩu Bằng Tường / Hữu Nghị Quan. Người dùng là chủ vựa sầu riêng Việt Nam đang xử lý tranh chấp nhiệt độ container bảo quản lạnh. Đàm phán phương án giữ giá theo mã GACC.`
  },
  trader: {
    role: 'Dân Buôn Sỉ 1688 / Taobao / Chợ Sa Hà Quảng Châu',
    title: 'Mặc cả giá sỉ 500 áo khoác phao & Miễn phí vận chuyển nội địa',
    dialogue: {
      userVi: 'Chủ shop ơi, tôi lấy 500 cái áo mẫu này gửi kho Chiết Giang, giảm thêm 2 tệ mỗi cái và bao ship nội địa nhé, sau này tôi đặt đều hàng tuần.',
      userPinyin: 'Zhǎngguì, wǒ dìng wǔbǎi jiàn fā Zhèjiāng cāng, měijiàn zài yōuhuì liǎng kuài bìng bāoyóu ba, hòuxù měizhōu dōu huì fùgòu.',
      userCn: '掌柜，我订500件发浙江仓，每件再优惠两块并包邮吧，后续每周都会复购。',
      hanViet: 'Chưởng quỹ, ngã định ngũ bách kiện phát Chiết Giang thương, mỗi kiện tái ưu huệ lưỡng khối tịnh bao bưu ba, hậu tục mỗi chu đô hội phục cấu.'
    },
    chunks: ['发浙江仓 (gửi kho Chiết Giang)', '每件优惠两块 (mỗi cái giảm 2 tệ)', '包邮 (bao ship)', '每周复购 (mua lại hàng tuần)'],
    guardNote: '⚠️ Mẹo 1688: Xưng hô là "掌柜" (Chưởng quỹ) hoặc "老板" (Lão bản), luôn nhấn mạnh chữ "复购" (mua lại định kỳ) để shop sẵn sàng hạ giá sàn.',
    promptSystem: `[POL-SOLUTION-ROLEPLAY: 1688_WHOLESALE_SHOP]
Bạn là chủ xưởng may sỉ trên 1688 tại Quảng Châu. Hãy đàm phán số lượng tối thiểu (MOQ), thời gian xuất kho, chiết khấu bậc thang và hỗ trợ dán tem nhãn phụ cho con buôn người Việt.`
  },
  logistics: {
    role: 'Quản Lý Logistics & Thủ Tục Hải Quan Cửa Khẩu',
    title: 'Đối chiếu chứng thư xuất xứ C/O Form E và thông quan nhanh',
    dialogue: {
      userVi: 'Cán bộ hải quan, lô hàng linh kiện điện tử này đã có C/O Form E bản điện tử đầy đủ, xin phép ưu tiên kiểm tra luồng xanh để kịp chuyến bay.',
      userPinyin: 'Guānzhǎng, zhè pī diànzǐ língjiàn yǐ yǒu diànzǐ C/O Form E, shēnqǐng zǒng lǜsè tōngdào yǐ gǎnshàng hángbān.',
      userCn: '关长，这批电子零件已有电子 C/O Form E，申请走绿色通道以赶上航班。',
      hanViet: 'Quan trưởng, giá phê điện tử linh kiện dĩ hữu điện tử C/O Form E, thân thỉnh tẩu lục sắc thông đạo dĩ cản thượng hàng ban.'
    },
    chunks: ['电子 C/O Form E (chứng nhận xuất xứ Form E)', '绿色通道 (luồng xanh)', '赶上航班 (kịp chuyến bay)'],
    guardNote: '⚠️ Quy chuẩn: Luôn giữ thái độ trang trọng, xưng hô "关长" (quan trưởng) hoặc "领导" (lãnh đạo), tuyệt đối không dùng ngôn ngữ suồng sã.',
    promptSystem: `[POL-SOLUTION-ROLEPLAY: CUSTOMS_LOGISTICS_EXPERT]
Bạn là Chuyên viên logistics cửa khẩu phụ trách thông quan hàng hóa Trung - Việt. Hãy đối chiếu tờ khai hải quan, mã HS Code, biểu thuế Form E và kiểm tra niêm phong chì seal.`
  }
};

function initAiPromptBuilder() {
  const roleSelect = document.getElementById('aiRoleSelect');
  const generateBtn = document.getElementById('aiGeneratePromptBtn');
  const outputBox = document.getElementById('aiPromptOutput');
  const copyBtn = document.getElementById('aiCopyPromptBtn');

  function renderScenario(key) {
    const data = PROMPT_PRESETS[key] || PROMPT_PRESETS.engineer;
    if (!outputBox) return;

    outputBox.innerHTML = `
      <div class="space-y-4">
        <!-- Header -->
        <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div class="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <i class="fa-solid fa-crosshairs mr-1"></i> Tình huống thực chiến:
          </div>
          <div class="text-base font-bold text-gray-900">${data.title}</div>
          <div class="text-xs text-gray-500 mt-1">${data.role}</div>
        </div>

        <!-- Dialogue Box -->
        <div class="bg-white p-4 rounded-xl border-2 border-emerald-100 shadow-sm">
          <div class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span><i class="fa-solid fa-volume-high text-emerald-500 mr-1"></i> Phản Xạ Nghe - Nói & Gõ Pinyin</span>
            <span class="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Shadowing 3s</span>
          </div>
          
          <div class="space-y-2">
            <div class="text-sm font-medium text-gray-800">
              <span class="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mr-1">Việt</span> ${data.dialogue.userVi}
            </div>
            <div class="text-lg font-bold text-emerald-700 font-chinese">
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mr-1">Trung</span> ${data.dialogue.userCn}
            </div>
            <div class="text-xs font-mono text-emerald-800 bg-emerald-50/50 p-2 rounded-lg border border-emerald-200">
              <strong>Pinyin:</strong> ${data.dialogue.userPinyin}
            </div>
            <div class="text-xs text-gray-500 italic">
              <strong>Ánh xạ Hán-Việt (70%):</strong> ${data.dialogue.hanViet}
            </div>
          </div>
        </div>

        <!-- Chunks & Culture Guard -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <div class="font-bold text-amber-900 mb-1.5"><i class="fa-solid fa-cubes-stacked mr-1"></i> Khối Chunks Cốt Lõi:</div>
            <ul class="space-y-1">
              ${data.chunks.map(c => `<li class="font-chinese font-semibold text-amber-800">• ${c}</li>`).join('')}
            </ul>
          </div>
          <div class="p-3 bg-red-50 rounded-xl border border-red-200">
            <div class="font-bold text-red-900 mb-1.5"><i class="fa-solid fa-shield-halved mr-1"></i> Culture Guard Chỉ Điểm:</div>
            <p class="text-red-800">${data.guardNote}</p>
          </div>
        </div>

        <!-- AI System Prompt Generated -->
        <div class="p-3 bg-gray-900 text-gray-200 rounded-xl font-mono text-xs overflow-x-auto">
          <div class="flex items-center justify-between text-gray-400 mb-2 border-b border-gray-800 pb-1">
            <span><i class="fa-solid fa-terminal mr-1 text-emerald-400"></i> VietHoaTalk System Prompt:</span>
            <span class="text-[10px] text-gray-500">Latency &lt; 200ms</span>
          </div>
          <pre class="whitespace-pre-wrap">${data.promptSystem}</pre>
        </div>
      </div>
    `;

    if (copyBtn) {
      copyBtn.classList.remove('hidden');
      copyBtn.onclick = () => {
        const textToCopy = `${data.dialogue.userCn}\n${data.dialogue.userPinyin}\n${data.promptSystem}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('📋 Đã copy Kịch bản & System Prompt vào bộ nhớ tạm!');
        });
      };
    }
  }

  if (generateBtn && roleSelect) {
    generateBtn.addEventListener('click', () => {
      const selected = roleSelect.value;
      generateBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang khởi tạo...`;
      setTimeout(() => {
        renderScenario(selected);
        generateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Tạo Kịch Bản Mới`;
        showToast('⚡ Đã sinh kịch bản thực chiến qua Động cơ AI VietHoaTalk!');
      }, 400);
    });

    roleSelect.addEventListener('change', () => {
      renderScenario(roleSelect.value);
    });

    // Initial render
    renderScenario('engineer');
  }
}

/* ==========================================================================
   6. Device Binding SHA-256 DRM Simulator (Section 5)
   ========================================================================== */
function initDeviceBindingTester() {
  const scanBtn = document.getElementById('btnScanDeviceBinding');
  const resultDisplay = document.getElementById('deviceBindingResult');

  if (scanBtn && resultDisplay) {
    scanBtn.addEventListener('click', () => {
      scanBtn.innerHTML = `<i class="fa-solid fa-microchip fa-spin mr-1 text-amber-300"></i> Đang quét SHA-256 phần cứng...`;
      
      setTimeout(() => {
        const hex = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('').toUpperCase();
        const deviceId = `POL-HW-${hex}-2026-BIND`;
        
        resultDisplay.innerHTML = `
          <div class="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs space-y-1">
            <div class="flex items-center justify-between text-emerald-400 font-bold">
              <span><i class="fa-solid fa-shield-check mr-1"></i> KHÓA PHẦN CỨNG THÀNH CÔNG</span>
              <span class="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">DRM ACTIVE</span>
            </div>
            <div class="font-mono text-amber-300 font-semibold break-all">Mã định danh: ${deviceId}</div>
            <p class="text-gray-300 text-[11px]">
              Đã ghi nhận chữ ký CPU ID + Mainboard Serial. Thiết bị này đủ điều kiện kích hoạt <strong>14 TUẦN MIỄN PHÍ + 14 NGÀY VIP</strong> duy nhất 1 lần!
            </p>
          </div>
        `;
        scanBtn.innerHTML = `<i class="fa-solid fa-circle-check text-green-400 mr-1"></i> Thiết Bị Đã Khóa Hợp Lệ`;
        scanBtn.classList.remove('bg-amber-500');
        scanBtn.classList.add('bg-emerald-600');
        showToast(`🔒 Mã khóa thiết bị: ${deviceId}`);
      }, 700);
    });
  }
}

/* ==========================================================================
   7. Realtime Currency Converter Widget (RMB <-> VND <-> USD)
   ========================================================================== */
function initCurrencyConverter() {
  const rmbInput = document.getElementById('calcRmbInput');
  const vndOutput = document.getElementById('calcVndOutput');
  const usdOutput = document.getElementById('calcUsdOutput');
  const rateDisplay = document.getElementById('calcCurrentRate');

  // Commercial exchange rates
  const RATE_RMB_VND = 3585; // 1 RMB = 3,585 VND
  const RATE_USD_VND = 25420; // 1 USD = 25,420 VND

  function update() {
    if (!rmbInput || !vndOutput || !usdOutput) return;
    const rmb = parseFloat(rmbInput.value) || 0;
    const vnd = rmb * RATE_RMB_VND;
    const usd = vnd / RATE_USD_VND;

    vndOutput.textContent = new Intl.NumberFormat('vi-VN').format(Math.round(vnd)) + ' ₫';
    usdOutput.textContent = '$' + usd.toFixed(2);
  }

  if (rmbInput) {
    rmbInput.addEventListener('input', update);
    update();
  }

  if (rateDisplay) {
    rateDisplay.textContent = `Tỷ giá thương mại hôm nay: 1 Tệ (RMB) ≈ 3,585 VNĐ`;
  }
}

/* ==========================================================================
   8. Modals Management (Registration & Demo)
   ========================================================================== */
function initModals() {
  // Modal triggers
  const openRegButtons = document.querySelectorAll('.trigger-open-register');
  const openDemoButtons = document.querySelectorAll('.trigger-open-demo');
  const closeButtons = document.querySelectorAll('.modal-close-btn');

  openRegButtons.forEach(b => b.addEventListener('click', () => openModal('registerModal')));
  openDemoButtons.forEach(b => b.addEventListener('click', () => openModal('demoModal')));
  closeButtons.forEach(b => b.addEventListener('click', () => closeModal(b.closest('.modal-container').id)));

  // Close when clicking outside modal box
  document.querySelectorAll('.modal-container').forEach(container => {
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        closeModal(container.id);
      }
    });
  });

  // Handle Register Form Submission
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = regForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Đang hoàn tất đăng ký...`;
      
      setTimeout(() => {
        // Trigger Confetti
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        }

        const modalBody = document.getElementById('registerModalBody');
        if (modalBody) {
          modalBody.innerHTML = `
            <div class="text-center py-5 space-y-3.5">
              <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                <i class="fa-solid fa-circle-check"></i>
              </div>
              <h3 class="text-lg font-bold text-gray-900">ĐĂNG KÝ TRẢI NGHIỆM THÀNH CÔNG</h3>
              <p class="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                Tài khoản của bạn đã được ghi nhận quyền trải nghiệm 14 tuần miễn phí. Bạn có thể mở trực tiếp ứng dụng để học ngay:
              </p>
              
              <div class="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl max-w-sm mx-auto text-left space-y-1.5">
                <div class="text-[11px] text-gray-500 uppercase font-semibold">Đường dẫn ứng dụng VietHoaTalk:</div>
                <a href="https://viethoatalk.vercel.app" target="_blank" rel="noopener noreferrer" class="font-mono text-sm font-bold text-emerald-800 hover:underline flex items-center gap-1">
                  https://viethoatalk.vercel.app <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
                <div class="text-[11px] text-gray-600">
                  Hỗ trợ kỹ thuật POL SOLUTION: <strong>0917 551 917</strong>
                </div>
              </div>

              <div class="pt-3 flex flex-col sm:flex-row gap-2 justify-center">
                <a href="https://viethoatalk.vercel.app" target="_blank" rel="noopener noreferrer" class="py-2.5 px-5 rounded-lg bg-[#07C160] text-white text-xs font-bold hover:bg-[#05AD55] shadow-sm flex items-center justify-center gap-1.5">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Ứng Dụng Học Ngay
                </a>
                <button onclick="closeModal('registerModal')" class="py-2.5 px-4 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200">
                  Đóng
                </button>
              </div>
            </div>
          `;
        }

        showToast('✅ Đã đăng ký thành công! Hãy mở viethoatalk.vercel.app để bắt đầu.');
      }, 700);
    });
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
}

/* ==========================================================================
   9. Audio Simulation & Waveform Animation
   ========================================================================== */
function initAudioSimulation() {
  const playButtons = document.querySelectorAll('.btn-play-simulated-audio');

  playButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isPlaying = btn.getAttribute('data-playing') === 'true';
      
      if (!isPlaying) {
        btn.setAttribute('data-playing', 'true');
        btn.innerHTML = `<i class="fa-solid fa-pause text-amber-500 mr-1"></i> Đang phát giọng AI...`;
        showToast('🔊 Đang phát Audio AI bản xứ tốc độ 1.0x (Tập trung Shadowing theo tai nghe)');
        
        setTimeout(() => {
          btn.setAttribute('data-playing', 'false');
          btn.innerHTML = `<i class="fa-solid fa-play text-emerald-500 mr-1"></i> Nghe Lại Đoạn Âm`;
        }, 3500);
      } else {
        btn.setAttribute('data-playing', 'false');
        btn.innerHTML = `<i class="fa-solid fa-play text-emerald-500 mr-1"></i> Nghe Thử Âm Thanh`;
      }
    });
  });
}

/* ==========================================================================
   10. Toast Notification Helper & One-Tap Copy
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'fixed bottom-6 right-6 z-50 bg-[#1E2229] text-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-700 text-sm flex items-center gap-3 transform translate-y-20 opacity-0 pointer-events-none transition-all duration-300';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-bell text-[#07C160]"></i> <span>${message}</span>`;
  toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
  }, 3500);
}

// Global One-Tap Copy
window.copyToClipboard = function(text, label = 'nội dung') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 Đã copy ${label}: "${text}"`);
  }).catch(() => {
    showToast(`Đã sao chép vào bộ nhớ tạm!`);
  });
};

/* ==========================================================================
   11. Smooth Scroll & Active Nav Tracking
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
