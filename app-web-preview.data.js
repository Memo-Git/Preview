    const hospital = {
      name: "重庆莱佛士医院",
      city: "重庆",
      area: "莱佛士片区",
      distance: "2.4km",
      tags: ["体检", "消化科咨询", "牙科护理", "国际陪诊"],
      booking: "今日 15:30 可预约",
      note: "原型内医院信息按当前项目占位，后续可替换为正式资质、科室和图片资料。"
    };

    const nearbyHospitals = [
      {
        name: "重庆莱佛士医院",
        area: "莱佛士片区",
        distance: "2.4km",
        desc: "体检 / 消化科 / 牙科护理",
        intro: "位于莱佛士片区的综合医疗承接点，支持健康检查、消化科咨询、牙科护理和国际陪诊协调。",
        doctorIntro: "可协调体检、消化科与口腔方向医师评估，顾问先做资料预审与就诊路径确认。",
        booking: "今日 15:30 可预约",
        image: "assets/hospital-raffles-exterior.png"
      },
      {
        name: "江北国际医疗中心",
        area: "江北嘴",
        distance: "3.8km",
        desc: "健康检查 / 国际门诊",
        intro: "面向跨境客户的国际门诊承接点，适合健康检查、报告解读和短周期来华医疗咨询。",
        doctorIntro: "以全科评估和国际门诊顾问为主，提供中英文沟通、资料整理和预约衔接。",
        booking: "明日 10:00 可预约",
        image: "assets/hospital-jiangbei-lobby.png"
      },
      {
        name: "渝中健康管理中心",
        area: "解放碑",
        distance: "4.6km",
        desc: "体检套餐 / 影像检查",
        intro: "以健康管理和体检套餐为主，适合安排基础筛查、影像检查和体检报告整理。",
        doctorIntro: "健康管理顾问负责套餐匹配，影像与检验结果由对应科室医师完成解释。",
        booking: "今日 17:00 需确认",
        image: "assets/hospital-yuzhong-checkup.png"
      },
      {
        name: "南岸口腔消化门诊",
        area: "南滨路",
        distance: "6.1km",
        desc: "种植牙 / 肠胃镜咨询",
        intro: "偏专科门诊承接，适合口腔种植初筛、消化道检查咨询和术前资料确认。",
        doctorIntro: "可安排口腔、消化方向医师初步评估，复杂治疗需先由顾问确认周期和风险提示。",
        booking: "明日 14:30 可预约",
        image: "assets/hospital-nanan-specialty.png"
      }
    ];

    const visaFreeCountries = [
      { name: "文莱", validity: "长期有效" },
      { name: "法国", validity: "至 2026-12-31" },
      { name: "德国", validity: "至 2026-12-31" },
      { name: "意大利", validity: "至 2026-12-31" },
      { name: "西班牙", validity: "至 2026-12-31" },
      { name: "荷兰", validity: "至 2026-12-31" },
      { name: "瑞士", validity: "至 2026-12-31" },
      { name: "爱尔兰", validity: "至 2026-12-31" },
      { name: "匈牙利", validity: "至 2026-12-31" },
      { name: "奥地利", validity: "至 2026-12-31" },
      { name: "比利时", validity: "至 2026-12-31" },
      { name: "卢森堡", validity: "至 2026-12-31" },
      { name: "新西兰", validity: "至 2026-12-31" },
      { name: "澳大利亚", validity: "至 2026-12-31" },
      { name: "波兰", validity: "至 2026-12-31" },
      { name: "葡萄牙", validity: "至 2026-12-31" },
      { name: "希腊", validity: "至 2026-12-31" },
      { name: "塞浦路斯", validity: "至 2026-12-31" },
      { name: "斯洛文尼亚", validity: "至 2026-12-31" },
      { name: "斯洛伐克", validity: "至 2026-12-31" },
      { name: "挪威", validity: "至 2026-12-31" },
      { name: "芬兰", validity: "至 2026-12-31" },
      { name: "丹麦", validity: "至 2026-12-31" },
      { name: "冰岛", validity: "至 2026-12-31" },
      { name: "安道尔", validity: "至 2026-12-31" },
      { name: "摩纳哥", validity: "至 2026-12-31" },
      { name: "列支敦士登", validity: "至 2026-12-31" },
      { name: "韩国", validity: "至 2026-12-31" },
      { name: "保加利亚", validity: "至 2026-12-31" },
      { name: "罗马尼亚", validity: "至 2026-12-31" },
      { name: "克罗地亚", validity: "至 2026-12-31" },
      { name: "黑山", validity: "至 2026-12-31" },
      { name: "北马其顿", validity: "至 2026-12-31" },
      { name: "马耳他", validity: "至 2026-12-31" },
      { name: "爱沙尼亚", validity: "至 2026-12-31" },
      { name: "拉脱维亚", validity: "至 2026-12-31" },
      { name: "日本", validity: "至 2026-12-31" },
      { name: "巴西", validity: "至 2026-12-31" },
      { name: "阿根廷", validity: "至 2026-12-31" },
      { name: "智利", validity: "至 2026-12-31" },
      { name: "秘鲁", validity: "至 2026-12-31" },
      { name: "乌拉圭", validity: "至 2026-12-31" },
      { name: "沙特阿拉伯", validity: "至 2026-12-31" },
      { name: "阿曼", validity: "至 2026-12-31" },
      { name: "科威特", validity: "至 2026-12-31" },
      { name: "巴林", validity: "至 2026-12-31" },
      { name: "俄罗斯", validity: "至 2027-12-31" },
      { name: "瑞典", validity: "至 2026-12-31" },
      { name: "加拿大", validity: "至 2026-12-31" },
      { name: "英国", validity: "至 2026-12-31" }
    ];

    const visaFreePolicy = {
      source: "外交部政务服务平台：单方面免签政策常见问题解答",
      count: visaFreeCountries.length,
      stay: "30 天",
      passport: "普通护照",
      purposes: "经商、旅游观光、探亲访友、交流访问、过境"
    };

    const visaTreatmentDetails = {
      "全身体检": {
        duration: "1-2 天可完成，适合短期停留",
        items: ["胸部CT", "肝功能", "血常规", "尿常规", "腹部超声"]
      },
      "牙齿护理 / 种植牙": {
        duration: "需先评估牙周与骨量，周期由医生确认",
        items: ["口腔全景片", "牙周检查", "种植评估", "骨量评估", "治疗方案"]
      },
      "心脏搭桥手术": {
        duration: "周期长，需资料审核与专家确认",
        items: ["病历资料审核", "心电图", "心脏超声", "冠脉影像", "专家会诊"]
      },
      "胆囊切除手术": {
        duration: "需住院评估，不建议直接下单",
        items: ["腹部超声", "肝胆功能", "血常规", "麻醉评估", "住院安排"]
      },
      "前列腺切除手术": {
        duration: "周期较长，建议先做资料审核",
        items: ["病历资料审核", "前列腺超声", "PSA 检查", "泌尿科会诊", "住院评估"]
      }
    };

    const iconNames = new Set([
      "home", "ai", "user", "hospital", "first-aid", "calendar", "chat", "service",
      "stethoscope", "doctor", "passport", "document", "upload", "map", "phone", "shield", "insurance",
      "concierge", "payment", "success", "settings", "language", "location", "route", "compare"
    ]);

    const glyphAliases = {
      "医": "stethoscope",
      "院": "hospital",
      "急": "first-aid",
      "导": "map",
      "客": "chat",
      "顾": "doctor",
      "AI": "ai",
      "诊": "calendar",
      "照": "passport",
      "档": "document",
      "记": "document",
      "设": "settings"
    };

    const STORAGE_KEY = "sparkMedical.appPreview.v1";

    const defaultState = {
      route: "onboarding",
      homeMode: "overseas",
      history: [],
      onboardingCompleted: false,
      selectedCountry: "法国",
      selectedVisaTreatment: "全身体检",
      selectedCompareProject: "全身体检",
      selectedCompareHospitalIndex: 0,
      compareReturnRoute: "compare",
      selectedMedicalRecordGroup: "门诊病例",
      selectedMedicalRecordId: "checkup-return",
      viewedMedicalRecordIds: [],
      customDraftText: "",
      customActiveMedicalField: "",
      customSelections: {
        symptom: "",
        goal: "",
        budget: "",
        hospital: "",
        doctor: ""
      },
      selectedHospitalIndex: 0,
      category: "体检",
      service: "全身体检",
      date: "6月12日",
      time: "15:30",
      vip: false,
      language: "中文",
      languagePickerOpen: false,
      city: "重庆",
      locationMode: "current",
      planGenerated: false
    };

    function readStoredState() {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has("resetPreview")) {
          window.localStorage.removeItem(STORAGE_KEY);
          return {};
        }
        if (params.has("previewRoute")) {
          return {
            route: params.get("previewRoute"),
            homeMode: params.get("homeMode") || "overseas",
            onboardingCompleted: true
          };
        }
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        return JSON.parse(raw) || {};
      } catch (error) {
        return {};
      }
    }

    const storedState = readStoredState();

    const state = {
      ...defaultState,
      ...storedState,
      history: []
    };

    state.vip = false;
    state.customDraftText = typeof state.customDraftText === "string" ? state.customDraftText : "";
    state.customSelections = {
      ...defaultState.customSelections,
      ...(state.customSelections && typeof state.customSelections === "object" ? state.customSelections : {})
    };

    if (state.route === "onboardingLocation" && state.language === "中文" && state.locationMode !== "manual") {
      state.selectedCountry = "中国";
      state.city = "重庆";
      state.locationMode = "current";
    }

    function hospitalAt(index = 0) {
      const safeIndex = Math.max(0, Math.min(nearbyHospitals.length - 1, Number(index) || 0));
      const item = nearbyHospitals[safeIndex] || nearbyHospitals[0] || hospital;
      const tags = item.tags || (item.desc ? item.desc.split("/").map(tag => tag.trim()).filter(Boolean) : hospital.tags);
      return {
        ...hospital,
        ...item,
        city: item.city || hospital.city,
        tags
      };
    }

    function getSelectedHospital() {
      return hospitalAt(state.selectedHospitalIndex);
    }

    function hospitalImagesFor(item = getSelectedHospital()) {
      const selectedIndex = nearbyHospitals.findIndex(hospitalItem => hospitalItem.name === item.name);
      const ordered = [
        item,
        ...nearbyHospitals.filter((_, index) => index !== selectedIndex)
      ];
      return ordered.map(hospitalItem => hospitalItem.image).filter(Boolean);
    }

    function hospitalServiceForLabel(rawLabel) {
      const raw = String(rawLabel || "").trim();
      if (/牙|口腔|种植/.test(raw)) {
        return { title: "牙齿护理 / 种植牙", desc: "需口腔评估后确认周期" };
      }
      if (/消化|肠胃/.test(raw)) {
        return { title: "消化科咨询", desc: "肠胃镜咨询与报告解读" };
      }
      if (/体检|健康|筛查/.test(raw)) {
        return { title: "全身体检", desc: "基础筛查、影像检查、报告整理" };
      }
      return { title: raw || "医疗项目", desc: "顾问确认项目周期与资料要求" };
    }

    function hospitalServicesFor(item = getSelectedHospital()) {
      const labels = (item.desc || "").split("/").map(label => label.trim()).filter(Boolean);
      const source = labels.length ? labels : hospital.tags;
      const seen = new Set();
      return source.map(hospitalServiceForLabel).filter(service => {
        if (seen.has(service.title)) return false;
        seen.add(service.title);
        return true;
      });
    }

    if (!state.onboardingCompleted) {
      state.route = "onboarding";
      state.homeMode = "overseas";
    }

    const routeTitle = {
      home: "境外主页",
      domestic: "境内主页",
      onboarding: "语言设置",
      onboardingRegion: "地域选择",
      onboardingLocation: "当前所在地",
      onboardingIntro: "服务介绍",
      sos: "SOS",
      service: "在线客服",
      quick: "快速就诊",
      compare: "医疗项目对比",
      hospitals: "医院列表",
      hospital: "医院详情",
      visaCountries: "免签国家列表",
      visaTreatments: "免签期可做治疗",
      treatmentDetail: "治疗项目详情",
      overseasHospitalIntro: "医院/医师介绍",
      valueServices: "增值服务",
      insurance: "商业保险",
      profile: "个人中心",
      settings: "设置",
      accountInfo: "账号信息",
      emailInfo: "邮箱信息",
      serviceAgreement: "服务协议",
      ai: "AI 医疗助手"
    };
