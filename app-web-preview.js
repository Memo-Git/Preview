
    function currentKey() {
      return state.route === "home" && state.homeMode === "domestic" ? "domestic" : state.route;
    }

    function isOnboardingRoute(route) {
      return ["onboarding", "onboardingRegion", "onboardingLocation", "onboardingIntro"].includes(route);
    }

    function isSupportedRoute(route) {
      return ["home", "onboarding", "onboardingRegion", "onboardingLocation", "onboardingIntro", "sos", "service", "quick", "quickHospital", "quickTime", "quickProfile", "quickPayment", "compare", "compareQuotes", "compareDetail", "hospitals", "hospital", "profile", "settings", "accountInfo", "emailInfo", "serviceAgreement", "passportBind", "healthArchive", "medicalRecords", "medicalRecordGroup", "medicalRecordDetail", "customPlan", "customPlanDetail", "customPlanFlow", "ai", "visaCountries", "visaTreatments", "treatmentDetail", "overseasHospitalIntro", "valueServices", "insurance"].includes(route);
    }

    function go(route, push = true) {
      if (route !== "domestic" && !isSupportedRoute(route)) route = "home";
      clearToast();
      const from = currentKey();
      if (push && from !== route) state.history.push(from);
      if (isOnboardingRoute(state.route) && ["home", "domestic"].includes(route)) {
        state.onboardingCompleted = true;
      }
      if (route === "onboardingLocation" && state.language === "中文" && state.locationMode !== "manual") {
        state.selectedCountry = "中国";
        state.city = "重庆";
        state.locationMode = "current";
      }
      if (route === "domestic") state.homeMode = "domestic";
      state.route = route === "domestic" ? "home" : route;
      render();
    }

    function back() {
      const last = state.history.pop();
      if (last) {
        go(last, false);
      } else {
        go("home", false);
      }
    }

    function toast(text) {
      const node = document.getElementById("toast");
      node.textContent = translateTextValue(text);
      node.classList.add("show");
      clearTimeout(toast.timer);
      toast.timer = setTimeout(() => node.classList.remove("show"), 1800);
    }

    function clearToast() {
      const node = document.getElementById("toast");
      if (!node) return;
      clearTimeout(toast.timer);
      node.classList.remove("show");
      node.textContent = "";
    }

    const i18nTextSources = new WeakMap();

    const i18nDictionaries = {
      English: {
        "星火医疗": "Spark Medical",
        "首页": "Home",
        "AI助手": "AI Assistant",
        "个人中心": "Profile",
        "个人设置": "Personal Settings",
        "设置": "Settings",
        "返回": "Back",
        "退出登录": "Log out",
        "账号": "Account",
        "账号信息": "Account information",
        "邮箱信息": "Email information",
        "姓名、护照号与联系方式": "Name, passport number, and contact details",
        "用于接收预约提醒与资料回传通知": "Used for appointment reminders and hospital record notifications",
        "隐私政策": "Privacy policy",
        "服务协议": "Service agreement",
        "预约协调、资料预审和隐私保护说明": "Appointment coordination, document pre-review, and privacy notes",
        "多语言设置": "Language settings",
        "当前语言": "Current language",
        "切换后会立即更新 App 当前语言。": "The app language updates immediately after switching.",
        "选择语言": "Choose language",
        "中文": "Chinese",
        "简体中文界面": "Simplified Chinese interface",
        "当前为移动端 App 原型网页预览。": "This is a mobile app prototype web preview.",
        "English": "English",
        "International service interface": "International service interface",
        "العربية": "Arabic",
        "واجهة عربية للخدمة": "Arabic service interface",
        "已选择": "Selected",
        "选择": "Select",
        "取消": "Cancel",
        "地域设置": "Region settings",
        "境内/境外": "Domestic / Overseas",
        "手动选择": "Manual selection",
        "当前城市": "Current city",
        "中国": "China",
        "法国": "France",
        "德国": "Germany",
        "意大利": "Italy",
        "日本": "Japan",
        "韩国": "South Korea",
        "重庆": "Chongqing",
        "上海": "Shanghai",
        "邮箱用于接收预约确认、资料补充提醒、医院回传记录通知和预约服务费凭证。": "Email is used for appointment confirmations, document reminders, hospital record notifications, and service-fee receipts.",
        "已绑定": "Linked",
        "通知用途": "Notification use",
        "预约提醒": "Appointment reminders",
        "医院确认时间、顾问跟进节点和改期通知": "Hospital confirmation times, consultant follow-ups, and rescheduling notices",
        "资料回传": "Record notifications",
        "院方回传报告、门诊纪要和用药说明提醒": "Hospital reports, outpatient notes, and medication instructions",
        "支付凭证": "Payment receipts",
        "预约服务费支付状态和电子凭证通知": "Appointment service-fee status and electronic receipt notifications",
        "安全设置": "Security settings",
        "邮箱验证": "Email verification",
        "已通过验证码验证": "Verified by code",
        "敏感资料": "Sensitive data",
        "涉及护照、病历和检查报告的通知只展示摘要": "Notifications involving passports, medical records, and reports only show summaries",
        "重新验证邮箱": "Verify email again",
        "原型阶段不保存真实邮箱。正式 App 中，邮箱修改需要二次验证后生效。": "The prototype does not store a real email. In the production app, email changes require secondary verification.",
        "跨境医疗预约协调服务说明": "Cross-border medical appointment coordination terms",
        "我们提供医疗资源查询、资料预审协助、医院/医师匹配、预约协调和就诊前沟通支持。": "We provide medical resource lookup, document pre-review support, hospital/doctor matching, appointment coordination, and pre-visit communication support.",
        "服务范围": "Service scope",
        "预约协调": "Appointment coordination",
        "根据用户填写的信息匹配医院、科室、时间和顾问服务": "Match hospitals, departments, times, and consultant services based on submitted information",
        "资料预审": "Document pre-review",
        "协助整理护照、病例、检查报告、用药史和过敏史": "Help organize passports, medical records, reports, medication history, and allergy history",
        "陪同协助": "Accompaniment support",
        "可选翻译、地勤接送、院内引导和客服跟进": "Optional translation, ground transfer, in-hospital guidance, and support follow-up",
        "费用与确认": "Fees and confirmation",
        "预约服务费": "Appointment service fee",
        "用于需求整理、资料预审和预约协调，不代表最终医疗费用": "Used for requirement整理, document pre-review, and appointment coordination; not the final medical fee",
        "医疗费用": "Medical fees",
        "检查、治疗、药品、住院等费用以医院正式确认为准": "Examination, treatment, medication, and hospitalization fees are subject to hospital confirmation",
        "方案变更": "Plan changes",
        "医院排班、资料完整度和医生评估可能影响最终预约结果": "Hospital schedules, document completeness, and doctor review may affect the final appointment",
        "隐私与医疗声明": "Privacy and medical disclaimer",
        "隐私保护": "Privacy protection",
        "仅在预约协调和资料预审场景内使用用户授权资料": "Authorized data is used only for appointment coordination and document pre-review",
        "医疗声明": "Medical disclaimer",
        "App 展示内容不构成诊断结论，最终以医院和医生意见为准": "App content is not a diagnosis; hospital and doctor opinions prevail",
        "紧急情况": "Emergency situations",
        "突发胸痛、呼吸困难、严重出血等情况应优先联系当地急救": "For sudden chest pain, breathing difficulty, severe bleeding, and similar emergencies, contact local emergency services first",
        "欢迎使用星火医疗": "Welcome to Spark Medical",
        "请选择你希望使用的语言。": "Choose your preferred language.",
        "语言设置": "Language settings",
        "下一步": "Next",
        "上一步": "Previous",
        "保持当前语言": "Keep current language",
        "你当前希望使用哪类服务？": "Which type of service do you want to use?",
        "境内医疗服务": "Domestic medical services",
        "SOS、快速就诊、附近医院": "SOS, quick visit, nearby hospitals",
        "境外来华医疗服务": "Overseas-to-China medical services",
        "免签医疗、顾问、资料协调": "Visa-free medical care, consultants, document coordination",
        "你现在所在的位置。": "Your current location.",
        "国家/地区": "Country / Region",
        "定位授权": "Location authorization",
        "国家/城市列表": "Country / city list",
        "手动选择城市": "Choose city manually",
        "我们帮你协调可靠医疗资源。": "We help coordinate reliable medical resources.",
        "服务介绍": "Service introduction",
        "境外医疗辅助协调": "Overseas medical coordination",
        "我们是专注于境外医疗辅助协调机构。": "We focus on overseas medical coordination support.",
        "专家会诊协调": "Expert consultation coordination",
        "可以帮助你与中国的医疗专家进行会诊。": "We can help you consult with medical experts in China.",
        "治疗与陪护": "Treatment and accompaniment",
        "你可以获得专业治疗、全程陪护和后续提醒。": "You can receive treatment coordination, full-process accompaniment, and follow-up reminders.",
        "进入 App": "Enter App",
        "中国对外免签国家列表": "China visa-free country list",
        "查看可免签来华的国家与当前选择": "View visa-free countries and your current choice",
        "免签时间内我可以做那些治疗": "Treatments available during visa-free stay",
        "按停留周期查看可推进的治疗项目": "View feasible treatments by stay duration",
        "中国的一些医院/医师介绍": "Hospitals and doctors in China",
        "查看医院图片、介绍与服务项目": "View hospital images, introductions, and services",
        "增值服务": "Value-added services",
        "地勤接机、全程陪诊、翻译陪同": "Airport pickup, full accompaniment, translation",
        "商业保险/报销": "Commercial insurance / reimbursement",
        "查看商业保险报销与材料说明": "View insurance reimbursement and document requirements",
        "SOS急救": "SOS Emergency",
        "查看附近急救资源。": "View nearby emergency resources.",
        "查看附近 SOS": "View nearby SOS",
        "快速就诊": "Quick visit",
        "按项目选择医院和时间": "Choose hospital and time by service",
        "在线客服": "Online support",
        "人工协助预约与材料准备": "Manual help with appointment and documents",
        "诊疗项目参照表": "Medical service reference",
        "全部项目": "All services",
        "健康检查": "Health check",
        "种植牙": "Dental implant",
        "肠胃镜": "Gastroscopy / colonoscopy",
        "附近医院列表": "Nearby hospitals",
        "全部": "All",
        "选择医疗项目": "Choose medical service",
        "健康检查": "Health check",
        "全身体检": "Full body checkup",
        "影像检查": "Imaging check",
        "报告解读": "Report interpretation",
        "口腔与消化": "Dental and digestive",
        "口腔检查": "Dental check",
        "肠胃镜咨询": "Endoscopy consultation",
        "专科手术咨询": "Specialist surgery consultation",
        "胆囊手术": "Gallbladder surgery",
        "前列腺手术": "Prostate surgery",
        "心脏搭桥": "Heart bypass",
        "选择医院": "Choose hospital",
        "从附近医院中选择承接机构，也可以先查看医院详情和服务项目。": "Choose a provider nearby, or view hospital details and services first.",
        "已选医疗项目": "Selected medical service",
        "更改": "Change",
        "点击选择医院并进入下一步": "Tap to choose this hospital and continue",
        "选择日期时间": "Choose date and time",
        "先选择可预约日期，再选择到院时间，最终以医院确认为准。": "Choose an available date first, then a visit time. Final confirmation depends on the hospital.",
        "选择日期": "Choose date",
        "选择时间": "Choose time",
        "可预约": "Available",
        "需确认": "Needs confirmation",
        "不可约": "Unavailable",
        "预约确认": "Appointment confirmation",
        "提交前先确认资料是否完善，再支付预约服务费。": "Confirm your information before paying the appointment service fee.",
        "个人信息是否完善？": "Is your personal information complete?",
        "请确认姓名、护照号、联系方式和基础病历资料已补齐。": "Please confirm your name, passport number, contact details, and basic medical records are complete.",
        "上传姓名和护照号": "Upload name and passport number",
        "预约摘要": "Appointment summary",
        "医疗项目": "Medical service",
        "预约医院": "Hospital",
        "预约时间": "Appointment time",
        "确认资料并支付预约服务费": "Confirm information and pay appointment service fee",
        "当前为移动端 App 原型网页预览。": "This is a mobile app prototype web preview.",
        "医疗项目对比": "Medical service comparison",
        "按费用、周期、内容和资料要求对比常见医疗项目。": "Compare common medical services by fee, timeline, content, and document requirements.",
        "项目参考": "Service reference",
        "点击看明细": "Tap for details",
        "明细": "Details",
        "预估价格": "Estimated price",
        "详情": "Details",
        "预约该项目": "Book this service",
        "返回对比": "Back to comparison",
        "费用和周期为原型参考信息，最终以医院确认、医生评估和服务协议为准。": "Fees and timelines are prototype references. Final results depend on hospital confirmation, doctor review, and service terms.",
        "医院列表": "Hospital list",
        "医院详情": "Hospital details",
        "医院/医师介绍": "Hospitals / doctors",
        "服务项目": "Services",
        "立即预约": "Book now",
        "个人资料与医疗资产中心。": "Personal profile and medical asset center.",
        "护照": "Passport",
        "健康档案": "Health archive",
        "定制方案": "Custom plan",
        "绑定护照": "Bind passport",
        "护照正反面": "Passport front and back",
        "医疗记录": "Medical records",
        "病例和化验报告": "Cases and lab reports",
        "我的定制方案": "My custom plan",
        "预约定制医疗": "Book custom care",
        "资料完整度": "Profile completeness",
        "补充资料": "Add documents",
        "过往医疗记录": "Past medical records",
        "上传病例": "Upload cases",
        "过敏史": "Allergy history",
        "用药史": "Medication history",
        "疫苗": "Vaccines",
        "院方回传医疗记录": "Hospital-returned medical records",
        "门诊病例": "Outpatient notes",
        "化验报告": "Lab reports",
        "用药记录": "Medication records",
        "详细病例": "Detailed case",
        "院方回传内容": "Hospital-returned content",
        "后续处理": "Next steps",
        "当前没有已完成的定制方案": "No completed custom plan yet",
        "已有定制方案草稿": "Custom plan draft exists",
        "方案 A 草稿": "Plan A draft",
        "方案详情": "Plan details",
        "先写你的就医需求": "Describe your medical needs first",
        "草稿会自动保存": "Draft auto-saves",
        "根据描述更新推荐选项": "Update recommendations from description",
        "通用医学方向": "General medical direction",
        "先做宽口径分诊，不把入口限制在体检、胃或牙齿。": "Start with broad triage, not limited to checkups, stomach, or dental care.",
        "内科综合 / 不确定科室": "General internal medicine / unsure department",
        "适合先由顾问按症状分诊": "Good for consultant-led symptom triage",
        "检查报告 / 影像资料解读": "Report / imaging interpretation",
        "适合已有体检、化验、CT、MRI 或超声资料": "Good for existing checkup, lab, CT, MRI, or ultrasound materials",
        "疼痛、骨科或康复问题": "Pain, orthopedics, or rehab issues",
        "适合关节、颈肩腰腿、骨折术后或运动损伤": "For joints, neck/shoulder/back/leg pain, post-fracture, or sports injury",
        "妇科、泌尿或生殖相关": "Gynecology, urology, or reproductive health",
        "适合妇科检查、泌尿不适、前列腺或孕前筛查": "For gynecology checks, urinary discomfort, prostate, or pre-pregnancy screening",
        "皮肤、过敏或慢病管理": "Skin, allergy, or chronic care",
        "适合皮疹、湿疹、过敏、长期用药或复诊": "For rash, eczema, allergy, long-term medication, or follow-up",
        "肿瘤、术后或专家二诊": "Tumor, post-op, or expert second opinion",
        "适合复杂病例、病理影像资料和治疗方案复核": "For complex cases, pathology/imaging records, and treatment-plan review",
        "就诊目标": "Visit goal",
        "明确你希望我们优先解决的问题。": "Clarify what you want us to prioritize.",
        "短期来华完成初步评估": "Short China visit for initial evaluation",
        "预约检查并整理报告": "Book checks and organize reports",
        "匹配专家会诊路径": "Match expert consultation path",
        "症状与计划时间": "Symptoms and planned timing",
        "用于判断是普通预约、优先处理还是资料预审。": "Used to decide standard booking, priority handling, or document pre-review.",
        "现有医疗资料": "Existing medical documents",
        "资料越完整，越容易做出可执行的预约方案。": "More complete documents make the appointment plan more actionable.",
        "预算与周期": "Budget and timeline",
        "用于初步筛选医院和预约方案，最终费用以医院确认为准。": "Used to preliminarily filter hospitals and plans. Final fees depend on the hospital.",
        "推荐医院": "Recommended hospitals",
        "根据上方医学方向和草稿内容动态调整医院科室，顾问会再复核承接能力。": "Hospital departments update based on the selected direction and draft. A consultant will review capacity again.",
        "顾问与医师": "Consultant and doctor",
        "选择期望的协作方式。": "Choose your preferred collaboration mode.",
        "当前方案草稿": "Current plan draft",
        "自我描述": "Self description",
        "预约专属医疗定制服务费": "Custom medical coordination service fee",
        "包含需求整理、资料预审、医院/医师匹配和预约协调。": "Includes requirement整理, document pre-review, hospital/doctor matching, and appointment coordination.",
        "AI 医疗助手": "AI Medical Assistant",
        "AI 可以帮你整理症状和就医路径，不能替代医生诊断。": "AI can help organize symptoms and care paths, but cannot replace a doctor diagnosis.",
        "已选择：": "Selected: ",
        "已切换为：": "Language switched to: ",
        "语言已切换为：": "Language switched to: ",
        "已根据草稿更新推荐选择点": "Recommendations updated from your draft",
        "消息已发送": "Message sent",
        "操作已收到": "Action received",
        "今日": "Today",
        "明日": "Tomorrow",
        "莱佛士片区": "Raffles area",
        "莱佛士": "Raffles",
        "江北嘴": "Jiangbeizui",
        "解放碑": "Jiefangbei",
        "南滨路": "Nanbin Road",
        "重庆莱佛士医院": "Chongqing Raffles Hospital",
        "江北国际医疗中心": "Jiangbei International Medical Center",
        "渝中健康管理中心": "Yuzhong Health Management Center",
        "南岸口腔消化门诊": "Nan'an Dental and Digestive Clinic",
        "健康管理中心": "Health Management Center",
        "国际门诊": "International Clinic",
        "综合门诊": "General Clinic",
        "消化科": "Gastroenterology",
        "消化内科": "Gastroenterology",
        "口腔科": "Dental Department",
        "口腔种植科": "Dental Implant Department",
        "心内科": "Cardiology",
        "心血管门诊": "Cardiovascular Clinic",
        "呼吸内科": "Respiratory Medicine",
        "骨科": "Orthopedics",
        "康复医学科": "Rehabilitation Medicine",
        "影像检查中心": "Imaging Center",
        "皮肤科": "Dermatology",
        "皮肤与过敏门诊": "Dermatology and Allergy Clinic",
        "妇科或泌尿科": "Gynecology or Urology",
        "多学科会诊门诊": "Multidisciplinary Consultation Clinic",
        "专家会诊协调": "Expert Consultation Coordination",
        "影像与报告复核": "Imaging and Report Review",
        "国际体检门诊": "International Checkup Clinic",
        "国际全科门诊": "International General Practice",
        "体检": "Checkup",
        "牙科护理": "Dental care",
        "国际陪诊": "International accompaniment",
        "查看详情": "View details",
        "项目": "service",
        "医生": "Doctor",
        "顾问": "Consultant"
      },
      "العربية": {
        "星火医疗": "سبارك ميديكال",
        "首页": "الرئيسية",
        "AI助手": "مساعد الذكاء",
        "个人中心": "الملف الشخصي",
        "个人设置": "الإعدادات الشخصية",
        "设置": "الإعدادات",
        "返回": "رجوع",
        "退出登录": "تسجيل الخروج",
        "账号": "الحساب",
        "账号信息": "معلومات الحساب",
        "邮箱信息": "معلومات البريد",
        "姓名、护照号与联系方式": "الاسم ورقم الجواز وبيانات التواصل",
        "用于接收预约提醒与资料回传通知": "لاستلام تذكيرات المواعيد وإشعارات السجلات",
        "隐私政策": "سياسة الخصوصية",
        "服务协议": "اتفاقية الخدمة",
        "预约协调、资料预审和隐私保护说明": "تنسيق المواعيد ومراجعة الملفات والخصوصية",
        "多语言设置": "إعدادات اللغة",
        "当前语言": "اللغة الحالية",
        "切换后会立即更新 App 当前语言。": "سيتم تحديث لغة التطبيق فور التغيير.",
        "选择语言": "اختر اللغة",
        "中文": "الصينية",
        "简体中文界面": "واجهة صينية مبسطة",
        "English": "الإنجليزية",
        "International service interface": "واجهة خدمة دولية",
        "العربية": "العربية",
        "واجهة عربية للخدمة": "واجهة عربية للخدمة",
        "已选择": "محدد",
        "选择": "اختيار",
        "取消": "إلغاء",
        "地域设置": "إعدادات المنطقة",
        "境内/境外": "داخل الصين / خارجها",
        "手动选择": "اختيار يدوي",
        "当前城市": "المدينة الحالية",
        "中国": "الصين",
        "法国": "فرنسا",
        "德国": "ألمانيا",
        "意大利": "إيطاليا",
        "日本": "اليابان",
        "韩国": "كوريا الجنوبية",
        "重庆": "تشونغتشينغ",
        "上海": "شنغهاي",
        "邮箱用于接收预约确认、资料补充提醒、医院回传记录通知和预约服务费凭证。": "يستخدم البريد لتأكيد المواعيد وتذكير الملفات وإشعارات المستشفى وإيصالات رسوم الخدمة.",
        "已绑定": "مرتبط",
        "通知用途": "استخدام الإشعارات",
        "预约提醒": "تذكيرات المواعيد",
        "资料回传": "إشعارات السجلات",
        "支付凭证": "إيصالات الدفع",
        "安全设置": "إعدادات الأمان",
        "邮箱验证": "تحقق البريد",
        "已通过验证码验证": "تم التحقق بالرمز",
        "敏感资料": "بيانات حساسة",
        "重新验证邮箱": "إعادة تحقق البريد",
        "跨境医疗预约协调服务说明": "شروط تنسيق المواعيد الطبية عبر الحدود",
        "服务范围": "نطاق الخدمة",
        "预约协调": "تنسيق المواعيد",
        "资料预审": "مراجعة الملفات",
        "陪同协助": "مساعدة المرافقة",
        "费用与确认": "الرسوم والتأكيد",
        "预约服务费": "رسوم خدمة الموعد",
        "医疗费用": "الرسوم الطبية",
        "方案变更": "تغييرات الخطة",
        "隐私与医疗声明": "الخصوصية والتنبيه الطبي",
        "隐私保护": "حماية الخصوصية",
        "医疗声明": "تنبيه طبي",
        "紧急情况": "حالات الطوارئ",
        "欢迎使用星火医疗": "مرحباً بك في سبارك ميديكال",
        "请选择你希望使用的语言。": "اختر اللغة التي تفضلها.",
        "语言设置": "إعدادات اللغة",
        "下一步": "التالي",
        "上一步": "السابق",
        "你当前希望使用哪类服务？": "ما نوع الخدمة التي تريد استخدامها؟",
        "境内医疗服务": "خدمات طبية داخل الصين",
        "境外来华医疗服务": "خدمات القدوم إلى الصين للعلاج",
        "你现在所在的位置。": "موقعك الحالي.",
        "国家/地区": "الدولة / المنطقة",
        "定位授权": "إذن الموقع",
        "手动选择城市": "اختيار مدينة يدوياً",
        "服务介绍": "تعريف الخدمة",
        "进入 App": "دخول التطبيق",
        "中国对外免签国家列表": "قائمة الدول المعفاة من التأشيرة للصين",
        "免签时间内我可以做那些治疗": "العلاجات الممكنة خلال الإقامة بدون تأشيرة",
        "中国的一些医院/医师介绍": "مستشفيات وأطباء في الصين",
        "增值服务": "خدمات إضافية",
        "商业保险/报销": "تأمين / تعويض",
        "SOS急救": "طوارئ SOS",
        "快速就诊": "زيارة سريعة",
        "在线客服": "دعم مباشر",
        "诊疗项目参照表": "مرجع الخدمات الطبية",
        "全部项目": "كل الخدمات",
        "健康检查": "فحص صحي",
        "种植牙": "زراعة الأسنان",
        "肠胃镜": "منظار المعدة/القولون",
        "附近医院列表": "المستشفيات القريبة",
        "全部": "الكل",
        "选择医疗项目": "اختر الخدمة الطبية",
        "全身体检": "فحص شامل",
        "影像检查": "فحص تصوير",
        "报告解读": "شرح التقرير",
        "口腔与消化": "الأسنان والجهاز الهضمي",
        "口腔检查": "فحص الأسنان",
        "肠胃镜咨询": "استشارة المنظار",
        "专科手术咨询": "استشارة جراحة تخصصية",
        "胆囊手术": "جراحة المرارة",
        "前列腺手术": "جراحة البروستاتا",
        "心脏搭桥": "مجازة قلبية",
        "选择医院": "اختر المستشفى",
        "已选医疗项目": "الخدمة المختارة",
        "更改": "تغيير",
        "选择日期时间": "اختر التاريخ والوقت",
        "选择日期": "اختر التاريخ",
        "选择时间": "اختر الوقت",
        "可预约": "متاح",
        "需确认": "يتطلب تأكيداً",
        "不可约": "غير متاح",
        "预约确认": "تأكيد الموعد",
        "个人信息是否完善？": "هل معلوماتك الشخصية مكتملة؟",
        "上传姓名和护照号": "رفع الاسم ورقم الجواز",
        "预约摘要": "ملخص الموعد",
        "医疗项目": "الخدمة الطبية",
        "预约医院": "المستشفى",
        "预约时间": "وقت الموعد",
        "确认资料并支付预约服务费": "تأكيد المعلومات ودفع رسوم خدمة الموعد",
        "医疗项目对比": "مقارنة الخدمات الطبية",
        "项目参考": "مرجع الخدمة",
        "点击看明细": "اضغط للتفاصيل",
        "明细": "تفاصيل",
        "预估价格": "السعر التقديري",
        "详情": "تفاصيل",
        "预约该项目": "حجز هذه الخدمة",
        "返回对比": "عودة للمقارنة",
        "医院列表": "قائمة المستشفيات",
        "医院详情": "تفاصيل المستشفى",
        "服务项目": "الخدمات",
        "立即预约": "احجز الآن",
        "护照": "جواز السفر",
        "健康档案": "الملف الصحي",
        "定制方案": "خطة مخصصة",
        "绑定护照": "ربط الجواز",
        "医疗记录": "السجلات الطبية",
        "我的定制方案": "خطتي المخصصة",
        "预约定制医疗": "حجز رعاية مخصصة",
        "资料完整度": "اكتمال الملفات",
        "补充资料": "إضافة ملفات",
        "过往医疗记录": "سجلات طبية سابقة",
        "上传病例": "رفع حالة",
        "过敏史": "تاريخ الحساسية",
        "用药史": "تاريخ الأدوية",
        "疫苗": "اللقاحات",
        "院方回传医疗记录": "سجلات مرسلة من المستشفى",
        "门诊病例": "ملاحظات العيادة",
        "化验报告": "تقارير المختبر",
        "用药记录": "سجلات الأدوية",
        "详细病例": "تفاصيل الحالة",
        "院方回传内容": "محتوى المستشفى",
        "后续处理": "الخطوات التالية",
        "当前没有已完成的定制方案": "لا توجد خطة مكتملة حالياً",
        "已有定制方案草稿": "توجد مسودة خطة",
        "方案 A 草稿": "مسودة الخطة A",
        "方案详情": "تفاصيل الخطة",
        "先写你的就医需求": "اكتب احتياجك الطبي أولاً",
        "草稿会自动保存": "يتم حفظ المسودة تلقائياً",
        "根据描述更新推荐选项": "تحديث التوصيات حسب الوصف",
        "通用医学方向": "اتجاه طبي عام",
        "就诊目标": "هدف الزيارة",
        "症状与计划时间": "الأعراض والوقت المخطط",
        "现有医疗资料": "الملفات الطبية الحالية",
        "预算与周期": "الميزانية والمدة",
        "推荐医院": "مستشفيات موصى بها",
        "顾问与医师": "المستشار والطبيب",
        "当前方案草稿": "مسودة الخطة الحالية",
        "自我描述": "الوصف الشخصي",
        "AI 医疗助手": "مساعد طبي ذكي",
        "已选择：": "تم الاختيار: ",
        "语言已切换为：": "تم تغيير اللغة إلى: ",
        "今日": "اليوم",
        "明日": "غداً",
        "重庆莱佛士医院": "مستشفى رافلز تشونغتشينغ",
        "江北国际医疗中心": "مركز جيانغبي الطبي الدولي",
        "渝中健康管理中心": "مركز يوتشونغ لإدارة الصحة",
        "南岸口腔消化门诊": "عيادة نانآن للأسنان والهضم",
        "健康管理中心": "مركز إدارة الصحة",
        "国际门诊": "عيادة دولية",
        "综合门诊": "عيادة عامة",
        "消化科": "الجهاز الهضمي",
        "口腔科": "قسم الأسنان",
        "心内科": "القلب",
        "呼吸内科": "الصدرية",
        "骨科": "العظام",
        "康复医学科": "طب التأهيل",
        "皮肤科": "الجلدية",
        "体检": "فحص",
        "查看详情": "عرض التفاصيل"
      }
    };

    function currentI18nDictionary() {
      return i18nDictionaries[state.language] || null;
    }

    function translateTextValue(text, language = state.language) {
      const dictionary = i18nDictionaries[language];
      if (!dictionary || !text || !/[\u4e00-\u9fff]/.test(text)) return text;
      const leading = text.match(/^\s*/)?.[0] || "";
      const trailing = text.match(/\s*$/)?.[0] || "";
      const core = text.trim();
      if (!core) return text;
      if (dictionary[core]) return `${leading}${dictionary[core]}${trailing}`;
      let translated = core;
      Object.entries(dictionary)
        .filter(([source]) => source && translated.includes(source))
        .sort((a, b) => b[0].length - a[0].length)
        .forEach(([source, target]) => {
          translated = translated.split(source).join(target);
        });
      if (language === "English") {
        translated = translated
          .replace(/第\s*([0-9]+)\s*\/\s*([0-9]+)\s*步/g, "Step $1 / $2")
          .replace(/([0-9]+)月([0-9]+)日/g, "$1/$2")
          .replace(/([0-9]+)\s*条记录/g, "$1 records")
          .replace(/已选\s*([0-9]+)\s*项/g, "$1 selected")
          .replace(/起/g, "and up");
      }
      if (language === "العربية") {
        translated = translated
          .replace(/第\s*([0-9]+)\s*\/\s*([0-9]+)\s*步/g, "الخطوة $1 / $2")
          .replace(/([0-9]+)月([0-9]+)日/g, "$2/$1")
          .replace(/([0-9]+)\s*条记录/g, "$1 سجلات")
          .replace(/已选\s*([0-9]+)\s*项/g, "$1 محدد");
      }
      return `${leading}${translated}${trailing}`;
    }

    function shouldSkipI18nNode(node) {
      const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
      if (!element) return true;
      return Boolean(element.closest("script, style, textarea, input, [contenteditable='true']"));
    }

    function applyLanguageToTextNodes(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if (shouldSkipI18nNode(node)) return;
        if (!i18nTextSources.has(node)) i18nTextSources.set(node, node.nodeValue);
        const source = i18nTextSources.get(node);
        node.nodeValue = state.language === "中文" ? source : translateTextValue(source);
      });
    }

    function applyLanguageToAttributes(root) {
      root.querySelectorAll("[placeholder], [aria-label], [title]").forEach(element => {
        ["placeholder", "aria-label", "title"].forEach(attr => {
          if (!element.hasAttribute(attr)) return;
          const dataKey = `i18n${attr.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase())}`;
          if (!element.dataset[dataKey]) element.dataset[dataKey] = element.getAttribute(attr);
          const source = element.dataset[dataKey];
          element.setAttribute(attr, state.language === "中文" ? source : translateTextValue(source));
        });
      });
    }

    function applyCurrentLanguage() {
      const app = document.querySelector(".app");
      if (!app) return;
      applyLanguageToTextNodes(app);
      applyLanguageToAttributes(app);
      document.documentElement.lang = state.language === "中文" ? "zh-CN" : (state.language === "العربية" ? "ar" : "en");
      document.documentElement.dir = state.language === "العربية" ? "rtl" : "ltr";
      document.title = state.language === "中文" ? "星火医疗" : translateTextValue("星火医疗");
    }

    function persistState() {
      try {
        const snapshot = {
          ...state,
          history: []
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
      } catch (error) {
      }
    }

    function resetStoredState() {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
      }
      Object.assign(state, defaultState, { history: [] });
      render();
    }

    function tabForRoute(route) {
      if (route === "ai") return "ai";
      if (["profile", "settings", "accountInfo", "emailInfo", "serviceAgreement", "passportBind", "healthArchive", "medicalRecords", "medicalRecordGroup", "medicalRecordDetail", "customPlan", "customPlanDetail", "customPlanFlow"].includes(route)) return "profile";
      return "home";
    }

    function hospitalRealCount(strip) {
      return Number(strip.dataset.carouselCount || strip.querySelectorAll(".nearby-hospital:not([data-carousel-clone])").length || 0);
    }

    function hospitalTrack(strip) {
      return strip.querySelector(".hospital-track");
    }

    function hospitalWidth(strip) {
      return strip.clientWidth || strip.getBoundingClientRect().width || 1;
    }

    function hospitalPosition(strip) {
      const count = hospitalRealCount(strip);
      const value = Number(strip.dataset.carouselPosition);
      if (Number.isFinite(value)) return value;
      return count > 0 ? 1 : 0;
    }

    function realIndexForHospitalPosition(strip, position) {
      const count = hospitalRealCount(strip);
      if (!count) return 0;
      if (position <= 0) return count - 1;
      if (position >= count + 1) return 0;
      return Math.max(0, Math.min(count - 1, position - 1));
    }

    function clampHospitalPosition(strip, position) {
      const count = hospitalRealCount(strip);
      return Math.max(0, Math.min(count + 1, position));
    }

    function updateHospitalDots(strip, index = Number(strip.dataset.carouselIndex || 0)) {
      const dots = strip.closest(".nearby-hospitals")?.querySelectorAll("[data-hospital-dot]") || [];
      dots.forEach(dot => {
        const active = Number(dot.dataset.hospitalDot) === index;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
    }

    function setHospitalTrackX(strip, x) {
      const track = hospitalTrack(strip);
      if (!track) return;
      track.style.transform = `translate3d(${x}px, 0, 0)`;
    }

    function applyHospitalPosition(strip, position = hospitalPosition(strip), offset = 0) {
      const width = hospitalWidth(strip);
      const safePosition = clampHospitalPosition(strip, position);
      const index = realIndexForHospitalPosition(strip, safePosition);
      strip.dataset.carouselPosition = String(safePosition);
      strip.dataset.carouselIndex = String(index);
      setHospitalTrackX(strip, -safePosition * width + offset);
      updateHospitalDots(strip, index);
    }

    function cancelHospitalAnimation(strip) {
      if (strip.hospitalAnimationFrame) {
        cancelAnimationFrame(strip.hospitalAnimationFrame);
        strip.hospitalAnimationFrame = null;
      }
      if (strip.hospitalAnimationTimer) {
        clearTimeout(strip.hospitalAnimationTimer);
        strip.hospitalAnimationTimer = null;
      }
      const track = hospitalTrack(strip);
      if (track) track.style.transition = "";
      strip.dataset.carouselAnimationId = "";
      strip.classList.remove("settling");
      strip.dataset.carouselAnimating = "0";
    }

    function normalizeHospitalLoop(strip) {
      const count = hospitalRealCount(strip);
      if (!count) return;
      const position = hospitalPosition(strip);
      if (position <= 0) {
        applyHospitalPosition(strip, count);
      } else if (position >= count + 1) {
        applyHospitalPosition(strip, 1);
      }
    }

    function animateHospitalToPosition(strip, targetPosition, options = {}) {
      const duration = options.duration || 340;
      const width = hospitalWidth(strip);
      const fromPosition = typeof options.fromPosition === "number" ? options.fromPosition : hospitalPosition(strip);
      const fromOffset = typeof options.fromOffset === "number" ? options.fromOffset : 0;
      const safeTarget = clampHospitalPosition(strip, targetPosition);
      const start = -fromPosition * width + fromOffset;
      const end = -safeTarget * width;
      const track = hospitalTrack(strip);
      if (!track) return;
      cancelHospitalAnimation(strip);
      strip.classList.add("settling");
      strip.dataset.carouselAnimating = "1";
      const animationId = String(Date.now() + Math.random());
      strip.dataset.carouselAnimationId = animationId;
      setHospitalTrackX(strip, start);
      const distance = end - start;
      const finish = () => {
        if (strip.dataset.carouselAnimationId !== animationId) return;
        clearTimeout(strip.hospitalAnimationTimer);
        strip.hospitalAnimationTimer = null;
        track.removeEventListener("transitionend", finish);
        track.style.transition = "";
        strip.dataset.carouselAnimating = "0";
        strip.dataset.carouselAnimationId = "";
        strip.classList.remove("settling");
        applyHospitalPosition(strip, safeTarget);
        normalizeHospitalLoop(strip);
      };
      if (Math.abs(distance) < 1) {
        finish();
        return;
      }
      updateHospitalDots(strip, realIndexForHospitalPosition(strip, safeTarget));
      track.getBoundingClientRect();
      track.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      track.addEventListener("transitionend", finish);
      setHospitalTrackX(strip, end);
      strip.hospitalAnimationTimer = setTimeout(finish, duration + 120);
    }

    function scrollHospitalTo(strip, index, behavior = "smooth") {
      const count = hospitalRealCount(strip);
      if (!count) return;
      const normalizedIndex = ((Number(index) % count) + count) % count;
      const currentPosition = hospitalPosition(strip);
      let targetPosition = normalizedIndex + 1;
      if (behavior !== "auto" && count > 1) {
        const direct = targetPosition - currentPosition;
        const forwardLoop = targetPosition + count - currentPosition;
        const backwardLoop = targetPosition - count - currentPosition;
        const bestDelta = [direct, forwardLoop, backwardLoop].reduce((best, delta) => (
          Math.abs(delta) < Math.abs(best) ? delta : best
        ), direct);
        targetPosition = currentPosition + bestDelta;
      }
      if (behavior === "auto") {
        cancelHospitalAnimation(strip);
        applyHospitalPosition(strip, targetPosition);
        normalizeHospitalLoop(strip);
      } else {
        animateHospitalToPosition(strip, targetPosition, { duration: 340 });
      }
    }

    function setupHospitalCarousels() {
      document.querySelectorAll(".hospital-strip[data-carousel]").forEach(strip => {
        if (strip.dataset.carouselReady !== "1") {
          strip.dataset.carouselReady = "1";
          strip.dataset.carouselPosition = "1";
          strip.dataset.carouselIndex = "0";
        }
        applyHospitalPosition(strip, hospitalPosition(strip));
        normalizeHospitalLoop(strip);
      });
    }

    function render(options = {}) {
      const content = document.getElementById("content");
      if (!renderers[state.route]) state.route = "home";
      const preserveScroll = Boolean(options.preserveScroll);
      const previousScrollTop = content.scrollTop;
      const previousScrollLeft = content.scrollLeft;
      document.body.dataset.route = state.route;
      document.body.dataset.homeMode = state.homeMode;
      endHospitalDrag();
      endDragScroll();
      if (state.route === "quickPayment") {
        content.removeAttribute("data-drag-scroll");
      } else {
        content.setAttribute("data-drag-scroll", "");
      }
      content.innerHTML = (renderers[state.route] || home)();
      if (preserveScroll) {
        content.scrollTop = previousScrollTop;
        content.scrollLeft = previousScrollLeft;
      } else {
        content.scrollTop = 0;
      }
      setupHospitalCarousels();
      const activeTab = tabForRoute(state.route);
      document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.toggle("active", tab.dataset.route === activeTab);
      });
      document.querySelector(".bottom").classList.toggle("hidden", !state.onboardingCompleted && isOnboardingRoute(state.route));
      applyCurrentLanguage();
      persistState();
    }

    function performAction(action) {
      const [type, ...rest] = action.split(":");
      const value = rest.join(":");
      if (type === "country") {
        state.selectedCountry = value;
        render();
        toast(`已选择${value}：规划已更新`);
        return;
      }
      if (type === "treatment") {
        state.selectedVisaTreatment = value;
        state.service = value;
        go("treatmentDetail");
        return;
      }
      if (type === "scene") {
        toast(value === "domestic" ? "当前已是境内医疗模式" : "当前已是境外来华模式");
        return;
      }
      if (type === "category") {
        state.category = value;
        render();
        toast(`已选择科类：${value}`);
        return;
      }
      if (type === "service") {
        state.service = value;
        render();
        toast(`已选择项目：${value}`);
        return;
      }
      if (type === "compareProject") {
        state.selectedCompareProject = value;
        state.service = value;
        state.compareReturnRoute = "compare";
        go("compareQuotes");
        return;
      }
      if (type === "compareCategory") {
        const categoryDefaultProject = {
          "健康检查": "全身体检",
          "种植牙": "牙齿护理 / 种植牙",
          "肠胃镜": "消化科咨询"
        };
        state.selectedCompareProject = categoryDefaultProject[value] || "全身体检";
        state.service = state.selectedCompareProject;
        state.compareReturnRoute = "compare";
        go("compareQuotes");
        return;
      }
      if (type === "compareBack") {
        go(state.compareReturnRoute || "compare");
        return;
      }
      if (type === "compareQuote") {
        state.selectedCompareHospitalIndex = Math.max(0, Math.min(nearbyHospitals.length - 1, Number(value) || 0));
        state.selectedHospitalIndex = state.selectedCompareHospitalIndex;
        go("compareDetail");
        return;
      }
      if (type === "compareBook") {
        state.service = state.selectedCompareProject;
        state.selectedHospitalIndex = Math.max(0, Math.min(nearbyHospitals.length - 1, Number(state.selectedCompareHospitalIndex) || 0));
        go("quickTime");
        return;
      }
      if (type === "medicalRecordSelect") {
        state.selectedMedicalRecordId = value;
        if (!Array.isArray(state.viewedMedicalRecordIds)) state.viewedMedicalRecordIds = [];
        if (!state.viewedMedicalRecordIds.includes(value)) {
          state.viewedMedicalRecordIds.push(value);
        }
        go("medicalRecordDetail");
        return;
      }
      if (type === "medicalRecordGroup") {
        state.selectedMedicalRecordGroup = value;
        go("medicalRecordGroup");
        return;
      }
      if (type === "customSelect") {
        const [field, ...optionParts] = value.split("|");
        const optionValue = optionParts.join("|");
        if (!state.customSelections || typeof state.customSelections !== "object") {
          state.customSelections = {};
        }
        const customFocusFields = ["symptom", "clinicalFocus", "digestiveFocus", "dentalFocus", "cardioFocus", "respiratoryFocus", "orthoFocus", "skinFocus", "uroGynFocus", "complexFocus", "checkupFocus"];
        if (field === "primaryConcern") {
          customFocusFields.forEach(key => {
            state.customSelections[key] = "";
          });
          state.customSelections.hospital = "";
        }
        if (customFocusFields.includes(field)) {
          customFocusFields.forEach(key => {
            if (key !== field) state.customSelections[key] = "";
          });
          state.customSelections.hospital = "";
        }
        state.customSelections[field] = optionValue;
        if (["symptom", "primaryConcern", "clinicalFocus", "digestiveFocus", "dentalFocus", "cardioFocus", "respiratoryFocus", "orthoFocus", "skinFocus", "uroGynFocus", "complexFocus", "checkupFocus"].includes(field)) {
          state.customActiveMedicalField = field;
          state.customSelections.hospital = "";
          if (/牙|口腔|种植/.test(optionValue)) {
            state.service = "牙齿护理 / 种植牙";
          } else if (/胸|心|血压|心电|冠脉/.test(optionValue)) {
            state.service = "心血管专科咨询";
          } else if (/咳嗽|气短|呼吸|肺/.test(optionValue)) {
            state.service = "呼吸科咨询";
          } else if (/骨|关节|腰|颈|康复/.test(optionValue)) {
            state.service = "骨科与康复咨询";
          } else if (/皮肤|过敏|皮疹/.test(optionValue)) {
            state.service = "皮肤与过敏咨询";
          } else if (/妇科|泌尿|前列腺/.test(optionValue)) {
            state.service = "妇科/泌尿咨询";
          } else if (/术后|肿瘤|复诊/.test(optionValue)) {
            state.service = "专家会诊与复诊";
          } else if (/体检|报告|影像/.test(optionValue)) {
            state.service = optionValue.includes("影像") ? "影像检查" : "全身体检";
          } else {
            state.service = /胃|肠|腹|消化/.test(optionValue) ? "消化科咨询" : "综合医学咨询";
          }
        }
        if (field === "hospital") {
          const index = nearbyHospitals.findIndex(item => optionValue.includes(item.name));
          if (index >= 0) state.selectedHospitalIndex = index;
        }
        render({ preserveScroll: true });
        toast(`已选择：${optionValue}`);
        return;
      }
      if (type === "customRefreshSuggestions") {
        render({ preserveScroll: true });
        toast("已根据草稿更新推荐选择点");
        return;
      }
      if (type === "quickService") {
        state.service = value;
        go("quickHospital");
        toast(`已选择项目：${value}`);
        return;
      }
      if (type === "hospitalSelect") {
        const index = Math.max(0, Math.min(nearbyHospitals.length - 1, Number(value) || 0));
        state.selectedHospitalIndex = index;
        go("hospital");
        return;
      }
      if (type === "quickHospitalSelect") {
        const index = Math.max(0, Math.min(nearbyHospitals.length - 1, Number(value) || 0));
        state.selectedHospitalIndex = index;
        go("quickTime");
        toast(`已选择医院：${getSelectedHospital().name}`);
        return;
      }
      if (type === "hospitalService") {
        state.service = value;
        go("quick");
        toast(`已选择${getSelectedHospital().name}：${value}`);
        return;
      }
      if (type === "date") {
        state.date = value;
        render();
        toast(`已选择日期：${value}`);
        return;
      }
      if (type === "time") {
        state.time = value;
        render();
        toast(`已选择时间：${value}`);
        return;
      }
      if (type === "quickTimeSelect") {
        state.time = value;
        go("quickProfile");
        toast(`已选择时间：${value}`);
        return;
      }
      if (type === "vip") {
        state.vip = !state.vip;
        render();
        toast(state.vip ? "已加入 VIP 陪同服务" : "已取消 VIP 陪同服务");
        return;
      }
      if (type === "language") {
        state.language = value;
        state.languagePickerOpen = false;
        if (value === "中文") {
          state.selectedCountry = "中国";
          state.city = "重庆";
          state.locationMode = "current";
        }
        render();
        toast(`语言已切换为：${value}`);
        return;
      }
      if (type === "languagePicker") {
        state.languagePickerOpen = value === "open";
        render({ preserveScroll: true });
        return;
      }
      if (type === "onboardingScene") {
        state.homeMode = value;
        render();
        toast(value === "domestic" ? "已选择：境内医疗服务" : "已选择：境外来华医疗服务");
        return;
      }
      if (type === "finishOnboarding") {
        state.onboardingCompleted = true;
        go(state.homeMode === "domestic" ? "domestic" : "home");
        toast("已完成初次设置");
        return;
      }
      if (type === "location") {
        state.city = value === "手动选择" ? state.city : value;
        if (value !== "手动选择") {
          state.locationMode = value === "重庆" ? "current" : "manual";
        }
        render();
        toast(value === "重庆" ? `已选择重庆：匹配${hospital.name}` : "当前城市暂无医院，建议联系客服承接");
        return;
      }
      if (type === "serviceQuestion") {
        state.service = value.includes("体检") ? "全身体检" : state.service;
        render();
        toast(`已整理咨询：${value}`);
        return;
      }
      if (type === "generatePlan") {
        state.planGenerated = true;
        render();
        toast("已生成方案草稿");
        return;
      }
      if (type === "upload") {
        toast(`已打开${value}上传入口：真实版本会调用文件选择器`);
        return;
      }
      if (type === "callEmergency") {
        toast("已确认拨号：真实版本会调用系统拨号并通知客服");
        return;
      }
      if (type === "startNavigation") {
        toast(`已启动导航占位：目的地为${hospital.name}`);
        return;
      }
      if (type === "refreshLocation") {
        toast(`位置已刷新：当前推荐${hospital.name}`);
        return;
      }
      if (type === "support") {
        toast(`已选择增值服务：${value}`);
        return;
      }
      if (type === "asset") {
        clearToast();
        return;
      }
      if (type === "submitAppointment") {
        toast("预约信息已记录，等待客服确认");
        return;
      }
      if (type === "sendMessage") {
        toast("消息已发送");
        return;
      }
      if (type === "refreshPlan") {
        toast(`已按${state.selectedCountry}更新免签医疗规划`);
        return;
      }
      if (type === "hospitalPreview") {
        const index = nearbyHospitals.findIndex(item => item.name === value);
        if (index >= 0) state.selectedHospitalIndex = index;
        go("hospital");
        return;
      }
      if (type === "resetPrototype") {
        resetStoredState();
        toast("已清除本地体验数据，将从初次进入 App 开始");
        return;
      }
      toast(value ? `已选择：${value}` : "操作已收到");
    }

    const hospitalDrag = {
      strip: null,
      startX: 0,
      lastX: 0,
      pointerId: null,
      startPosition: 1,
      currentOffset: 0,
      moved: false,
      suppressClickUntil: 0
    };

    function targetHospitalPositionFromDrag(strip, deltaX) {
      const threshold = Math.max(72, hospitalWidth(strip) * 0.22);
      let targetPosition = hospitalDrag.startPosition;
      if (deltaX <= -threshold) targetPosition += 1;
      if (deltaX >= threshold) targetPosition -= 1;
      return clampHospitalPosition(strip, targetPosition);
    }

    function endHospitalDrag() {
      if (!hospitalDrag.strip) return;
      const strip = hospitalDrag.strip;
      if (hospitalDrag.moved) {
        const releaseOffset = hospitalDrag.currentOffset;
        const targetPosition = targetHospitalPositionFromDrag(strip, releaseOffset);
        hospitalDrag.suppressClickUntil = Date.now() + 250;
        animateHospitalToPosition(strip, targetPosition, {
          duration: 340,
          fromPosition: hospitalDrag.startPosition,
          fromOffset: releaseOffset
        });
      } else {
        applyHospitalPosition(strip, hospitalDrag.startPosition);
      }
      const pointerId = hospitalDrag.pointerId;
      strip.classList.remove("dragging");
      hospitalDrag.strip = null;
      hospitalDrag.pointerId = null;
      hospitalDrag.moved = false;
      hospitalDrag.currentOffset = 0;
      if (pointerId !== null && strip.releasePointerCapture) {
        try {
          strip.releasePointerCapture(pointerId);
        } catch (error) {
        }
      }
    }

    function handleHospitalPointerDown(event) {
      const strip = event.target.closest(".hospital-strip[data-carousel]");
      if (!strip || event.button > 0) return;
      normalizeHospitalLoop(strip);
      cancelHospitalAnimation(strip);
      hospitalDrag.strip = strip;
      hospitalDrag.startX = event.clientX;
      hospitalDrag.lastX = event.clientX;
      hospitalDrag.pointerId = typeof event.pointerId === "number" ? event.pointerId : null;
      hospitalDrag.startPosition = hospitalPosition(strip);
      hospitalDrag.currentOffset = 0;
      hospitalDrag.moved = false;
      if (hospitalDrag.pointerId !== null && strip.setPointerCapture) {
        try {
          strip.setPointerCapture(hospitalDrag.pointerId);
        } catch (error) {
        }
      }
      strip.classList.add("dragging");
    }

    function handleHospitalPointerMove(event) {
      if (!hospitalDrag.strip) return;
      const deltaX = event.clientX - hospitalDrag.startX;
      hospitalDrag.lastX = event.clientX;
      if (Math.abs(deltaX) > 4) hospitalDrag.moved = true;
      if (!hospitalDrag.moved) return;
      hospitalDrag.currentOffset = deltaX;
      applyHospitalPosition(hospitalDrag.strip, hospitalDrag.startPosition, deltaX);
      event.preventDefault();
    }

    const dragScroll = {
      node: null,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
      pointerId: null,
      moved: false,
      suppressClickUntil: 0,
      tapAction: "",
      tapRoute: "",
      tapBack: false,
      tapDomestic: false
    };

    function canDragScroll(node) {
      if (!node) return false;
      return node.scrollHeight > node.clientHeight + 1 || node.scrollWidth > node.clientWidth + 1;
    }

    function dragScrollNodeFromEvent(event) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target || target.closest(".hospital-strip[data-carousel]")) return null;
      const explicit = target.closest("[data-drag-scroll]");
      const content = target.closest("#content");
      if (explicit && canDragScroll(explicit)) return explicit;
      if (content && content.hasAttribute("data-drag-scroll") && canDragScroll(content)) return content;
      return null;
    }

    function endDragScroll() {
      if (!dragScroll.node) return;
      const node = dragScroll.node;
      const pointerId = dragScroll.pointerId;
      const tapAction = dragScroll.tapAction;
      const tapRoute = dragScroll.tapRoute;
      const tapBack = dragScroll.tapBack;
      const tapDomestic = dragScroll.tapDomestic;
      const shouldRunTap = !dragScroll.moved && Boolean(tapAction || tapRoute || tapBack || tapDomestic);
      node.classList.remove("drag-scroll-active");
      dragScroll.node = null;
      dragScroll.pointerId = null;
      dragScroll.moved = false;
      dragScroll.tapAction = "";
      dragScroll.tapRoute = "";
      dragScroll.tapBack = false;
      dragScroll.tapDomestic = false;
      if (pointerId !== null && node.releasePointerCapture) {
        try {
          node.releasePointerCapture(pointerId);
        } catch (error) {
        }
      }
      if (shouldRunTap) {
        dragScroll.suppressClickUntil = Date.now() + 260;
        if (tapBack) {
          back();
          clearToast();
          return;
        }
        if (tapDomestic) {
          go("domestic");
          toast("已切换：境内医疗服务");
          return;
        }
        if (tapAction) {
          performAction(tapAction);
          return;
        }
        if (tapRoute) {
          go(tapRoute);
        }
      }
    }

    function handleDragScrollPointerDown(event) {
      if (typeof event.button === "number" && event.button > 0) return;
      const node = dragScrollNodeFromEvent(event);
      if (!node) return;
      const target = event.target instanceof Element ? event.target : null;
      const actionTarget = target?.closest("[data-action]");
      const routeTarget = target?.closest("[data-route]");
      dragScroll.node = node;
      dragScroll.startX = event.clientX;
      dragScroll.startY = event.clientY;
      dragScroll.scrollLeft = node.scrollLeft;
      dragScroll.scrollTop = node.scrollTop;
      dragScroll.pointerId = typeof event.pointerId === "number" ? event.pointerId : null;
      dragScroll.moved = false;
      dragScroll.tapAction = actionTarget?.dataset.action || "";
      dragScroll.tapRoute = actionTarget ? "" : (routeTarget?.dataset.route || "");
      dragScroll.tapBack = Boolean(target?.closest("[data-back]"));
      dragScroll.tapDomestic = Boolean(target?.closest("[data-domestic]"));
      if (dragScroll.pointerId !== null && node.setPointerCapture) {
        try {
          node.setPointerCapture(dragScroll.pointerId);
        } catch (error) {
        }
      }
    }

    function handleDragScrollPointerMove(event) {
      if (!dragScroll.node) return;
      const deltaX = event.clientX - dragScroll.startX;
      const deltaY = event.clientY - dragScroll.startY;
      if (!dragScroll.moved && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 6) {
        dragScroll.moved = true;
        dragScroll.node.classList.add("drag-scroll-active");
      }
      if (!dragScroll.moved) return;
      dragScroll.node.scrollLeft = dragScroll.scrollLeft - deltaX;
      dragScroll.node.scrollTop = dragScroll.scrollTop - deltaY;
      dragScroll.suppressClickUntil = Date.now() + 260;
      event.preventDefault();
    }

    function handleClick(event) {
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      if (!target) return;

      if (Date.now() < dragScroll.suppressClickUntil && target.closest("#content, [data-drag-scroll]")) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (Date.now() < hospitalDrag.suppressClickUntil && target.closest(".hospital-strip")) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const nearbyHospital = target.closest(".nearby-hospital[data-action^='hospitalSelect:']");
      if (nearbyHospital) {
        performAction(nearbyHospital.dataset.action);
        return;
      }

      const hospitalStrip = target.closest(".hospital-strip[data-carousel]");
      if (hospitalStrip) {
        const index = Number(hospitalStrip.dataset.carouselIndex || 0);
        performAction(`hospitalSelect:${index}`);
        return;
      }

      const dot = target.closest("[data-hospital-dot]");
      if (dot) {
        const strip = dot.closest(".nearby-hospitals")?.querySelector(".hospital-strip[data-carousel]");
        if (strip) scrollHospitalTo(strip, Number(dot.dataset.hospitalDot || 0));
        return;
      }

      const option = target.closest(".option");
      if (option) {
        const group = option.closest(".options");
        group.querySelectorAll(".option").forEach(item => item.classList.remove("active"));
        option.classList.add("active");
        toast(`已选择：${option.textContent.trim()}`);
        return;
      }

      const backButton = target.closest("[data-back]");
      if (backButton) {
        back();
        clearToast();
        return;
      }

      const domestic = target.closest("[data-domestic]");
      if (domestic) {
        go("domestic");
        toast("已切换：境内医疗服务");
        return;
      }

      const action = target.closest("[data-action]");
      if (action) {
        performAction(action.dataset.action);
        return;
      }

      const route = target.closest("[data-route]");
      if (route) {
        const nextRoute = route.dataset.route;
        go(nextRoute);
      }
    }

    function preventQuickPaymentContentDrag(event) {
      if (document.body.dataset.route !== "quickPayment") return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target || !target.closest("#content")) return;
      event.preventDefault();
      event.stopPropagation();
    }

    function handleInput(event) {
      const target = event.target instanceof Element ? event.target : null;
      if (!target || !target.matches("[data-state-field]")) return;
      const field = target.dataset.stateField;
      if (field === "customDraftText") {
        state.customDraftText = target.value || "";
        persistState();
      }
    }

    document.addEventListener("pointerdown", handleHospitalPointerDown);
    document.addEventListener("pointerdown", handleDragScrollPointerDown);
    document.addEventListener("pointermove", handleHospitalPointerMove);
    document.addEventListener("pointermove", handleDragScrollPointerMove);
    document.addEventListener("pointermove", preventQuickPaymentContentDrag, { capture: true });
    document.addEventListener("touchmove", preventQuickPaymentContentDrag, { capture: true, passive: false });
    document.addEventListener("pointerup", endHospitalDrag);
    document.addEventListener("pointerup", endDragScroll);
    document.addEventListener("pointercancel", endHospitalDrag);
    document.addEventListener("pointercancel", endDragScroll);
    document.addEventListener("mouseup", endHospitalDrag);
    document.addEventListener("mouseup", endDragScroll);
    document.addEventListener("touchend", endHospitalDrag);
    document.addEventListener("touchend", endDragScroll);
    document.addEventListener("lostpointercapture", endHospitalDrag);
    document.addEventListener("lostpointercapture", endDragScroll);
    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInput);
    window.addEventListener("resize", setupHospitalCarousels);
    render();
