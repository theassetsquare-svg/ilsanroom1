// === COUNTDOWN ===
(function(){
  const el = document.getElementById('countdown-timer');
  if(!el) return;
  const spots = sessionStorage.getItem('spots') || (Math.floor(Math.random()*5)+3);
  sessionStorage.setItem('spots', spots);
  function getNextFri(){
    const n=new Date(),d=n.getDay(),diff=d<=5?5-d:6;
    const f=new Date(n);f.setDate(n.getDate()+diff);f.setHours(19,0,0,0);
    if(f<=n)f.setDate(f.getDate()+7);return f;
  }
  const target=getNextFri();
  const tick=()=>{
    const d=target-new Date();
    if(d<=0){el.textContent='마감';return;}
    const h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);
    el.innerHTML='이번 주말 예약 마감까지 <strong>'+h+'시간 '+m+'분 '+s+'초</strong> — 남은 자리 <strong>'+spots+'석</strong>';
  };
  tick();setInterval(tick,1000);
})();

// === SECRET REVEAL ===
document.querySelectorAll('.secret').forEach(el=>{
  if(sessionStorage.getItem('secretRevealed')){el.classList.add('revealed');return;}
  window.addEventListener('scroll',function check(){
    const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight);
    if(pct>.78){el.classList.add('revealed');sessionStorage.setItem('secretRevealed','true');window.removeEventListener('scroll',check);}
  },{passive:true});
});

// === SEARCH ===
(function(){
  const input=document.getElementById('search-input');
  const results=document.getElementById('search-results');
  if(!input||!results)return;
  const pages=[
    {url:'/',title:'일산룸 — 예약 전에 반드시 읽어야 할 글',kw:'일산룸 예약 가격 지역 라페스타 웨스턴돔 장항동'},
    {url:'/guide',title:'일산룸 초보자 완벽 가이드',kw:'초보 가이드 복장 매너 예약 방법 처음'},
    {url:'/review',title:'일산룸 지역별 솔직 후기',kw:'후기 리뷰 비교 라페스타 웨스턴돔 장항동'},
    {url:'/price',title:'일산룸 가격 비교 총정리',kw:'가격 비용 세팅비 양주 연장 요금 가성비'}
  ];
  input.addEventListener('input',()=>{
    const q=input.value.trim();
    if(!q){results.classList.remove('open');results.innerHTML='';return;}
    const found=pages.filter(p=>p.title.includes(q)||p.kw.includes(q));
    if(found.length){
      results.innerHTML=found.map(p=>'<li><a href="'+p.url+'">'+p.title+'</a></li>').join('');
      results.classList.add('open');
    }else{
      results.innerHTML='<li style="padding:12px 16px;color:var(--text2);text-align:center">검색 결과가 없습니다</li>';
      results.classList.add('open');
    }
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.search'))results.classList.remove('open');});
})();

// === QUIZ ===
(function(){
  const wrap=document.getElementById('quiz');
  if(!wrap)return;
  const qs=[
    {q:'모임의 주요 목적은?',opts:[{t:'친구들과 가볍게 한잔',v:'c'},{t:'거래처 접대나 중요 모임',v:'p'},{t:'조용히 프라이빗하게',v:'r'}]},
    {q:'선호하는 분위기는?',opts:[{t:'활기차고 북적이는 곳',v:'c'},{t:'세련되고 고급스러운 곳',v:'p'},{t:'아는 사람만 아는 숨은 곳',v:'r'}]},
    {q:'예산은 어느 정도?',opts:[{t:'2인 기준 20만 원 이하',v:'c'},{t:'2인 기준 20~35만 원',v:'p'},{t:'가격보다 만족도가 우선',v:'r'}]}
  ];
  const res={c:{tag:'라페스타 추천',title:'라페스타 캐주얼파',desc:'가성비 좋고 접근성 최고인 라페스타가 딱 맞는다. 처음 가는 사람에게도 부담 없고, 2차 연계도 쉬워서 밤새 즐길 수 있다.'},p:{tag:'웨스턴돔 추천',title:'웨스턴돔 프리미엄파',desc:'격이 다른 인테리어와 세심한 서비스를 원한다면 웨스턴돔이다. 접대 성공률이 높고, 한 번 가면 다시 찾게 되는 곳.'},r:{tag:'장항동 추천',title:'장항동 프라이빗파',desc:'남의 눈 신경 쓰지 않고 내 취향대로 즐기고 싶다면 장항동이다. 단골이 되면 맞춤 서비스의 진가를 경험하게 된다.'}};
  let step=0,answers=[];
  const body=wrap.querySelector('.quiz-body');
  function render(){
    if(step<qs.length){
      const q=qs[step];
      body.innerHTML='<p class="quiz-q">Q'+(step+1)+'. '+q.q+'</p><div class="quiz-opts">'+q.opts.map(o=>'<button class="quiz-opt" data-v="'+o.v+'">'+o.t+'</button>').join('')+'</div>';
      body.querySelectorAll('.quiz-opt').forEach(b=>b.addEventListener('click',()=>{answers.push(b.dataset.v);step++;render();}));
    }else{
      const cnt={};answers.forEach(a=>cnt[a]=(cnt[a]||0)+1);
      const w=Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0][0];
      const r=res[w];
      body.innerHTML='<div class="quiz-result"><div class="quiz-result-tag">'+r.tag+'</div><h4>'+r.title+'</h4><p>'+r.desc+'</p><button class="quiz-retry">다시 해보기</button></div>';
      body.querySelector('.quiz-retry').addEventListener('click',()=>{step=0;answers=[];render();});
    }
  }
  render();
})();

// === LAZY IMAGES ===
if('IntersectionObserver' in window){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const img=e.target;img.src=img.dataset.src;img.removeAttribute('data-src');obs.unobserve(img);
      }
    });
  },{rootMargin:'200px'});
  document.querySelectorAll('img[data-src]').forEach(img=>obs.observe(img));
}

// === SCROLL POSITION PERSIST ===
(function(){
  const key='scroll_'+location.pathname;
  const saved=sessionStorage.getItem(key);
  if(saved)window.scrollTo(0,parseInt(saved));
  window.addEventListener('scroll',()=>sessionStorage.setItem(key,window.scrollY),{passive:true});
})();

// === EXIT INTENT ===
(function(){
  if(sessionStorage.getItem('exitDismissed'))return;
  let lastY=0;
  window.addEventListener('scroll',function check(){
    const y=window.scrollY,pct=y/(document.body.scrollHeight-window.innerHeight);
    if(pct>.15&&y<lastY-80){
      const overlay=document.createElement('div');
      overlay.style.cssText='position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .3s';
      overlay.innerHTML='<div style="background:#fff;border-radius:18px;padding:36px 28px 28px;max-width:400px;width:100%;text-align:center;position:relative;box-shadow:0 16px 48px rgba(0,0,0,.2)"><button onclick="this.closest(\'div\').parentElement.remove();sessionStorage.setItem(\'exitDismissed\',\'true\')" style="position:absolute;top:12px;right:16px;background:none;border:none;font-size:28px;color:var(--text2);cursor:pointer;min-width:44px;min-height:44px">&times;</button><p style="font-size:22px;font-weight:900;margin-bottom:10px">잠깐! 이것만 보고 가세요</p><p style="font-size:15px;color:var(--text2);line-height:1.6;margin-bottom:24px">일산룸 예약 전 꼭 확인해야 할 체크리스트를 놓치고 있습니다.</p><a href="https://ilsanroom.pages.dev/" target="_blank" rel="noopener noreferrer" class="cta-btn" onclick="sessionStorage.setItem(\'exitDismissed\',\'true\')">일산룸 더 많은 정보 보기 →</a></div>';
      overlay.addEventListener('click',e=>{if(e.target===overlay){overlay.remove();sessionStorage.setItem('exitDismissed','true');}});
      document.body.appendChild(overlay);
      window.removeEventListener('scroll',check);
    }
    lastY=y;
  },{passive:true});
})();
