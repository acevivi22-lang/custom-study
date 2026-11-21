// 광야 · 기숙사 데이터와 계산 (홈 탭 배지와 dorm.html이 함께 씁니다)
// 보상은 전부 실제 공부 기록에서만 나온다: 계획 탭에서 체크한 블록(과목·분), 기출·카드 기록, 강의 진도.
// 확률형 보상 없음. 업적을 달성하면 정해진 동료가 확정으로 입주한다.
(function(){
const P=window.PLAN;
const get=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};

// ── 과목 ──────────────────────────────────────────────
const SUBJ={law:"관세법",hs:"관세율표",acc:"회계학",trade:"무역영어·무역실무",val:"관세평가",nae:"내국소비세법"};
// 계획 블록 제목 → 과목 (분 단위). 둘이 섞인 블록은 반씩 나눈다.
function subjOf(title){
  if(/관세율표|통칙/.test(title))return [["hs",1]];
  if(/회계/.test(title))return [["acc",1]];
  if(/무역/.test(title))return [["trade",1]];
  if(/관세법/.test(title))return [["law",1]];
  if(/내국소비세/.test(title))return [["nae",1]];
  if(/2차 강의 B|2차 복습|2차 개념/.test(title))return [["val",.5],["trade",.5]];
  if(/2차 강의/.test(title))return [["trade",.6],["val",.4]];
  return [];
}

// ── 동료 6명 (모두 성인 수련생) ─────────────────────────
// 그림은 chars/ 폴더의 도트 PNG (높이 80px, 배경 투명)
const CHARS=[
 {id:"seoyul",img:"chars/seoyul.png",name:"한서율",subj:"law",age:27,
  intro:"관세법 담당. 흰 단발에 붉은 드레스, 세관 도장 같은 색을 좋아한다. 조문 번호로 대화하고, 말수는 적은데 틀린 건 꼭 짚어 준다.",
  study:"제38조… 신고납부. 같이 읽자.",wait:"…오늘은 안 오는 거야? 기다릴게.",
  lines:["한서율. 관세법은 내가 맡을게. 첫 장부터 같이 넘기자.",
   "과세물건 확정 시기, 수입신고하는 때. 이건 몸이 기억하게 해.",
   "형광펜 색이 바뀌었네. 두 번째 바퀴구나. …좋아.",
   "조문이 문장으로 들리기 시작하면 그때부터가 진짜야.",
   "네가 읽은 페이지 수, 나도 세고 있었어. 꽤 멀리 왔어.",
   "답안 목차가 손에서 먼저 나오지? 이제 시험장에서도 똑같이 하면 돼."]},
 {id:"hana",img:"chars/hana.png",name:"류하나",subj:"hs",age:24,
  intro:"관세율표 담당. 별 지팡이로 류 번호를 짚으며 97류를 전부 노래로 외운 사람. 아침 복습 시간에 제일 시끄럽다.",
  study:"1류 산 동물~ 2류 고기~ 따라 해!",wait:"어제 류 복습 안 하면 다 날아간다구~",
  lines:["류하나야! 이름부터 '류'잖아? 관세율표는 나한테 맡겨!",
   "앞글자 노래, 소리 내서 다섯 번. 입이 먼저 외워.",
   "제1부 끝! 살아 있는 동물부터 시작하는 거 귀엽지 않아?",
   "호까지 내려가니까 류 제목이 저절로 나오지? 그게 쌓이는 거야.",
   "백지 복원 틀린 류, 내가 내일 아침에 또 물어볼 거야.",
   "97류 한 바퀴! 이제 2회전은 호 단위로. 같이 부르자!"]},
 {id:"byunhee",img:"chars/byunhee.png",name:"차변희",subj:"acc",age:28,
  intro:"회계학 담당. 품에 안은 작은 로봇이 계산기다. 이름이 차변이라 대변을 싫어한다는 농담을 싫어한다.",
  study:"예제는 해설 덮고 손으로 다시.",wait:"차변 대변 안 맞는 날은 없어. 안 한 날만 있지.",
  lines:["차변희. 회계는 과락이 제일 무서운 과목이야. 그러니까 매일.",
   "강의 듣고 바로 예제 다시 풀었지? 그거 안 하면 다음 날 0이야.",
   "재무회계 끝이 보인다. 원가회계는 생각보다 빨라.",
   "기출 정답률 숫자, 거짓말 안 해. 오답 노트도.",
   "…솔직히 처음엔 네가 회계 버틸 줄 몰랐어. 미안.",
   "55점 넘는 게 당연해졌네. 과락 걱정은 이제 내가 대신 할게."]},
 {id:"elena",img:"chars/elena.png",name:"엘레나",subj:"trade",age:26,
  intro:"무역영어·무역실무 담당. 파나마 운하 옆 부두에서 컨테이너 크레인을 고치며 자랐다. 영어와 스페인어를 섞어 쓴다.",
  study:"FOB면 위험은 본선 적재 때 넘어가. ¿Listo?",wait:"Hola… 오늘 배는 안 뜨는 거야?",
  lines:["¡Hola! 엘레나야. 인코텀즈는 바다에서 배우는 거야.",
   "CISG랑 UCP 600, 헷갈리면 누가 누구한테 약속했는지만 봐.",
   "신용장은 서류만 본다. 물건은 안 봐. 냉정하지?",
   "기출 지문 영어가 이제 그냥 읽히지? ¡Muy bien!",
   "운송·보험·클레임까지. 이제 너도 배 한 척 띄울 수 있겠다.",
   "시험 끝나면 진짜 무역 해 봐. 너 언어 되잖아. ¡Vamos!"]},
 {id:"garam",img:"chars/garam.png",name:"윤가람",subj:"val",age:29,
  intro:"관세평가 담당. 푸른 머리에 긴 드레스, 무도회장에서도 가격표부터 본다. 모든 걸 '가산할까 공제할까'로 판단한다.",
  study:"수수료, 생산지원비용… 가산 요소부터 체크.",wait:"오늘 안 한 공부는 공제 항목이 아니야.",
  lines:["윤가람이야. 관세평가는 결국 질문 하나야. 가산이냐, 공제냐.",
   "제1방법이 안 되면 왜 안 되는지부터. 순서가 답이야.",
   "구매수수료는 빼고 판매수수료는 더해. 이제 안 헷갈리지?",
   "강의 끝. 이제부터는 사례 문제로만 가자.",
   "2차 답안 목차, 네 손에서 정리돼서 나오는 거 보기 좋다.",
   "6방법까지 머릿속에 지도가 그려졌지? 시험장에서 그대로 꺼내."]},
 {id:"sera",img:"chars/sera.png",name:"주세라",subj:"nae",age:25,
  intro:"내국소비세법 담당. 코르셋 크롭티에 헐렁한 카고 바지, 느긋한 브이. 이름 때문에 주세 문제는 무조건 맞힌다. 느린데 기출은 안 끊는다.",
  study:"부가세는 돈 흐름만 따라가면 돼~",wait:"기출 20문항, 내일 40문항 되기 전에~",
  lines:["주세라. 주세는 내 담당… 이 아니라 내국소비세 전부 내 담당이야.",
   "부가세는 매출세액 빼기 매입세액. 그거면 반은 끝나.",
   "개별소비세 세율표, 숫자는 정리노트에 다 있어. 가려서 보자.",
   "틀린 지문 기본서에 표시했지? 그게 나중에 제일 빨라.",
   "주 2~3회인데도 안 끊겼네. 느리게 가도 안 멈추면 돼.",
   "내소세 정답률 이 정도면 1차 평균 끌어올리는 과목이야. 고마워."]}
];

// 호감도: 담당 과목 공부 시간(분). Lv1 입주 · 2시간 · 8시간 · 20시간 · 40시간 · 80시간
const LV=[0,120,480,1200,2400,4800];
function level(min){let l=1;LV.forEach((t,i)=>{if(min>=t)l=i+1});return l}

// ── 업적 ─────────────────────────────────────────────
const ACH=[
 {id:"first",t:"첫 블록",d:"계획 블록 하나를 끝낸다",char:"seoyul",ok:s=>s.blocks>=1,p:s=>[s.blocks,1]},
 {id:"st3",t:"사흘",d:"계획 60% 이상인 날 3일 연속",char:"hana",ok:s=>s.maxStreak>=3,p:s=>[s.maxStreak,3]},
 {id:"h20",t:"스무 시간",d:"누적 수련 20시간",char:"byunhee",ok:s=>s.total>=1200,p:s=>[s.total/60,20]},
 {id:"g100",t:"기출 100",d:"1차 기출 100문제 풀기",char:"elena",ok:s=>s.gDone>=100,p:s=>[s.gDone,100]},
 {id:"pg9",t:"관세평가 반",d:"관세평가 강의 9강",char:"garam",ok:s=>s.prog.pg>=9,p:s=>[s.prog.pg,9]},
 {id:"st7",t:"일주일",d:"계획 60% 이상인 날 7일 연속",char:"sera",ok:s=>s.maxStreak>=7,p:s=>[s.maxStreak,7]},
 {id:"full",t:"빈칸 없는 날",d:"하루 계획을 100% 끝낸다",item:"lamp",ok:s=>s.fullDays>=1,p:s=>[s.fullDays,1]},
 {id:"h50",t:"쉰 시간",d:"누적 수련 50시간",item:"plant",ok:s=>s.total>=3000,p:s=>[s.total/60,50]},
 {id:"ry97",t:"97류 한 바퀴",d:"관세율표 97류 진도",item:"globe",ok:s=>s.prog.ry>=97,p:s=>[s.prog.ry,97]},
 {id:"acc",t:"회계 완강",d:"재무 36강 + 원가 33강",item:"calc",ok:s=>s.prog.jm>=36&&s.prog.wg>=33,p:s=>[s.prog.jm+s.prog.wg,69]},
 {id:"h100",t:"백 시간",d:"누적 수련 100시간",item:"cat",ok:s=>s.total>=6000,p:s=>[s.total/60,100]},
 {id:"st14",t:"두 주",d:"계획 60% 이상인 날 14일 연속",ok:s=>s.maxStreak>=14,p:s=>[s.maxStreak,14]},
 {id:"g500",t:"기출 500",d:"1차 기출 500문제 풀기",ok:s=>s.gDone>=500,p:s=>[s.gDone,500]},
 {id:"ox500",t:"OX 500",d:"기출 OX 500문장",ok:s=>s.oxDone>=500,p:s=>[s.oxDone,500]},
 {id:"card",t:"카드 전부",d:"관세법 플래시카드 77장",ok:s=>s.cards>=77,p:s=>[s.cards,77]},
 {id:"h300",t:"삼백 시간",d:"누적 수련 300시간",ok:s=>s.total>=18000,p:s=>[s.total/60,300]}
];
const ITEMS={lamp:"스탠드",plant:"화분",globe:"지구본",calc:"계산기",cat:"고양이"};

// ── 기록 읽기 ─────────────────────────────────────────
function stats(){
  const S=P.load(),T=P.today(),min={law:0,hs:0,acc:0,trade:0,val:0,nae:0};
  let blocks=0,total=0,fullDays=0;
  for(const k of Object.keys(S.done)){
    const done=S.done[k];if(!done||!Object.values(done).some(Boolean))continue;
    const sc=P.sched(P.parse(k),S);let t=0,m=0;
    sc.b.forEach(b=>{t+=b.m;if(!done[b.id])return;m+=b.m;blocks++;
      const parts=subjOf(b.title);if(parts.length)total+=b.m;
      parts.forEach(([s,f])=>{min[s]+=b.m*f})});
    if(t&&m>=t)fullDays++;
  }
  // 가장 길었던 연속 기록 (업적은 한 번 얻으면 유지)
  let maxStreak=0,run=0;
  for(let d=P.parse(P.PLAN_START);d<=T;d=P.add(d,1)){
    if(P.dayRatio(d,S)>=.6){run++;if(run>maxStreak)maxStreak=run}
    else if(P.key(d)!==P.key(T))run=0;
  }
  return {S,T,min,blocks,total:Math.round(total),fullDays,maxStreak,streak:P.streak(S,T),prog:S.prog,
    gDone:Object.keys(get("gc-v1",{})).length,oxDone:Object.keys(get("gox-v1",{})).length,
    cards:Object.keys(get("law-srs",{})).length};
}

// 달성한 업적은 날짜와 함께 저장 (기록을 지워도 입주한 동료는 그대로)
function sync(){
  const s=stats(),got=get("dorm-ach",{});let changed=false;
  ACH.forEach(a=>{if(!got[a.id]&&a.ok(s)){got[a.id]=P.key(new Date());changed=true}});
  if(changed)put("dorm-ach",got);
  return {s,got};
}
function unseen(){
  const {got}=sync(),seen=get("dorm-seen",[]);
  return Object.keys(got).filter(id=>!seen.includes(id));
}
function markSeen(){put("dorm-seen",Object.keys(get("dorm-ach",{})))}

// ── 도트 그림 ────────────────────────────────────
// 각 동료의 PNG를 한 번만 불러 두고, 잠긴 동료용 실루엣도 만들어 둔다.
const IMG={},SIL={};
function load(onReady){
  let n=0;CHARS.forEach(c=>{const im=new Image();im.onload=()=>{IMG[c.id]=im;if(++n===CHARS.length&&onReady)onReady()};im.onerror=()=>{if(++n===CHARS.length&&onReady)onReady()};im.src=c.img});
}
function silhouette(c,col){
  const k=c.id+col;if(SIL[k])return SIL[k];const im=IMG[c.id];if(!im)return null;
  const cv=document.createElement("canvas");cv.width=im.width;cv.height=im.height;const x=cv.getContext("2d");
  x.drawImage(im,0,0);x.globalCompositeOperation="source-in";x.fillStyle=col;x.fillRect(0,0,cv.width,cv.height);
  return SIL[k]=cv;
}
// 동료 한 명 그리기: (cx, feet) = 발 가운데 좌표. flip 왼쪽 보기, cut 위에서부터 이 높이까지만, sil 실루엣 색, scale 배율
function draw(ctx,ch,cx,feet,o){
  o=o||{};const im=o.sil?silhouette(ch,o.sil):IMG[ch.id];if(!im)return;
  const sc=o.scale||1,w=im.width,h=Math.min(im.height,o.cut||im.height);
  const x=Math.round(cx-w*sc/2),y=Math.round(feet-im.height*sc);
  ctx.save();ctx.imageSmoothingEnabled=false;
  if(o.flip){ctx.translate(x+w*sc,y);ctx.scale(-1,1);ctx.drawImage(im,0,0,w,h,0,0,w*sc,h*sc)}
  else ctx.drawImage(im,0,0,w,h,x,y,w*sc,h*sc);
  ctx.restore();
}
const size=ch=>IMG[ch.id]?[IMG[ch.id].width,IMG[ch.id].height]:[30,80];

window.DORM={SUBJ,CHARS,LV,level,ACH,ITEMS,stats,sync,unseen,markSeen,load,draw,size,silhouette,subjOf,get,put};
})();
