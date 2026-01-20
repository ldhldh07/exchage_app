# 환전 애플리케이션

## 소개

실시간 환율 기반의 환전 서비스입니다.

환전 서비스라는 점에서

- 서버의 환전 정보와의 정합성/최신성
- 요청의 보안
- 환전 요청의 정밀성(에러 처리)

에 초점을 두고 개발을 진행했습니다.

---

## 목차

- [환전 애플리케이션](#환전-애플리케이션)
  - [소개](#소개)
  - [목차](#목차)
  - [배포 주소](#배포-주소)
  - [로컬 실행 방법](#로컬-실행-방법)
    - [요구사항](#요구사항)
    - [설치 및 실행](#설치-및-실행)
  - [주요 기능](#주요-기능)
  - [기술 스택](#기술-스택)
  - [FSD 아키텍처](#fsd-아키텍처)
  - [폴더 구조](#폴더-구조)
    - [파일명 컨벤션](#파일명-컨벤션)
  - [핵심 로직 설명](#핵심-로직-설명)
    - [1. FSD에서 entity와 feature 구분](#1-fsd에서-entity와-feature-구분)
      - [기본 방향성](#기본-방향성)
      - [UI 분류 기준](#ui-분류-기준)
      - [훅 분류 기준](#훅-분류-기준)
    - [2. Vite 대신 Next.js 선택 이유](#2-vite-대신-nextjs-선택-이유)
      - [CORS 문제 해결](#cors-문제-해결)
      - [httpOnly 쿠키 기반 인증](#httponly-쿠키-기반-인증)
    - [3. Route Handlers + TanStack Query 조합](#3-route-handlers--tanstack-query-조합)
      - [왜 Server Action이 아닌 Route Handlers인가?](#왜-server-action이-아닌-route-handlers인가)
    - [4. 실시간 환율 데이터 호출 전략](#4-실시간-환율-데이터-호출-전략)
      - [캐시 설정](#캐시-설정)
      - [환율 변동 감지](#환율-변동-감지)
    - [5. Zod를 통한 런타임 API 검증](#5-zod를-통한-런타임-api-검증)
      - [적용 방식](#적용-방식)
    - [6. 기본 컴포넌트 코드 구조](#6-기본-컴포넌트-코드-구조)
    - [7. 단방향 의존성과 추상화 레이어](#7-단방향-의존성과-추상화-레이어)
  - [고민했던 부분](#고민했던-부분)
    - [1. 커스텀 훅 분리 기준](#1-커스텀-훅-분리-기준)
      - [모든 로직 작성](#모든-로직-작성)
      - [최종 형태](#최종-형태)
    - [2. UI 분리 기준](#2-ui-분리-기준)
      - [Container-Presenter 패턴 적용](#container-presenter-패턴-적용)
    - [3. Context State/Actions 분리로 최적화](#3-context-stateactions-분리로-최적화)
      - [문제 상황](#문제-상황)
      - [해결: Context 분리](#해결-context-분리)
      - [결과](#결과)
    - [4. 상태 관리 - context + params](#4-상태-관리---context--params)
    - [5. 금융 서비스 에러 처리](#5-금융-서비스-에러-처리)
      - [조회 vs 뮤테이션 에러 처리](#조회-vs-뮤테이션-에러-처리)
      - [에러 분류 체계](#에러-분류-체계)
      - [인증 에러 자동 리다이렉트](#인증-에러-자동-리다이렉트)
  - [추가 설계 결정](#추가-설계-결정)
    - [React Query를 이용한 깜빡임 방지](#react-query를-이용한-깜빡임-방지)
    - [렌더링 최적화](#렌더링-최적화)
      - [React.memo로 무한 스크롤 최적화](#reactmemo로-무한-스크롤-최적화)

---

## 배포 주소

https://exchangepractice.vercel.app/

---

## 로컬 실행 방법

<details>
<summary>펼쳐보기</summary>

### 요구사항

- **Node.js**: v20.19+ 또는 v22.12+
- **패키지 매니저**: pnpm

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/exchange-app.git
cd exchange-app

# 2. 의존성 설치
pnpm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 API URL 입력
# NEXT_PUBLIC_API_URL=https://api.example.com

# 4. 개발 서버 실행
pnpm dev
```

</details>

---

## 주요 기능

- **로그인/로그아웃**
  - httpOnly 쿠키 기반 인증
  - CSRF 토큰 검증
  - 미들웨어를 통한 라우트 보호

- **실시간 환율 조회**
  - 1분 주기 자동 갱신 (refetchInterval)
  - USD/JPY 통화 지원

- **환전 견적 조회 및 주문**
  - 살래요/팔래요 토글
  - 실시간 견적 계산
  - 환율 변동 시 자동 감지

- **환전 내역 조회**
  - 무한 스크롤
  - 클라이언트 페이지네이션

- **지갑 잔액 조회**
  - KRW/USD/JPY 잔액 표시
  - 환전 후 자동 갱신

---

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **서버 상태**: TanStack Query
- **폼 관리**: React Hook Form + Zod
- **서버 통신**: Route Handlers (조회) + Server Actions (mutation)
- **인증**: httpOnly Cookie + CSRF Token

---

## FSD 아키텍처

FSD(Feature-Sliced Design) 아키텍처를 기반으로 폴더 구조를 설계했습니다.

레이어, 슬라이스, 세그먼트를 통해 수직적, 수평적으로 코드를 분리하면서 그 기준을 세우고자 했습니다:

- 높은 응집도와 낮은 결합도
- 일관성 있는 관심사 분리
- 단방향 의존성

---

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # 메인 레이아웃 그룹
│   │   ├── page.tsx       # 환전 메인
│   │   └── history/       # 환전 내역
│   ├── login/             # 로그인 페이지
│   └── api/               # Route Handlers (BFF)
│       ├── csrf/          # CSRF 토큰 발급
│       ├── exchange-rates/# 환율 조회
│       ├── wallets/       # 지갑 조회
│       └── orders/        # 주문 조회/견적
│
├── widgets/               # 페이지 조합 컴포넌트
│   ├── exchange-form/     # 환전 폼 위젯
│   ├── exchange-rate-info/# 환율 정보 위젯
│   ├── header/            # 헤더 위젯
│   └── order-history/     # 주문 내역 위젯
│
├── features/              # 유즈케이스
│   ├── auth/              # 인증 (로그인/로그아웃)
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── server/        # Server Actions
│   │   └── ui/
│   ├── exchange/          # 환전
│   │   ├── context/       # 폼 상태 Context
│   │   ├── hooks/
│   │   ├── server/        # Server Actions
│   │   └── ui/
│   ├── exchange-rate/     # 환율 표시
│   ├── order-history/     # 주문 내역
│   └── wallet/            # 지갑 정보
│
├── entities/              # 도메인 모델
│   ├── auth/              # 인증 스키마, API
│   ├── exchange-rate/     # 환율 데이터
│   │   ├── api/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── models/
│   │   └── ui/
│   ├── layout/            # 레이아웃 UI
│   ├── order/             # 주문 데이터
│   └── wallet/            # 지갑 데이터
│
└── shared/                # 공통 모듈
    ├── config/            # 설정 (API, 라우트, 상수)
    ├── hooks/             # 공통 훅
    ├── lib/               # 유틸리티
    │   ├── errors/        # 에러 클래스
    │   ├── fetchWithAuth.ts
    │   ├── retry.ts
    │   └── validate.ts
    └── ui/                # 공통 UI 컴포넌트
```

### 파일명 컨벤션

폴더 깊이가 지나치게 깊어질 수 있는 fsd의 단점을 보완했습니다.

도메인 이름을 기준으로 중복 확장자를 통해 역할을 구분합니다.

```
exchange-rate.schema.ts   # Zod 스키마
exchange-rate.type.ts     # 타입 정의
mapper.ts                 # 데이터 변환 함수
queryKeys.ts              # Query Key Factory
```

---

## 핵심 로직 설명

### 1. FSD에서 entity와 feature 구분

FSD의 역할을 구분하는 데 있어서 entity와 feature를 구분하는 것에 가장 많은 고민이 필요했습니다.

#### 기본 방향성

- **feature**: 유즈케이스 관점에서 사용자 시나리오의 동작
  - UI는 비즈니스 로직이 추상화되어야 함
  - 사이드 이펙트 포함
- **entity**: 직접적으로 데이터를 다룸
  - 외부 라이브러리 의존성 격리
  - UI는 순수하게 UI만

#### UI 분류 기준

Container-Presenter 패턴과 유사합니다. features의 UI가 Container 역할을 하고, entities의 UI가 Presenter 역할을 합니다.

```tsx
// features/exchange/ui/ExchangeFormContainer.tsx (Container)
function ExchangeFormContent() {
  const { quote, isPending, isValid, serverError, retryCount, handleSubmit } =
    useExchangeFormContext();

  return (
    <OrderForm
      isPending={isPending}
      isValid={isValid}
      hasQuote={!!quote}
      serverError={serverError}
      retryCount={retryCount}
      onSubmit={handleSubmit}
    >
      <ExchangeFormHeader />
      <BuySellToggle />
      <AmountInputContainer />
      <QuoteResultContainer />
    </OrderForm>
  );
}

export function ExchangeFormContainer() {
  return (
    <ExchangeFormProvider>
      <ExchangeFormContent />
    </ExchangeFormProvider>
  );
}
```

```tsx
// entities/order/ui/OrderForm.tsx (Presenter)
export function OrderForm({
  isPending,
  isValid,
  hasQuote,
  serverError,
  retryCount = 0,
  onSubmit,
  children,
}: Readonly<OrderFormProps>) {
  return (
    <div className="flex flex-col justify-between h-[787px] bg-gray-000 border border-gray-300 rounded-xl py-6 px-8">
      (...)
    </div>
  );
}
```

#### 훅 분류 기준

- **shared**: 단순 계산, 비즈니스 로직 없음 (예: `useUrlParam`)
- **entities**: 도메인 데이터 관리, 비즈니스 로직 없음 (예: `useExchangeRates`)
- **features**: 사용자 시나리오/유즈케이스 관점, 비즈니스 로직 포함 (예: `useExchangeSubmit`)

---

### 2. Vite 대신 Next.js 선택 이유

처음에는 React + Vite를 고려했지만, 이 프로젝트에는 Next.js가 더 적합하다고 판단했습니다.

#### CORS 문제 해결

외부 API가 CORS를 허용하지 않아 클라이언트에서 직접 호출 불가능하지만 서버 액션에서는 가능합니다.

#### httpOnly 쿠키 기반 인증

httpOnly 쿠키는 JavaScript에서 접근할 수 없어 XSS 공격으로부터 토큰을 보호합니다.

이 쿠키는 서버의 Set-Cookie 헤더로 설정 가능합니다.

```ts
// Server Action에서 httpOnly 쿠키 설정
cookieStore.set("accessToken", token, {
  httpOnly: true, // JavaScript 접근 차단
  secure: true, // HTTPS 전용
  sameSite: "lax", // CSRF 방지
});
```

---

### 3. Route Handlers + TanStack Query 조합

TanStack Query만 쓰면 httpOnly 쿠키에 접근할 수 없고, 직접 외부 API를 호출하면 CORS 문제가 발생합니다.

그래서 **Route Handlers를 BFF(Backend For Frontend)로 사용**합니다:

```
Client (useQuery)
    ↓ fetch('/api/wallets')
Route Handler (app/api/wallets/route.ts)
    ↓ cookies() → 토큰 읽기
    ↓ fetch(외부 API)
    ↓ JSON 응답 반환
Client
    ↓ 데이터 사용 또는 에러 처리
```

- **TanStack Query**: 캐싱, 자동 갱신(refetchInterval), 로딩/에러 상태 관리
- **Route Handlers**: httpOnly 쿠키 접근, CORS 우회, 인증 에러 시 쿠키 삭제

#### 왜 Server Action이 아닌 Route Handlers인가?

처음에는 `useQuery({ queryFn: () => serverAction() })` 패턴을 사용했으나, **인증 만료 시 리다이렉트가 작동하지 않는 문제**가 있었습니다.

**문제 패턴 1: 서버 컴포넌트 렌더링 에러**

Server Action에서 에러를 throw하면, useQuery가 처리하기 전에 서버 컴포넌트 렌더링 자체가 실패합니다.

```
토큰 만료 → Server Action에서 UnauthorizedError throw
    ↓
서버 컴포넌트 렌더링 실패
    ↓
"An error occurred in the Server Components render" 메시지 표시
    ↓
리다이렉트 로직 실행 안 됨
```

**문제 패턴 2: NEXT_REDIRECT 에러**

Server Action 내부에서 `redirect('/login')`를 호출하면 Next.js가 `NEXT_REDIRECT` 예외를 throw합니다. 이 예외는 Next.js 내부에서 catch되어야 실제 navigation으로 변환되는데, TanStack Query의 `queryFn` 컨텍스트에서는 **TanStack Query가 먼저 catch**해버려서 일반 에러로 처리됩니다.

```
토큰 만료 → Server Action에서 redirect('/login') 호출
    ↓
Next.js가 NEXT_REDIRECT 예외 throw
    ↓
useQuery가 이를 일반 에러로 catch
    ↓
"NEXT_REDIRECT" 에러 메시지 표시, 실제 리다이렉트 안 됨
```

**문제의 핵심: 서버에서 에러를 throw하면 안 됨**

두 패턴 모두 **서버에서 예외를 throw**하는 것이 문제였습니다. Server Action 컨텍스트에서 throw된 예외는 TanStack Query나 Next.js가 의도대로 처리하지 못합니다.

**해결의 핵심: throw 대신 JSON 응답 → 클라이언트에서 리다이렉트**

Route Handlers는 예외를 throw하지 않고 **JSON 응답을 반환**합니다. 클라이언트가 이 JSON을 받아서 `errorCode`를 확인하고 직접 리다이렉트할 수 있습니다.

```typescript
// API Route (서버) - throw 대신 JSON 반환
return NextResponse.json(
  { success: false, errorCode: "UNAUTHORIZED", message: "인증이 필요합니다." },
  { status: 401 }
);

// apiClient (클라이언트) - JSON 확인 후 리다이렉트
if (result.errorCode === "UNAUTHORIZED") {
  window.location.href = "/login";
}
```

부가적으로 HTTP 상태 코드(401, 500 등)를 명시적으로 반환할 수 있어 디버깅과 모니터링에도 유리합니다.

---

### 4. 실시간 환율 데이터 호출 전략

환전 서비스에서 환율 데이터는 최신성이 매우 중요합니다.

요구사항에도 포함된 사항으로 1분마다 기존 데이터를 무효화하고 최신 데이터를 refetch합니다.

#### 캐시 설정

```tsx
// entities/exchange-rate/hooks/useExchangeRates.ts
export const useExchangeRates = () => {
  return useQuery({
    queryKey: exchangeRateKeys.latest(),
    queryFn: getExchangeRates,
    staleTime: 1000 * 60, // 1분간 fresh 상태
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
    retry: shouldRetryQuery,
  });
};
```

#### 환율 변동 감지

1분 폴링으로 최대한의 최신성을 보장했지만 그럼에도 완전한 최신 데이터가 아니기에 생기는 문제가 있습니다.

- 환율을 확인한 후 데이터가 바뀌었으며, refetch 되기전에 환전 신청한 경우

이 경우 서버에서 exchangeId 비교를 통해 최신 데이터인지 확인해서 에러 응답을 해줍니다.

- 클라이언트에서 비교해서 2차검증해줄수도 있지만 단일 진실원에서 관련 데이터 로직은 진행되는 것이 더 바람직합니다.

- 클라이언트의 책임은 해당 에러의 응답을 안내해주고 그 시점에서 다시 캐시 데이터를 무효화해줍니다.

```tsx
// features/exchange/hooks/useExchangeSubmit.ts
if (result.errorCode === ERROR_CODES.EXCHANGE_RATE_MISMATCH) {
  // 환율과 견적 모두 무효화 → 자동 refetch
  queryClient.invalidateQueries({ queryKey: exchangeRateKeys.all });
  queryClient.invalidateQueries({ queryKey: orderQuoteKeys.all });
  // serverError에 "환율이 변동되었습니다. 다시 시도해주세요." 표시
}
```

---

### 5. Zod를 통한 런타임 API 검증

외부 API 응답은 신뢰할 수 없는 영역입니다. TypeScript 타입은 컴파일 타임에만 검증되니까 런타임에 뭐가 들어올지 모릅니다.

Zod로 런타임 검증을 하면:

- 백엔드 스펙이 바뀌었을 때 즉시 감지 가능
- 실제 검증 기반의 타입 안전성
- 금융 서비스에서 잘못된 데이터가 UI에 표시되는 걸 방지

#### 적용 방식

```tsx
// API 함수에서 응답 검증
const parsed = ExchangeRateListResponseSchema.safeParse(result);
if (!parsed.success) {
  throw new ResponseParseError(); // 스키마 불일치 시 명확한 에러
}
return parsed.data.data;
```

백엔드 API 스펙이 변경되면 프론트엔드에서 `ResponseParseError`로 즉시 감지됩니다.

---

### 6. 기본 컴포넌트 코드 구조

features 컴포넌트는 다음 구조를 따릅니다:

```tsx
export const ToggleFavoriteButton = ({ location }: Props) => {
  // 1. Custom Hook - 비즈니스 로직 추상화
  const favorite = useFavoriteByLocation(location);
  const { addFavorite, removeFavorite } = useFavoriteActions();

  // 2. Computed
  const isFavorite = !!favorite;

  // 3. Event Handler - 컴포넌트의 ui 속성으로 취급
  const handleToggle = () => {
    if (isFavorite && favorite) {
      removeFavorite(favorite.id);
    } else {
      addFavorite(location);
    }
  };

  // 4. UI - entities의 순수 UI에 로직 주입
  return <FavoriteStarButton isFavorite={isFavorite} onClick={handleToggle} />;
};
```

**핵심:**

- 커스텀 훅으로 데이터/액션 추상화
- 컴퓨티드 밸류로 파생 상태 명시
- 이벤트 핸들러에 비즈니스 로직 캡슐화
- entities의 순수 UI 컴포넌트에 props로 주입

---

### 7. 단방향 의존성과 추상화 레이어

FSD에서는 하위 레이어에서 상위 레이어를 import하는 의존성 역전을 금지합니다.

의존성을 역전하지 않도록 하다 보면 자연스럽게 단계적인 추상화 레이어 구성이 됩니다.

- 단방향 데이터 흐름으로 예측 가능한 코드 작성이 가능
- 의존성 관리의 복잡도가 감소합니다.

이 요소를 강제하기 위해 eslint의 플러그인을 사용했습니다.

- 절대경로와 index를 이용한 경로

---

## 고민했던 부분

### 1. 커스텀 훅 분리 기준

비즈니스 로직을 Custom Hook으로 추상화할 때 어느 수준으로 추상화해야 할지 고민했습니다.

#### 모든 로직 작성

```tsx
// ExchangeForm.tsx
export const ExchangeForm = () => {
  const { data: rates } = useExchangeRates();
  const { data: wallets } = useWallets();
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState("");

  const currentRate = rates?.find((r) => r.currency === currency);
  const quote = amount ? calculateQuote(amount, currentRate) : null;

  // ...폼 로직이 컴포넌트에 노출됨
};
```

문제점:

- 컴포넌트가 세부 구현(How)에 의존
- 테스트하기 어려움
- 재사용성 낮음

#### 최종 형태

```tsx
// features/exchange/ui/ExchangeFormContainer.tsx
export function ExchangeFormContent() {
  const { quote, isPending, handleSubmit } = useExchangeFormContext();

  return <OrderForm onSubmit={handleSubmit} />;
}
```

- **선언적 프로그래밍**: 컨테이너는 What(무엇)에만 집중, How(어떻게)는 훅/Context 내부로 캡슐화
- **관심사 분리**: 각 모듈의 책임이 명확
- **데이터 로직이 UI 구조에 종속되지 않음**: UI 변경 시 훅 로직 수정 불필요

---

### 2. UI 분리 기준

#### Container-Presenter 패턴 적용

```tsx
// features/exchange/ui/AmountInputContainer.tsx (Container)
export function AmountInputContainer() {
  const { formState, errors } = useExchangeFormState();
  const { setAmount } = useExchangeFormActions();

  return (
    <AmountInput
      currency={formState.currency}
      value={formState.amount}
      onChange={setAmount}
      error={errors.amount?.message}
    />
  );
}
```

```tsx
// entities/order/ui/AmountInput.tsx (Presenter)
export function AmountInput({ currency, value, onChange, error }: Props) {
  return (
    <div>
      <label className="text-sm text-gray-500">환전할 금액</label>
      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <span className="text-gray-700">{currency}</span>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
```

---

### 3. Context State/Actions 분리로 최적화

환전 폼에서 불필요한 리렌더링을 방지하기 위해 State와 Actions Context를 분리하여 메모이제이션했습니다.

#### 문제 상황

```tsx
// 하나의 Context에 모든 것을 담으면
const ExchangeFormContext = createContext({ state, actions });

// state가 변경될 때마다 actions만 사용하는 컴포넌트도 리렌더링됨
```

#### 해결: Context 분리

```tsx
// features/exchange/context/ExchangeFormContext.tsx
const ExchangeFormStateContext = createContext<ExchangeFormState | null>(null);
const ExchangeFormActionsContext = createContext<ExchangeFormActions | null>(null);

export function useExchangeFormState() {
  const context = useContext(ExchangeFormStateContext);
  if (!context) {
    throw new Error("useExchangeFormState must be used within ExchangeFormProvider");
  }
  return context;
}

export function useExchangeFormActions() {
  const context = useContext(ExchangeFormActionsContext);
  if (!context) {
    throw new Error("useExchangeFormActions must be used within ExchangeFormProvider");
  }
  return context;
}
```

```tsx
// Actions를 useRef로 안정화
const actionsRef = useRef<ExchangeFormActions>({
  setCurrency,
  setOrderType,
  setAmount,
  handleSubmit,
});

actionsRef.current = {
  setCurrency,
  setOrderType,
  setAmount,
  handleSubmit,
};

const actions = useMemo<ExchangeFormActions>(
  () => ({
    setCurrency: (...args) => actionsRef.current.setCurrency(...args),
    setOrderType: (...args) => actionsRef.current.setOrderType(...args),
    setAmount: (...args) => actionsRef.current.setAmount(...args),
    handleSubmit: () => actionsRef.current.handleSubmit(),
  }),
  [], // 빈 의존성 → 절대 변경되지 않음
);
```

#### 결과

```tsx
// Actions만 사용하는 컴포넌트는 state 변경에 영향 없음
function BuySellToggle() {
  const { setOrderType } = useExchangeFormActions();
  // state가 변경되어도 리렌더링되지 않음
}
```

---

### 4. 상태 관리 - context + params

환전하기 상태 및 액션 관리는 useContext를 사용하여 의존성을 주입했습니다.

- 부모 컴포넌트에 모두 비즈니스 로직을 작성후 prop할경우 복잡도가 높아집니다.

그중 currency와 orderType은 url의 파라미터로 관리했습니다.

- 새로고침해도 통화/거래 유형 유지
- `/?currency=JPY&type=sell` 링크로 상태 공유 가능
- 브라우저 뒤로가기로 이전 상태 복원

위 특징이 다른 데이터들과 달리 요구되는 설정 성격에 상태였기 떄문입니다.

---

### 5. 금융 서비스 에러 처리

환전 서비스는 에러 처리가 특히 중요합니다. 일반 서비스랑 다른 점:

- 에러 시 "다시 시도해주세요"가 아니라 "환전이 진행 중인지, 실패했는지" 명확해야 함
- 중복 요청이 불편함이 아니라 금전적 손실
- 세션 만료 시 단순 재로그인이 아니라 진행 중 거래 상태 확인이 필요

#### 조회 vs 뮤테이션 에러 처리

조회는 Route Handlers, 뮤테이션은 Server Action을 사용하며 에러 처리 방식이 다릅니다.

**조회 (Route Handlers + useQuery)**

```tsx
// Route Handler가 JSON 에러 반환 → apiClient가 감지 → 401이면 리다이렉트
const query = useQuery({
  queryFn: () => apiClient("/api/exchange-rates"),
});
```

**뮤테이션 (Server Action 직접 호출)**

```tsx
// Server Action에서 try-catch → 결과 객체 반환
const result = await createOrderAction(request);
if (!result.success) {
  setServerError(result.error);
}
```

뮤테이션에서 throw 안 하는 이유:

- useMutation을 사용하는 대신 서버 액션에서 권장되는 useTransition을 사용
- Server Action에서 throw된 Error는 serialize되면서 `instanceof` 체크 불가
- 커스텀 프로퍼티(`code`, `reason`) 손실

그래서 `{ success, errorCode }` 형태로 반환해서 에러 정보를 보존합니다.

#### 에러 분류 체계

```
BaseError
├── ApiError (서버 응답 에러)
│   └── UnauthorizedError (인증 실패)
├── DomainError (비즈니스 규칙 위반)
│   ├── InsufficientBalanceError (잔액 부족)
│   └── ExchangeRateMismatchError (환율 변동)
├── NetworkError (네트워크 오류)
└── ResponseParseError (응답 파싱 실패)
```

에러 정책에 따라 에러 처리를 중앙에서 관리했습니다.

- 에러 처리를 ui 레이어가 아닌 데이터 레이어에서 관리
- ui의 책임은 에러 상태와 메세지만 받아서 출력하는 것

각 ui 컴포넌트에 에러 처리 코드가 분산되어 있지 않도록 했습니다

#### 인증 에러 자동 리다이렉트

토큰 인증 절차에 있어서 토큰 만료시 refresh token이 있는것이 아닌 유효성이 만료되는 방식이었습니다.

토큰이 만료될 경우 로그인 페이지로 리다이렉트했습니다.

```tsx
// src/shared/lib/apiClient.ts - 401 응답 시 자동 리다이렉트
if (result.errorCode === "UNAUTHORIZED") {
  window.location.href = "/login";
  throw new Error(result.message);
}
```

Route Handler에서는 401 응답 시 서버 측 쿠키도 함께 삭제합니다:

```tsx
// src/app/api/wallets/route.ts
if (response.status === 401 || data.code === "UNAUTHORIZED") {
  cookieStore.delete("accessToken");
  cookieStore.delete("memberId");
}
```

---

## 추가 설계 결정

### React Query를 이용한 깜빡임 방지

사용자가 금액을 변경할 때 재요청을 해서 캐시값이 무효화되고 반환값을 받는동안 값이 깜빡일 수 있습니다.

placeholderData를 통해 이전 결과를 유지하여 UI 깜빡임을 방지합니다.

```tsx
const query = useQuery({
  queryKey: orderQuoteKeys.quote(orderType, quoteParams),
  queryFn: () => getOrderQuote(quoteParams),
  placeholderData: lastQuoteRef.current ?? undefined, // 이전 값 유지
});
```

---

### 렌더링 최적화

#### React.memo로 무한 스크롤 최적화

```tsx
// entities/order/ui/OrderHistoryRow.tsx
import { memo } from "react";

const OrderHistoryRow = memo(function OrderHistoryRow({ order }: Props) {
  return (
    <tr>
      <td>{order.date}</td>
      <td>{order.currency}</td>
      <td>{order.amount}</td>
      <td>{order.rate}</td>
    </tr>
  );
});
```

무한 스크롤로 데이터가 추가될 때 기존 행들의 불필요한 리렌더링을 방지합니다.
