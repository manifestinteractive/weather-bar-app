/*! Russian Language File */
export default {
  ru: {
    app: {
      title: 'Weather Bar',
      language: 'язык',
      menu: {
        quit: 'Уволиться',
        primaryLocation: 'Первичный город',
        savedLocations: 'Сохраненные города',
        preferences: 'предпочтения',
        newLocation: 'Новое место',
        providedBy: 'Данные о погоде:',
        versionNumber: 'Версия {version}'
      }
    },
    page: {
      newLocation: {
        placeholder: 'Поиск городов',
        letsGo: 'Пойдем',
        currentLocation: 'Текущая погода',
        noMatch: 'Нет подходящих городов'
      },
      preferences: {
        app: 'главный',
        language: 'язык',
        layout: 'экран',
        units: 'обмер',
        alwaysOnTop: 'Всегда на вершине',
        settings: 'настройки',
        launchAtStartup: 'Запуск при запуске',
        launchIcon: 'Иконка запуска',
        both: 'Состояние и температура',
        temperature: 'температура',
        condition: 'Состояние',
        currentTemp: 'Текущая температура',
        actual: 'фактический',
        feelsLike: 'Как будто',
        fahrenheit: 'Фаренгейт',
        celsius: 'Celsius',
        time: 'Время',
        twelveHour: '12 часов',
        twentyFourHour: '24 часов'
      }
    },
    ui: {
      today: 'Cегодня',
      loading: 'загрузка',
      confirmDelete: 'Вы действительно хотите удалить это?',
      deleteButton: 'Удалить',
      addLocation: 'Добавить город',
      confirmPrimary: 'Использовать в качестве основного?',
      confirmedPrimary: 'первичный',
      errorText: 'Похоже, у нас была проблема с нашим приложением',
      errorButtonQuit: 'Уволиться',
      errorButtonReload: 'Еще раз'
    },
    autoUpdate: {
      message: 'Доступна новая версия Weather Bar.',
      detail: 'Вы хотите загрузить v{version} сейчас?',
      buttons: {
        yes: 'да',
        no: 'нет'
      }
    },
    context: {
      menu: {
        about: 'О выставке Weather Bar',
        version: 'Версия {version}',
        website: 'Веб-сайт Weather Bar',
        license: 'Лицензионное соглашение',
        support: 'Контактная поддержка',
        toggle: 'Переключить Weather Bar',
        devTools: 'Инструменты разработчика',
        quit: 'Выйти из Weather Bar',
        dialog: {
          detail: 'Weather Bar - это приложение с открытым исходным кодом, созданное Peter Schmalfeldt.',
          close: 'Закрыть',
          website: 'Веб-сайт'
        }
      }
    },
    weather: {
      code_200: 'Гроза со слабым дождем',
      code_201: 'Гроза с дождем',
      code_202: 'Гроза с сильным дождем',
      code_210: 'Light Thunderstorm',
      code_211: 'Гроза',
      code_212: 'Heavy Thunderstorm',
      code_221: 'Ragged Thunderstorm',
      code_230: 'Гроза с легким дождем',
      code_231: 'Гроза с Дождь',
      code_232: 'Гроза с тяжелым мокротом',
      code_300: 'Дождь легкой интенсивности',
      code_301: 'Дождь',
      code_302: 'Толчок тяжелой интенсивности',
      code_310: 'Дождь Дождь Интенсивность Дождь',
      code_311: 'Дождь дождя',
      code_312: 'Тяжелый дождь Дождь',
      code_313: 'Душ Дождь и Дождь',
      code_314: 'Тяжелый дождь Душ и дождь',
      code_321: 'Душ Дождь',
      code_500: 'Light Rain',
      code_501: 'Умеренный дождь',
      code_502: 'Тяжелый интенсивный дождь',
      code_503: 'Очень сильный дождь',
      code_504: 'Extreme Rain',
      code_511: 'Замерзающий дождь',
      code_520: 'Светлый дождь с интенсивностью дождя',
      code_521: 'Душ Дождь',
      code_522: 'Дождь сильной интенсивности дождя',
      code_531: 'Ragged Shower Rain',
      code_600: 'Легкий снег',
      code_601: 'Снег',
      code_602: 'Тяжелый снег',
      code_611: 'Sleet',
      code_612: 'Ливневый душ',
      code_615: 'Легкий дождь и снег',
      code_616: 'Дождь и снег',
      code_620: 'Легкий душ Снег',
      code_621: 'Снег для душа',
      code_622: 'Тяжелый снег для душа',
      code_701: 'Туман',
      code_711: 'Дым',
      code_721: 'Haze',
      code_731: 'Песок, пыль Whirls',
      code_741: 'Fog',
      code_751: 'Песок',
      code_761: 'Пыль',
      code_762: 'Вулканический пепел',
      code_771: 'Отколов',
      code_781: 'Торнадо',
      code_800: 'Clear Sky',
      code_801: 'Несколько облаков',
      code_802: 'Рассеянные облака',
      code_803: 'Сломанные облака',
      code_804: 'Пасмурные облака',
      code_900: 'Торнадо',
      code_901: 'Тропический шторм',
      code_902: 'Ураган',
      code_903: 'Холодный',
      code_904: 'Hot',
      code_905: 'Windy',
      code_906: 'Приветствую',
      code_951: 'Calm',
      code_952: 'Light Breeze',
      code_953: 'Нежный Бриз',
      code_954: 'Умеренный бриз',
      code_955: 'Свежий бриз',
      code_956: 'Сильный бриз',
      code_957: 'Высокий ветер, около порога',
      code_958: 'Gale',
      code_959: 'Сильный шторм',
      code_960: 'Шторм',
      code_961: 'Яростный шторм',
      code_962: 'Ураган'
    }
  }
}
