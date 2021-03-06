/*! Arabic Language File */
export default {
  ar: {
    app: {
      title: 'Weather Bar',
      language: 'لغة',
      menu: {
        quit: 'استقال',
        primaryLocation: 'الموقع الرئيسي',
        savedLocations: 'المواقع المحفوظة',
        preferences: 'تفضيلات',
        newLocation: 'موقع جديد',
        providedBy: 'بيانات الطقس من قبل:',
        versionNumber: 'الإصدار {version}'
      }
    },
    page: {
      newLocation: {
        placeholder: 'بحث المدن',
        letsGo: 'لنذهب',
        currentLocation: 'الموقع الحالي',
        noMatch: 'لا مطابقة المدن'
      },
      preferences: {
        app: 'الوضعية',
        language: 'لغة',
        layout: 'نسق',
        units: 'وحدات',
        alwaysOnTop: 'دائما في القمة',
        settings: 'إعدادات',
        launchAtStartup: 'إطلاق في بدء التشغيل',
        launchIcon: 'رمز الإطلاق',
        both: 'حالة ودرجة الحرارة',
        temperature: 'درجة الحرارة',
        condition: 'شرط',
        currentTemp: 'درجة الحرارة الحالية',
        actual: 'فعلي',
        feelsLike: 'أحس كأنني',
        fahrenheit: 'فهرنهايت',
        celsius: 'شقتنا',
        time: 'زمن',
        twelveHour: '12 ساعة',
        twentyFourHour: '24 ساعة'
      }
    },
    ui: {
      today: 'اليوم',
      loading: 'جار التحميل',
      confirmDelete: 'هل أنت متأكد أنك تريد حذف هذا الموقع؟',
      deleteButton: 'حذف',
      addLocation: 'إضافة موقع',
      confirmPrimary: 'هل تريد استخدام هذا الموقع كموقع أساسي؟',
      confirmedPrimary: 'ابتدائي',
      errorText: 'يبدو أننا كان لدينا مشكلة مع التطبيق لدينا',
      errorButtonQuit: 'استقال',
      errorButtonReload: 'إعادة تحميل'
    },
    autoUpdate: {
      message: 'وهناك نسخة جديدة من الطقس بار هو متاح.',
      detail: 'هل تريد تحميل v{version} الآن؟',
      buttons: {
        yes: 'نعم فعلا',
        no: 'لا'
      }
    },
    context: {
      menu: {
        about: 'Weather Bar حول',
        version: 'الإصدار {version}',
        website: 'Weather Bar موقع الكتروني',
        license: 'اتفاقية الترخيص',
        support: 'اتصل بالدعم',
        toggle: 'تبديل Weather Bar',
        devTools: 'ادوات المطورين',
        quit: 'استقال Weather Bar',
        dialog: {
          detail: 'Weather Bar هو تطبيق المصدر المفتوح التي أنشأتها Peter Schmalfeldt.',
          close: 'قريب',
          website: 'موقع الكتروني'
        }
      }
    },
    weather: {
      code_200: 'عاصفة رعدية مع المطر الخفيف',
      code_201: 'عاصفة رعدية مع المطر',
      code_202: 'عواصف رعدية مع هطول أمطار غزيرة',
      code_210: 'عاصفة رعدية خفيفة',
      code_211: 'عاصفة رعدية',
      code_212: 'عاصفة رعدية ثقيلة',
      code_221: 'رعد عاصفة رعدية',
      code_230: 'عاصفة رعدية مع رذاذ ضوء',
      code_231: 'عاصفة رعدية مع رذاذ',
      code_232: 'عاصفة رعدية مع رذاذ الثقيلة',
      code_300: 'رذاذ شدة الضوء',
      code_301: 'رذاذ',
      code_302: 'رذاذ كثافة كثيفة',
      code_310: 'رذاذ شدة الضوء المطر',
      code_311: 'رذاذ المطر',
      code_312: 'رذاذ كثافة كثيفة المطر',
      code_313: 'دش المطر والرذاذ',
      code_314: 'دش المطر الشديد والرذاذ',
      code_321: 'دش رذاذ',
      code_500: 'ضوء المطر',
      code_501: 'معتدل المطر',
      code_502: 'الكثافة الشديدة المطر',
      code_503: 'الأمطار الثقيلة جدا',
      code_504: 'المطر المتطرف',
      code_511: 'المطر المتجمد',
      code_520: 'ضوء شدة دش المطر',
      code_521: 'دش المطر',
      code_522: 'شدة الكثافة دش المطر',
      code_531: 'المطر دش المطر',
      code_600: 'ضوء الثلج',
      code_601: 'سنو',
      code_602: 'الثلج الثقيل',
      code_611: 'سليت',
      code_612: 'دش سليت',
      code_615: 'ضوء المطر والثلوج',
      code_616: 'المطر والثلج',
      code_620: 'ضوء دش سنو',
      code_621: 'دش سنو',
      code_622: 'دش كثيف سنو',
      code_701: 'ضباب',
      code_711: 'الدخان',
      code_721: 'الضباب',
      code_731: 'الرمال، دودة الغبار',
      code_741: 'الضباب',
      code_751: 'الرمل',
      code_761: 'الغبار',
      code_762: 'الرماد البركاني',
      code_771: 'سكوالز',
      code_781: 'تورنادو',
      code_800: 'مسح السماء',
      code_801: 'قليل الغيوم',
      code_802: 'الغيوم المتناثرة',
      code_803: 'الغيوم المكسورة',
      code_804: 'الغيوم الملبدة',
      code_900: 'تورنادو',
      code_901: 'العاصفة الاستوائية',
      code_902: 'إعصار',
      code_903: 'الباردة',
      code_904: 'حار',
      code_905: 'عاصف',
      code_906: 'حائل',
      code_951: 'الهدوء',
      code_952: 'نسيم خفيف',
      code_953: 'نسيم لطيف',
      code_954: 'نسيم متوسط',
      code_955: 'نسيم طازج',
      code_956: 'نسيم قوي',
      code_957: 'الرياح العالية، بالقرب من غيل',
      code_958: 'غيل',
      code_959: 'عاصفة شديدة',
      code_960: 'العاصفة',
      code_961: 'عاصفة عنيفة',
      code_962: 'إعصار'
    }
  }
}
