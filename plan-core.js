// 관세사 공부방 · 계획 데이터와 계산 (홈과 plan.html이 함께 씁니다)
// 계획 기준: 2026-11-20 수립, 월~토 7.5시간·일요일 3시간 버퍼
// 남은 강의: 재무회계 36강(70분) · 원가회계 33강(40분) · 무역실무 73강(60분) · 관세평가 17강(60분)
(function(){
const pad=n=>String(n).padStart(2,"0");
const key=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const parse=k=>{const[a,b,c]=k.split("-").map(Number);return new Date(a,b-1,c)};
const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const diffDays=(a,b)=>Math.round((parse(key(b))-parse(key(a)))/864e5);
const WD="일월화수목금토";
const fmt=d=>`${d.getMonth()+1}월 ${d.getDate()}일 (${WD[d.getDay()]})`;
const isStudy=d=>d.getDay()!==0&&key(d)!=="2026-12-25";
const cnt=(s,e)=>{let n=0;for(let d=parse(s);key(d)<=e;d=add(d,1))if(isStudy(d))n++;return n};

const PLAN_START="2026-11-20";
const WILD_START_DEFAULT="2026-10-06"; // 광야 프로젝트 시작일
const EXAM1_DEFAULT="2027-03-13", EXAM2_DEFAULT="2027-06-12"; // 2026년 일정(3/14, 6/13) 기준 추정

const SEG=[
{s:"2026-11-20",e:"2026-11-22",jm:5,wg:0,mu:4,pg:0,ry:4,law:50,eng:1,nae:20,acc:0,topic:"CISG·무역계약"},
{s:"2026-11-23",e:"2026-11-29",jm:15,wg:0,mu:9,pg:2,ry:12,law:150,eng:3,nae:60,acc:0,topic:"CISG·무역계약"},
{s:"2026-11-30",e:"2026-12-06",jm:15,wg:0,mu:9,pg:2,ry:12,law:150,eng:3,nae:60,acc:0,topic:"Incoterms 2020"},
{s:"2026-12-07",e:"2026-12-13",jm:1,wg:24,mu:9,pg:2,ry:12,law:150,eng:3,nae:60,acc:0,topic:"신용장·UCP600"},
{s:"2026-12-14",e:"2026-12-15",jm:0,wg:9,mu:3,pg:0,ry:4,law:50,eng:1,nae:20,acc:0,topic:"신용장·UCP600"},
{s:"2026-12-16",e:"2026-12-20",jm:0,wg:0,mu:14,pg:5,ry:8,law:100,eng:2,nae:40,acc:40,topic:"신용장·UCP600"},
{s:"2026-12-21",e:"2026-12-27",jm:0,wg:0,mu:20,pg:4,ry:12,law:125,eng:2.5,nae:40,acc:50,topic:"운송·보험·클레임"},
{s:"2026-12-28",e:"2026-12-31",jm:0,wg:0,mu:5,pg:2,ry:9,law:100,eng:2,nae:20,acc:70,topic:"운송·보험·클레임"}];
SEG.forEach(g=>g.n=cnt(g.s,g.e));

const ITEMS=[
{k:"jm",n:"회계 · 재무회계",u:"강",max:36,st:1},
{k:"wg",n:"회계 · 원가회계",u:"강",max:33,st:1},
{k:"mu",n:"무역실무",u:"강",max:73,st:1},
{k:"pg",n:"관세평가",u:"강",max:17,st:1},
{k:"ry",n:"관세율표",u:"류",max:97,st:1,base:24},
{k:"law",n:"관세법 회독",u:"p",st:25},
{k:"eng",n:"무역영어 기출",u:"회분",st:.5},
{k:"nae",n:"내국소비세법 기출",u:"문항",st:10},
{k:"acc",n:"회계 기출",u:"문항",st:10}];

const CPS=[
{id:"c1",d:"2026-12-13",t:"회계 완강 직전",g:["재무 36강 완강, 원가 24강","무역실무 31강","관세평가 6강","관세율표 64류까지","관세법 +500p","재무 예제 재풀이 정답률 70% 이상","무역영어 기출 60점 이상"],a:"회계가 3강 이상 밀렸으면 무역실무를 2배속으로 바꾸고 그 시간을 회계에 쓴다."},
{id:"c2",d:"2026-12-31",t:"강의 단계 종료",g:["회계 69강 완강 (12/15)","무역실무 73강 완강","관세평가 17강 완강","관세율표 97류 1회전, 류 제목 백지 90%","관세법 +875p","회계 기출 1회분 시간 재고 50점 이상","무역영어 65점 이상","내국소비세법 정답률 50% 이상"],a:"이월 강의는 1/10까지만 허용. 회계 50점 미만이면 1월 회계를 하루 120분으로."},
{id:"c3",d:"2027-01-31",t:"1차 기출 1회전",g:["1차 4과목 최근 5개년 기출 1회전","내국소비세법 강의·기출 1회전","관세율표 2회전 (호 단위)","실전 1회: 회계 55 · 관세법 65 · 무역영어 70 · 내소세 55","4과목 평균 60 이상"],a:"평균 60 미만이면 2월 2차 공부는 관세율표 30분만 남기고 전부 1차로."},
{id:"c4",d:"2027-02-28",t:"1차 약 2주 전",g:["실전 모의고사 6회 이상","오답 노트 최종 정리 완료","최근 3회 평균 65 이상","과락(40 미만) 0회","회계 최근 3회 평균 55 이상"],a:"남은 2주는 가장 낮은 과목에 하루 절반. 새 자료는 보지 않는다."},
{id:"c5",d:"2027-04-30",t:"2차 약 6주 전",g:["4과목 실전 답안 과목당 4회 이상","관세율표 호·주 3회전","관세평가 최근 5년 기출 목차 완성","실전 답안에서 모든 문항을 시간 안에 채움","자체 채점 과목별 50 이상"],a:"가장 약한 과목을 주 3회 실전으로. 문항을 비우는 습관부터 고친다."}];

const raw=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const setRaw=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const okDate=v=>/^\d{4}-\d{2}-\d{2}$/.test(v||"");
const exam1=()=>okDate(raw("hub-exam"))?raw("hub-exam"):EXAM1_DEFAULT;
const exam2=()=>okDate(raw("hub-exam2"))?raw("hub-exam2"):EXAM2_DEFAULT;
const wildStart=()=>okDate(raw("hub-wild"))?raw("hub-wild"):WILD_START_DEFAULT;

function load(){
  let S={};try{S=JSON.parse(raw("cbplan1"))||{}}catch(e){S={}}
  S.done=S.done||{};S.mode=S.mode||{};S.cp=S.cp||{};S.prog=S.prog||{};
  ITEMS.forEach(i=>{if(typeof S.prog[i.k]!=="number")S.prog[i.k]=i.base||0});
  delete S.e1;delete S.e2;
  return S;
}
const save=S=>setRaw("cbplan1",JSON.stringify(S));

function expected(k,d){
  const dk=key(d),it=ITEMS.find(i=>i.k===k);let v=it.base||0;
  for(const g of SEG){if(dk>=g.e)v+=g[k];else if(dk>=g.s){v+=g[k]*(g.n?cnt(g.s,dk)/g.n:0)}}
  return v;
}
const segOf=d=>SEG.find(g=>key(d)>=g.s&&key(d)<=g.e);
const end=(t,m)=>{if(!t)return"";const[h,mi]=t.split(":").map(Number);const x=h*60+mi+m;return`${pad(Math.floor(x/60))}:${pad(x%60)}`};

function sched(d,S){
  const k=key(d),dow=d.getDay(),post=k>="2026-12-16",seg=segOf(d);
  const topic=seg?seg.topic:"약한 주제";
  const n=Math.min(97,S.prog.ry+1),n2=Math.min(97,n+1);
  const B=(id,t,m,title,det)=>({id,t,m,title,det});
  if(S.mode[k]||k==="2026-12-25"){
    return{label:k==="2026-12-25"?"12/25 · 최소 2시간 버전":"최소 2시간 버전 · 순서대로",min:true,b:[
      B("m1","",20,"관세율표 복습","신규 없이 어제·3일 전 류를 소리 내어"),
      B("m2","",60,"회계",post?"단원별 기출 10문항":"강의 1강 (예제 재풀이는 일요일로)"),
      B("m3","",25,"무역실무","1강 1.75배속, 정리 생략"),
      B("m4","",15,"마감 점검","밀린 것을 적고 회수할 날짜 정하기")]};
  }
  if(dow===0)return{label:"일요일 · 버퍼 3시간 · 진도 없음",b:[
    B("s1","10:00",45,"관세율표 주간 복습","이번 주 류 백지 복원, 틀린 류는 다음 주 아침 복습 목록으로"),
    B("s2","10:45",60,"회계 오답","이번 주 오답 노트를 해설 없이 다시 풀기"),
    B("s3","11:45",30,"관세법","이번 주 형광펜 부분 훑기 (밀린 게 있으면 이 시간에 회수)"),
    B("s4","12:15",30,"2차 개념 백지","무역실무·관세평가 이번 주 핵심 개념 (밀린 게 있으면 회수)"),
    B("s5","12:45",15,"주간 점검","진도 숫자 입력, 다음 주 목표 확인")]};
  if(k>"2026-12-31")return{label:"1월 임시 시간표 · 1차 기출 중심 (1월 계획 확정 전)",b:[
    B("j1","08:30",15,"관세율표 복습","2회전, 호 단위"),
    B("j2","08:50",120,"회계 기출","약한 단원부터, 오답 노트"),
    B("j3","11:00",60,"관세법 1차 기출","틀린 지문은 기본서에 표시"),
    B("j4","13:25",20,"관세율표 2회전","호 단위 소리 내어"),
    B("j5","13:45",40,"무역영어 기출","3대 협약 중심"),
    B("j6","14:35",90,"내국소비세법","강의 복습 + 기출"),
    B("j7","16:15",45,"2차 복습","관세평가 사례 / 무역실무 번갈아"),
    B("j8","17:00",10,"관세율표 백지 복원",""),
    B("j9","17:10",15,"마감 점검","")]};
  const nae=[2,4,6].includes(dow);
  const acc=post?[B("a1","08:50",60,"회계 기출","단원별 10문항, 틀린 건 오답 노트"),B("a2","10:00",145,"2차 강의","무역실무 약 3강 + 관세평가 (주간 목표에 맞춰)")]
    :[B("a1","08:50",100,"회계 1",k<="2026-12-07"?"재무회계 강의 + 직후 예제 손으로 다시 풀기":"원가회계 2강 + 예제 다시 풀기"),B("a2","10:40",105,"회계 2","같은 방식, 마지막 5분 오답 노트")];
  return{label:(post?"12/16 이후 평일":"평일")+" · 7.5시간",b:[
    B("w1","08:30",15,"관세율표 복습","어제·3일 전·7일 전 류를 소리 내어"),
    ...acc,
    B("w2","13:25",20,"관세율표 신규",S.prog.ry>=97?"1회전 완료, 약한 류 복습":`${n}~${n2}류 앞글자 소리 내어 5회`),
    B("w3","13:45",50,"관세법 회독","형광펜 25p + 답안 목차 4줄"),
    B("w4","14:45",25,"무역영어 기출",`10문항 · 주제: ${topic}`),
    B("w5","15:10",50,"무역실무","1강 1.75배속 + 개념 3개 적기"),
    nae?B("w6","16:10",60,"내국소비세법","기출 20문항, 틀린 지문 기본서 표시"):B("w6","16:10",60,"2차 강의 B","관세평가 주 2강 우선, 나머지 무역실무"),
    B("w7","17:10",10,"관세율표 백지 복원","오늘 2류 + 임의의 부 하나"),
    B("w8","17:20",15,"마감 점검","체크, 밀린 것 적기, 진도 숫자 입력")]};
}
// 그날 계획 중 끝낸 비율(분 기준, 0~1)
function dayRatio(d,S){
  const k=key(d),done=S.done[k];if(!done)return 0;
  const sc=sched(d,S);let t=0,m=0;sc.b.forEach(b=>{t+=b.m;if(done[b.id])m+=b.m});
  return t?m/t:0;
}
// 연속 수련일: 계획의 60% 이상 끝낸 날이 끊기지 않고 이어진 수 (오늘은 채웠을 때만 셈)
function streak(S,today){
  let n=0,d=new Date(today);
  if(dayRatio(d,S)<.6)d=add(d,-1);
  while(key(d)>=PLAN_START&&dayRatio(d,S)>=.6){n++;d=add(d,-1)}
  return n;
}
const today=()=>{const t=new Date();t.setHours(0,0,0,0);return t};

window.PLAN={pad,key,parse,add,diffDays,fmt,WD,isStudy,SEG,ITEMS,CPS,load,save,expected,segOf,sched,end,dayRatio,streak,today,
  exam1,exam2,wildStart,setRaw,raw,PLAN_START,EXAM1_DEFAULT,EXAM2_DEFAULT,WILD_START_DEFAULT};
})();
