
(function () {
    const I18N = {
      en: {
        toggleToAr: "AR",
      

/*
        title: "Syrian Startup Ecosystem Map",
        btnReset: "Reset View",
        btnAdd: "Add New Section",
        btnEdit: "Edit Sections",
        btnSuggestions: "Suggestions",
        btnSuggest: "Suggest an Organization",
        btnAboutMap: "About The Map",
        privacy: "Privacy Policy",
        contact: "Contact Us",
        adminLogin: "Admin Login",
        toggleToAr: "AR",
        suggestionStitle: "List of submitted suggestions",
        commonclose: "Close",
        suggestTitle: "Suggest a New Organization",
        suggestNameLabel: "Organization Name *",
        suggestNamePh: "Enter the organization name",
        suggestTypeLabel: "Organization Type *",
        suggestTypePh: "Select Organization Type",
        optIncubators: "Incubators",
        optAccelerators: "Accelerators",
        optVentureStudios: "Venture Studios",
        optCompetitions: "Competitions",
        optMentorship: "Mentorship Programs",
        optAcademic: "Academic Programs",
        optTalentDev: "Talent Development",
        optCowork:"Co-working Spaces",
        optrndLabs:"R&D Labs",
        optstartupHiring:"Startup Hiring Platforms",
        optstartupAccounting:"Startup Accounting Services",
        optstartupMarketing:"Startup Marketing Services",
        optwomenSupport:"Women's Support",
        optgovSupport:"Government Support",
        optlegalSupport:"Legal Support",
        optbanks:"Banks",
        optmediaSupport:"Media Support",
        optevents:"Events",
        optngos:"NGOs",
        optpodcasts:"Podcasts",
        optawards:"Awards",
        optfof:"Friends of Founders",
        optfamilyOffices:"Family Offices",
        optcrowdfunding:"Crowdfunding Platforms",
        optAngel:"Angel Investors",
        optpe:"Private Equity",
        optvc:"Venture Capital",
        suggestdescLabel: "Organization Description *",
        suggestdescPh: "Enter a brief description of the organization",
        suggestlocLabel: "Organization Location *",
        suggestsiteLabel:"Website or Social Media Link (optional)",
        suggestlocPh: "Enter the location (city, address, etc.)",
        suggestwebLabel: "Organization Website",
        suggestwebPh: "Enter the website URL",
        suggestsubmit: "Submit Suggestion",
        suggestcancel: "Cancel Suggestion",
        notifsuccessTitle: "Operation successful!",
        notifaddedSection: "The new section has been added successfully.",
        teamtitle: "Contributors",
        teamrolesfullstack: "Full-Stack Developer",
        teamrolesresearcher: "Market Researcher",
        aboutMaptitle: "About The Map",
        commonclose: "Close",
        aboutMaph4: "Syrian Startup Ecosystem Map",
        aboutMaptag: "The first map of Syria’s Startup Ecosystem",
        aboutMapp1:" This visual guide provides a comprehensive overview of the key players driving the startup scene in Syria.\n Created by Aram Lab with help from Syrians both within the country and abroad, this map is a detailed resource \n that highlights the diverse players shaping the ecosystem. The guide shows that Syria’s startup ecosystem is \n currently fragmented and informal. By mapping out the main actors and their roles, it aims to clarify who is doing \n what, identify areas of competition, and pinpoint existing gaps. The ultimate goal is to use this foundational\ninformation to help build a more cohesive, sustainable, and connected startup ecosystem in Syria.",
        aboutMappillarsIntro: "The tool divides the Syrian startup ecosystem across five main categories that together make up the foundational pillars:",
        pillar1: "● Ideation Support",
        pillar2: "● Operation, Growth, and Markets",
        pillar3: "● Regulations and Government Support",
        pillar4: "● Networking and Culture",
        pillar5: "● Funding",
        addtitle: "Add New Section",
        addnameLabel: "New Section Name",
        addnamePh: "Enter the new section name here",
        addlinkLabel : "Section Link (optional)",
        commoncancel: "Cancel",
        commonadd: "Add",
        edittitle: "Edit sections",
        editselectLabel: "Select section to edit",
        editnewNameLabel: "New section name",
        editnewNamePh: "Enter the new section name",
        editlinkLabel: "Section Link",
        commonsave: "Save Changes",
        contacttitle: "Contact Us",
        contactp1:" This map is the first attempt at listing all key players in the ecosystem and will be updated regularly to ensure greater accuracy.\n  Should you have any comments or suggestions on the map or if you would like your organization or business to be listed, please contact:",
        contactemail:"Email:",
        contactlinkedin:"LinkedIn:",
        footersource:"Data Collected by Aram Lab",
        source:"Source:",
        footercopy:"© 2024 Aram Lab. All rights reserved.",
        footeraboutUs:"About Us",
        footerprivacy:"Privacy Policy",
        footercontact:"Contact Us",
        footeradmin:"Admin Login",
        datainfo:"All changes are saved in database - Last Save: ",
        footername:"Username",
        footerpass:"License Key*",
        footerlicenseac:"License Inactive",
        footerlicensea:"License Active",
        footername1:"Enter User Name",
        footerpass1:"Enter License Key",
        privacytitle: "Privacy Policy",
        privacyupdated: "Last updated: [22.08.2025]",
        privacyh1:"1. Introduction",
        privacyp1a:"Welcome to Aram Lab. This Privacy Policy explains how we collect, use, and share your personal information when you use our website,",
        privacyp1:"Welcome to the Syrian Startup Ecosystem Map (the “Map”), operated by Aram Lab (“we,” “our,” or “us”). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our Map,",
        privacyp1b:"By using our Website, you agree to the terms of this policy. If you don't agree, please do not use the site.",
        privacyh2:"2. Information We Collect",
        privacyp2a:"Personal Information: We may collect personal information that you voluntarily provide to us when you use our Map, such as your name, email address, organization details, and any other information you choose to share when submitting suggestions or contacting us.",
        privacyp2b:"non-Personal Information: This is data that can't be used to identify you. We collect this automatically as you use the Site. It includes things like your IP address, browser type, and the pages you visit. This helps us understand how our Site is used and how we can make it better.",
        privacyp2c:"We also use cookies and similar tracking technologies. These are small data files placed on your device that help us remember your preferences and improve your experience. You can manage your cookie settings in your browser.",
        privacyh3:"3. How We Use Your Information",
        privacyp3a:"We use the information we collect to:",
        privacyu3a:"● Provide and improve our services.",
        privacyu3b:"● Communicate with you and respond to your questions.",
        privacyu3c:"● Analyze how the Site is used to improve its functionality.",
        privacyu3d:"● Protect the security of our Site and prevent fraud.",
        privacyu3e:"● Comply with legal requirements.",
        privacyh4:"4. How We Share Your Information",
        privacyp4:"We do not sell, rent, or trade your personal information. We may share your information with trusted third-party service providers who help us run our website and business (e.g., website hosting, email services). These providers are required to keep your information confidential.",
        privacyp41:"We may also disclose your information if we are required to by law or to protect our rights, property, or the safety of others.",
        privacyh5:"5. Data Security",
        privacyp5:"We take reasonable steps to protect your personal information from unauthorized access. However, no method of transmission over the internet is 100% secure. While we do our best to protect your data, we cannot guarantee its absolute security.",
        privacyh6:"6. Your Choices",
        privacyp6a:"You have control over your information:",
        privacyu6a1:"Opting Out:",
        privacyu6a:"If you receive marketing emails from us, you can unsubscribe by clicking the 'unsubscribe' link in the email.",
        privacyu6b1:"Managing Cookies:",
        privacyu6b:"You can set your browser to refuse cookies. However, please be aware that some parts of the Site may not work properly if you do.",
        privacyh7:"7. Links to Other Websites",
        privacyp7:"Our Site may contain links to other websites not operated by us. We are not responsible for the content or privacy practices of those sites. We encourage you to read the privacy policies of any third-party websites you visit.",
        privacyh8:"8. Changes to This Privacy Policy",
        privacyp8:"We may update this Privacy Policy from time to time. We will post any changes on this page and update the 'Last Updated' date at the top. Your continued use of the Site after an update means you accept the new policy.",
        privacyh9:"9. Contact Us",
        privacyp9:"If you have any questions or concerns about this policy, please contact us at:",
        aboutUstitle: "About Us",
        aboutUsh4: "Aram Lab: Ecosystem Architect",
        aboutUsp1:"Aram Lab is an ecosystem architecture consulting company based in Germany, and established by a collective of experts and researchers. Our mission is to advance the design and development of sustainable ecosystems in Syria.",
        aboutUsp2:"We actively engage with both the local Syrian community and the global Syrian diaspora, leveraging collaborative studies and in-depth research to shape ideal designs.",
        aboutUsp3:"Our ultimate goal is to empower Syria's economy and foster long-term prosperity through innovative, community-driven solutions.",
        aboutUsp4:"For inquiries, please email:",
        aboutUsp5:"© 2025 Aram Lab. All rights reserved",

*/



    
    },
      ar: {
        title: "خريطة منظومة الشركات الناشئة في سوريا",
        btnReset: "إعادة الضبط",
        btnAdd: "إضافة قسم جديد",
        btnEdit: "تعديل الأقسام",
        btnSuggestions: "الاقتراحات",
        btnSuggest: "اقترح منظمة",
        btnAboutMap: "حول الخريطة",
        privacy: "سياسة الخصوصية",
        contact: "تواصل معنا",
        adminLogin: "تسجيل دخول المشرف",
        suggestionStitle: "قائمة الاقتراحات المقدمة",
        commonclose: "إغلاق",
        toggleToAr: "EN", 
        suggestTitle: "اقترح منظمة جديدة",
        suggestNameLabel: "اسم المنظمة *",
        suggestNamePh: "أدخل اسم المنظمة",
        suggestTypeLabel: "نوع المنظمة *",
        suggestTypePh: "اختر نوع المنظمة",
        optIncubators: "حاضنات الأعمال",
        optAccelerators: "مسرعات الأعمال",
        optVentureStudios: "استوديوهات الشركات الناشئة",
        optCompetitions: "المسابقات",
        optMentorship: "برامج الإرشاد",
        optAcademic: "المؤسسات الأكاديمية",
        optTalentDev: " منظمات تنمية المواهب",
        optCowork:"مساحات العمل المشتركة",
        optrndLabs:"مختبرات البحث والتطوير",
        optstartupHiring:"خدمات التوظيف للشركات الناشئة",
        optstartupAccounting:"خدمات المحاسبة للشركات الناشئة",
        optstartupMarketing:"خدمات التسويق للشركات الناشئة",
        optwomenSupport:"دعم المرأة",
        optgovSupport:"الدعم الحكومي",
        optlegalSupport:"الدعم القانوني",
        optbanks:"البنوك",
        optmediaSupport:"الدعم الإعلامي",
        optevents:"المناسبات",
        optngos:"المنظمات غير الحكومية",
        optpodcasts:" بودكاست للشركات الناشئة",
        optawards:"الجوائز",
        optfof:"صندوق الصناديق الاستثمارية",
        optdfi:"مؤسسات التمويل التنموي",
        optfamilyOffices:"مكاتب العائلات الثرية",
        optcrowdfunding:"منصات التمويل الجماعي",
        optAngel:"المستثمرون الملائكيون",
        optpe:"صناديق الاستثمار بالملكية الخاصة",
        optvc:"صناديق الاستثمار الجريء",
        suggestdescLabel: "وصف المنظمة *",
        suggestdescPh: "أدخل وصفًا موجزًا للمنظمة",
        suggestlocLabel: "موقع المنظمة *",
        suggestlocPh: "أدخل الموقع (المدينة، العنوان، إلخ)",
        suggestsiteLabel:"رابط الموقع الإلكتروني أو وسائل التواصل الاجتماعي (اختياري)",
        suggestwebLabel: "موقع المنظمة الإلكتروني",
        suggestwebPh: "أدخل رابط الموقع الإلكتروني",
        suggestsubmit: "إرسال الاقتراح",
        suggestcancel: "إلغاء الاقتراح",
        notifsuccessTitle: "تم الإرسال بنجاح",
        notifaddedSection: "تمت إضافة القسم بنجاح.",
        teamtitle: "المساهمون ",
        teamrolesfullstack: "مطور ويب كامل",
        teamrolesresearcher: "باحث سوق",
        aboutMaptitle: "حول الخريطة",
        commonclose: "إغلاق",
        aboutMaph4: "خريطة منظومة الشركات الناشئة في سوريا",
        aboutMaptag: "أول خريطة لمنظومة الشركات الناشئة في سوريا",
        aboutMapp1: "يمثل هذا الدليل البصري نظرة شاملة على أبرز الفاعلين الذين يقودون مشهد الشركات الناشئة في سوريا.\n أُنجز العمل من قبل مختبر أرام بدعم من السوريين داخل البلاد وخارجها، ليكون خريطة تفصيلية تسلّط الضوء على التنوع القائم في الأطراف المؤثرة بالمنظومة.\n يوضح الدليل أن بيئة الشركات الناشئة في سوريا ما تزال غير مكتملة وغير منظمة، ويسعى الدليل البصري عبر رسم ملامح الفاعلين وأدوارهم إلى توضيح من يقوم بماذا، وتحديد مجالات التنافس، ورصد الفجوات القائمة.\n والغاية النهائية من هذا الجهد هي استخدام هذه المعلومات التأسيسية لبناء منظومة للشركات الناشئة أكثر ترابطاً واستدامةً وتماسكاً في سوريا.",
        aboutMappillarsIntro: "يقسّم هذا الدليل منظومة الشركات الناشئة في سوريا إلى خمس فئات رئيسية تُشكّل معاً الركائز الأساسية:",
        pillar1: "● دعم توليد الأفكار",
        pillar2: "● التشغيل والنمو والأسواق",
        pillar3: "● التشريعات والدعم الحكومي",
        pillar4: "● التواصل والثقافة",
        pillar5: "● التمويل",
        addtitle: "إضافة قسم جديد",
        addnameLabel: "اسم القسم الجديد",
        addnamePh: "أدخل اسم القسم الجديد هنا",
        addlinkLabel : "رابط القسم (اختياري)",
        commoncancel: "إلغاء",
        commonadd: "إضافة",
        edittitle: "تعديل الأقسام",
        editselectLabel: "اختر القسم للتعديل",
        editnewNameLabel: "اسم القسم الجديد",
        editnewNamePh: "أدخل اسم القسم الجديد",
        editlinkLabel: "رابط القسم",
        commonsave: "حفظ التعديلات",
        contacttitle: "تواصل معنا",
        contactp1:"تُعد هذه الخريطة المحاولة الأولى لتعداد جميع الفاعلين الرئيسيين في المنظومة، وسيتم تحديثها بانتظام لضمان دقة أكبر.\n إذا كانت لديك أي تعليقات أو اقتراحات حول الخريطة، أو إذا كنت ترغب في إدراج مؤسستك أو عملك، يرجى التواصل معنا عبر:",
        contactemail:"البريد الإلكتروني:",
        contactlinkedin:"لينكد إن:",
        footercopy:"جميع الحقوق محفوظة مختبر أرام - © 2025  ",
        footeraboutUs:"من نحن",
        footerprivacy:"سياسة الخصوصية",
        footercontact:"تواصل معنا",
        footeradmin:"تسجيل دخول المشرف",
        datainfo:"جميع التعديلات محفوظة في قاعدة البيانات - آخر حفظ:",
        footername:"اسم المستخدم",
        footerpass:"مفتاح الترخيص",
        footerlicenseac:"الترخيص غير نشط",
        footerlicensea:"نشط الترخيص ",
        footername1:"أدخل اسم المستخدم",
        footerpass1:"أدخل مفتاح الترخيص",
        privacytitle: "سياسة الخصوصية",
        privacyupdated: "آخر تحديث: [22.08.2025]",
        privacyh1:"1. المقدمة",
        privacyp1:"مرحبًا بكم في خريطة منظومة الشركات الناشئة في سوريا (المشار إليها فيما يلي بـ \"الخريطة\"ٍ)، التي تديرها Aram Lab (المشار إليها فيما يلي بـ \"نحن\" أو \"لنا\" أو \"خاصتنا\"). نحن ملتزمون بحماية خصوصيتك وضمان التعامل مع معلوماتك الشخصية بطريقة آمنة ومسؤولة. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند استخدامك لخريطتنا.",
        privacyp1b:"باستخدامك لموقعنا، فإنك توافق على شروط هذه السياسة. إذا كنت لا توافق، يرجى عدم استخدام الموقع.",
        privacyh2:"2. المعلومات التي نجمعها",
        privacyp2a:"المعلومات الشخصية: قد نجمع معلومات شخصية تقدمها لنا طوعًا عند استخدامك لخريطتنا، مثل اسمك، عنوان بريدك الإلكتروني، تفاصيل مؤسستك، وأي معلومات أخرى تختار مشاركتها عند تقديم اقتراحات أو التواصل معنا.",
        privacyp2b:"المعلومات غير الشخصية: هذه بيانات لا يمكن استخدامها لتحديد هويتك. نقوم بجمع هذه البيانات تلقائيًا أثناء استخدامك للموقع. وتشمل عنوان IP الخاص بك، نوع المتصفح، والصفحات التي تزورها. يساعدنا هذا في فهم كيفية استخدام موقعنا وكيفية تحسينه.",
        privacyp2c:"نستخدم أيضًا ملفات تعريف الارتباط وتقنيات التتبع المماثلة. هذه ملفات بيانات صغيرة توضع على جهازك تساعدنا في تذكر تفضيلاتك وتحسين تجربتك. يمكنك إدارة إعدادات ملفات تعريف الارتباط في متصفحك.",
        privacyh3:"3. كيفية استخدامنا لمعلوماتك",
        privacyp3a:"نستخدم المعلومات التي نجمعها من أجل:",
        privacyu3a:"● تقديم خدماتنا وتحسينها.",
        privacyu3b:"● التواصل معك والرد على أسئلتك.",
        privacyu3c:"● تحليل كيفية استخدام الموقع لتحسين وظيفته.",
        privacyu3d:"● حماية أمان موقعنا ومنع الاحتيال.",
        privacyu3e:"● الامتثال للمتطلبات القانونية.",
        privacyh4:"4. كيفية مشاركة معلوماتك",
        privacyp4:"نحن لا نبيع أو نؤجر أو نتاجر بمعلوماتك الشخصية. قد نشارك معلوماتك مع مزودي خدمات طرف ثالث موثوقين يساعدوننا في تشغيل موقعنا وأعمالنا (مثل استضافة المواقع، خدمات البريد الإلكتروني). يُطلب من هؤلاء المزودين الحفاظ على سرية معلوماتك.",
        privacyp41:"قد نكشف أيضًا عن معلوماتك إذا طُلب منا ذلك بموجب القانون أو لحماية حقوقنا أو ممتلكاتنا أو سلامة الآخرين.",
        privacyh5:"5. أمان البيانات",
        privacyp5:"نتخذ خطوات معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%. بينما نبذل قصارى جهدنا لحماية بياناتك، لا يمكننا ضمان أمانها المطلق.",
        privacyh6:"6. خياراتك",
        privacyp6a:"لديك السيطرة على معلوماتك:",
        privacyu6a1:"إلغاء الاشتراك:",
        privacyu6a:"إذا تلقيت رسائل بريد إلكتروني تسويقية منا، يمكنك إلغاء الاشتراك بالنقر على رابط 'إلغاء الاشتراك' في البريد الإلكتروني.",
        privacyu6b1:"إدارة ملفات تعريف الارتباط:",
        privacyu6b:"يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط. ومع ذلك، يرجى العلم أن بعض أجزاء الموقع قد لا تعمل بشكل صحيح إذا قمت بذلك.",
        privacyh7:"7. روابط لمواقع أخرى",
        privacyp7:"قد يحتوي موقعنا على روابط لمواقع أخرى لا نديرها. نحن غير مسؤولين عن محتوى أو ممارسات الخصوصية لتلك المواقع. نشجعك على قراءة سياسات الخصوصية لأي مواقع طرف ثالث تزورها.",
        privacyh8:"8. تغييرات على سياسة الخصوصية هذه",
        privacyp8:"قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سننشر أي تغييرات على هذه الصفحة ونحدث تاريخ 'آخر تحديث' في الأعلى. استمرارك في استخدام الموقع بعد التحديث يعني قبولك للسياسة الجديدة.",
        privacyh9:"9. اتصل بنا",
        privacyp9:"إذا كان لديك أي أسئلة أو مخاوف بشأن هذه السياسة، يرجى الاتصال بنا عبر:",
        aboutUstitle: "من نحن",
        aboutUsh4: "مختبر أرام : مهندس المنظومات",
        aboutUsp1:"مختبر أرام هو شركة استشارية في هندسة المنظومات مقرها ألمانيا، تأسست بواسطة مجموعة من الخبراء والباحثين. مهمتنا هي تصميم وتطوير منظومات مستدامة في سوريا.",
        aboutUsp2:"نتفاعل بشكل نشط مع المجتمع السوري المحلي والشتات السوري العالمي، مستفيدين من الدراسات المشتركة والبحوث المتعمقة لتشكيل التصاميم المثالية.",
        aboutUsp3:"هدفنا النهائي هو تمكين اقتصاد سوريا وتعزيز الازدهار على المدى الطويل من خلال حلول مبتكرة يقودها المجتمع.",
        aboutUsp4:"للاستفسارات، يرجى إرسال بريد إلكتروني إلى:",
        aboutUsp5:" جميع الحقوق محفوظة مختبر أرام - © 2025 " ,
        source:"المصدر: البيانات جمعها مختبر أرام",
        privacyp1a:"مرحبًا بكم في Aram Lab. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا ومشاركة معلوماتك الشخصية عند استخدامك لموقعنا الإلكتروني،",
        link:"https://aramlab.info/",
        link1:"info@aramlab.info",
        link2:"http://aramlab.info",
        link3:"Aram Lab",
         name1:"محمد غزال",
        name2:"نورس ابراهيم",
        name3:"حازم سعيد",
        name4:"تيماء دشلي",
   
    },
    };
  // نأخذ لقطة للنصوص/الـplaceholder الأصلية قبل أي ترجمة
  function snapshotOriginalTexts() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const tag = el.tagName;
      if ((tag === "INPUT" || tag === "TEXTAREA")) {
        if (el.dataset.originalPlaceholder === undefined) {
          el.dataset.originalPlaceholder = el.placeholder || "";
        }
      } else {
        if (el.dataset.originalText === undefined) {
          el.dataset.originalText = el.textContent || "";
        }
      }
    });
  }

  function applyI18n(lang) {
    const dict = I18N[lang] || I18N.en;

    // لغة/اتجاه الصفحة
    document.documentElement.lang = (lang === "ar" ? "ar" : "en");
    document.documentElement.dir  = (lang === "ar" ? "rtl" : "ltr");

    if (lang === "ar") {
      // عند العربية: استبدال من القاموس
      const a = I18N.ar;
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const text = a[key];
        if (text == null) return;

        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          // بدّل placeholder فقط كما كان في كودك
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      });
    } else {
      // عند الإنكليزية: رجّع كل شيء كما كان من اللقطة الأصلية
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          if ("originalPlaceholder" in el.dataset) {
            el.placeholder = el.dataset.originalPlaceholder;
          }
        } else {
          if ("originalText" in el.dataset) {
            el.textContent = el.dataset.originalText;
          }
        }
      });
    }

    // نص زر التبديل
    const tBtn = document.getElementById("toggle-lang");
    if (tBtn) tBtn.textContent = dict.toggleToAr;

    // خزّن الاختيار
    localStorage.setItem("lang", lang);
  }

  function currentLang() {
    return localStorage.getItem("lang") || "en";
  }

  document.addEventListener("DOMContentLoaded", () => {
    // مهم جدًا: خُذ اللقطة قبل أي تطبيق ترجمة
    snapshotOriginalTexts();

    // طبّق اللغة المحفوظة (أو EN افتراضيًا)
    applyI18n(currentLang());

    // الحدث الخاص بزر التبديل
    const tBtn = document.getElementById("toggle-lang");
    if (tBtn) {
      tBtn.addEventListener("click", () => {
        const next = (currentLang() === "ar") ? "en" : "ar";
        applyI18n(next);
      });
    }
  });

})();





