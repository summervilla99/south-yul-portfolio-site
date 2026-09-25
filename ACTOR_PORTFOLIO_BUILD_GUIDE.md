# Actor Portfolio Build Guide

이 문서는 다른 배우의 포트폴리오 웹사이트를 지금 사이트와 비슷한 완성도로 빠르게 제작하기 위한 재사용용 브리프다.

목표:
- 이 `md` 파일 1개와 배우별 자료만 제공하면
- 현재 `namyul-portfolio` 수준의 구조, 무드, 정보 설계, 인터랙션을 가진 사이트를
- 일관된 품질로 다시 만들 수 있어야 한다.

이 문서는 2가지 용도로 쓴다.
- 1. 사람에게 전달하는 제작 명세서
- 2. Codex / ChatGPT / AI 코딩 에이전트에게 업로드해서 바로 제작 요청하는 입력 문서

---

## 1. 이 문서를 사용할 때의 요청 방법

아래처럼 요청하면 된다.

```md
첨부한 `ACTOR_PORTFOLIO_BUILD_GUIDE.md`를 기준으로 배우 포트폴리오 웹을 만들어줘.

- 현재 프로젝트 구조를 유지해도 좋고, 필요하면 정리해도 좋아.
- 디자인 무드는 문서 기준으로 맞춰줘.
- 모든 텍스트와 미디어는 첨부 자료 기준으로 반영해줘.
- 모바일 완성도까지 꼭 챙겨줘.
- 구현 후 빌드 확인, 배포, GitHub 푸시까지 진행해줘.
```

함께 주면 좋은 것:
- 배우 프로필 PDF
- 사진 폴더
- 작품별 썸네일 폴더
- 랜딩 영상
- 인스타그램 / 유튜브 / 이메일 / 연락처 정보
- 필모그래피 텍스트

---

## 2. 웹사이트의 기본 목표

이 사이트는 단순 이력서형 소개 페이지가 아니라, 배우의 무드와 작업 세계를 전달하는 디지털 포트폴리오다.

핵심 방향:
- 배우가 먼저 보여야 한다.
- UI는 조용해야 한다.
- 정보는 정돈되어 있어야 한다.
- 영상, 사진, 필모그래피, 연락 동선이 핵심이다.
- 모바일에서 보기에 더 좋아야 한다.

한 줄 철학:

> Less Interface, More Actor.

---

## 3. 기본 사이트 구조

사이트는 단일 페이지 구조를 기본으로 한다.

```text
Landing
Portfolio
Photos
Contact
```

필수 섹션:
- `Landing`
- `Portfolio`
- `Photos`
- `Contact`

권장 네비게이션:
- `PORTFOLIO`
- `PHOTOS`
- `CONTACT`
- `EN / KR`

---

## 4. 디자인 원칙

### 4-1. 전체 무드

다음 키워드를 기준으로 디자인한다.

- editorial
- cinematic
- quiet luxury
- minimal
- actor-first
- dark neutral base
- restrained motion

피해야 할 것:
- 과한 그라데이션
- 복잡한 카드 UI
- 지나치게 밝은 배경
- 텍스트가 너무 큰 타이포
- 과한 애니메이션
- 전형적인 스타트업 랜딩페이지 느낌

### 4-2. 레이아웃 원칙

- 여백이 넉넉해야 한다.
- 정보는 단순하지만 허전하면 안 된다.
- 텍스트는 크게 주장하지 않는다.
- 썸네일, 영상, 사진이 주인공이다.
- 모바일에서는 데스크톱 축소가 아니라 재배치가 필요하다.

### 4-3. 폰트 방향

권장:
- 한글: 정돈된 명조 또는 절제된 산세리프
- 영문: 에디토리얼 무드의 serif

현재 프로젝트 참고:
- 한글 본문: `Noto Sans KR`
- 한글 디스플레이: `Song Myung`
- 영문 디스플레이: `Cormorant Garamond`

---

## 5. 필수 기능 요구사항

### 5-1. Landing

필수:
- 전체 화면 hero video
- 자동 재생
- 음소거
- loop
- mobile `playsInline`
- 너무 진하지 않은 overlay

권장:
- 상단 고정 nav
- 우하단 `PERSONAL INFO` 카드
- info 카드는 접기/펼치기 가능
- 접었을 때 우하단 작은 floating card로 남기기

Landing에 불필요한 텍스트는 최소화한다.

### 5-2. Portfolio

필수:
- 카테고리별 작품 섹션
- 예: `DRAMA`, `THEATER`, `FILM`, `MV / COMMERCIALS`
- 작품별 카드
- 좌측 썸네일 / 우측 텍스트 구조
- 썸네일이 여러 장이면 1장만 먼저 보여주고 hover/click으로 넘기기
- 썸네일 클릭 시 라이트박스 열기
- 썸네일이 없는 작품도 레이아웃 균형 유지

각 카드에 들어갈 수 있는 정보:
- 연도
- 작품명
- 설명
- 역할명
- 비고
- 공개예정 여부
- 외부 링크

### 5-3. Photos

필수:
- 카테고리별 갤러리
- 최소 3개 섹션 권장

현재 권장 구조:
- `PROFILE`
- `SNAP`
- `DAILY`

필수 동작:
- 사진 클릭 시 라이트박스
- 모바일 대응
- lazy loading

### 5-4. Contact

현재 권장 방식:
- 폼보다 빠른 직접 문의 동선
- `Instagram DM`
- `Email`

모달 안에 들어갈 내용:
- 간단한 비즈니스용 안내 문구
- 인스타 링크
- 이메일 링크

### 5-5. 다국어

필수:
- `KR / EN` 전환
- 헤더에서 즉시 전환 가능
- 최소 다음 요소는 전환되어야 한다.

전환 대상:
- 섹션 제목
- 소개 문구
- personal info 항목명
- 사진 섹션 설명
- contact 문구
- 포트폴리오 작품 설명

---

## 6. 기술 구현 기준

기본 권장 스택:
- `Next.js`
- `App Router`
- 정적 렌더링 중심
- CSS 직접 관리
- 최소한의 client interaction

필수 구현 포인트:
- lazy loading
- lightbox
- 고정 navigation
- locale toggle
- modal
- scroll-based reveal
- mobile responsive

주의:
- locale 전환 시 재렌더되는 카드에 reveal animation이 다시 정상 적용되어야 한다.
- 영상은 모바일 autoplay 제한을 고려해 `muted playsInline`을 반드시 넣는다.
- 큰 이미지는 lazy loading만으로 끝내지 말고 파일 자체도 가볍게 관리한다.

---

## 7. 미디어 운영 원칙

### 7-1. 업로드 위치

권장 우선순위:
- `GitHub repository`에 정적 파일 보관
- Vercel로 배포

이유:
- 무료
- 버전 관리 쉬움
- 링크 구조 명확
- 사이트와 같이 관리 가능

대안:
- `Cloudinary`

Cloudinary가 적합한 경우:
- 이미지 수가 매우 많다
- 자동 변환/최적화가 꼭 필요하다
- CDN 변형 기능을 적극 활용한다

### 7-2. 영상

권장 파일:
- `public/video/landing-reel.mp4`

권장 조건:
- 무음
- 웹 재생 최적화
- 너무 큰 용량 금지

권장 용량:
- hero video는 가능하면 `20MB~80MB` 안쪽

### 7-3. 사진

권장 저장 위치:

```text
public/photos/profile/
public/photos/snaps/
public/photos/daily/
```

권장 형식:
- `.jpg`
- `.jpeg`
- `.png`
- 필요시 `.webp`

권장:
- 긴 변 2000px 이하로 정리
- 파일당 300KB~1.5MB 수준 권장

### 7-4. 작품 썸네일

권장 저장 위치:

```text
public/thumbnails/<work-key>/
```

예시:

```text
public/thumbnails/drama-shortpaper-style/1.jpg
public/thumbnails/drama-shortpaper-style/2.jpg
public/thumbnails/film-example/1.jpg
```

파일명 규칙:
- 여러 장이면 `1`, `2`, `3`
- work key는 영어 소문자 kebab-case
- 띄어쓰기, 한글, 특수문자 최소화

---

## 8. 제작 전에 꼭 받아야 하는 입력 정보

이 항목이 빠지면 완성도가 흔들린다.

### 8-1. 기본 프로필

```yaml
actor:
  korean_name:
  english_name:
  birth:
  age:
  height:
  weight:
  talents:
  hobbies:
  email:
  instagram:
  youtube:
```

선택:
- phone
- agency
- specialty

### 8-2. 소개 문구

한국어와 영어를 각각 받는 것이 가장 좋다.

```yaml
intro:
  ko: |
    안녕하세요, 배우 OOO입니다.
    ...
  en: |
    Hello, I'm OOO.
    ...
```

### 8-3. 필모그래피

카테고리별로 정리해서 받는다.

권장 포맷:

```yaml
portfolio_sections:
  - title: DRAMA
    description_ko:
    description_en:
    entries:
      - year:
        title_ko:
        title_en:
        role_ko:
        role_en:
        detail_ko:
        detail_en:
        note_ko:
        note_en:
        description_ko: |
          ...
        description_en: |
          ...
        thumbnail_key:
        has_visual: true
        external_url:
```

### 8-4. 사진 섹션 설명

```yaml
photo_sections:
  profile:
    title_ko: PROFILE
    title_en: PROFILE
    description_ko:
    description_en:
  snaps:
    title_ko: SNAP
    title_en: SNAP
    description_ko:
    description_en:
  daily:
    title_ko: DAILY
    title_en: DAILY
    description_ko:
    description_en:
```

### 8-5. 랜딩 영상

필수 확인:
- 어떤 파일을 쓸지
- 소리 없이 재생 가능한지
- poster가 필요한지

---

## 9. 작품 데이터 작성 규칙

### 9-1. 제목 규칙

권장:
- `웹드라마 <작품명>`
- `연극 <작품명>`
- `단편 <작품명>`
- `NETFLIX <작품명>`
- `Disney+ <작품명>`

피해야 할 것:
- 따옴표 형식 혼용
- 작품명 표기법 불일치

### 9-2. 설명 규칙

설명은 아래 우선순위로 작성한다.

우선순위:
- 공식 시놉시스
- 공식 기사 기반 요약
- 사용자가 제공한 로그라인
- 정보가 없으면 짧고 절제된 설명

권장 길이:
- 1~4문단 이내
- 너무 길면 줄바꿈으로 읽기 정리

### 9-3. 역할 / 비고 규칙

권장 출력 조합:

```text
남율 역 | 주연
백호 역 | 극단 예인 | R&J씨어터
덕환 역 | 단역 | 공개예정
```

### 9-4. 썸네일 없는 작품

아직 공개 전이거나 이미지가 없으면:
- 좌측 시각 영역은 빈 균형 칸 유지
- 우측 텍스트만 보이게 정리
- 전체 정렬이 흐트러지지 않도록 한다

---

## 10. 권장 파일 / 폴더 구조

```text
app/
  globals.css
  layout.js
  page.js

components/
  portfolio.js
  portfolio-page-client.js
  work-section-client.js
  photo-gallery.js
  personal-info-card.js

lib/
  portfolio-data.js
  site-content.js
  cloudinary.js
  placeholder-svg.js

public/
  video/
    landing-reel.mp4
  photos/
    profile/
    snaps/
    daily/
  thumbnails/
    <work-key>/
      1.jpg
      2.jpg
```

구조 원칙:
- 정적 자산은 `public/`
- 텍스트 데이터는 `lib/`
- 클라이언트 인터랙션은 `components/`

---

## 11. 다국어 데이터 관리 기준

다국어는 하드코딩으로 흩어놓지 말고 데이터로 분리한다.

권장 파일:
- `lib/site-content.js`

분리 대상:
- 네비게이션 문구
- 소개문
- personal info 라벨
- contact 문구
- 사진 섹션 문구
- footer 링크
- 포트폴리오 영문 데이터

원칙:
- `ko`, `en` 키 기준
- locale switch 시 컴포넌트가 즉시 전환
- locale 변경 후 애니메이션/observer 재적용 확인

---

## 12. 반응형 기준

반드시 모바일 우선으로 본다.

체크 포인트:
- 상단 nav가 너무 작아지지 않는지
- 랜딩 영상이 잘리는 대신 자연스럽게 cover 되는지
- personal info floating card가 safe-area 침범하지 않는지
- 작품 카드 썸네일과 텍스트가 세로로 자연스럽게 쌓이는지
- 사진 2열/1열 전환이 자연스러운지
- 모달이 모바일 화면에서 넘치지 않는지

모바일에서 특히 중요:
- 터치 가능한 버튼 크기
- hover 의존 기능의 대체 click 동작
- 너무 긴 텍스트 줄폭 방지

---

## 13. 품질 체크리스트

제작 완료 후 아래를 반드시 확인한다.

### 디자인
- 배우보다 UI가 더 튀지 않는가
- 폰트 크기가 과하지 않은가
- 여백이 답답하지 않은가
- 썸네일 없는 카드도 균형이 맞는가

### 콘텐츠
- 한글/영문 오탈자 없는가
- 작품 순서가 맞는가
- 역할/비고가 정확한가
- 공개 전 작품은 이미지 비노출 처리됐는가

### 기능
- hero video autoplay 되는가
- mobile에서도 재생되는가
- portfolio thumbnail 넘기기 되는가
- lightbox 되는가
- contact modal 열고 닫히는가
- KR / EN 전환 시 포트폴리오 카드가 정상 표시되는가

### 성능
- 큰 이미지 로딩이 과하지 않은가
- lazy loading 들어갔는가
- 불필요한 클라이언트 JS가 없는가

### 배포
- production build 통과하는가
- Vercel 최신 배포가 실제 alias를 가리키는가
- GitHub push까지 끝났는가

---

## 14. Codex에게 바로 맡길 때의 작업 지시문 템플릿

아래 블록을 그대로 복사해서, 배우 자료와 함께 전달하면 된다.

```md
# Actor Portfolio Build Request

첨부한 `ACTOR_PORTFOLIO_BUILD_GUIDE.md`를 기준으로 배우 포트폴리오 사이트를 제작해줘.

필수 요구사항:
- Next.js 기반 단일 페이지 포트폴리오로 구현
- Landing / Portfolio / Photos / Contact 구조 유지
- 상단 고정 nav + KR/EN 전환 포함
- 랜딩은 hero video 중심
- Portfolio는 작품별 카드형 구조
- 작품 썸네일 여러 장이면 1장만 먼저 보이고 넘길 수 있게
- Photos는 PROFILE / SNAP / DAILY 섹션
- Contact는 Instagram DM / Email 직접 문의 방식
- mobile responsive 완성도 높게
- 전체 무드는 editorial, cinematic, quiet luxury
- 배우가 먼저 보이는 구조로

작업 방식:
- 기존 코드베이스를 먼저 읽고 구조를 파악한 뒤 작업
- 필요한 경우 데이터 구조 정리
- 구현 후 build 확인
- 가능하면 GitHub push 및 Vercel 배포까지 진행

주의사항:
- 정보가 없으면 임의 추측하지 말고 placeholder 또는 비노출 처리
- 공개 전 작품은 썸네일을 억지로 넣지 말 것
- locale 전환 시 카드 애니메이션/표시 문제 없도록 확인

첨부 자료:
- 배우 프로필 정보
- 필모그래피
- 작품별 설명
- 랜딩 영상
- 프로필/스냅/데일리 사진
- 작품별 썸네일
- 인스타 / 유튜브 / 이메일 링크
```

---

## 15. 배우별 입력 템플릿

아래만 채우면 된다.

```yaml
project:
  site_title:
  domain_preference:
  reference_mood:

actor:
  korean_name:
  english_name:
  age:
  birth:
  height:
  weight:
  talents:
    - 
    - 
  hobbies:
    - 
    - 
  email:
  instagram:
  youtube:

intro:
  ko: |
    
  en: |
    

contact_copy:
  ko: |
    캐스팅, 미팅, 인터뷰, 협업 관련 문의는 아래 채널로 편하게 연락 부탁드립니다.
  en: |
    For casting, meetings, interviews, or collaboration inquiries, please reach out through the channels below.

photo_sections:
  profile:
    description_ko:
    description_en:
  snaps:
    description_ko:
    description_en:
  daily:
    description_ko:
    description_en:

portfolio_sections:
  - title: DRAMA
    description_ko:
    description_en:
    entries:
      - year:
        title_ko:
        title_en:
        role_ko:
        role_en:
        detail_ko:
        detail_en:
        note_ko:
        note_en:
        description_ko: |
          
        description_en: |
          
        thumbnail_key:
        has_visual: true
        external_url:

landing_video:
  filename:
  has_audio: false

assets:
  profile_photos_folder:
  snaps_photos_folder:
  daily_photos_folder:
  thumbnails_folder:
```

---

## 16. 최종 산출물 기준

완성된 프로젝트는 최소 아래 상태여야 한다.

- 배우 맞춤형 visual mood 반영
- KR / EN 전환 가능
- 모바일 완성도 확보
- 대표 영상 반영
- 작품 카드 + 썸네일 + 라이트박스
- 사진 갤러리
- 직접 문의 가능한 contact modal
- GitHub로 미디어/코드 관리 가능
- Vercel 배포 가능

이 문서를 기반으로 작업하면, 다른 배우의 포트폴리오도 현재 남율 사이트와 유사한 완성도로 반복 제작할 수 있다.
