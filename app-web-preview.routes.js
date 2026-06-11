    function home() {
      if (state.homeMode === "domestic") return domesticHome();
      return overseasHome();
    }

    function overseasEntry(title, desc, glyph, attrs, cls = "") {
      return `
        <div class="overseas-entry ${cls}" ${attrs}>
          <div class="glyph">${glyphContent(glyph)}</div>
          <div>
            <strong>${title}</strong>
            <span>${desc}</span>
          </div>
        </div>
      `;
    }

    function overseasHome() {
      return `
        <div class="overseas-home">
          ${overseasEntry("中国对外免签国家列表", "查看可免签来华的国家与当前选择", "passport", `data-route="visaCountries"`, "blue")}
          ${overseasEntry("免签时间内我可以做那些治疗", "按停留周期查看可推进的治疗项目", "stethoscope", `data-route="visaTreatments"`)}
          ${overseasEntry("中国的一些医院/医师介绍", "查看医院图片、介绍与服务项目", "hospital", `data-route="overseasHospitalIntro"`, "teal")}
          ${overseasEntry("增值服务", "地勤接机、全程陪诊、翻译陪同", "concierge", `data-route="valueServices"`, "gold")}
          ${overseasEntry("商业保险/报销", "查看商业保险报销与材料说明", "insurance", `data-route="insurance"`)}
        </div>
      `;
    }

    function visaCountries() {
      return `
        <div class="notice">
          单方面免签来华 ${visaFreePolicy.count} 国，${visaFreePolicy.passport}，${visaFreePolicy.purposes}，停留不超过 ${visaFreePolicy.stay}。
        </div>
        <div class="country-panel" data-drag-scroll>
          ${visaFreeCountries.map(country => `
            <button class="country-row ${country.name === state.selectedCountry ? "active" : ""}" data-action="country:${country.name}">
              <strong>${country.name}</strong>
              <span>${country.validity}</span>
            </button>
          `).join("")}
        </div>
        <div class="info">${visaFreePolicy.source}；该列表不包含互免普通护照签证、过境免签、区域/团队免签等其他免签类型。</div>
      `;
    }

    function visaTreatments() {
      const treatmentMeta = {
        "全身体检": "1-2 天可完成，适合短期停留",
        "心脏搭桥手术": "周期长，需资料审核与专家确认",
        "胆囊切除手术": "需住院评估，不建议直接下单",
        "牙齿护理 / 种植牙": "需先评估牙周与骨量，周期由医生确认",
        "前列腺切除手术": "周期较长，建议先做资料审核"
      };
      return `
        <div class="list-panel" data-drag-scroll>
          ${Object.keys(treatmentMeta).map(name => list(name, treatmentMeta[name], "详情", `data-action="treatment:${name}"`)).join("")}
        </div>
      `;
    }

    function treatmentDetail() {
      const title = visaTreatmentDetails[state.selectedVisaTreatment] ? state.selectedVisaTreatment : "全身体检";
      const detail = visaTreatmentDetails[title];
      return `
        ${wireHeader(title)}
        <div class="list-panel treatment-detail-list" data-drag-scroll>
          ${detail.items.map(item => wireOption(item, `data-action="treatmentItem:${title}:${item}"`)).join("")}
        </div>
        <div class="treatment-detail-action">
          <button class="cta" data-route="quick">立即预约</button>
        </div>
      `;
    }

    function overseasHospitalIntro() {
      return `
        <div class="hospital-intro-page">
          ${wireHeader("医院/医师介绍")}
          <div class="hospital-intro-list" data-drag-scroll>
            ${nearbyHospitals.map((item, index) => hospitalIntroCard(item, index)).join("")}
          </div>
        </div>
      `;
    }

    function valueServices() {
      return `
        ${wireOption("地勤接机服务", `data-action="support:地勤接机服务"`)}
        ${wireOption("全程陪诊服务", `data-action="support:全程陪诊服务"`)}
        ${wireOption("服务A", `data-route="service"`)}
        ${wireOption("服务B", `data-route="service"`)}
      `;
    }

    function insurance() {
      return `
        ${wireHeader("商业保险")}
        <div class="wire-insurance-box" data-route="service">
          <strong>商业保险报销</strong>
          <span>或者查看机构之类的说明</span>
        </div>
      `;
    }

    function hospitalIntroCard(item, index) {
      const tags = item.tags || (item.desc ? item.desc.split("/").map(tag => tag.trim()).filter(Boolean) : []);
      const intro = item.intro || item.note || "介绍和说明……";
      return `
        <div class="hospital-intro-card" data-action="hospitalSelect:${index}" role="button" tabindex="0" aria-label="查看${item.name}详情和服务项目">
          <div class="hospital-intro-photo" style="background-image:url('${item.image}')">
            
          </div>
          <div class="hospital-intro-meta">
            <strong>${item.name}</strong>
            <span>${item.area} / ${item.distance}</span>
            <span class="hospital-intro-summary">${intro}</span>
            <span>${tags.join(" / ") || "介绍和说明……"}</span>
            <span>${item.booking}</span>
            <span>点击查看医院详情与服务项目</span>
          </div>
        </div>
      `;
    }

    function nearbyHospitalCard(item, index, cloneType = "") {
      const target = `data-action="hospitalSelect:${index}"`;
      const cloneAttr = cloneType ? `data-carousel-clone="${cloneType}" aria-hidden="true"` : "";
      return `
        <div class="nearby-hospital" data-carousel-index="${index}" ${cloneAttr} ${target} role="button" tabindex="0" aria-label="查看${item.name}详情和服务项目">
          <div class="hospital-photo" style="background-image:url('${item.image}')"></div>
          <div class="hospital-meta">
            <strong>${item.name}</strong>
            <p>${item.area} / ${item.distance}</p>
            <small>${item.desc}</small>
            <em>${item.booking} · 查看详情 / 项目</em>
          </div>
        </div>
      `;
    }

    function domesticHome() {
      const lastHospitalIndex = nearbyHospitals.length - 1;
      const carouselHospitals = [
        { item: nearbyHospitals[lastHospitalIndex], index: lastHospitalIndex, clone: "head" },
        ...nearbyHospitals.map((item, index) => ({ item, index, clone: "" })),
        { item: nearbyHospitals[0], index: 0, clone: "tail" }
      ];
      return `
        <div class="domestic-home">
          <div class="card" data-route="sos" style="border-color:rgba(220,38,38,.22);background:linear-gradient(135deg,#fff7f7,#fff)">
            <h3>SOS急救</h3>
            <p>查看附近急救资源。</p>
            <button class="danger full" style="margin-top:12px" data-route="sos">查看附近 SOS</button>
          </div>
          <div class="grid2" style="margin-top:12px">
            ${entry("快速就诊", "按项目选择医院和时间", "诊", `data-route="quick"`)}
            ${entry("在线客服", "人工协助预约与材料准备", "客", `data-route="service"`, "blue")}
          </div>
          <div class="card" style="margin-top:12px">
            <div class="section" style="margin:0 0 10px"><h2>诊疗项目参照表</h2><button data-route="compare">全部项目</button></div>
            <div class="grid3">
              <div class="project-card health-check" data-action="compareCategory:健康检查"><span>健康检查</span></div>
              <div class="project-card dental-implant" data-action="compareCategory:种植牙"><span>种植牙</span></div>
              <div class="project-card endoscopy" data-action="compareCategory:肠胃镜"><span>肠胃镜</span></div>
            </div>
          </div>
          <div class="nearby-hospitals card">
            <div class="section" style="margin:0 0 10px"><h2>附近医院列表</h2><button data-route="hospitals">全部</button></div>
            <div class="hospital-strip" data-carousel="nearby" data-carousel-count="${nearbyHospitals.length}">
              <div class="hospital-track">
                ${carouselHospitals.map(({ item, index, clone }) => nearbyHospitalCard(item, index, clone)).join("")}
              </div>
            </div>
            <div class="hospital-dots" aria-label="附近医院列表位置">
              ${nearbyHospitals.map((_, index) => `<button class="hospital-dot ${index === 0 ? "active" : ""}" type="button" data-hospital-dot="${index}" aria-label="查看第 ${index + 1} 家医院"></button>`).join("")}
            </div>
          </div>
        </div>
      `;
    }

    function onboarding() {
      return `
        ${hero("欢迎使用星火医疗", "请选择你希望使用的语言。", [
          { text: "1 / 4", type: "primary" },
          { text: "语言设置", type: "teal" }
        ])}
        <div class="choice-row">
          ${choice("中文", "默认", state.language === "中文", "language:中文")}
          ${choice("English", "International", state.language === "English", "language:English")}
          ${choice("العربية", "Arabic", state.language === "العربية", "language:العربية")}
        </div>
        <div class="actions"><button class="secondary" data-action="language:${state.language}">保持当前语言</button><button class="cta" data-route="onboardingRegion">下一步</button></div>
      `;
    }

    function onboardingRegion() {
      return `
        ${hero("欢迎使用星火医疗", "你当前希望使用哪类服务？", [
          { text: "2 / 4", type: "primary" },
          { text: "地域", type: "teal" }
        ])}
        <div class="choice-row">
          ${choice("境内医疗服务", "SOS、快速就诊、附近医院", state.homeMode === "domestic", "onboardingScene:domestic")}
          ${choice("境外来华医疗服务", "免签医疗、顾问、资料协调", state.homeMode === "overseas", "onboardingScene:overseas")}
        </div>
        <div class="actions"><button class="secondary" data-route="onboarding">上一步</button><button class="cta" data-route="onboardingLocation">下一步</button></div>
      `;
    }

    function onboardingLocation() {
      const countries = state.homeMode === "domestic" ? ["中国", "法国", "德国", "日本"] : ["法国", "德国", "意大利", "日本", "韩国"];
      return `
        ${hero("欢迎使用星火医疗", "你现在所在的位置。", [
          { text: "3 / 4", type: "primary" },
          { text: "当前所在地", type: "teal" }
        ])}
        ${section("国家/地区", "定位授权", `data-action="refreshLocation"`)}
        <div class="chips">${countries.map(country => chip(country, country === state.selectedCountry ? "primary" : "", `data-action="country:${country}"`)).join("")}</div>
        <div class="choice-row">
          ${choice("重庆", "当前城市", state.city === "重庆", "location:重庆")}
          ${choice("上海", "手动选择", state.city === "上海", "location:上海")}
          ${choice("手动选择城市", "国家/城市列表", false, "location:手动选择")}
        </div>
        <div class="actions"><button class="secondary" data-route="onboardingRegion">上一步</button><button class="cta" data-route="onboardingIntro">下一步</button></div>
      `;
    }

    function onboardingIntro() {
      return `
        ${hero("欢迎使用星火医疗", "我们帮你协调可靠医疗资源。", [
          { text: "4 / 4", type: "primary" },
          { text: "服务介绍", type: "teal" }
        ])}
        ${timeline([
          { title: "境外医疗辅助协调", desc: "我们是专注于境外医疗辅助协调机构。" },
          { title: "专家会诊协调", desc: "可以帮助你与中国的医疗专家进行会诊。" },
          { title: "治疗与陪护", desc: "你可以获得专业治疗、全程陪护和后续提醒。" }
        ])}
        <div class="actions"><button class="secondary" data-route="onboardingLocation">上一步</button><button class="cta" data-action="finishOnboarding">进入 App</button></div>
      `;
    }

    function sos() {
      return `
        ${appbar("SOS", `当前位置：${state.city}`)}
        <div class="card" style="border-color:rgba(220,38,38,.28);background:linear-gradient(135deg,#fff1f2,#ffe4e6)"><h3 style="color:#991b1b">附近 SOS 列表</h3><p>默认显示最近资源，紧急情况请优先拨打当地急救电话。</p></div>
        ${list(`${hospital.name} 急诊咨询`, `${hospital.distance} / ${hospital.city}${hospital.area}`, "拨打", `data-action="callEmergency"`, "急")}
        ${list(`${hospital.name} 导航`, `${hospital.city}${hospital.area}`, "导航", `data-action="startNavigation"`, "导")}
        ${list("星火医疗客服", "中文协助 / 在线", "联系", `data-route="service"`, "客")}
        <button class="secondary full" style="margin-top:12px;width:100%" data-action="refreshLocation">刷新当前位置</button>
      `;
    }

    function service() {
      return `
        ${appbar("在线客服", "客服状态 / 预计响应时间")}
        <div class="message user">我想预约${state.service}，需要准备什么资料？</div>
        <div class="message ai" style="margin-top:10px">可以的。请先说明预约项目、所在城市、计划时间和是否需要资料协助。</div>
        <div class="chips">
          ${chip("我想预约全身体检", "primary", `data-action="serviceQuestion:我想预约全身体检"`)}
          ${chip("我需要陪诊服务", "", `data-action="serviceQuestion:我需要陪诊服务"`)}
          ${chip("我想了解保险报销", "", `data-action="serviceQuestion:我想了解保险报销"`)}
          ${chip("我的资料需要怎么准备？", "", `data-action="serviceQuestion:我的资料需要怎么准备？"`)}
        </div>
        <div class="card" style="margin-top:12px"><h3>输入区</h3><p>文本、图片/文件上传、快捷问题。</p><div class="actions"><button class="secondary" data-action="upload:资料">上传资料</button><button class="cta" data-action="sendMessage">发送</button></div></div>
      `;
    }

    function quickFlowHeader(step, title, desc) {
      return `
        ${hero(title, desc, [
          { text: `第 ${step} / 4 步`, type: "primary" },
          { text: "快速就诊", type: "teal" }
        ])}
        <div class="quick-stepper" aria-label="快速就诊流程进度">
          ${[1, 2, 3, 4].map(index => `<span class="quick-step ${index <= step ? "done" : ""}"></span>`).join("")}
        </div>
      `;
    }

    function quick() {
      const projectGroups = [
        {
          title: "健康检查",
          items: [
            { label: "全身体检", service: "全身体检" },
            { label: "影像检查", service: "影像检查" },
            { label: "报告解读", service: "体检报告解读" }
          ]
        },
        {
          title: "口腔与消化",
          items: [
            { label: "种植牙", service: "牙齿护理 / 种植牙" },
            { label: "口腔检查", service: "口腔检查" },
            { label: "肠胃镜咨询", service: "消化科咨询" }
          ]
        },
        {
          title: "专科手术咨询",
          items: [
            { label: "胆囊手术", service: "胆囊切除手术" },
            { label: "前列腺手术", service: "前列腺切除手术" },
            { label: "心脏搭桥", service: "心脏搭桥手术" }
          ]
        }
      ];
      return `
        <div class="wire-project-page">
          ${projectGroups.map(group => `
            <section class="wire-project-group">
              <h3>${group.title}</h3>
              <div class="wire-project-items">
                ${group.items.map(item => `
                  <button class="wire-project-item ${state.service === item.service ? "active" : ""}" data-action="quickService:${item.service}">${item.label}</button>
                `).join("")}
              </div>
            </section>
          `).join("")}
        </div>
      `;
    }

    function quickHospital() {
      const selected = getSelectedHospital();
      return `
        ${quickFlowHeader(2, "选择医院", "从附近医院中选择承接机构，也可以先查看医院详情和服务项目。")}
        <div class="card quick-flow-card">
          <h3>已选医疗项目</h3>
          ${list(state.service, `上一步选择 / 将按该项目匹配可承接医院`, "更改", `data-route="quick"`, "医")}
        </div>
        <div class="hospital-intro-list quick-hospital-list" data-drag-scroll>
          ${nearbyHospitals.map((item, index) => `
            <div class="hospital-intro-card" data-action="quickHospitalSelect:${index}" role="button" tabindex="0" aria-label="选择${item.name}并进入时间选择">
              <div class="hospital-intro-photo" style="background-image:url('${item.image}')"></div>
              <div class="hospital-intro-meta">
                <strong>${item.name}</strong>
                <span>${item.area} / ${item.distance}</span>
                <span>${item.desc}</span>
                <span>${item.booking}</span>
                <span>点击选择医院并进入下一步</span>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    function currentMonthCalendarMeta() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const today = now.getDate();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstWeekday = new Date(year, month, 1).getDay();
      const unavailableDays = new Set([today + 2, today + 7, today + 13].filter(day => day <= daysInMonth));
      const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
      const days = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1;
        const label = `${month + 1}月${day}日`;
        const weekday = weekdays[new Date(year, month, day).getDay()];
        const isPast = day < today;
        const isUnavailable = unavailableDays.has(day);
        return {
          day,
          label,
          weekday,
          disabled: isPast || isUnavailable,
          reason: isPast ? "已过" : (isUnavailable ? "不可约" : "可约"),
          active: state.date === label && !isPast && !isUnavailable
        };
      });
      return {
        title: `${year}年${month + 1}月`,
        weekdays,
        firstWeekday,
        days
      };
    }

    function quickTime() {
      const selected = getSelectedHospital();
      const calendar = currentMonthCalendarMeta();
      const timeSlots = [
        { label: "09:30", meta: "可预约" },
        { label: "10:30", meta: "可预约" },
        { label: "14:30", meta: "可预约" },
        { label: "15:30", meta: "可预约" },
        { label: "17:00", meta: "需确认" },
        { label: "18:30", meta: "不可约", disabled: true }
      ];
      return `
        ${quickFlowHeader(3, "选择日期时间", "先选择可预约日期，再选择到院时间，最终以医院确认为准。")}
        <div class="card quick-flow-card">
          <h3>${selected.name}</h3>
          <p>${selected.area} / ${selected.distance} / ${selected.booking}</p>
        </div>
        <div class="card quick-calendar-card">
          <div class="quick-calendar-title"><h3>选择日期</h3><span>${calendar.title}</span></div>
          <div class="quick-calendar-weekdays">
            ${calendar.weekdays.map(day => `<span>${day}</span>`).join("")}
          </div>
          <div class="quick-calendar-grid">
            ${Array.from({ length: calendar.firstWeekday }, () => `<span class="calendar-empty"></span>`).join("")}
            ${calendar.days.map(day => `
              <button class="calendar-day ${day.active ? "active" : ""} ${day.disabled ? "disabled" : ""}" ${day.disabled ? "disabled aria-disabled=\"true\"" : `data-action="date:${day.label}"`}>
                <strong>${day.day}</strong>
                <span>周${day.weekday}</span>
                <em>${day.reason}</em>
              </button>
            `).join("")}
          </div>
        </div>
        <div class="card quick-time-card">
          <h3>选择时间</h3>
          <p>已选日期：${state.date}</p>
          <div class="quick-time-grid">
            ${timeSlots.map(slot => `
              <button class="quick-time-slot ${state.time === slot.label ? "active" : ""} ${slot.disabled ? "disabled" : ""}" ${slot.disabled ? "disabled aria-disabled=\"true\"" : `data-action="quickTimeSelect:${slot.label}"`}>
                <strong>${slot.label}</strong>
                <span>${slot.meta}</span>
              </button>
            `).join("")}
          </div>
        </div>
        <div class="notice">已选：${state.service} / ${selected.name} / ${state.date} ${state.time}</div>
      `;
    }
    function quickProfile() {
      const selected = getSelectedHospital();
      return `
        ${quickFlowHeader(4, "完善资料并提交", "补齐身份、病历和陪诊需求后，提交给客服确认预约。")}
        <div class="card quick-flow-card">
          <h3>预约摘要</h3>
          ${summaryRow("医疗项目", state.service)}
          ${summaryRow("预约医院", `${selected.name} / ${selected.area}`)}
          ${summaryRow("预约时间", `${state.date} ${state.time}`)}
        </div>
        <div class="card" style="margin-top:12px">
          <h3>资料确认</h3>
          <p>个人信息、护照/证件、病历资料和联系方式在真实版本中会进入补资料表单。</p>
          <div class="notice" style="margin-top:10px">资料未完整时，优先引导补充资料；资料完整后再提交预约确认。</div>
        </div>
        <div class="booking-bar">
          <div><strong>VIP 陪同服务</strong><span>可选人工陪诊、翻译和到院协助</span></div>
          <button class="secondary" data-action="vip">${state.vip ? "已选择" : "选择"}</button>
        </div>
        <button class="cta full quick-book-now" data-route="quickPayment">立即预约</button>
      `;
    }

    function quickPayment() {
      const selected = getSelectedHospital();
      return `
        ${quickFlowHeader(4, "预约确认", "提交前先确认资料是否完善，再支付预约服务费。")}
        <div class="quick-payment-page">
          <div class="card quick-payment-check">
            <h3>个人信息是否完善？</h3>
            <p>请确认姓名、护照号、联系方式和基础病历资料已补齐。</p>
            <button class="secondary full" data-action="upload:姓名和护照号">上传姓名和护照号</button>
          </div>
          <div class="card quick-flow-card">
            <h3>预约摘要</h3>
            ${summaryRow("医疗项目", state.service)}
            ${summaryRow("预约医院", `${selected.name} / ${selected.area}`)}
            ${summaryRow("预约时间", `${state.date} ${state.time}`)}
          </div>
          <div class="notice">此处支付的是预约服务费/协调服务费，不代表最终医疗费用；治疗费用以医院确认结果为准。</div>
          <button class="cta full quick-book-now" data-action="submitAppointment">确认资料并支付预约服务费</button>
        </div>
      `;
    }
    const medicalProjectDetails = {
      "全身体检": {
        category: "健康检查",
        price: "$699 起",
        duration: "1-2 天",
        summary: "适合短期停留用户完成基础筛查、影像检查和报告整理。",
        items: ["胸部 CT", "肝功能", "血常规", "尿常规", "腹部超声", "报告解读"],
        materials: ["护照/身份证明", "既往体检报告", "用药记录", "过敏史"],
        note: "体检结果仅作为健康筛查参考，异常结果需由医生进一步确认。"
      },
      "影像检查": {
        category: "健康检查",
        price: "$199 起",
        duration: "当天可完成，报告时间由医院确认",
        summary: "适合已有症状或复查需求的用户进行影像筛查。",
        items: ["胸部 CT", "腹部超声", "关节影像", "影像报告", "医生解读"],
        materials: ["既往影像片", "既往报告", "症状说明", "医生转诊建议"],
        note: "具体检查项目需按医生评估选择，不作为自助诊断。"
      },
      "体检报告解读": {
        category: "健康检查",
        price: "$99 起",
        duration: "24h 内初步整理",
        summary: "帮助用户整理体检报告重点，并衔接需要进一步咨询的科室。",
        items: ["报告上传", "异常指标整理", "就诊建议方向", "科室匹配", "顾问说明"],
        materials: ["体检报告", "既往病史", "当前症状", "用药记录"],
        note: "报告解读为预约协调信息，不替代医生诊断。"
      },
      "牙齿护理 / 种植牙": {
        category: "口腔与消化",
        price: "$999 起",
        duration: "需先评估牙周与骨量",
        summary: "适合口腔检查、牙周评估、种植牙方案初筛。",
        items: ["口腔全景片", "牙周检查", "骨量评估", "种植方案", "周期确认"],
        materials: ["口腔照片", "既往口腔治疗记录", "影像资料", "用药记录"],
        note: "种植治疗周期和费用需由口腔医生评估后确认。"
      },
      "口腔检查": {
        category: "口腔与消化",
        price: "$69 起",
        duration: "当天可预约",
        summary: "适合牙痛、牙周问题、洁牙和基础口腔检查。",
        items: ["口腔检查", "牙周评估", "洁牙建议", "治疗计划", "费用预估"],
        materials: ["症状说明", "口腔照片", "既往治疗记录", "过敏史"],
        note: "复杂治疗需进一步拍片和医生面诊。"
      },
      "消化科咨询": {
        category: "口腔与消化",
        price: "$299 起",
        duration: "1-3 天，按检查安排确认",
        summary: "适合胃肠不适、肠胃镜咨询和报告解读。",
        items: ["消化科问诊", "肠胃镜咨询", "幽门螺杆菌检查", "报告解读", "复诊建议"],
        materials: ["症状时间线", "既往胃肠镜报告", "用药记录", "过敏史"],
        note: "是否需要内镜检查由医生根据症状和资料确认。"
      },
      "胆囊切除手术": {
        category: "专科手术咨询",
        price: "待医院确认",
        duration: "需住院评估",
        summary: "适合胆囊结石、胆囊炎等方向的术前资料审核。",
        items: ["腹部超声", "肝胆功能", "血常规", "麻醉评估", "住院安排"],
        materials: ["超声报告", "检验报告", "既往病历", "用药记录"],
        note: "手术适应症、风险和费用必须由医院面诊确认。"
      },
      "前列腺切除手术": {
        category: "专科手术咨询",
        price: "待医院确认",
        duration: "周期较长，建议先做资料审核",
        summary: "适合泌尿方向病历资料预审和专家会诊安排。",
        items: ["病历资料审核", "前列腺超声", "PSA 检查", "泌尿科会诊", "住院评估"],
        materials: ["病历资料", "PSA 报告", "影像资料", "既往治疗记录"],
        note: "治疗方式需医生结合检查结果和身体状态判断。"
      },
      "心脏搭桥手术": {
        category: "专科手术咨询",
        price: "待医院确认",
        duration: "周期长，需专家确认",
        summary: "适合冠脉疾病资料审核、专家会诊和住院路径确认。",
        items: ["病历资料审核", "心电图", "心脏超声", "冠脉影像", "专家会诊"],
        materials: ["冠脉造影/CTA", "心电图", "用药记录", "既往住院记录"],
        note: "重大手术不能直接下单，需先完成资料审核和医生评估。"
      }
    };

    function compareProjectCard(name) {
      const detail = medicalProjectDetails[name];
      const imageClassMap = {
        "全身体检": "health-check",
        "影像检查": "imaging",
        "体检报告解读": "report",
        "牙齿护理 / 种植牙": "dental",
        "口腔检查": "oral",
        "消化科咨询": "endoscopy",
        "胆囊切除手术": "surgery",
        "前列腺切除手术": "urology",
        "心脏搭桥手术": "cardiac"
      };
      return `
        <article class="treatment-reference-card" data-action="compareProject:${name}" role="button" tabindex="0" aria-label="查看${name}项目详情">
          <h3>${name}</h3>
          <div class="treatment-reference-image ${imageClassMap[name] || "health-check"}"></div>
          <div class="treatment-reference-footer">
            <span>预估价格：<strong>${detail.price}</strong></span>
            <button data-action="compareProject:${name}">详情</button>
          </div>
        </article>
      `;
    }

    function compare() {
      const projects = ["全身体检", "牙齿护理 / 种植牙", "消化科咨询", "影像检查", "胆囊切除手术", "心脏搭桥手术"];
      return `
        <div class="treatment-reference-list" data-drag-scroll>
          ${projects.map(compareProjectCard).join("")}
        </div>
        <div class="notice">费用和周期为原型参考信息，最终以医院确认、医生评估和服务协议为准。</div>
      `;
    }

    function quoteForProject(projectName, index) {
      const detail = medicalProjectDetails[projectName] || medicalProjectDetails["全身体检"];
      const basePrices = {
        "全身体检": [699, 759, 629, 799],
        "影像检查": [199, 229, 189, 259],
        "体检报告解读": [99, 129, 89, 149],
        "牙齿护理 / 种植牙": [999, 1199, 899, 1299],
        "口腔检查": [69, 89, 59, 99],
        "消化科咨询": [299, 339, 279, 369]
      };
      const prices = basePrices[projectName];
      const price = prices ? `${prices[index % prices.length]} 起` : detail.price;
      const status = index === 2 ? "需确认" : (index === 1 ? "明日可约" : "今日可约");
      const wait = index === 0 ? "今日 15:30" : (index === 1 ? "明日 10:00" : "顾问确认");
      return { price, status, wait };
    }

    function compareQuotes() {
      const projectName = medicalProjectDetails[state.selectedCompareProject] ? state.selectedCompareProject : "全身体检";
      const detail = medicalProjectDetails[projectName];
      return `
        <div class="wire-header">
          <button class="wire-back" data-action="compareBack" aria-label="返回">‹</button>
          <strong>${projectName}报价</strong>
        </div>
        <div class="compare-quotes-page" data-drag-scroll>
          <div class="card compare-quote-summary">
            <h3>${projectName}</h3>
            <p>${detail.summary}</p>
            <div class="grid2" style="margin-top:12px">${stat(detail.duration, "预计周期")}${stat(detail.price, "项目参考价")}</div>
          </div>
          <div class="compare-quote-list">
            ${nearbyHospitals.map((item, index) => {
              const quote = quoteForProject(projectName, index);
              return `
                <article class="compare-quote-card" data-action="compareQuote:${index}" role="button" tabindex="0" aria-label="查看${item.name}${projectName}详情">
                  <div class="compare-quote-photo" style="background-image:url('${item.image}')"></div>
                  <div class="compare-quote-body">
                    <strong>${item.name}</strong>
                    <span>${item.area} / ${item.distance}</span>
                    <em>${quote.status} / ${quote.wait}</em>
                    <div class="compare-quote-footer"><b>预估价格：${quote.price}</b><button data-action="compareQuote:${index}">详情</button></div>
                  </div>
                </article>
              `;
            }).join("")}
          </div>
          <div class="notice">不同医院报价包含服务范围可能不同，最终以医院确认和服务协议为准。</div>
        </div>
      `;
    }
    function compareDetail() {
      const name = medicalProjectDetails[state.selectedCompareProject] ? state.selectedCompareProject : "全身体检";
      const detail = medicalProjectDetails[name];
      return `
        ${wireHeader(name)}
        <div class="compare-detail-page" data-drag-scroll>
          <div class="card compare-detail-hero">
            <span>${detail.category}</span>
            <h3>${name}</h3>
            <p>${detail.summary}</p>
            <div class="grid2" style="margin-top:12px">${stat(detail.duration, "预计周期")}${stat(detail.price, "费用参考")}</div>
          </div>
          <div class="card compare-detail-section">
            <h3>项目详情明细</h3>
            ${detail.items.map(item => summaryRow(item, "由顾问按医院要求确认是否需要安排")).join("")}
          </div>
          <div class="card compare-detail-section">
            <h3>需要准备的资料</h3>
            ${detail.materials.map(item => summaryRow(item, "预约前建议先上传或由客服确认")).join("")}
          </div>
          <div class="notice">${detail.note}</div>
          <div class="actions"><button class="secondary" data-route="compareQuotes">返回报价</button><button class="cta" data-action="compareBook">预约该项目</button></div>
        </div>
      `;
    }
    function hospitals() {
      return `
        <div class="hospital-intro-list" data-drag-scroll>
          ${nearbyHospitals.map((item, index) => hospitalIntroCard(item, index)).join("")}
        </div>
      `;
    }

    function hospitalDetail() {
      const selected = getSelectedHospital();
      const images = hospitalImagesFor(selected);
      const services = hospitalServicesFor(selected);
      return `
        <div class="hospital-detail-page">
          ${wireHeader("医院详情")}
          <div class="hospital-detail-scroll" data-drag-scroll>
            <div class="hospital-detail-photo-strip" aria-label="医院图片，可以左右滑动" data-drag-scroll>
              ${images.map(image => `<div class="hospital-detail-photo" style="background-image:url('${image}')"></div>`).join("")}
            </div>
            <div class="hospital-name-block">
              <strong>${selected.name}</strong>
              <span>${selected.city}${selected.area} / ${selected.distance}</span>
              <span>${selected.intro || selected.note}</span>
              <span>医师/顾问：${selected.doctorIntro || "根据项目匹配对应科室医师，顾问负责资料预审和预约确认。"}</span>
              <span>${selected.booking}</span>
            </div>
            <div class="service-label">可提供服务项：</div>
            ${services.map(service => `
              <div class="hospital-service-row">
                <div><strong>${service.title}</strong><span>${service.desc}</span></div>
                <button data-action="hospitalService:${service.title}">立即预约</button>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    function profile() {
      return `
        <div class="profile-header-card">
          <div class="profile-avatar">星</div>
          <div class="profile-user-meta">
            <strong>个人医疗资料</strong>
            <span>资料完整度 68% / 完善后可提升预约效率</span>
            <div class="profile-progress"><i></i></div>
          </div>
          <button class="profile-settings" data-route="settings" aria-label="设置">${icon("settings")}</button>
        </div>
        <div class="profile-stat-strip">
          ${stat("2/3", "证件资料")}
          ${stat("3 份", "医疗记录")}
          ${stat("0", "定制方案")}
        </div>
        <div class="grid3" style="margin-top:12px">
          ${entry("绑定护照", "护照正反面", "照", `data-route="passportBind"`)}
          ${entry("健康档案", "基础信息和病史", "档", `data-route="healthArchive"`, "blue")}
          ${entry("医疗记录", "病例和化验报告", "记", `data-route="medicalRecords"`)}
        </div>
        <div class="plan" style="margin-top:12px"><h3>我的定制方案</h3><p>治疗周期、可治疗日期、费用范围和查看详情。</p><button class="cta full" style="margin-top:12px;width:100%" data-route="customPlan">预约定制医疗</button></div>
        <div class="plan" style="margin-top:12px"><h3>体验数据</h3><p>清除本机缓存，并从初次进入 App 的流程重新开始。</p><button class="secondary full" style="margin-top:12px;width:100%" data-action="resetPrototype">清除缓存重新进入</button></div>
      `;
    }
    function passportBind() {
      return `
        ${wireHeader("绑定护照")}
        <div class="profile-detail-page">
          ${hero("绑定护照", "上传护照信息，用于跨境预约、身份核验和服务资料预审。", [
            { text: "身份资料", type: "primary" },
            { text: "安全保存", type: "teal" }
          ])}
          <div class="profile-upload-card card">
            <h3>护照资料</h3>
            <p>请上传清晰的护照首页；真实版本会进入安全资料表单。</p>
            <div class="profile-upload-grid">
              <button data-action="upload:护照首页">上传护照首页</button>
              <button data-action="upload:签证/入境页">上传签证/入境页</button>
            </div>
          </div>
          <div class="card">
            <h3>用于以下服务</h3>
            ${summaryRow("预约身份核验", "用于医院预约、到院登记和客服资料预审")}
            ${summaryRow("跨境沟通", "用于护照姓名、国籍和证件号确认")}
            ${summaryRow("资料保护", "原型仅展示流程，不保存真实证件信息")}
          </div>
        </div>
      `;
    }

    function healthArchive() {
      const archiveSections = [
        {
          title: "过往医疗记录",
          desc: "最近上传的病历、就诊记录和医院反馈。",
          rows: [
            { title: "2026 体检报告", meta: "血常规、肝功能、腹部超声 / 待顾问复核", action: "upload:2026体检报告" },
            { title: "消化科问诊记录", meta: "胃部不适咨询 / 已整理症状时间线", action: "upload:消化科问诊记录" }
          ]
        },
        {
          title: "上传病例",
          desc: "用于预约前资料预审，支持图片、PDF 和检查报告。",
          rows: [
            { title: "CT / 影像资料", meta: "建议上传原片或影像报告截图", action: "upload:CT影像资料" },
            { title: "检验报告", meta: "血液、尿液、肝肾功能等报告", action: "upload:检验报告" }
          ]
        },
        {
          title: "过敏史",
          desc: "帮助医院提前判断用药和检查风险。",
          rows: [
            { title: "药物过敏", meta: "未填写 / 建议补充青霉素、麻醉药等过敏信息", action: "upload:药物过敏" },
            { title: "食物或其他过敏", meta: "未填写 / 可补充食物、造影剂等信息", action: "upload:其他过敏" }
          ]
        },
        {
          title: "用药史",
          desc: "长期用药会影响检查、手术和麻醉评估。",
          rows: [
            { title: "长期用药清单", meta: "未上传 / 可填写药名、剂量和频率", action: "upload:长期用药清单" },
            { title: "近期停药记录", meta: "如抗凝药、降压药、降糖药等", action: "upload:近期停药记录" }
          ]
        },
        {
          title: "疫苗",
          desc: "适用于跨境医疗、术前评估和感染风险说明。",
          rows: [
            { title: "基础疫苗记录", meta: "未上传 / 可补充接种证明或截图", action: "upload:基础疫苗记录" },
            { title: "近期接种情况", meta: "用于医生判断检查和治疗安排", action: "upload:近期接种情况" }
          ]
        }
      ];
      return `
        <div class="archive-page rich-archive-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-back="1" aria-label="返回">‹</button>
            <strong>健康档案</strong>
          </div>
          <div class="archive-completion card">
            <div><strong>资料完整度 62%</strong><span>补齐病例、过敏史和用药史后，可提升预约预审效率。</span></div>
            <button data-action="upload:健康档案补充">补充资料</button>
          </div>
          <div class="archive-panel rich-archive-panel">
            ${archiveSections.map(section => `
              <section class="archive-section rich-archive-section">
                <h3>${section.title}</h3>
                <p>${section.desc}</p>
                ${section.rows.map(row => `
                  <button class="archive-row rich-archive-row" data-action="${row.action}">
                    <span><strong>${row.title}</strong><small>${row.meta}</small></span>
                    <em>›</em>
                  </button>
                `).join("")}
              </section>
            `).join("")}
          </div>
        </div>
      `;
    }
    function medicalRecordGroups() {
      return [
        {
          title: "门诊病例",
          desc: "院方回传的门诊纪要、医生说明和后续建议。",
          records: [
            {
              id: "digestive-outpatient",
              title: "消化科问诊纪要",
              hospital: "江北国际医疗中心 / 消化科",
              doctor: "周医生",
              time: "2026-06-14 10:45",
              status: "待用户查看",
              type: "门诊病例 / 后续建议",
              summary: "胃部不适咨询后，院方建议先整理既往胃镜报告，必要时预约复查。",
              details: ["主诉为间歇性胃胀与饭后不适，当前记录仅作为院方回传纪要。", "建议补充既往胃镜、幽门螺杆菌检查和近期用药情况。", "如出现明显疼痛、黑便、呕血等紧急症状，应优先线下就医。"],
              next: ["上传既往胃镜报告", "补充近期用药记录", "由客服协助确认复诊时间"]
            },
            {
              id: "dental-screening",
              title: "口腔种植初筛反馈",
              hospital: "南岸口腔消化门诊 / 口腔科",
              doctor: "口腔评估组",
              time: "2026-06-10 14:10",
              status: "需补充资料",
              type: "初筛反馈 / 资料补充",
              summary: "院方需要补充口腔全景片和牙周检查结果后，才能继续确认种植周期。",
              details: ["现有资料不足以判断骨量与牙周状态。", "种植方案、周期和报价需要结合影像资料进一步评估。", "如近期有拔牙、炎症或长期用药，请同步告知顾问。"],
              next: ["上传口腔全景片", "上传牙周检查结果", "等待口腔评估组二次反馈"]
            }
          ]
        },
        {
          title: "化验报告",
          desc: "医院检查后回传的检验结果、影像摘要和报告说明。",
          records: [
            {
              id: "checkup-return",
              title: "全身体检结果回传",
              hospital: "重庆莱佛士医院 / 健康管理中心",
              doctor: "体检顾问组",
              time: "2026-06-18 16:20",
              status: "已回传",
              type: "检查报告 / 医生说明",
              summary: "包含血常规、肝功能、腹部超声和胸部 CT 摘要，顾问已标记需关注指标。",
              details: ["院方已回传体检结果摘要，包含基础检验与影像检查说明。", "部分指标建议结合既往病史和生活习惯进一步解读。", "该记录用于资料沉淀，不替代医院正式报告和医生诊断。"],
              next: ["查看正式体检报告", "预约报告解读", "如有异常指标，选择对应科室咨询"]
            },
            {
              id: "liver-kidney-report",
              title: "肝肾功能检验报告",
              hospital: "渝中健康管理中心 / 检验科",
              doctor: "检验科回传",
              time: "2026-06-16 09:30",
              status: "已回传",
              type: "化验报告 / 指标说明",
              summary: "院方已回传检验结果，顾问标记为可用于下一步体检解读。",
              details: ["报告包含肝功能、肾功能和部分代谢相关指标。", "若正在长期服药，建议同步给医生判断是否影响指标。", "如需复查，由顾问协助确认医院和时间。"],
              next: ["补充用药史", "预约体检报告解读", "必要时安排复查"]
            }
          ]
        },
        {
          title: "用药记录",
          desc: "院方或顾问根据就诊反馈整理的用药说明与提醒。",
          records: [
            {
              id: "digestive-medication",
              title: "消化科临时用药说明",
              hospital: "江北国际医疗中心 / 消化科",
              doctor: "周医生",
              time: "2026-06-14 11:20",
              status: "已回传",
              type: "用药说明 / 注意事项",
              summary: "按院方说明记录用药周期和注意事项，具体用药以医生医嘱为准。",
              details: ["院方回传临时用药说明和服用提醒。", "如出现不适或过敏反应，应停止自行处理并联系医生。", "该记录只用于沉淀医生已回传说明，不生成新的医疗建议。"],
              next: ["确认药名和剂量", "补充过敏史", "按医生要求复诊"]
            },
            {
              id: "preop-medication-check",
              title: "术前用药核对提醒",
              hospital: "重庆莱佛士医院 / 预约顾问",
              doctor: "顾问回传",
              time: "2026-06-12 17:00",
              status: "待确认",
              type: "术前核对 / 用药记录",
              summary: "如有抗凝药、降压药或降糖药，需在预约前提交给顾问核对。",
              details: ["术前评估需要确认长期用药、近期停药和基础疾病情况。", "抗凝药、降压药、降糖药等需按医院要求提前说明。", "实际是否停药或调整用药必须由医生确认。"],
              next: ["上传长期用药清单", "补充基础疾病信息", "等待顾问核对反馈"]
            }
          ]
        }
      ];
    }

    function allMedicalRecords() {
      return medicalRecordGroups().flatMap(group => group.records.map(record => ({ ...record, group: group.title })));
    }

    function selectedMedicalRecord() {
      return allMedicalRecords().find(record => record.id === state.selectedMedicalRecordId) || allMedicalRecords()[0];
    }

    function isMedicalRecordViewed(record) {
      return Array.isArray(state.viewedMedicalRecordIds) && state.viewedMedicalRecordIds.includes(record.id);
    }

    function medicalRecordStatus(record) {
      return isMedicalRecordViewed(record) && /待用户查看|待查看/.test(record.status) ? "已查看" : record.status;
    }

    function selectedMedicalRecordGroup() {
      return medicalRecordGroups().find(group => group.title === state.selectedMedicalRecordGroup) || medicalRecordGroups()[0];
    }

    function medicalRecords() {
      const groups = medicalRecordGroups();
      return `
        <div class="medical-record-page grouped-record-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-route="profile" aria-label="返回">‹</button>
            <strong>医疗记录</strong>
          </div>
          <div class="record-category-list">
            ${groups.map(group => `
              <button class="record-category-card" data-action="medicalRecordGroup:${group.title}">
                <strong>${group.title}</strong>
                <span>${group.desc}</span>
                <em>${group.records.length} 条记录</em>
              </button>
            `).join("")}
          </div>
          <div class="notice">医疗记录按院方回传类型归档。先选择分区，再查看该分区下的具体记录。</div>
        </div>
      `;
    }

    function medicalRecordGroup() {
      const group = selectedMedicalRecordGroup();
      return `
        <div class="medical-record-page grouped-record-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-route="medicalRecords" aria-label="返回">‹</button>
            <strong>${group.title}</strong>
          </div>
          <section class="record-group-card card">
            <h3>${group.title}</h3>
            <p>${group.desc}</p>
            <div class="record-group-list">
              ${group.records.map(record => `
                  <article class="grouped-record-row" data-action="medicalRecordSelect:${record.id}" role="button" tabindex="0" aria-label="查看${record.title}详细病例">
                    <div><strong>${record.title}</strong><span>${record.hospital}</span><span>点击查看详细病例</span></div>
                    <em>${medicalRecordStatus(record)}</em>
                    <small>${record.time}</small>
                  </article>
              `).join("")}
            </div>
          </section>
          <div class="notice">本页仅展示${group.title}分区下的院方回传记录。</div>
        </div>
      `;
    }

    function medicalRecordDetail() {
      const record = selectedMedicalRecord();
      return `
        <div class="medical-record-detail-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-route="medicalRecordGroup" aria-label="返回">‹</button>
            <strong>详细病例</strong>
          </div>
          <div class="card medical-record-detail-hero">
            <span>${medicalRecordStatus(record)}</span>
            <h3>${record.title}</h3>
            <p>${record.summary}</p>
            ${summaryRow("所属分区", record.group)}
            ${summaryRow("回传医院", record.hospital)}
            ${summaryRow("回传人员", record.doctor)}
            ${summaryRow("回传时间", record.time)}
            ${summaryRow("记录类型", record.type)}
          </div>
          <div class="card medical-record-detail-section">
            <h3>院方回传内容</h3>
            ${record.details.map(item => summaryRow(item, "院方回传说明")).join("")}
          </div>
          <div class="card medical-record-detail-section">
            <h3>后续处理</h3>
            ${record.next.map(item => summaryRow(item, "建议由客服或顾问继续衔接")).join("")}
          </div>
          <div class="notice">该页面展示院方或顾问回传给你的病例/报告/用药记录，不提供新的诊断结论。</div>
        </div>
      `;
    }
    function escapePreviewHtml(value = "") {
      return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[char]));
    }

    function customSelection(field) {
      return (state.customSelections && state.customSelections[field]) || "";
    }

    function customSelectionCount() {
      return Object.values(state.customSelections || {}).filter(Boolean).length;
    }

    function customDraftPreview(limit = 52) {
      const draft = String(state.customDraftText || "").trim();
      if (!draft) return "尚未填写自我描述";
      return escapePreviewHtml(draft.length > limit ? `${draft.slice(0, limit)}...` : draft);
    }

    function customDraftHas(pattern) {
      const source = `${state.customDraftText || ""} ${Object.values(state.customSelections || {}).join(" ")}`;
      return pattern.test(source);
    }

    function customDirectionSource() {
      return `${state.customDraftText || ""} ${Object.values(state.customSelections || {}).join(" ")}`;
    }

    function customHospitalIntentSource() {
      const selections = state.customSelections || {};
      if (state.customActiveMedicalField && selections[state.customActiveMedicalField]) {
        return selections[state.customActiveMedicalField];
      }
      if (selections.primaryConcern) return selections.primaryConcern;
      const focusFields = ["symptom", "clinicalFocus", "digestiveFocus", "dentalFocus", "cardioFocus", "respiratoryFocus", "orthoFocus", "skinFocus", "uroGynFocus", "complexFocus", "checkupFocus"];
      const focusSource = focusFields.map(field => selections[field]).filter(Boolean).join(" ");
      if (focusSource) return focusSource;
      return state.customDraftText || Object.values(selections).filter(Boolean).join(" ");
    }

    function customHospitalOptions() {
      const source = customHospitalIntentSource();
      if (/牙|口腔|种植|牙周|牙痛|拔牙|根管|牙龈/.test(source)) {
        return [
          { title: "南岸口腔消化门诊 / 口腔种植科", meta: "优先处理种植牙初筛、牙周检查和口腔影像资料确认" },
          { title: "重庆莱佛士医院 / 口腔科", meta: "适合口腔检查、牙齿护理和综合医疗衔接" },
          { title: "江北国际医疗中心 / 口腔评估顾问", meta: "适合跨境客户先做资料整理和中英文沟通" }
        ];
      }
      if (/胃|肠|腹|消化|反酸|烧心|腹泻|便秘|胃镜|肠镜|幽门|肝|胆|胰/.test(source)) {
        return [
          { title: "江北国际医疗中心 / 消化科", meta: "适合消化科咨询、报告解读和短期门诊预约" },
          { title: "南岸口腔消化门诊 / 消化内科", meta: "适合肠胃镜咨询、术前资料确认和专项检查协调" },
          { title: "重庆莱佛士医院 / 消化科", meta: "适合综合医院消化科门诊和多项检查衔接" }
        ];
      }
      if (/胸闷|胸痛|心脏|心电|冠脉|血压|心悸|搭桥|支架|心血管/.test(source)) {
        return [
          { title: "重庆莱佛士医院 / 心内科", meta: "适合心电图、心脏超声、血压波动和心内科咨询" },
          { title: "江北国际医疗中心 / 心血管门诊", meta: "适合跨境客户心血管资料预审和专家预约" },
          { title: "渝中健康管理中心 / 心血管筛查", meta: "适合先做基础筛查、体检和复查安排" }
        ];
      }
      if (/咳嗽|气短|呼吸|肺|哮喘|支气管|胸部ct|肺结节/.test(source)) {
        return [
          { title: "重庆莱佛士医院 / 呼吸内科", meta: "适合咳嗽、气短、胸部 CT 或肺结节报告解读" },
          { title: "江北国际医疗中心 / 呼吸科门诊", meta: "适合国际门诊呼吸系统咨询和资料预审" },
          { title: "渝中健康管理中心 / 胸部影像筛查", meta: "适合胸部影像检查和复查周期协调" }
        ];
      }
      if (/骨|关节|腰|颈|膝|肩|疼痛|骨折|康复|运动损伤/.test(source)) {
        return [
          { title: "重庆莱佛士医院 / 骨科", meta: "适合关节疼痛、骨折复诊、运动损伤和影像检查" },
          { title: "江北国际医疗中心 / 康复医学科", meta: "适合康复评估、术后随访和治疗周期咨询" },
          { title: "渝中健康管理中心 / 影像检查中心", meta: "适合 X 光、CT、MRI 影像资料整理和复查" }
        ];
      }
      if (/皮肤|过敏|皮疹|湿疹|荨麻疹|瘙痒|痘|斑/.test(source)) {
        return [
          { title: "江北国际医疗中心 / 皮肤科", meta: "适合皮疹、过敏、慢性皮肤问题和照片资料预审" },
          { title: "重庆莱佛士医院 / 皮肤与过敏门诊", meta: "适合过敏反应、湿疹、荨麻疹和长期随访" },
          { title: "渝中健康管理中心 / 皮肤筛查", meta: "适合基础筛查和后续专科转诊协调" }
        ];
      }
      if (/妇科|月经|乳腺|备孕|怀孕|泌尿|尿频|尿痛|前列腺|肾|膀胱/.test(source)) {
        return [
          { title: "重庆莱佛士医院 / 妇科或泌尿科", meta: "适合妇科检查、泌尿不适、前列腺或肾脏资料咨询" },
          { title: "江北国际医疗中心 / 国际门诊妇科泌尿方向", meta: "适合跨境客户先做资料整理和预约协调" },
          { title: "渝中健康管理中心 / 妇科泌尿筛查", meta: "适合基础检查、化验和超声预约" }
        ];
      }
      if (/肿瘤|癌|结节|术后|化疗|放疗|病理|二诊|会诊/.test(source)) {
        return [
          { title: "重庆莱佛士医院 / 多学科会诊门诊", meta: "适合病理、影像和既往治疗记录预审" },
          { title: "江北国际医疗中心 / 专家会诊协调", meta: "适合跨境客户二诊、复诊和复杂病例资料整理" },
          { title: "渝中健康管理中心 / 影像与报告复核", meta: "适合先整理影像、化验和复查资料" }
        ];
      }
      if (/体检|报告|化验|检查|影像|ct|mri|超声|指标|筛查/.test(source)) {
        return [
          { title: "渝中健康管理中心 / 健康检查中心", meta: "适合全身体检、影像检查和体检报告整理" },
          { title: "重庆莱佛士医院 / 健康管理中心", meta: "适合综合体检、消化科和牙科护理联动" },
          { title: "江北国际医疗中心 / 国际体检门诊", meta: "适合跨境客户体检预约和中英文报告协调" }
        ];
      }
      return [
        { title: "江北国际医疗中心 / 国际全科门诊", meta: "适合不确定科室时先做资料预审和分诊" },
        { title: "重庆莱佛士医院 / 综合门诊", meta: "适合综合医疗承接、多科室咨询和检查衔接" },
        { title: "渝中健康管理中心 / 健康管理门诊", meta: "适合基础筛查、体检和报告整理" }
      ];
    }

    function customDynamicMedicalGroups() {
      const groups = [];
      if (customDraftHas(/胃|肠|腹|消化|反酸|烧心|腹泻|便秘|胃镜|肠镜|幽门|肝|胆|胰/)) {
        groups.push({
          key: "digestiveFocus",
          title: "消化系统关注点",
          desc: "根据描述追加的消化科分诊点。",
          options: [
            { title: "胃痛、反酸或饭后胀气", meta: "可匹配消化科门诊和胃镜资料预审" },
            { title: "腹泻、便秘或排便改变", meta: "建议整理持续时间、诱因和既往检查" },
            { title: "胃镜 / 肠镜 / 幽门螺杆菌资料", meta: "适合报告解读、复查路径和预约协调" },
            { title: "肝胆胰指标或腹部超声异常", meta: "适合报告解读和肝胆消化方向咨询" }
          ]
        });
      }
      if (customDraftHas(/牙|口腔|种植|牙周|牙痛|拔牙|根管|牙龈/)) {
        groups.push({
          key: "dentalFocus",
          title: "口腔系统关注点",
          desc: "根据描述追加的口腔/牙科分诊点。",
          options: [
            { title: "种植牙初筛与骨量评估", meta: "需要口腔全景片、牙周和既往治疗信息" },
            { title: "牙痛、根管或修复咨询", meta: "适合先做口腔检查和影像资料确认" },
            { title: "牙周出血、松动或炎症", meta: "适合牙周评估和治疗周期咨询" },
            { title: "口腔影像资料解读", meta: "适合上传全景片或 CBCT 后安排医生确认" }
          ]
        });
      }
      if (customDraftHas(/胸闷|胸痛|心脏|心电|冠脉|血压|心悸|搭桥|支架|心血管/)) {
        groups.push({
          key: "cardioFocus",
          title: "心血管关注点",
          desc: "根据描述追加的心血管分诊点。",
          options: [
            { title: "胸闷、心悸或血压波动", meta: "适合心内科门诊和基础检查预约" },
            { title: "心电图、心脏超声或冠脉资料", meta: "适合报告解读和专家会诊预审" },
            { title: "支架、搭桥或术后复诊", meta: "需整理手术记录、用药和复查报告" },
            { title: "需要先判断是否紧急", meta: "如突发胸痛或呼吸困难，应优先急诊处理" }
          ]
        });
      }
      if (customDraftHas(/咳嗽|气短|呼吸|肺|哮喘|支气管|胸部ct|肺结节/)) {
        groups.push({
          key: "respiratoryFocus",
          title: "呼吸系统关注点",
          desc: "根据描述追加的呼吸科分诊点。",
          options: [
            { title: "咳嗽、气短或胸闷", meta: "适合呼吸科咨询和基础检查预约" },
            { title: "胸部 CT 或肺结节报告解读", meta: "建议上传影像报告和既往对比资料" },
            { title: "哮喘、支气管炎或慢病随访", meta: "需整理既往用药和发作频率" },
            { title: "发热伴呼吸症状", meta: "建议先确认是否需要线下急诊或发热门诊" }
          ]
        });
      }
      if (customDraftHas(/骨|关节|腰|颈|膝|肩|疼痛|骨折|康复|运动损伤/)) {
        groups.push({
          key: "orthoFocus",
          title: "骨科与康复关注点",
          desc: "根据描述追加的骨科/康复分诊点。",
          options: [
            { title: "颈肩腰腿痛或关节疼痛", meta: "适合骨科门诊、影像检查和康复评估" },
            { title: "骨折、术后或运动损伤复诊", meta: "需上传影像、手术记录和康复进度" },
            { title: "MRI / X 光 / CT 影像解读", meta: "适合资料预审后安排医生说明" },
            { title: "康复训练与治疗周期咨询", meta: "适合明确目标、周期和复诊安排" }
          ]
        });
      }
      if (customDraftHas(/皮肤|过敏|皮疹|湿疹|荨麻疹|瘙痒|痘|斑/)) {
        groups.push({
          key: "skinFocus",
          title: "皮肤与过敏关注点",
          desc: "根据描述追加的皮肤科分诊点。",
          options: [
            { title: "皮疹、瘙痒或湿疹", meta: "建议补充照片、持续时间和诱因" },
            { title: "过敏反应或荨麻疹", meta: "需说明接触物、用药史和发作频率" },
            { title: "痤疮、色斑或慢性皮肤问题", meta: "适合皮肤科门诊和长期方案咨询" },
            { title: "皮肤照片资料预审", meta: "可先上传清晰照片由顾问整理给医生" }
          ]
        });
      }
      if (customDraftHas(/妇科|月经|乳腺|备孕|怀孕|泌尿|尿频|尿痛|前列腺|肾|膀胱/)) {
        groups.push({
          key: "uroGynFocus",
          title: "妇科 / 泌尿关注点",
          desc: "根据描述追加的妇科或泌尿分诊点。",
          options: [
            { title: "妇科检查、月经或乳腺问题", meta: "适合妇科门诊、超声和报告解读" },
            { title: "泌尿不适、尿频或尿痛", meta: "适合泌尿科咨询和基础化验预约" },
            { title: "前列腺或肾脏相关资料", meta: "建议上传超声、化验和既往治疗记录" },
            { title: "备孕、孕前或基础筛查", meta: "适合预约检查和资料整理" }
          ]
        });
      }
      if (customDraftHas(/肿瘤|癌|结节|术后|化疗|放疗|病理|二诊|会诊/)) {
        groups.push({
          key: "complexFocus",
          title: "复杂病例 / 二诊关注点",
          desc: "根据描述追加的专家会诊分诊点。",
          options: [
            { title: "病理、影像和治疗记录预审", meta: "适合先整理资料，再判断可预约专家" },
            { title: "术后复诊或治疗方案二诊", meta: "需要手术记录、病理和近期复查报告" },
            { title: "肿瘤或结节报告解读", meta: "适合上传完整影像和报告后安排医生说明" },
            { title: "跨科室专家会诊", meta: "适合资料复杂、需多科室协同判断的情况" }
          ]
        });
      }
      if (customDraftHas(/体检|报告|化验|检查|影像|ct|mri|超声|指标|筛查/)) {
        groups.push({
          key: "checkupFocus",
          title: "体检与报告关注点",
          desc: "根据描述追加的检查/报告分诊点。",
          options: [
            { title: "全身体检套餐匹配", meta: "适合按预算和停留时间筛选体检机构" },
            { title: "化验指标或影像报告解读", meta: "适合上传报告后安排医生说明" },
            { title: "专项筛查预约", meta: "适合按消化、心血管、肿瘤等方向拆分检查" },
            { title: "复查计划与资料整理", meta: "适合已有异常指标，需要确认下一步安排" }
          ]
        });
      }
      if (!groups.length) {
        groups.push({
          key: "clinicalFocus",
          title: "通用医学关注点",
          desc: "填写描述后，这里会替换为更具体的专科选择点。",
          options: [
            { title: "初诊咨询与分诊", meta: "适合还不确定科室，需要先由顾问整理需求" },
            { title: "检查预约与资料准备", meta: "适合目标明确，需要协调医院和时间" },
            { title: "报告解读与复查建议整理", meta: "适合已有报告，需要医生说明和后续路径" },
            { title: "专家二诊或复杂病例预审", meta: "适合病史复杂、资料较多或跨科室情况" }
          ]
        });
      }
      return groups.slice(0, 4);
    }

    function customChoiceGroups() {
      const baseGroups = [
        {
          key: "primaryConcern",
          title: "通用医学方向",
          desc: "先做宽口径分诊，不把入口限制在体检、胃或牙齿。",
          options: [
            { title: "内科综合 / 不确定科室", meta: "适合先由顾问按症状分诊" },
            { title: "检查报告 / 影像资料解读", meta: "适合已有体检、化验、CT、MRI 或超声资料" },
            { title: "疼痛、骨科或康复问题", meta: "适合关节、颈肩腰腿、骨折术后或运动损伤" },
            { title: "妇科、泌尿或生殖相关", meta: "适合妇科检查、泌尿不适、前列腺或孕前筛查" },
            { title: "皮肤、过敏或慢病管理", meta: "适合皮疹、湿疹、过敏、长期用药或复诊" },
            { title: "肿瘤、术后或专家二诊", meta: "适合复杂病例、病理影像资料和治疗方案复核" }
          ]
        },
        {
          key: "goal",
          title: "就诊目标",
          desc: "明确你希望我们优先解决的问题。",
          options: [
            { title: "短期来华完成初步评估", meta: "适合 2-3 天内完成资料预审和门诊咨询" },
            { title: "预约检查并整理报告", meta: "适合体检、影像、消化或口腔基础检查" },
            { title: "匹配专家会诊路径", meta: "适合资料复杂、需要先由医生判断可行性的情况" }
          ]
        },
        {
          key: "timeline",
          title: "症状与计划时间",
          desc: "用于判断是普通预约、优先处理还是资料预审。",
          options: [
            { title: "24 小时内突然出现", meta: "如伴随严重症状，应优先线下急诊" },
            { title: "1-2 周内反复出现", meta: "适合门诊咨询和基础检查预约" },
            { title: "超过 1 个月或慢性问题", meta: "适合整理病史、用药和既往报告" },
            { title: "已有明确来华日期", meta: "按停留时间匹配医院、检查和顾问安排" }
          ]
        },
        {
          key: "documents",
          title: "现有医疗资料",
          desc: "资料越完整，越容易做出可执行的预约方案。",
          options: [
            { title: "暂时没有资料", meta: "可先按症状做分诊和基础检查建议" },
            { title: "已有化验或体检报告", meta: "适合报告解读和复查路径整理" },
            { title: "已有影像或内镜资料", meta: "适合上传 CT、MRI、超声、胃肠镜等资料" },
            { title: "已有病历、用药或手术记录", meta: "适合复杂病例预审和专家会诊" }
          ]
        },
        {
          key: "budget",
          title: "预算与周期",
          desc: "用于初步筛选医院和预约方案，最终费用以医院确认为准。",
          options: [
            { title: "$299-$699 / 2-3 天", meta: "适合门诊咨询、报告解读和基础检查" },
            { title: "$699-$1299 / 3-5 天", meta: "适合体检套餐、口腔初筛和多项检查组合" },
            { title: "待医院评估后确认", meta: "适合手术咨询、复杂病例或长期治疗规划" }
          ]
        },
        {
          key: "hospital",
          title: "推荐医院",
          desc: "根据上方医学方向和草稿内容动态调整医院科室，顾问会再复核承接能力。",
          options: customHospitalOptions()
        },
        {
          key: "doctor",
          title: "顾问与医师",
          desc: "选择期望的协作方式。",
          options: [
            { title: "国际医疗顾问 + 对应科室医生", meta: "顾问先整理资料，医生再确认路径" },
            { title: "先做资料预审，再安排医生", meta: "适合资料不完整或病史较复杂的情况" },
            { title: "客服协助预约基础检查", meta: "适合目标明确、只需协调时间和材料" }
          ]
        }
      ];
      return [...baseGroups, ...customDynamicMedicalGroups()];
    }

    function customSelectedSummaryItems() {
      const labels = {
        primaryConcern: "医学方向",
        symptom: "医疗方向",
        clinicalFocus: "通用关注点",
        digestiveFocus: "消化关注点",
        dentalFocus: "口腔关注点",
        cardioFocus: "心血管关注点",
        respiratoryFocus: "呼吸关注点",
        orthoFocus: "骨科康复关注点",
        skinFocus: "皮肤过敏关注点",
        uroGynFocus: "妇科泌尿关注点",
        complexFocus: "复杂病例关注点",
        checkupFocus: "检查报告关注点",
        goal: "就诊目标",
        timeline: "症状时间",
        documents: "现有资料",
        budget: "预算周期",
        hospital: "推荐医院",
        doctor: "顾问医师"
      };
      const selections = state.customSelections || {};
      const ordered = Object.keys(labels)
        .filter(key => selections[key])
        .map(key => ({ label: labels[key], value: selections[key] }));
      const extras = Object.keys(selections)
        .filter(key => !labels[key] && selections[key])
        .map(key => ({ label: key, value: selections[key] }));
      return [...ordered, ...extras];
    }

    function customSummaryRows(limit = 8) {
      const rows = customSelectedSummaryItems();
      if (!rows.length) return summaryRow("选择进度", "尚未选择推荐项");
      return rows.slice(0, limit).map(row => summaryRow(row.label, row.value)).join("");
    }

    function customOptionCard(group, option) {
      const active = customSelection(group.key) === option.title;
      return `
        <button class="custom-option-card ${active ? "active" : ""}" data-action="customSelect:${group.key}|${option.title}">
          <strong>${option.title}</strong>
          <span>${option.meta}</span>
        </button>
      `;
    }

    function settings() {
      const languages = [
        { value: "中文", title: "中文", meta: "简体中文界面" },
        { value: "English", title: "English", meta: "International service interface" },
        { value: "العربية", title: "العربية", meta: "واجهة عربية للخدمة" }
      ];
      const currentLanguage = languages.find(item => item.value === state.language) || languages[0];
      return `
        <div class="settings-page personal-settings-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-route="profile" aria-label="返回">‹</button>
            <strong>个人设置</strong>
          </div>
          <div class="personal-settings-panel">
            <section class="personal-settings-group">
              <h3>账号</h3>
              <button class="personal-settings-row" data-route="accountInfo">
                <span><strong>账号信息</strong><small>姓名、护照号与联系方式</small></span>
                <em>›</em>
              </button>
              <button class="personal-settings-row" data-route="emailInfo">
                <span><strong>邮箱信息</strong><small>用于接收预约提醒与资料回传通知</small></span>
                <em>›</em>
              </button>
            </section>
            <section class="personal-settings-group">
              <h3>隐私政策</h3>
              <button class="personal-settings-row" data-route="serviceAgreement">
                <span><strong>服务协议</strong><small>预约协调、资料预审和隐私保护说明</small></span>
                <em>›</em>
              </button>
            </section>
            <section class="personal-settings-group">
              <h3>多语言设置</h3>
              <button class="personal-settings-row current-language-row" data-action="languagePicker:open">
                <span><strong>当前语言</strong><small>${currentLanguage.title} · ${currentLanguage.meta}</small></span>
                <em>›</em>
              </button>
            </section>
            <section class="personal-settings-group">
              <h3>地域设置</h3>
              <button class="personal-settings-row" data-route="onboardingLocation">
                <span><strong>境内/境外</strong><small>${state.selectedCountry} / ${state.city} / ${state.locationMode === "manual" ? "手动选择" : "当前城市"}</small></span>
                <em>›</em>
              </button>
            </section>
            <button class="personal-logout-button" data-action="resetPrototype">退出登录</button>
          </div>
          ${state.languagePickerOpen ? `
            <div class="language-sheet-backdrop" data-action="languagePicker:close">
              <div class="language-sheet">
                <div class="language-sheet-title">
                  <strong>选择语言</strong>
                  <span>切换后会立即更新 App 当前语言。</span>
                </div>
                ${languages.map(item => `
                  <button class="language-sheet-row ${state.language === item.value ? "active" : ""}" data-action="language:${item.value}">
                    <span><strong>${item.title}</strong><small>${item.meta}</small></span>
                    <em>${state.language === item.value ? "已选择" : "选择"}</em>
                  </button>
                `).join("")}
                <button class="language-sheet-cancel" data-action="languagePicker:close">取消</button>
              </div>
            </div>
          ` : ""}
        </div>
      `;
    }

    function accountInfo() {
      return `
        <div class="settings-detail-page account-info-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-route="settings" aria-label="返回">‹</button>
            <strong>账号信息</strong>
          </div>
          <section class="account-profile-card card">
            <div class="account-avatar">M</div>
            <div>
              <span>资料待完善</span>
              <h3>Marth Patient</h3>
              <p>跨境医疗预约用户 · 当前资料完整度 68%</p>
            </div>
          </section>
          <section class="settings-detail-card card">
            <h3>基础身份</h3>
            ${summaryRow("姓名", "Marth Patient")}
            ${summaryRow("护照号", "待补充 / 用于医院实名预约")}
            ${summaryRow("出生日期", "待补充 / 用于体检与门诊建档")}
            <button class="settings-inline-button" data-route="passportBind">绑定或更新护照资料</button>
          </section>
          <section class="settings-detail-card card">
            <h3>联系方式</h3>
            ${summaryRow("手机号", "+86 138 **** 0625")}
            ${summaryRow("邮箱", "marth.patient@example.com")}
            ${summaryRow("常用语言", state.language)}
            <button class="settings-inline-button" data-route="emailInfo">管理邮箱通知</button>
          </section>
          <section class="settings-detail-card card">
            <h3>就诊偏好</h3>
            ${summaryRow("所在城市", `${state.selectedCountry} / ${state.city}`)}
            ${summaryRow("服务偏好", "资料预审、医院匹配、预约协调")}
            ${summaryRow("紧急联系人", "待补充 / 建议用于陪诊和院方沟通")}
          </section>
          <div class="notice">账号信息用于预约协调、医院建档和资料预审。原型阶段不保存真实证件信息。</div>
        </div>
      `;
    }

    function emailInfo() {
      return `
        <div class="settings-detail-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-route="settings" aria-label="返回">‹</button>
            <strong>邮箱信息</strong>
          </div>
          <section class="settings-detail-hero card">
            <span>已绑定</span>
            <h3>marth.patient@example.com</h3>
            <p>邮箱用于接收预约确认、资料补充提醒、医院回传记录通知和预约服务费凭证。</p>
          </section>
          <section class="settings-detail-card card">
            <h3>通知用途</h3>
            ${summaryRow("预约提醒", "医院确认时间、顾问跟进节点和改期通知")}
            ${summaryRow("资料回传", "院方回传报告、门诊纪要和用药说明提醒")}
            ${summaryRow("支付凭证", "预约服务费支付状态和电子凭证通知")}
          </section>
          <section class="settings-detail-card card">
            <h3>安全设置</h3>
            ${summaryRow("邮箱验证", "已通过验证码验证")}
            ${summaryRow("敏感资料", "涉及护照、病历和检查报告的通知只展示摘要")}
            <button class="settings-inline-button" data-action="sendMessage">重新验证邮箱</button>
          </section>
          <div class="notice">原型阶段不保存真实邮箱。正式 App 中，邮箱修改需要二次验证后生效。</div>
        </div>
      `;
    }

    function serviceAgreement() {
      return `
        <div class="settings-detail-page">
          <div class="archive-header rich-archive-header">
            <button class="wire-back" data-route="settings" aria-label="返回">‹</button>
            <strong>服务协议</strong>
          </div>
          <section class="settings-detail-hero card">
            <span>星火医疗 App</span>
            <h3>跨境医疗预约协调服务说明</h3>
            <p>我们提供医疗资源查询、资料预审协助、医院/医师匹配、预约协调和就诊前沟通支持。</p>
          </section>
          <section class="settings-detail-card card">
            <h3>服务范围</h3>
            ${summaryRow("预约协调", "根据用户填写的信息匹配医院、科室、时间和顾问服务")}
            ${summaryRow("资料预审", "协助整理护照、病例、检查报告、用药史和过敏史")}
            ${summaryRow("陪同协助", "可选翻译、地勤接送、院内引导和客服跟进")}
          </section>
          <section class="settings-detail-card card">
            <h3>费用与确认</h3>
            ${summaryRow("预约服务费", "用于需求整理、资料预审和预约协调，不代表最终医疗费用")}
            ${summaryRow("医疗费用", "检查、治疗、药品、住院等费用以医院正式确认为准")}
            ${summaryRow("方案变更", "医院排班、资料完整度和医生评估可能影响最终预约结果")}
          </section>
          <section class="settings-detail-card card">
            <h3>隐私与医疗声明</h3>
            ${summaryRow("隐私保护", "仅在预约协调和资料预审场景内使用用户授权资料")}
            ${summaryRow("医疗声明", "App 展示内容不构成诊断结论，最终以医院和医生意见为准")}
            ${summaryRow("紧急情况", "突发胸痛、呼吸困难、严重出血等情况应优先联系当地急救")}
          </section>
        </div>
      `;
    }

    function customPlanHeader(title, backRoute = "profile") {
      return `
        <div class="custom-wire-header">
          <button class="wire-back" data-route="${backRoute}" aria-label="返回">‹</button>
          <strong>${title}</strong>
        </div>
      `;
    }

    function customPlan() {
      const hasDraft = Boolean(String(state.customDraftText || "").trim()) || customSelectionCount() > 0;
      return `
        <div class="custom-wire-page">
          ${customPlanHeader("我的定制方案")}
          <div class="custom-empty-panel">
            <div class="custom-empty-copy">
              <strong>${hasDraft ? "已有定制方案草稿" : "当前没有已完成的定制方案"}</strong>
              <span>${hasDraft ? "草稿会保存在本机预览中，你可以继续补充描述并选择推荐项。" : "你可以先填写需求草稿，再从我们提供的项目、医院和顾问选项中选择。"}</span>
            </div>
          </div>
          <button class="custom-plan-detail-card" data-route="customPlanDetail">
            <div>
              <strong>方案 A 草稿</strong>
              <span>${hasDraft ? `${customDraftPreview(32)} / 已选 ${customSelectionCount()} 项` : "待填写自我描述和推荐选项"}</span>
            </div>
            <em>›</em>
          </button>
          <button class="custom-wire-primary" data-route="customPlanFlow">预约定制医疗</button>
        </div>
      `;
    }

    function customPlanDetail() {
      return `
        <div class="custom-wire-page">
          ${customPlanHeader("方案详情", "customPlan")}
          <button class="custom-plan-detail-card" data-route="customPlanFlow">
            <div>
              <strong>方案 A 草稿</strong>
              <span>${customDraftPreview(42)}</span>
            </div>
            <em>›</em>
          </button>
          <div class="custom-plan-preview card">
            <h3>草稿摘要</h3>
            ${summaryRow("自我描述", customDraftPreview(58))}
            ${customSummaryRows(10)}
          </div>
          <button class="custom-wire-primary custom-wire-bottom" data-route="customPlanFlow">预约定制医疗</button>
        </div>
      `;
    }

    function customPlanFlow() {
      const groups = customChoiceGroups();
      return `
        <div class="custom-wire-page custom-flow-page rich-custom-flow-page">
          ${customPlanHeader("我的定制方案")}
          <div class="custom-draft-card card">
            <div class="custom-draft-title">
              <strong>先写你的就医需求</strong>
              <span>草稿会自动保存</span>
            </div>
            <textarea class="custom-draft-input" data-state-field="customDraftText" maxlength="260" rows="4" placeholder="例如：最近胃部不适，饭后容易胀气，计划 6 月底来重庆，希望先做消化科咨询并确认是否需要肠胃镜。">${escapePreviewHtml(state.customDraftText || "")}</textarea>
            <button class="custom-refresh-button" data-action="customRefreshSuggestions">根据描述更新推荐选项</button>
            <p>请写症状、计划时间、所在城市、预算范围、已有检查报告等。系统会按关键词追加相应专科选择点；这里仅用于预约协调，不作为医疗诊断。</p>
          </div>
          <div class="custom-choice-list">
            ${groups.map(group => `
              <section class="custom-choice-section">
                <div class="custom-choice-heading">
                  <strong>${group.title}</strong>
                  <span>${group.desc}</span>
                </div>
                <div class="custom-option-grid">
                  ${group.options.map(option => customOptionCard(group, option)).join("")}
                </div>
              </section>
            `).join("")}
          </div>
          <div class="custom-plan-preview card">
            <h3>当前方案草稿</h3>
            ${summaryRow("自我描述", customDraftPreview(58))}
            ${customSummaryRows(10)}
          </div>
          <div class="custom-service-card">
            <div><strong>预约专属医疗定制服务费</strong><span>包含需求整理、资料预审、医院/医师匹配和预约协调。</span></div>
            <em>$99</em>
          </div>
          <button class="custom-wire-primary" data-route="quickPayment">立即预约</button>
        </div>
      `;
    }
    function ai() {
      return `
        ${hero("AI 医疗助手", "通过选择题式问诊收集症状和需求，生成可讨论的治疗方案草稿。", [
          { text: "选择题问诊", type: "primary" },
          { text: "预约顾问确认", type: "teal", attrs: `data-route="service"` }
        ])}
        <div class="message user" style="margin-top:12px">我的胃有点不舒服</div>
        <div class="message ai" style="margin-top:10px">胃不舒服有很多种形式，请问你的感觉更接近哪一种？</div>
        <div class="options" data-choice-group="symptom"><button class="option active">胃痛</button><button class="option">胃胀</button><button class="option">烧心</button><button class="option">恶心</button></div>
        <div class="message ai" style="margin-top:10px">是饭后开始胀气吗？</div>
        <div class="options" data-choice-group="meal"><button class="option">是</button><button class="option">不是</button></div>
        ${state.planGenerated ? `<div class="summary" style="margin-top:12px">
          ${summaryRow("整体治疗时间", "1-2 天基础检查，复杂项目另行确认")}
          ${summaryRow("可治疗日期", `${state.date} ${state.time}`)}
          ${summaryRow("费用范围", "需顾问确认")}
          ${summaryRow("免责声明", "AI 不能替代医生诊断")}
        </div>` : ""}
        <div class="actions"><button class="secondary" data-route="quick">预约挂号</button><button class="cta" data-action="generatePlan">生成方案</button></div>
        <div class="notice">AI 可以帮你整理症状和就医路径，不能替代医生诊断。</div>
      `;
    }

    const renderers = {
      home,
      onboarding,
      onboardingRegion,
      onboardingLocation,
      onboardingIntro,
      sos,
      service,
      quick,
      quickHospital,
      quickTime,
      quickProfile,
      quickPayment,
      compare,
      compareQuotes,
      compareDetail,
      hospitals,
      hospital: hospitalDetail,
      visaCountries,
      visaTreatments,
      treatmentDetail,
      overseasHospitalIntro,
      valueServices,
      insurance,
      profile,
      settings,
      accountInfo,
      emailInfo,
      serviceAgreement,
      passportBind,
      healthArchive,
      medicalRecords,
      medicalRecordGroup,
      medicalRecordDetail,
      customPlan,
      customPlanDetail,
      customPlanFlow,
      ai
    };

    window.__sparkPreview = {
      routeTitle,
      renderers,
      state
    };


















