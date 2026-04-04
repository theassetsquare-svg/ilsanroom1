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

const MAIN_SITE = 'https://nolcool.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  name: '일산룸 초보자 완벽 가이드 — 첫 방문 전 필수 체크리스트',
  description: '일산룸 처음이라면 이 글부터 읽어라. 예약 방법, 매너, 복장, 주의사항까지 경험자가 직접 정리한 초보자 전용 안내서.',
  author: { '@type': 'Person', name: '일산 밤문화 에디터' },
  datePublished: '2026-03-20',
  dateModified: '2026-04-04'
}

export default function Guide() {
  return (
    <Layout>
      <Helmet>
        <title>일산룸 초보자 완벽 가이드 — 첫 방문 전 필수 체크리스트</title>
        <meta name="description" content="일산룸 처음이라면 이 글부터 읽어라. 예약 방법, 매너, 복장, 주의사항까지 경험자가 직접 정리한 초보자 전용 안내서." />
        <meta property="og:title" content="일산룸 초보자 완벽 가이드 — 첫 방문 전 필수 체크리스트" />
        <meta property="og:description" content="일산룸 처음이라면 이 글부터 읽어라. 예약 방법, 매너, 복장, 주의사항까지 경험자가 직접 정리한 초보자 전용 안내서." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://ilsanroom1.pages.dev/guide" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <HeroSection
        title="일산룸 초보자 완벽 가이드"
        subtitle="첫 방문 전 반드시 읽어야 할 체크리스트"
        bgImage="https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=1200&q=80&auto=format"
      />

      <article className="article-content">

        <p className="hook">
          솔직히 말한다. 일산룸 처음 가는 사람 중 절반은 뭘 해야 할지 몰라서 어색하게 앉아만 있다가 나온다. 그 시간과 돈이 아깝지 않은가. 이 글을 끝까지 읽으면 적어도 그런 실수는 하지 않는다.
        </p>

        <h2>출발 전 — 예약은 선택이 아니라 필수다</h2>

        <BeforeAfter
          before="'대충 4명이요'라고 전화. 남는 자리에 배정. 룸 크기 안 맞고 분위기 어색."
          after="'4명, 금요일 8시, 예산 30만 원 내외'로 구체적 예약. 딱 맞는 룸 배정."
        />

        <p>
          일산룸은 워크인으로 가면 십중팔구 원하는 조건을 못 맞춘다. 좋은 룸은 이미 예약이 잡혀 있고, 남는 자리는 위치가 안 좋거나 크기가 맞지 않는 경우가 대부분이다. 전화 예약할 때는 방문 인원, 희망 시간, 예산 범위를 명확히 말해야 한다. "대충 4명이요"가 아니라 "4명, 금요일 8시, 예산 30만 원 내외"라고 구체적으로 말해야 적합한 룸을 배정받을 수 있다.
        </p>

        <LazyImage
          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80&auto=format"
          alt="도시 야경 — 건물 조명이 빛나는 밤거리 풍경"
          caption="예약 시간보다 10분 일찍 도착하면 룸 상태를 미리 확인할 수 있다."
        />

        <p>
          예약 시간보다 10분 일찍 도착하는 게 좋다. 도착하면 룸 상태를 확인하고, 필요한 게 있으면 미리 요청할 수 있는 여유가 생긴다. 늦으면 예약이 취소되는 곳도 있으니 시간 엄수는 기본이다.
        </p>

        <InsiderTip>
          예약 전화는 오후 2~4시 사이가 골든타임이다. 이 시간에는 매니저가 여유가 있어서 질문에 상세하게 답해준다. 저녁 7시 이후에 전화하면 바빠서 대충 응대하는 곳이 많다.
        </InsiderTip>

        <h2>복장 — 깔끔하면 된다, 과하면 어색하다</h2>

        <p>
          정장을 입고 갈 필요는 없다. 하지만 츄리닝이나 슬리퍼 차림은 피해야 한다. 깔끔한 캐주얼이 가장 무난하다. 청바지에 깨끗한 셔츠, 운동화보다는 로퍼나 구두가 전체적인 인상을 올려준다. 과한 향수는 밀폐된 공간에서 오히려 역효과가 나므로 은은한 정도가 적당하다.
        </p>

        <LazyImage
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80&auto=format"
          alt="바 인테리어 — 세련된 조명과 깔끔한 공간 구성"
          caption="복장은 깔끔한 캐주얼이 정답이다. 과하지도 부족하지도 않게."
        />

        <blockquote className="pull-quote">
          "첫인상은 문을 열고 3초 안에 결정된다. 복장이 곧 태도다"
        </blockquote>

        <h2>입장 후 — 처음 30분이 전체 분위기를 결정한다</h2>

        <p>
          룸에 들어가면 긴장하는 사람이 많다. 하지만 자연스럽게 행동하면 된다. 자리에 앉으면 먼저 음료를 주문하고, 가볍게 대화를 시작하라. 과하게 텐션을 올릴 필요도, 지나치게 조용할 필요도 없다. 적당한 대화와 웃음이 오가면 분위기는 자연스럽게 만들어진다.
        </p>

        <LazyImage
          src="https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=80&auto=format"
          alt="음료와 함께하는 저녁 모임 — 테이블 위 잔들과 은은한 조명"
          caption="처음 30분 동안의 분위기가 그날 전체 경험을 좌우한다."
        />

        <p>
          처음 30분 동안의 분위기가 그날 전체 경험을 좌우한다. 이 시간 동안 스마트폰을 보거나 한쪽에서만 이야기하면 전체 흐름이 끊긴다. 모든 참석자가 대화에 참여할 수 있는 분위기를 만드는 게 핵심이다.
        </p>

        <div className="cta-section">
          <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="cta-button">
            놀쿨에서 일산룸 더 보기 &rarr;
          </a>
        </div>

        <h2>매너 — 이것만 지키면 어디서든 환영받는다</h2>

        <p>
          첫째, 직원에게 반말하지 마라. 존댓말은 기본이다. 둘째, 룸 시설물을 함부로 다루지 마라. 음향 장비나 조명 컨트롤러를 막 만지면 고장 나기 쉽고, 수리비가 청구될 수 있다. 셋째, 정해진 시간을 지켜라. 연장을 원하면 미리 직원에게 말해야 한다. 시간이 초과된 후에 통보하면 추가 요금이 발생하는 건 물론이고, 다음 예약 손님에게 피해를 준다.
        </p>

        <p>
          넷째, 지나친 소음은 자제하라. 룸이 독립 공간이라고 해서 무제한으로 소리를 질러도 되는 건 아니다. 옆 룸 손님이나 건물 내 다른 업체에 민폐가 될 수 있다. 적절한 볼륨을 유지하는 것이 모두에게 좋은 결과를 만든다.
        </p>

        <blockquote className="pull-quote">
          "단골이 되는 비결은 돈이 아니라 매너다"
        </blockquote>

        <h3>방문자 리얼 후기</h3>

        <div className="review-grid">
          <ReviewHighlight name="정** (20대)" rating={4} text="첫 방문인데 이 글 읽고 가서 전혀 어색하지 않았다. 복장 팁이 특히 도움됐다." date="2026.03" />
          <ReviewHighlight name="최** (30대)" rating={5} text="예약할 때 구체적으로 말했더니 딱 맞는 룸 배정해줬다. 정보가 힘이다." date="2026.04" />
        </div>

        <LazyImage
          src="https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=800&q=80&auto=format"
          alt="야간 도시 스카이라인 — 빌딩 불빛이 만든 화려한 야경"
          caption="일산의 밤은 준비한 사람에게 더 깊은 경험을 선사한다."
        />

        <h2>퇴장과 결제 — 마지막까지 깔끔하게</h2>

        <p>
          이용이 끝나면 룸 상태를 간단히 정리하고 나오는 게 좋다. 테이블 위를 대충이라도 정돈하고, 개인 소지품을 빠짐없이 챙겨라. 결제할 때는 영수증을 반드시 확인하라. 사전에 안내받지 못한 항목이 포함되어 있다면 현장에서 바로 확인하는 게 맞다. 나중에 전화로 항의하면 해결이 어렵다.
        </p>

        <InsiderTip>
          카드 결제 시 사업자명이 다르게 찍히는 곳이 있다. 개인 경비 처리가 필요한 경우, 결제 전에 영수증에 찍히는 상호명을 미리 확인하라.
        </InsiderTip>

        <p>
          카드 결제가 가능한 곳이 대부분이지만, 간혹 현금만 받는 곳이 있다. 예약할 때 미리 결제 수단을 확인해 두면 현장에서 당황할 일이 없다.
        </p>

        <SecretReveal title="초보자가 절대 모르는 재방문 꿀팁">
          <p>
            첫 방문이 마음에 들었다면, 나올 때 매니저에게 명함이나 연락처를 받아두라. 다음에 직접 전화하면 "지난번 몇 번 룸 쓴 손님"으로 기억해서, 같은 가격에 더 좋은 룸을 배정하거나 서비스 음료를 제공하는 경우가 흔하다. 이게 단골의 시작이다.
          </p>
        </SecretReveal>

        <nav className="internal-nav">
          <h3>다른 글 보기</h3>
          <ul>
            <li><Link to="/">일산룸 — 예약 전에 반드시 읽어야 할 글</Link></li>
            <li><Link to="/review">일산룸 지역별 솔직 후기</Link></li>
            <li><Link to="/price">일산룸 가격 비교 총정리</Link></li>
          </ul>
        </nav>

        <div className="cta-section">
          <a href={MAIN_SITE} target="_blank" rel="noopener noreferrer" className="cta-button">
            놀쿨에서 일산룸 더 보기 &rarr;
          </a>
        </div>
      </article>

      <ScrollCTA />
    </Layout>
  )
}
