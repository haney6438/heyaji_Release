import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  BellOff,
  Menu,
  X,
  ArrowRight,
  Circle,
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Calendar,
  Trash2,
} from "lucide-react";

/* ---------------------------------------------------------
   Tokens
--------------------------------------------------------- */
const C = {
  yellow: "#FFEA00",
  yellowDeep: "#F0D400",
  yellowSoft: "#FFF6C2",
  ink: "#1C1B17",
  ink2: "#33322B",
  paper: "#FFFDF6",
  cream: "#FFF8E1",
  line: "#E8E2CC",
  lineStrong: "#D9D2B8",
  muted: "#6F6D60",
};

/* ---------------------------------------------------------
   Reveal-on-scroll
--------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div", ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------
   Hub logo mark — a center node with four orbiting nodes,
   the literal shape of the product's architecture.
--------------------------------------------------------- */
function HubMark({ size = 34 }) {
  return (
    <img
      src="/logo.png"
      alt="해야지 로고"
      width={size}
      height={size}
      style={{
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

/* ---------------------------------------------------------
   Header
--------------------------------------------------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    ["홈", "#home"],
    ["실행 흐름", "#flow"],
    ["기능 소개", "#features"],
    ["스크린샷", "#detail"],
    ["다운로드", "#download"],
  ];
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "rgba(255,253,246,0.9)", backdropFilter: "blur(8px)", borderBottom: `1px solid ${C.line}` }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5">
          <HubMark size={30} />
          <div className="leading-tight">
            <p className="font-bold text-[15px]" style={{ color: C.ink, fontFamily: "var(--f-display)" }}>
              해야지
            </p>
            <p className="text-[10px] hidden sm:block" style={{ color: C.muted }}>
              HEYAJI
            </p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium transition-colors"
              style={{ color: C.ink2 }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ptyytty/project/releases/download/v1.0.1/Heyaji.Setup.1.0.1.exe"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-transform hover:-translate-y-0.5"
            style={{ background: C.ink, color: C.yellow }}
          >
            <WinGlyph size={14} color={C.yellow} />
            Windows 다운로드
          </a>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: C.cream }}
            onClick={() => setOpen((v) => !v)}
            aria-label="메뉴 열기"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-1" style={{ borderTop: `1px solid ${C.line}` }}>
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium"
              style={{ color: C.ink2, borderBottom: `1px solid ${C.line}` }}
            >
              {label}
            </a>
          ))}
          <a
            href="https://github.com/ptyytty/project/releases/download/v1.0.0/HEYAJI.Setup.1.0.0.exe"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold"
            style={{ background: C.ink, color: C.yellow }}
          >
            Windows 다운로드
          </a>
        </div>
      )}
    </header>
  );
}

function WinGlyph({ size = 16, color = C.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <rect x="1" y="1" width="8" height="8" fill={color} />
      <rect x="11" y="1" width="8" height="8" fill={color} />
      <rect x="1" y="11" width="8" height="8" fill={color} />
      <rect x="11" y="11" width="8" height="8" fill={color} />
    </svg>
  );
}

/* ---------------------------------------------------------
   Hero — interactive hub demo (the signature element)
--------------------------------------------------------- */
const TABS = [
  { id: "calendar", label: "캘린더", icon: "📅" },
  { id: "todo", label: "할 일", icon: "✅" },
  { id: "memo", label: "메모", icon: "📝" },
];

const DEMO_TODOS = {
  8: [
    { id: 1, text: "팀 회의 준비", done: true, priority: "높음" },
    { id: 2, text: "기획서 수정하기", done: false, priority: "보통" },
  ],
  12: [
    { id: 3, text: "발표 자료 확인", done: false, priority: "높음" },
  ],
  15: [
    { id: 4, text: "프로젝트 기획서 작성", done: true, priority: "높음" },
    { id: 5, text: "팀원에게 작업 내용 공유", done: false, priority: "보통" },
    { id: 6, text: "발표 자료 정리", done: false, priority: "낮음" },
  ],
  22: [
    { id: 7, text: "팀 프로젝트 회의", done: false, priority: "높음" },
  ],
  27: [
    { id: 8, text: "최종 결과물 확인", done: false, priority: "보통" },
  ],
};

function HubDemo() {
  const [tab, setTab] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState(15);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setTab("todo");
  };

  const handleCalendarJump = () => {
    setTab("calendar");
  };

  return (
    <div
      className="w-full rounded-2xl overflow-hidden select-none"
      style={{
        background: "#fff",
        border: `1px solid ${C.lineStrong}`,
        boxShadow:
          "0 30px 60px -20px rgba(28,27,23,0.25)",
      }}
    >
      {/* 프로그램 상단 */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: C.ink,
          color: C.yellow,
        }}
      >
        <div className="flex items-center gap-2">
          <HubMark size={18} />

          <span className="text-xs font-bold">
            해야지 · HEYAJI
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#59584d" }}
          />

          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#59584d" }}
          />

          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: C.yellow }}
          />
        </div>
      </div>

      {/* 인덱스 탭 */}
      <div
        className="flex items-center gap-2 px-3 pt-3"
        style={{ background: C.cream }}
      >
        <span
          className="px-3 py-1.5 rounded-t-lg text-xs font-bold flex items-center gap-1.5"
          style={{
            background: "#fff",
            color: C.ink,
            border: `1px solid ${C.lineStrong}`,
            borderBottom: "none",
          }}
        >
          <Circle
            size={6}
            fill={C.ink}
            stroke="none"
          />

          인덱스 1
        </span>

        <span
          className="text-[11px] pb-2"
          style={{ color: C.muted }}
        >
          + 새 인덱스
        </span>
      </div>

      {/* 창 선택 */}
      <div
        className="flex px-3 gap-1.5 pb-2"
        style={{
          background: "#fff",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        {TABS.map(({ id, label, icon }) => {
          const active = tab === id;

          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all"
              style={{
                background: active
                  ? C.yellow
                  : "transparent",

                color: C.ink,

                transform: active
                  ? "translateY(-1px)"
                  : "none",
              }}
            >
              <span className="text-sm leading-none">
                {icon}
              </span>

              {label}
            </button>
          );
        })}
      </div>

      {/* 실제 내용 */}
      <div
        className="p-4 md:p-5 min-h-[320px]"
        style={{ background: "#fff" }}
      >
        <div className="hub-fade" key={tab}>
          {tab === "calendar" && (
            <CalendarPane
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
            />
          )}

          {tab === "todo" && (
            <TodoPane
              selectedDate={selectedDate}
              todos={DEMO_TODOS[selectedDate] || []}
              onJump={handleCalendarJump}
            />
          )}

          {tab === "memo" && <MemoPane />}
        </div>
      </div>
    </div>
  );
}


function CalendarPane({ selectedDate, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // 2026년 8월

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 각 날짜별 점 데이터 예시
  const dotsData = {
    1: ["#EAB308"],
    6: ["#EAB308"],
    8: ["#EAB308"],
    11: ["#F43F5E", "#EAB308", "#3B82F6", "#EAB308", "#8B5CF6", "#10B981"],
    12: ["#EAB308", "#3B82F6", "#F43F5E"],
    13: ["#EAB308", "#EAB308", "#EAB308", "#EAB308", "#EAB308", "#3B82F6"],
    14: ["#F43F5E", "#10B981"],
    15: ["#EAB308", "#F43F5E", "#EAB308"],
    18: ["#EAB308", "#3B82F6"],
    22: ["#EAB308"],
    29: ["#EAB308"],
  };

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // 달력 생성 로직
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // 이전 달 날짜들
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDate - i,
      isCurrentMonth: false,
    });
  }

  // 현재 달 날짜들
  for (let day = 1; day <= lastDateOfMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
    });
  }

  // 다음 달 날짜들 (총 42개셀 맞춤)
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
    });
  }

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-3xl font-sans">
      {/* 캘린더 상단 헤더 */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <h2 className="text-xl font-extrabold text-black tracking-tight">
          {year}년 {month + 1}월
        </h2>
        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-full">
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* 오늘 버튼 */}
      <div className="flex justify-end mb-3">
        <button 
          onClick={() => onSelectDate(27)}
          className="px-3.5 py-1 bg-[#FFE81A] hover:bg-[#fada08] text-black text-xs font-bold rounded-full shadow-sm transition-all"
        >
          오늘
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold mb-2">
        {daysOfWeek.map((day, idx) => (
          <div
            key={day}
            className={
              idx === 0 ? "text-red-500" : idx === 6 ? "text-blue-500" : "text-black"
            }
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 text-center gap-y-1">
        {calendarDays.map((item, index) => {
          const { day, isCurrentMonth } = item;
          const isToday = isCurrentMonth && day === 27; // 이미지 기준 27일 강조
          const dayOfWeek = index % 7;
          const dots = isCurrentMonth ? dotsData[day] || [] : [];

          let textColor = "text-black font-semibold";
          if (!isCurrentMonth) textColor = "text-gray-300 font-normal";
          else if (dayOfWeek === 0) textColor = "text-red-500 font-semibold";
          else if (dayOfWeek === 6) textColor = "text-blue-500 font-semibold";

          return (
            <div
              key={index}
              onClick={() => isCurrentMonth && onSelectDate(day)}
              className="flex flex-col items-center justify-start min-h-[48px] cursor-pointer py-0.5"
            >
              {/* 날짜 숫자를 감싸는 원 */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all ${
                  isToday
                    ? "bg-[#FFE81A] font-extrabold text-black"
                    : "hover:bg-gray-100"
                } ${textColor}`}
              >
                {day}
              </div>

              {/* 일정 표시 점(Dot)들 */}
              {dots.length > 0 && (
                <div className="flex flex-wrap justify-center gap-0.5 max-w-[28px] mt-0.5">
                  {dots.map((color, colorIdx) => (
                    <span
                      key={colorIdx}
                      className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   TodoPane
--------------------------------------------------------- */
function TodoPane({ selectedDate, todos: initialTodos = [], onJump }) {
  const [todos, setTodos] = useState(
    initialTodos.length > 0
      ? initialTodos  
      : [
          { id: 1, text: "", time: "00:00" },
          { id: 2, text: "", time: "00:00" },
          { id: 3, text: "", time: "00:00" },
        ]);

  useEffect(() => {
    if (initialTodos.length > 0) {
      setTodos(initialTodos);
    }
  }, [initialTodos]);

  return (
    <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-3xl font-sans relative">
      {/* 상단 헤더 */}
      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={onJump}
          className="absolute left-0 p-1 text-black hover:bg-gray-100 rounded-lg"
          aria-label="캘린더로 이동"
        >
          <Calendar className="w-6 h-6 stroke-[2]" />
        </button>
        <h2 className="text-xl font-extrabold text-black tracking-tight">
          8월 {selectedDate || 27}일
        </h2>
      </div>

      {/* 새 일정 입력 바 */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-black rounded flex items-center justify-center" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE81A]" />
          <span className="text-gray-300 font-medium text-sm">새 일정</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <BellOff className="w-5 h-5" />
          <Trash2 className="w-5 h-5" />
        </div>
      </div>

      {/* 타임라인 할 일 리스트 */}
      <div className="relative pl-3">
        {/* 세로 타임라인 수직선 */}
        <div className="absolute left-[21px] top-4 bottom-8 w-[1.5px] bg-gray-200" />

        <div className="space-y-4">
          {todos.map((todo) => (
            <div key={todo.id} className="relative flex items-start gap-3 group">
              {/* 타임라인 상의 체크박스 */}
              <div className="z-10 mt-3 bg-white">
                <div className="w-5 h-5 border-2 border-black rounded flex items-center justify-center" />
              </div>

              {/* 입력 박스 카드 */}
              <div className="flex-1 border-2 border-black rounded-lg p-3 flex flex-col justify-between h-24 bg-white">
                <div className="text-gray-300 text-sm font-medium">할 일</div>
                <div className="flex items-center justify-end gap-1.5 text-gray-300 text-xs">
                  <span>{todo.time}</span>
                  <BellOff className="w-3.5 h-3.5" />
                  <X className="w-3.5 h-3.5 cursor-pointer hover:text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function MemoPane() {
  const memos = [
    {
      c: "프로젝트 아이디어\n인덱스 탭에서 필요한 기능을 바로 열 수 있도록 구성하기",
      rot: -2,
      bg: "#FFF6C2", // 노랑
    },
    {
      c: "오늘 할 일\n회의 준비 · 기획서 수정 · 발표 자료 확인",
      rot: 1.5,
      bg: "#FFC1D8", // 분홍
    },
    {
      c: "다음 업데이트\n알람 기능 개선 및 반복 일정 관리",
      rot: -1,
      bg: "#B9E7FF", // 파랑
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p
            className="text-sm font-bold"
            style={{ color: C.ink }}
          >
            메모
          </p>

          <p
            className="text-[10px] mt-0.5"
            style={{ color: C.muted }}
          >
            필요한 내용을 자유롭게 기록해요
          </p>
        </div>

        <button
          className="text-[11px] font-bold px-2.5 py-1 rounded-full"
          style={{
            background: C.yellow,
            color: C.ink,
          }}
        >
          + 새 메모
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 pt-1">
        {memos.map((m, i) => (
          <div
            key={i}
            className="rounded-lg p-3 text-[12px] leading-relaxed"
            style={{
              background: m.bg,
              transform: `rotate(${m.rot}deg)`,
              color: C.ink2,
              whiteSpace: "pre-line",
              boxShadow:
                "0 6px 14px -8px rgba(28,27,23,0.3)",
            }}
          >
            {m.c}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Hero
--------------------------------------------------------- */
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ background: C.paper }}>
      <Sparkles />
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-2 gap-14 items-center relative">
        <Reveal>
          <span
            className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full mb-6"
            style={{ background: C.yellow, color: C.ink }}
          >
            ✦ 하나의 탭, 세 가지 도구
          </span>
          <h1
            className="text-[2.3rem] sm:text-5xl leading-[1.15] font-extrabold mb-6"
            style={{ color: C.ink, fontFamily: "var(--f-display)" }}
          >
            모든 창은,
            <br />
            <span style={{ background: `linear-gradient(transparent 62%, ${C.yellow} 0%)` }}>하나의 탭</span>에서
            시작됩니다
          </h1>
          <p className="text-[15px] sm:text-base leading-relaxed mb-8 max-w-md" style={{ color: C.muted }}>
            해야지를 실행하면 기본 인덱스 탭이 생겨요. 
            할 일, 캘린더, 메모 중 필요한 기능을 골라 탭에 추가하고, 
            내게 꼭 맞는 작업 공간을 만들어보세요.
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="https://github.com/ptyytty/project/releases/download/v1.0.1/Heyaji.Setup.1.0.1.exe"
              className="flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold transition-transform hover:-translate-y-0.5"
              style={{ background: C.ink, color: C.yellow }}
            >
              <WinGlyph size={15} color={C.yellow} />
              Windows 다운로드
            </a>
            <a
              href="#flow"
              className="flex items-center gap-1.5 px-6 py-3.5 rounded-full text-sm font-bold transition-colors"
              style={{ border: `1.5px solid ${C.ink}`, color: C.ink }}
            >
              실행 흐름 보기
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <HubDemo />
        </Reveal>
      </div>
    </section>
  );
}

function Sparkles() {
  const dots = [
    { top: "12%", left: "4%", s: 14, d: "0s" },
    { top: "72%", left: "8%", s: 10, d: "1.1s" },
    { top: "20%", left: "92%", s: 12, d: "0.6s" },
    { top: "85%", left: "88%", s: 16, d: "1.6s" },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
      {dots.map((d, i) => (
        <svg
          key={i}
          className="sparkle"
          style={{ position: "absolute", top: d.top, left: d.left, animationDelay: d.d }}
          width={d.s}
          height={d.s}
          viewBox="0 0 20 20"
        >
          <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill={C.yellow} />
        </svg>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Flow section — real sequence, so numbering is earned
--------------------------------------------------------- */
const FLOW = [
  { t: "프로그램 실행", d: "해야지를 열어요." },
  { t: "허브 실행", d: "메모 인덱스 1개가 자동으로 생성돼요." },
  { t: "창 선택", d: "할 일 · 캘린더 · 메모 중 원하는 창을 골라요." },
  { t: "인덱스 탭에 추가", d: "선택한 창이 인덱스 형태로 탭에 더해져요." },
  { t: "사용", d: "하나의 탭 안에서 자유롭게 오가며 씁니다." },
];

function FlowSection() {
  return (
    <section id="flow" className="py-20 md:py-28" style={{ background: C.ink }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14 md:mb-20">
          <p className="text-[12px] font-bold tracking-wider mb-3" style={{ color: C.yellow }}>
            HOW IT WORKS
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "#fff", fontFamily: "var(--f-display)" }}>
            프로그램 실행 흐름
          </h2>
        </Reveal>

        <div className="relative">
          <div
            className="hidden md:block absolute top-6 left-0 right-0 h-px"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {FLOW.map((step, i) => (
              <Reveal key={step.t} delay={i * 90} className="relative">
                <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-4 md:text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 relative z-10"
                    style={{ background: C.yellow, color: C.ink }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-[15px] mb-1" style={{ color: "#fff" }}>
                      {step.t}
                    </p>
                    <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {step.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Sync section — todo <-> calendar shared-data callout
--------------------------------------------------------- */
function SyncSection() {
  return (
    <section className="py-20 md:py-28" style={{ background: C.cream }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <p className="text-[12px] font-bold tracking-wider mb-3" style={{ color: C.ink }}>
            TO-DO ↔ CALENDAR
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 leading-snug" style={{ color: C.ink, fontFamily: "var(--f-display)" }}>
            같은 데이터를,
            <br />
            다른 방식으로
          </h2>
          <p className="text-[15px] leading-relaxed mb-6 max-w-md" style={{ color: C.muted }}>
            할 일 창과 캘린더 창은 같은 데이터를 서로 다른 화면으로 보여줘요. 
            <br />
            할 일 창에서 캘린더 아이콘을 누르면 캘린더 창이 열리고, 캘린더에서
            <br />
            날짜를 고르면 그날의 할 일 창으로 이동합니다.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              "새 할 일은 캘린더에 점(dot)으로 표시돼요"
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[13.5px]" style={{ color: C.ink2 }}>
                <span className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0" style={{ background: C.yellow }}>
                  <Check size={10} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex items-center justify-center gap-3">
            <MiniWindow icon="✅" label="할 일 창" />
            <div className="flex flex-col items-center gap-1 shrink-0">
              <ChevronRight size={16} style={{ color: C.ink }} />
              <ChevronRight size={16} style={{ color: C.ink, transform: "rotate(180deg)" }} className="-mt-3" />
            </div>
            <MiniWindow icon="📅" label="캘린더 창" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MiniWindow({ icon, label }) {
  return (
    <div
      className="w-40 sm:w-48 rounded-xl overflow-hidden"
      style={{
        background: "#fff",
        border: `1px solid ${C.lineStrong}`,
        boxShadow: "0 20px 40px -20px rgba(28,27,23,0.25)"
      }}
    >
      <div
        className="h-7 flex items-center px-3 gap-1.5"
        style={{ background: C.ink }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: C.yellow }}
        />
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#59584d" }}
        />
      </div>

      <div className="h-28 flex flex-col items-center justify-center gap-2">
        <span className="text-2xl">
          {icon}
        </span>

        <p
          className="text-[11px] font-bold"
          style={{ color: C.ink2 }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Features grid (2x2 — exactly four core features)
--------------------------------------------------------- */
const FEATURES = [
  {
    icon: "✅",
    t: "할 일 관리",
    d: "체크리스트로 오늘의 할 일을 등록하고, 완료 여부와 우선순위를 한눈에 관리하세요."
  },
  {
    icon: "📅",
    t: "캘린더",
    d: "월별 일정을 한눈에 확인하고, 반복 일정과 할 일을 날짜별로 관리하세요."
  },
  {
    icon: "📝",
    t: "메모",
    d: "떠오른 생각이나 필요한 내용을 자유롭게 기록하고 날짜별로 확인하세요."
  },
  {
    icon: "🔔",
    t: "알람",
    d: "할 일과 일정에 알람을 설정해 중요한 일을 놓치지 않도록 알려드려요."
  }
];

function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28" style={{ background: C.paper }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-14 max-w-lg mx-auto">
          <p className="text-[12px] font-bold tracking-wider mb-3" style={{ color: C.ink2 }}>
            CORE FEATURES
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: C.ink, fontFamily: "var(--f-display)" }}>
            세 가지 창, 한 곳에 모아
          </h2>
          <p className="text-[14px]" style={{ color: C.muted }}>
            필요한 창만 골라 인덱스 탭에 더하는 것으로 시작해요.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map(({ icon, t, d }, i) => (
            <Reveal key={t} delay={i * 80}>
              <div
                className="feature-card h-full p-6 md:p-7 rounded-2xl transition-all"
                style={{ background: C.cream, border: `1px solid ${C.line}` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: C.yellow }}
                >
                  <span className="text-2xl leading-none">
                    {icon}
                  </span>
                </div>
                <p className="font-bold text-[16px] mb-2" style={{ color: C.ink }}>
                  {t}
                </p>
                <p className="text-[13.5px] leading-relaxed" style={{ color: C.muted }}>
                  {d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Feature detail — alternating rows, no arbitrary numbering
--------------------------------------------------------- */
const DETAILS = [
  {
    tag: "TO-DO",
    title: "체크리스트로, 오늘을 정리해요",
    body: "할 일을 등록하고 순서를 정해 우선순위대로 처리하세요. 완료한 항목은 바로 표시돼 하루가 눈에 보입니다.",
    bullets: ["할 일 추가 · 완료 체크", "우선순위 설정", "그날의 메모와 함께 보기"],
    icon: "✅",
  },
  {
    tag: "CALENDAR",
    title: "월별 일정을, 한눈에",
    body: "추가한 할 일은 캘린더에 자동으로 표시돼요.",
    bullets: ["월별 캘린더로 전체 일정 파악", "점 표시로 일정 유무 파악", "날짜 선택 시 할 일 창으로 이동"],
    icon: "📅",
  },
  {
    tag: "MEMO",
    title: "생각은, 그 자리에서 바로",
    body: "할 일 옆에 메모 공간이 함께 있어서, 맥락을 잃지 않고 아이디어를 남길 수 있어요.",
    bullets: ["자유로운 메모 작성", "할 일 창에 나란히 표시", "날짜별로 자동 정리"],
    icon: "📝",
  },
  {
    tag: "ALARM",
    title: "중요한 일은, 알림으로 놓치지 않게",
    body: "할 일과 일정에 알림을 설정하고, 정해진 시간이 되면 알림을 받아 중요한 일을 놓치지 않을 수 있어요.",
    bullets: ["할 일·일정 알람 설정", "원하는 시간에 알림 받기", "등록한 일정과 연결된 알림"],
    icon: "🔔",
  },
];

function DetailSection() {
  return (
    <section id="detail" className="py-20 md:py-28" style={{ background: C.paper }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col gap-20 md:gap-28">
        {DETAILS.map((f, i) => (
          <FeatureRow key={f.tag} {...f} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function FeatureRow({ tag, title, body, bullets, icon, reverse }) {
  return (
    <Reveal>
      <div
        className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* 아이콘 영역 */}
        <div
          className={`flex ${
            reverse ? "md:justify-end" : "md:justify-start"
          } justify-center`}
        >
          <div
            className="w-full max-w-md aspect-[4/3] rounded-3xl flex items-center justify-center"
            style={{
              background: C.cream,
              border: `1px solid ${C.line}`,
            }}
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{ background: C.yellow }}
            >
              <span className="text-5xl">{icon}</span>
            </div>
          </div>
        </div>

        {/* 설명 */}
        <div className={reverse ? "md:order-first" : ""}>
          <p
            className="text-[12px] font-bold tracking-wider mb-3"
            style={{ color: C.ink2 }}
          >
            {tag}
          </p>

          <h3
            className="text-2xl sm:text-3xl font-extrabold mb-4 leading-snug"
            style={{
              color: C.ink,
              fontFamily: "var(--f-display)",
            }}
          >
            {title}
          </h3>

          <p
            className="text-[14px] leading-relaxed mb-6"
            style={{ color: C.muted }}
          >
            {body}
          </p>

          <ul className="flex flex-col gap-3">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-2.5 text-[13px]"
                style={{ color: C.ink2 }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: C.yellow }}
                >
                  <Check size={11} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------------------------------------------------
   Download CTA
--------------------------------------------------------- */
function DownloadSection() {
  return (
    <section id="download" className="py-20 md:py-24" style={{ background: C.yellow }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal className="rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8" style={{ background: C.ink }}>
          <div className="text-center lg:text-left">
            <p className="text-[12px] font-bold tracking-wider mb-3" style={{ color: C.yellow }}>
              GET STARTED
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: "#fff", fontFamily: "var(--f-display)" }}>
              지금, 해야지를 시작하세요
            </h2>
            <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.65)" }}>
              하나의 인덱스 탭에서 할 일, 캘린더, 메모를 모두 관리해요.
            </p>
          </div>
          <div
            className="flex items-center gap-4 rounded-2xl p-4 sm:p-5 w-full lg:w-auto"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: C.yellow }}>
              <WinGlyph size={18} color={C.ink} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold" style={{ color: "#fff" }}>
                Windows 버전 다운로드
              </p>
              <p className="text-[11.5px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                HEYAJI_Setup_1.0.0.exe
              </p>
            </div>
            <a
              href="https://github.com/ptyytty/project/releases/download/v1.0.1/Heyaji.Setup.1.0.1.exe"
              className="px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap"
              style={{ background: C.yellow, color: C.ink }}
            >
              다운로드
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Footer
--------------------------------------------------------- */
function Footer() {
  return (
    <footer className="py-12" style={{ background: C.paper, borderTop: `1px solid ${C.line}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row justify-between gap-8">
        <div className="flex items-center gap-2.5">
          <HubMark size={26} />
          <div>
            <p className="font-bold text-[14px]" style={{ color: C.ink }}>
              해야지
            </p>
            <p className="text-[11px]" style={{ color: C.muted }}>
              HEYAJI
            </p>
          </div>
        </div>
        <p className="text-[12px]" style={{ color: C.muted }}>
          © 2026 HEYAJI Team. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------
   App
--------------------------------------------------------- */
export default function App() {
  return (
    <div style={{ background: C.paper, fontFamily: "var(--f-body)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Noto+Sans+KR:wght@400;500;700;900&display=swap');
        :root { --f-display: 'Space Grotesk', 'Noto Sans KR', sans-serif; --f-body: 'Noto Sans KR', sans-serif; }
        * { font-family: var(--f-body); }
        h1, h2, h3, .brand-font { font-family: var(--f-display); }
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }
        .hub-fade { animation: fadeInSoft .35s ease; }
        @keyframes fadeInSoft { from { opacity: 0; transform: translateY(6px);} to { opacity: 1; transform: translateY(0);} }
        .sparkle { animation: floaty 3.4s ease-in-out infinite; }
        @keyframes floaty { 0%,100% { transform: translateY(0) rotate(0deg); opacity: .55; } 50% { transform: translateY(-10px) rotate(12deg); opacity: 1; } }
        .feature-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -24px rgba(28,27,23,0.35); }
        @media (prefers-reduced-motion: reduce) {
          .reveal, .hub-fade, .sparkle, .feature-card { animation: none !important; transition: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      <Header />
      <Hero />
      <FlowSection />
      <SyncSection />
      <FeaturesSection />
      <DetailSection />
      <DownloadSection />
      <Footer />
    </div>
  );
}
