import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ScrollCTA from '../components/ScrollCTA.jsx'
import Layout from '../components/Layout.jsx'
import HeroSection from '../components/HeroSection.jsx'
import LazyImage from '../components/LazyImage.jsx'
import InsiderTip from '../components/InsiderTip.jsx'
import ReviewHighlight from '../components/ReviewHighlight.jsx'
import BeforeAfter from '../components/BeforeAfter.jsx'
import SecretReveal from '../components/SecretReveal.jsx'
import Countdown from '../components/Countdown.jsx'
import ExitIntent from '../components/ExitIntent.jsx'

const MAIN_SITE = 'https://ilsanroom.pages.dev/'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NightClub',
  name: '일산룸 가격 비교 총정리 — 숨겨진 추가 요금까지 공개',
  description: '일산룸 실제 이용 가격을 항목별로 분해해서 정리했다. 기본 세팅비, 음료비, 추가 요금 구조까지 현장 경험 기반 비교 분석.',
  url: MAIN_SITE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: '고양시 일산',
    addressRegion: '경기도',
    addressCountry: 'KR'
  }
}

export default function Price() {
  return (
    <Layout>
      <Helmet>
        <title>일산룸 가격 비교 총정리 — 숨겨진 추가 요금까지 공개</title>
        <meta name="description" content="일산룸 실제 이용 가격을 항목별로 분해해서 정리했다. 기본 세팅비, 음료비, 추가 요금 구조까지 현장 경험 기반 비교 분석." />
        <meta property="og:title" content="일산룸 가격 비교 총정리 — 숨겨진 추가 요금까지 공개" />
        <meta property="og:description" content="일산룸 실제 이용 가격을 항목별 분해 정리. 기본 세팅비, 음료비, 추가 요금 구조까지 현장 경험 기반 비교." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://ilsanroom1.pages.dev/price" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Countdown />

      <HeroSection
        title="일산룸 가격 비교 총정리"
        subtitle="숨겨진 추가 요금까지 낱낱이 공개"
        bgImage="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80&auto=format"
      />

      <article className="article-content">

        <p className="hook">
          가격표를 보여주는 곳은 거의 없다. 그래서 직접 다녀보고 정리했다. 이 글을 읽으면 일산룸에서 돈 쓰고 후회할 일은 없어진다.
        </p>

        <h2>일산룸 가격의 기본 구조를 먼저 이해하라</h2>

        <p>
          일산룸 가격은 단순하지 않다. 대부분의 업소가 "기본 세팅비"라는 명목으로 초기 비용을 책정하고, 여기에 추가 항목이 별도로 붙는 구조다. 기본 세팅비에는 룸 사용료, 기본 음료, 안주 1~2가지가 포함되는 게 일반적이다. 하지만 업소마다 포함 범위가 다르기 때문에, 같은 금액이라도 실제로 받는 서비스의 양은 차이가 크다.
        </p>

        <LazyImage
          src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=80&auto=format"
          alt="테이블 위 음료 세팅 — 양주와 안주가 준비된 룸 테이블"
          caption="기본 세팅에 뭐가 포함되는지가 실제 가성비를 결정한다."
        />

        <p>
          예를 들어, A 업소의 기본 세팅비 20만 원에는 양주 1병과 안주 2종이 포함되지만, B 업소의 같은 20만 원에는 맥주만 포함되고 양주는 별도다. 겉으로 보면 같은 가격인데 실속은 완전히 다르다. 그래서 전화 예약할 때 "기본 세팅에 뭐가 포함되나요?"라는 질문은 반드시 해야 한다.
        </p>

        <BeforeAfter
          before="같은 20만 원인데 A업소는 맥주만 포함. 양주 추가하니 총 35만 원."
          after="B업소 20만 원에 양주 1병+안주 포함. 추가 없이 총 20만 원으로 마무리."
        />

        <blockquote className="pull-quote">
          "같은 20만 원이라도 어디에 쓰느냐에 따라 경험의 질이 달라진다"
        </blockquote>

        <h2>일산룸 지역별 실제 가격 비교</h2>

        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>항목</th>
                <th>라페스타</th>
                <th>웨스턴돔</th>
                <th>장항동</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>기본 세팅 (2인)</td>
                <td>15~22만</td>
                <td>22~35만</td>
                <td>18~30만</td>
              </tr>
              <tr>
                <td>양주 추가 (1병)</td>
                <td>8~15만</td>
                <td>12~20만</td>
                <td>10~18만</td>
              </tr>
              <tr>
                <td>안주 추가 (1종)</td>
                <td>2~5만</td>
                <td>3~7만</td>
                <td>2~6만</td>
              </tr>
              <tr>
                <td>연장 (1시간)</td>
                <td>5~10만</td>
                <td>8~15만</td>
                <td>5~12만</td>
              </tr>
              <tr>
                <td>실 지출 평균 (2인)</td>
                <td>20~30만</td>
                <td>30~50만</td>
                <td>25~40만</td>
              </tr>
            </tbody>
          </table>
        </div>

        <InsiderTip>
          위 표의 가격은 직접 방문하며 수집한 데이터 기반 평균치다. 같은 지역 내에서도 업소마다 5~10만 원씩 차이가 난다. 최소 3곳은 비교 전화해봐라.
        </InsiderTip>

        <h2>일산룸 숨겨진 추가 요금 — 예상보다 많이 나오는 이유</h2>

        <LazyImage
          src="https://images.unsplash.com/photo-1566417713940-fe7c7c98a8eb?w=800&q=80&auto=format"
          alt="바 카운터 풍경 — 조명 아래 다양한 음료병이 진열된 모습"
          caption="연장 요금과 추가 음료가 예상 밖의 지출을 만드는 주범이다."
        />

        <p>
          가장 흔한 추가 비용은 "연장 요금"이다. 기본 이용 시간은 보통 2시간이다. 분위기가 좋아서 시간을 넘기면 자동으로 연장이 되는데, 사전에 고지 없이 시간이 넘어가는 곳이 있다. 나중에 계산서를 보고 깜짝 놀라는 경우가 바로 이거다. 입장할 때 "기본 시간이 몇 시간인가요? 연장 시 비용은 얼마인가요?"를 반드시 확인하라.
        </p>

        <p>
          두 번째는 음료 추가 주문이다. 기본 세팅에 포함된 음료를 다 마시면 추가 주문을 하게 되는데, 이때 가격이 확 올라가는 곳이 있다. 기본 세팅의 양주가 한 병이라면, 4인 이상 모임에서는 거의 확실히 추가 주문이 필요하다. 인원이 많을수록 기본 포함 음료만으로는 부족할 가능성이 높다.
        </p>

        <blockquote className="pull-quote">
          "영수증의 마지막 줄에서 그날의 교훈을 얻게 된다"
        </blockquote>

        <LazyImage
          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80&auto=format"
          alt="도시 야간 풍경 — 조명이 반사되는 거리의 모습"
          caption="인원이 많을수록 사전에 총 예산을 명확히 정해야 지출 통제가 된다."
        />

        <div className="cta-section">
          <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="cta-button">
            놀쿨에서 일산룸 더 보기 &rarr;
          </a>
        </div>

        <h2>일산룸 가성비를 높이는 실전 팁 5가지</h2>

        <p>
          첫째, 주중에 가라. 금토 대비 가격이 10~20% 낮은 곳이 많고, 예약도 쉽다. 둘째, 기본 세팅에 양주가 포함된 곳을 선택하라. 양주를 별도로 주문하면 가격이 크게 올라간다. 셋째, 인원수에 딱 맞는 룸을 잡아라. 큰 룸을 잡으면 룸 사용료가 올라간다.
        </p>

        <p>
          넷째, 연장 없이 기본 시간 내에 마무리하겠다고 마음먹어라. 시간을 정해두면 지출 통제가 된다. 다섯째, 여러 곳에 전화해서 비교하라. 같은 지역 내에서도 업소마다 5~10만 원씩 차이가 난다. 10분 투자해서 3곳만 비교해도 최적의 선택을 할 수 있다.
        </p>

        <LazyImage
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80&auto=format"
          alt="세련된 바 공간 — 깔끔한 인테리어와 분위기 있는 조명"
          caption="10분 투자해서 3곳만 비교하면 최적의 가성비를 찾을 수 있다."
        />

        <h3>실제 이용자 가격 후기</h3>

        <div className="review-grid">
          <ReviewHighlight name="강** (30대)" rating={5} text="주중에 갔더니 금요일 가격 대비 15% 싸게 이용했다. 같은 서비스인데 가격만 다르다." date="2026.03" />
          <ReviewHighlight name="윤** (40대)" rating={4} text="전화로 비교한 뒤 갔더니 8만 원 아꼈다. 비교 전화가 진짜 돈 아끼는 방법이다." date="2026.02" />
          <ReviewHighlight name="조** (30대)" rating={3} text="연장 요금 몰라서 예상보다 10만 원 더 나왔다. 미리 물어볼 걸." date="2026.03" />
        </div>

        <h2>결제 방식과 영수증 확인</h2>

        <p>
          대부분의 일산룸은 카드 결제를 받는다. 하지만 일부 업소는 현금 결제 시 할인을 제공하기도 한다. 3~5% 정도인데, 총 이용 금액이 크다면 무시할 수 없는 차이다. 결제 전 영수증의 각 항목을 반드시 확인하라. 기본 세팅비, 추가 음료, 안주, 연장 요금이 각각 명시되어 있어야 정상이다. 항목 구분 없이 총액만 적혀 있다면 세부 내역을 요청하는 게 좋다.
        </p>

        <LazyImage
          src="https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800&q=80&auto=format"
          alt="도시 스카이라인 야경 — 빌딩 불빛이 수면에 반사되는 풍경"
          caption="결제 전 영수증 항목을 하나하나 확인하는 습관이 불필요한 지출을 막는다."
        />

        <SecretReveal title="현금 결제 시 숨은 혜택">
          <p>
            일부 업소에서는 현금 결제 시 3~5% 할인 외에도 다음 방문 시 사용 가능한 서비스 쿠폰을 주는 곳이 있다. "현금으로 하면 혜택이 있나요?"라고 한 마디만 하면 된다. 이 질문을 하는 손님이 거의 없어서, 물어보는 것만으로도 인상에 남고 다음 방문 때 좋은 대우를 받을 가능성이 높아진다.
          </p>
        </SecretReveal>

        <nav className="internal-nav">
          <h3>다른 글 보기</h3>
          <ul>
            <li><Link to="/">일산룸 — 예약 전에 반드시 읽어야 할 글</Link></li>
            <li><Link to="/guide">일산룸 초보자 완벽 가이드</Link></li>
            <li><Link to="/review">일산룸 지역별 솔직 후기</Link></li>
          </ul>
        </nav>

        <div className="cta-section">
          <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="cta-button">
            놀쿨에서 일산룸 더 보기 &rarr;
          </a>
        </div>
      </article>

      <ScrollCTA />
      <ExitIntent />
    </Layout>
  )
}
