// ✅ 검색 버튼 생성
function createSearchButton() {
  const searchButton = document.createElement("button");
  searchButton.className =
    "items-center px-3 py-1 text-white rounded bg-gray-700 hover:bg-gray-600 space-x-2 mr-2";
  searchButton.innerHTML = `<i class="fas fa-search"></i><span>검색</span>`;
  return searchButton;
}

// ✅ 신규 버튼 생성
function createAddButton() {
  const addButton = document.createElement("button");
  addButton.className =
    "items-center px-3 py-1 text-white rounded bg-gray-700 hover:bg-gray-600 space-x-2 mr-2";
  addButton.innerHTML = `<i class="fas fa-plus"></i><span>신규</span>`;
  return addButton;
}

// ✅ 삭제 버튼 생성
function createDelButton() {
  const deleteButton = document.createElement("button");
  deleteButton.className =
    "items-center px-3 py-1 text-white rounded bg-gray-700 hover:bg-gray-600 space-x-2 mr-2";
  deleteButton.innerHTML = `<i class="fas fa-trash"></i><span>삭제</span>`;
  return deleteButton;
}

// ✅ 닫기 버튼 생성
function createCloseButton() {
  const closeButton = document.createElement("button");
  closeButton.className =
    "items-center px-3 py-1 text-white rounded bg-gray-700 hover:bg-gray-600 space-x-2";
  closeButton.innerHTML = `<i class="fas fa-times"></i><span>닫기</span>`;
  return closeButton;
}

// ✅ 저장 버튼 생성
function createSaveButton() {
  const saveButton = document.createElement("button");
  saveButton.className =
    "items-center px-3 py-1 text-white rounded bg-gray-700 hover:bg-gray-600 space-x-2";
  saveButton.innerHTML = `<i class="fas fa-save"></i><span>저장</span>`;
  return saveButton;
}

// ✅ 검색 초기화 버튼 생성
function createResetSearchButton() {
  const resetSearchButton = document.createElement("button");
  resetSearchButton.className =
    "items-center px-3 py-1 text-white rounded bg-gray-700 hover:bg-gray-600 space-x-2";
  resetSearchButton.innerHTML = `<i class="fas fa-undo"></i><span>검색 초기화</span>`;
  return resetSearchButton;
}

// ✅ 다국어 번역 객체 (영어, 한국어, 일본어)
const createTanslations = {
  en: {
    menu: "Menu",
    tabs: {
      system: "System",
      organization: "Organization",
      task: "Task",
      schedule: "Schedule",
      statistics: "Statistics",
      settings: "Settings",
      biz: "Business",
    },
    offCanvas: {
      system: "Code Management",
      glos: "Dict. Management",
      orgtree: "Permission Management",
      document: "Document Management",
      wms: "WMS",
      config: "System log",
      network: "Consultant",
      locker: "Locker",
      survey: "Survey",
      work: "Reservation Management",
      meeting: "Meeting Room Management",
      hospital: "Hospital Reservation",
      lectures: "Lecture Schedule",
      city: "District Information",
      stati: "Member Statistics",
      flow: "Sales Statistics",
      chain: "Chain Operation",
      calendar: "Work Schedule",
      trello: "Project Schedule",
      timeline: "Production Schedule",
      orgni: "Organization Structure",
      attend: "Attendance Management",
      total: "Incentive",
    },
    buttons: {
      search: "Search",
      reset: "Reset Search",
      new: "New",
      delete: "Delete",
      save: "Save",
    },
  },
  ko: {
    menu: "메뉴",
    tabs: {
      search: "🎵 음악 검색",
      chart: "📊 음악 차트",
      playlist: "🎧 플레이리스트",
      artist: "🧑‍🎤 아티스트 분석",
      recommend: "🎲 추천",
      settings: "설정관리",
      biz: "사업관리",
    },
    offCanvas: {
      system: "코드관리",
      glos: "용어관리",
      orgtree: "권한관리",
      document: "문서관리",
      wms: "WMS",
      config: "시스템 로그",
      network: "컨설팅 지정",
      locker: "사물함",
      survey: "서베이",
      work: "예약관리",
      meeting: "회의실관리",
      hospital: "병원예약",
      lectures: "강의일정",
      city: "행정구역정보",
      stati: "회원통계",
      flow: "매출통계",
      chain: "체인운영",
      calendar: "업무일정",
      trello: "프로젝트일정",
      timeline: "생산일정",
      orgni: "조직도구성",
      attend: "근태관리",
      total: "인센티브",
    },
    buttons: {
      search: "검색",
      reset: "검색 초기화",
      new: "신규",
      delete: "삭제",
      save: "저장",
    },
  },
  ja: {
    menu: "メニュー",
    tabs: {
      system: "システム管理",
      organization: "組織管理",
      task: "業務管理",
      schedule: "スケジュール管理",
      statistics: "統計",
      settings: "設定管理",
      biz: "事業管理",
    },
    offCanvas: {
      system: "コード管理",
      glos: "Dict. 管理",
      orgtree: "権限管理",
      document: "文書管理",
      wms: "WMS",
      config: "システムログ",
      network: "コンサルティングの指定",
      locker: "사물함",
      survey: "サーベイ",
      work: "予約管理",
      meeting: "会議室管理",
      hospital: "病院予約",
      lectures: "講義日程",
      city: "行政区情報",
      stati: "会員統計",
      flow: "売上統計",
      chain: "チェーン運営",
      calendar: "業務日程",
      trello: "プロジェクト日程",
      timeline: "生産日程",
      orgni: "組織構成",
      attend: "勤怠管理",
      total: "インセンティブ",
    },
    buttons: {
      search: "検索",
      reset: "検索をリセット",
      new: "新規",
      delete: "削除",
      save: "保存",
    },
  },
};

// ✅ TUI Grid 커스텀 렌더러: 연필 아이콘 (편집용)
class createBadgeRenderer {
  constructor(props) {
    const el = document.createElement("span");
    el.className =
      "text-blue-900 rounded cursor-pointer flex items-center justify-center";
    el.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // 연필 아이콘
    el.style.display = "inline-block";
    el.style.textAlign = "center";
    this.el = el;
    this.props = props;
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.props = props;
    const { rowKey, grid } = props;
    const rowData = grid.getRow(rowKey);

    // id가 없는 경우 비활성화
    if (!rowData.id) {
      this.el.style.pointerEvents = "none";
      this.el.style.opacity = "0.5";
    } else {
      this.el.style.pointerEvents = "auto";
      this.el.style.opacity = "1";
    }
  }
}

// ✅ 저장 아이콘 렌더러 (fa-save)
class createSaveRenderer {
  constructor(props) {
    const el = document.createElement("span");
    el.className =
      "text-blue-900 rounded cursor-pointer flex items-center justify-center";
    el.innerHTML = '<i class="fas fa-save"></i>';
    el.style.display = "inline-block";
    el.style.textAlign = "center";
    this.el = el;
    this.props = props;
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.props = props;
    const { rowKey, grid } = props;
    const rowData = grid.getRow(rowKey);

    // id 유무에 따라 저장 버튼 활성화 여부 결정
    if (!rowData.id) {
      this.el.style.pointerEvents = "none";
      this.el.style.opacity = "0.5";
    } else {
      this.el.style.pointerEvents = "auto";
      this.el.style.opacity = "1";
    }
  }
}

// ✅ 행 번호 렌더러 - 첫 번째 열에서 번호 또는 New 표시
class RowNumRenderer {
  constructor(props) {
    const el = document.createElement("span");
    this.el = el;

    const { grid, rowKey } = props;
    const row = grid.getRow(rowKey);
    const allRows = grid.getData();
    const rowIndex = allRows.findIndex((r) => r.rowKey === rowKey);

    // 특정 필드가 비어 있을 경우 "New" 표시
    if (row?.tpCd === "" && row?.tpNm === "") {
      el.innerText = "New";
      el.style.color = "#ee3333";
    } else {
      el.innerText = String(rowIndex + 1); // 일반 번호 표시 (1부터 시작)
    }
  }

  getElement() {
    return this.el;
  }
}

// ✅ 모듈 내보내기 (ESM 형식)
export {
  createAddButton,
  createDelButton,
  createCloseButton,
  createSaveButton,
  createSearchButton,
  createResetSearchButton,
  createTanslations,
  createBadgeRenderer,
  createSaveRenderer,
  RowNumRenderer,
};
