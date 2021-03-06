/*! Japanese Language File */
export default {
  ja: {
    app: {
      title: 'Weather Bar',
      language: '言語',
      menu: {
        quit: '終了する',
        primaryLocation: '主要な場所',
        savedLocations: '保存された場所',
        preferences: '設定',
        newLocation: '新しい場所',
        providedBy: '天気データ:',
        versionNumber: 'バージョン {version}'
      }
    },
    page: {
      newLocation: {
        placeholder: '都市を検索',
        letsGo: '行こう',
        currentLocation: '現在位置',
        noMatch: 'マッチングする都市はありません'
      },
      preferences: {
        app: 'アプリ',
        language: '言語',
        layout: 'レイアウト',
        units: '単位',
        alwaysOnTop: '常にトップに',
        settings: '設定',
        launchAtStartup: 'スタートアップ時に起動',
        launchIcon: '起動アイコン',
        both: '条件と温度',
        temperature: '温度',
        condition: '調子',
        currentTemp: '現在の温度',
        actual: '実際の',
        feelsLike: '気分',
        fahrenheit: '華氏',
        celsius: 'Celsius',
        time: '時間',
        twelveHour: '12時間',
        twentyFourHour: '24時間'
      }
    },
    ui: {
      today: '今日',
      loading: '読み込み中',
      confirmDelete: 'この場所を削除してもよろしいですか？',
      deleteButton: '削除',
      addLocation: '場所を追加',
      confirmPrimary: 'プライマリロケーションとして使用しますか？',
      confirmedPrimary: '一次',
      errorText: 'アプリに問題があるようです',
      errorButtonQuit: '終了する',
      errorButtonReload: 'リロード'
    },
    autoUpdate: {
      message: '新しいバージョンの Weather Bar が利用可能です。',
      detail: '今すぐv{version}をダウンロードしますか？',
      buttons: {
        yes: 'はい',
        no: 'いいえ'
      }
    },
    context: {
      menu: {
        about: 'Weather Barについて',
        version: 'バージョン {version}',
        website: 'Weather Bar ウェブサイト',
        license: 'ライセンス契約',
        support: 'サポート問い合わせ先',
        toggle: 'Weather Barの切り替え',
        devTools: '開発者ツール',
        quit: 'Weather Barを終了する',
        dialog: {
          detail: 'Weather Barは、Peter Schmalfeldtによって作成されたオープンソースアプリケーションです。',
          close: '閉じる',
          website: 'ウェブサイト'
        }
      }
    },
    weather: {
      code_200: 'Light Rainの雷雨',
      code_201: '雨が降った雷雨',
      code_202: '豪雨による雷雨',
      code_210: '軽い雷雨',
      code_211: '雷雨',
      code_212: '重い雷雨',
      code_221: 'Ragged Thunderstorm',
      code_230: '軽い霧雨の雷雨',
      code_231: '稲妻の雷雨',
      code_232: '重い霧雨の雷雨',
      code_300: '光度霧雨',
      code_301: '霧雨',
      code_302: '重い霧雨',
      code_310: '光度霧雨',
      code_311: '霧雨',
      code_312: '重度霧雨',
      code_313: 'シャワー雨と霧雨',
      code_314: 'ヘビーシャワー雨と霧雨',
      code_321: 'シャワー霧',
      code_500: 'ライトレイン',
      code_501: '中雨',
      code_502: '重度の降雨',
      code_503: '非常に重い雨',
      code_504: 'エクストリームレイン',
      code_511: '凍結レイン',
      code_520: '光強度シャワーレイン',
      code_521: 'シャワーレイン',
      code_522: '重度のシャワーの雨',
      code_531: '険しいシャワーレイン',
      code_600: 'ライトスノー',
      code_601: 'スノー',
      code_602: '重い雪',
      code_611: 'Sleet',
      code_612: 'シャワースリープ',
      code_615: '明るい雨と雪',
      code_616: '雨と雪',
      code_620: 'ライトシャワースノー',
      code_621: 'シャワースノー',
      code_622: '重いシャワーの雪',
      code_701: 'ミスト',
      code_711: 'スモーク',
      code_721: 'ヘイズ',
      code_731: '砂、ダストウォール',
      code_741: 'フォグ',
      code_751: 'サンド',
      code_761: 'ダスト',
      code_762: '火山灰',
      code_771: 'スクール',
      code_781: '竜巻',
      code_800: 'クリアスカイ',
      code_801: '少数の雲',
      code_802: '散在した雲',
      code_803: '壊れたクラウド',
      code_804: '曇った雲',
      code_900: '竜巻',
      code_901: '熱帯低気圧',
      code_902: 'ハリケーン',
      code_903: 'コールド',
      code_904: 'ホット',
      code_905: 'Windy',
      code_906: '雹',
      code_951: '静かな',
      code_952: 'ライトブリーズ',
      code_953: '優しいBreeze',
      code_954: 'Moderate Breeze',
      code_955: 'Fresh Breeze',
      code_956: '強いブリーズ',
      code_957: '高い風、近くの強風',
      code_958: 'ゲール',
      code_959: 'Severe Gale',
      code_960: 'ストーム',
      code_961: '暴力的な嵐',
      code_962: 'ハリケーン'
    }
  }
}
