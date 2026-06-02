#!/usr/bin/env node
// Resend로 Gmail 알림 발송. /tmp/gsc-monitor-report.md 리포트를 읽어 메일 본문 구성.
// env: RESEND_API_KEY(필수), ALERT_TO(기본 theassetsquare@gmail.com), RUN_URL(선택), ALERT_SUBJECT(선택)
import fs from 'node:fs';
const KEY = process.env.RESEND_API_KEY;
if (!KEY) { console.warn('RESEND_API_KEY 미설정 — 이메일 생략'); process.exit(0); }
const to = process.env.ALERT_TO || 'theassetsquare@gmail.com';
const subject = process.env.ALERT_SUBJECT || '[일산룸][🚨] GSC 색인/순위 문제 감지 — 확인 필요';
const runUrl = process.env.RUN_URL || '';
let report = '';
try { report = fs.readFileSync('/tmp/gsc-monitor-report.md', 'utf8'); } catch {}
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const html = `<h2>🚨 일산룸(ilsanroom1) GSC 문제 감지</h2>`
  + `<p>자동 점검에서 미해결 문제가 발견됐습니다. 자가치유(사이트맵 재제출)는 자동 적용됐으며, 아래는 전체 리포트입니다.</p>`
  + `<pre style="background:#f5f5f5;padding:14px;border-radius:8px;white-space:pre-wrap;font-size:13px">${esc(report)}</pre>`
  + (runUrl ? `<p><a href="${runUrl}">워크플로 실행 로그 →</a></p>` : '');
const r = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ from: '일산룸 모니터 <onboarding@resend.dev>', to: [to], subject, html }),
});
console.log('Resend status:', r.status, await r.text());
process.exit(0);
