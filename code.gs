/***** 設定 *****/
const CONFIG = {
  SPREADSHEET_ID: '1m2qiw2VJConvFoCVkth9AKOiL-yB8-q9UYrvv6nE6z4',
  SHEET_ID: 1253781772,     // URLのgid
  HEADER_ROW: 1,
  CACHE_SECONDS: 120
};

/***** Web App entry *****/
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('角張会')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/***** データ取得（フロントから呼ぶ） *****/
function getCompanies() {
  const cache = CacheService.getScriptCache();
  const cached = (CONFIG.CACHE_SECONDS > 0) ? cache.get('companies_json_v1') : null;
  if (cached) return JSON.parse(cached);

  const sh = getSheetById_(CONFIG.SPREADSHEET_ID, CONFIG.SHEET_ID);
  const lastRow = sh.getLastRow();
  const lastCol = sh.getLastColumn();

  if (lastRow < CONFIG.HEADER_ROW) {
    return { updatedAt: new Date().toISOString(), companies: [] };
  }

  const header = sh.getRange(CONFIG.HEADER_ROW, 1, 1, lastCol).getValues()[0];
  const headerNorm = header.map(h => normalizeKey_(h));

const idx = {
  company: findCol_(header, headerNorm, [
    'NO2.会社名/屋号', 'No2.会社名/屋号',
    'NO1.会社名/屋号', 'No1.会社名/屋号', '会社名/屋号', '会社名', '屋号'
  ], ['no1', '会社名'], ['会社名/屋号']),

  person: findCol_(header, headerNorm, [
    'No3.氏名', 'NO3.氏名',
    'No2.氏名', 'NO2.氏名', '氏名'
  ], ['no2', '氏名'], ['氏名']),

  founderType: findCol_(header, headerNorm, [
    'No4.創業か後継か', 'NO4.創業か後継か',
    'No3.創業か後継か', 'NO3.創業か後継か', '創業か後継か'
  ], ['no3', '創業', '後継'], ['創業', '後継']),

  industry: findCol_(header, headerNorm, [
    'NO5.業種', 'No5.業種',
    'NO4.業種', 'No4.業種', '業種'
  ], ['no4', '業種'], ['業種']),

  workDetail: findCol_(header, headerNorm, [
    'No6.自社の取扱業務の詳細', 'NO6.自社の取扱業務の詳細',
    'No5.自社の取扱業務の詳細', 'NO5.自社の取扱業務の詳細', '自社の取扱業務の詳細'
  ], ['no5', '取扱', '業務'], ['取扱', '業務']),

  prText: findCol_(header, headerNorm, [
    'No7.自社の強みや自社のPR', 'NO7.自社の強みや自社のPR',
    'No6.自社の強みや自社のPR', 'NO6.自社の強みや自社のPR',
    '自社の強みや自社のPR', '強み', 'PR'
  ], ['no6', '強み'], ['強み', 'pr']),

  employeeCount: findCol_(header, headerNorm, [
    'No8.従業員数', 'NO8.従業員数',
    'No7.従業員数', 'NO7.従業員数', '従業員数'
  ], ['no7', '従業員数'], ['従業員数']),

  hobby: findCol_(header, headerNorm, [
    'No11.趣味・好きなこと・興味のあること', 'NO11.趣味・好きなこと・興味のあること',
    'No10.趣味・好きなこと・興味のあること', 'NO10.趣味・好きなこと・興味のあること',
    '趣味・好きなこと・興味のあること', '趣味'
  ], ['no10', '趣味'], ['趣味', '好き']),

  philosophy: findCol_(header, headerNorm, [
    'No12.貴社の理念を教えてください。', 'NO12.貴社の理念を教えてください。',
    'No11.貴社の理念を教えてください。', 'NO11.貴社の理念を教えてください。',
    '貴社の理念を教えてください。', '理念'
  ], ['no11', '理念'], ['理念']),

  partnerFishType: findCol_(header, headerNorm, [
    'No15.取引先の業種を教えてください。', 'NO15.取引先の業種を教えてください。',
    'No14.取引先の業種を教えてください。', 'NO14.取引先の業種を教えてください。',
    '取引先の業種を教えてください。', '取引先', '業種'
  ], ['no14', '取引先', '業種'], ['取引先', '業種']),

  founded: findCol_(header, headerNorm, [
    'No16.創業の年月日', 'NO16.創業の年月日',
    'No15.創業の年月日', 'NO15.創業の年月日',
    '創業の年月日', '創業'
  ], ['no15', '創業'], ['創業']),

  established: findCol_(header, headerNorm, [
    'No17.法人化した場合、設立年月日', 'NO17.法人化した場合、設立年月日',
    'No16.法人化した場合、設立年月日', 'NO16.法人化した場合、設立年月日',
    '法人化した場合、設立年月日', '設立年月日', '設立'
  ], ['no16', '設立'], ['設立']),

  joinReason: findCol_(header, headerNorm, [
    'No20.入会したきっかけ', 'NO20.入会したきっかけ',
    'No19.入会したきっかけ', 'NO19.入会したきっかけ',
    '入会したきっかけ'
  ], ['no19', '入会', 'きっかけ'], ['入会', 'きっかけ']),

  birthDateRaw: findCol_(header, headerNorm, [
    'No9.生年月日', 'NO9.生年月日',
    'No8.生年月日', 'NO8.生年月日',
    '生年月日'
  ], ['no8', '生年月日'], ['生年月日']),

  joinYearRaw: findCol_(header, headerNorm, [
    'No10.角張会の入会年度', 'NO10.角張会の入会年度',
    'No9.角張会の入会年度（西暦：2×××年）', 'NO9.角張会の入会年度（西暦：2×××年）',
    '角張会の入会年度'
  ], ['no9', '入会年度'], ['角張会', '入会年度']),

  guidelineUrl: findCol_(header, headerNorm, [
    'No14.指針をお持ちの方はこちらで共有してください。', 'NO14.指針をお持ちの方はこちらで共有してください。',
    'No13.指針をお持ちの方はこちらで共有してください。（角張会で作成したもの）',
    'NO13.指針をお持ちの方はこちらで共有してください。（角張会で作成したもの）',
    '指針をお持ちの方はこちらで共有してください。', '指針', '指針書'
  ], ['no13', '指針'], ['角張会', '指針']),

  hpUrl: findCol_(header, headerNorm, [
    'No18.HPのURL', 'NO18.HPのURL',
    'No17.HPのURL', 'NO17.HPのURL',
    'HPのURL', 'ホームページ', 'HP'
  ], ['no17', 'hp'], ['hp', 'url']),

  introducer: findCol_(header, headerNorm, [
    'No19.紹介者はどなたですか？', 'NO19.紹介者はどなたですか？',
    'No18.紹介者はどなたですか。', 'NO18.紹介者はどなたですか。',
    '紹介者はどなたですか？', '紹介者はどなたですか。', '紹介者'
  ], ['no18', '紹介者'], ['紹介者']),

  instagramUrl: findCol_(header, headerNorm, [
    'No21.InstagramのURL', 'NO21.InstagramのURL',
    'No20.InstagramのURL', 'NO20.InstagramのURL',
    'InstagramのURL', 'Instagram', 'インスタ'
  ], ['no20', 'instagram'], ['instagram', 'インスタ']),

  facebookUrl: findCol_(header, headerNorm, [
    'No22.FacebookのURL', 'NO22.FacebookのURL',
    'FacebookのURL', 'Facebook', 'フェイスブック'
  ], ['no22', 'facebook'], ['facebook', 'フェイスブック']),

  tiktokUrl: findCol_(header, headerNorm, [
    'No23.TikTokのURL', 'NO23.TikTokのURL',
    'No22.TikTokのURL', 'NO22.TikTokのURL',
    'No21.TikTokのURL', 'NO21.TikTokのURL',
    'TikTokのURL', 'TikTok', 'ティックトック'
  ], ['no23', 'tiktok'], ['tiktok', 'ティックトック']),

  xUrl: findCol_(header, headerNorm, [
    'No24.XのURL', 'NO24.XのURL',
    'No23.XのURL', 'NO23.XのURL',
    'No22.XのURL', 'NO22.XのURL',
    'XのURL', 'X', 'Twitter', 'ツイッター'
  ], ['no24', 'x'], ['twitter', 'ツイッター']),

  youtubeUrl: findCol_(header, headerNorm, [
    'No25.YouTubeのURL', 'NO25.YouTubeのURL',
    'YouTubeのURL', 'YouTube', 'ユーチューブ'
  ], ['no25', 'youtube'], ['youtube', 'ユーチューブ']),

  profilePhotoUrl: findCol_(header, headerNorm, [
    'NO26.プロフィール写真をこちらで共有してください。',
    'No26.プロフィール写真をこちらで共有してください。',
    'NO24.プロフィール写真をこちらで共有してください。',
    'No24.プロフィール写真をこちらで共有してください。',
    'NO23.プロフィール写真をこちらで共有してください。',
    'No23.プロフィール写真をこちらで共有してください。',
    'プロフィール写真をこちらで共有してください。',
    'プロフィール写真'
  ], ['no26', 'プロフィール写真'], ['プロフィール写真']),

  idolId: findCol_(header, headerNorm, [
    'No27.ID', 'NO27.ID',
    'No25.ID', 'NO25.ID',
    'No24.ID', 'NO24.ID',
    'ID', 'ID'
  ], ['no27', 'id'], ['id']),

  password: findCol_(header, headerNorm, [
    'No28.パスワード', 'NO28.パスワード',
    'No26.パスワード', 'NO26.パスワード',
    'No25.パスワード', 'NO25.パスワード',
    'パスワード'
  ], ['no28', 'パスワード'], ['パスワード']),

  // ★追加：AF列「2段階認証」チェック（TRUEの行だけログインOK）
  twoFactorAuth: findCol_(header, headerNorm, [
    '2段階認証', '２段階認証', '二段階認証'
  ], ['2段階', '認証'], ['認証'])
};

  const startRow = CONFIG.HEADER_ROW + 1;
  if (lastRow < startRow) {
    return { updatedAt: new Date().toISOString(), companies: [] };
  }

  const values = sh.getRange(startRow, 1, lastRow - startRow + 1, lastCol).getValues();

  const companies = [];
  for (let i = 0; i < values.length; i++) {
    const row = values[i];

    const company = safeCell_(row, idx.company);
    if (!company) continue;

    const person = safeCell_(row, idx.person);
    const founderType = safeCell_(row, idx.founderType);
    const industry = safeCell_(row, idx.industry);
    const birthDateRaw = safeCell_(row, idx.birthDateRaw);

    const joinYearRaw = safeCell_(row, idx.joinYearRaw);
    const joinYear = extractYear_(joinYearRaw);

    const guidelineUrl = normalizeUrl_(safeCell_(row, idx.guidelineUrl));
    const instagramUrl = normalizeUrl_(safeCell_(row, idx.instagramUrl));
    const facebookUrl  = normalizeUrl_(safeCell_(row, idx.facebookUrl));
    const tiktokUrl = normalizeUrl_(safeCell_(row, idx.tiktokUrl));
    const xUrl = normalizeUrl_(safeCell_(row, idx.xUrl));
    const youtubeUrl  = normalizeUrl_(safeCell_(row, idx.youtubeUrl));
    const hpUrl = normalizeUrl_(safeCell_(row, idx.hpUrl));

    const introducer = safeCell_(row, idx.introducer);

    // 企業カードクリック時に表示する項目
    const workDetail = safeCell_(row, idx.workDetail);
    const prText = safeCell_(row, idx.prText);
    const employeeCount = safeCell_(row, idx.employeeCount);
    const hobby = safeCell_(row, idx.hobby);
    const philosophy = safeCell_(row, idx.philosophy);
    const partnerFishType = safeCell_(row, idx.partnerFishType);
    const founded = safeCell_(row, idx.founded);
    const established = safeCell_(row, idx.established);
    const joinReason = safeCell_(row, idx.joinReason);

    // プロフィール写真URL（Driveのopen?id= を画像表示用URLに変換）
    const profilePhotoUrl = normalizePhotoUrl_(safeCell_(row, idx.profilePhotoUrl));

    const idolId = safeCell_(row, idx.idolId);
    const password = safeCell_(row, idx.password);

    // 2段階認証（チェックボックス TRUE の時だけ true）
    let twoFactorOk = false;
    if (idx.twoFactorAuth != null) {
      const v = row[idx.twoFactorAuth];
      twoFactorOk = (v === true) || (String(v).toLowerCase() === 'true');
    }

    companies.push({
      rowNumber: startRow + i,
      company,
      person,
      founderType,
      industry,
      birthDateRaw,
      joinYearRaw,
      joinYear,
      guidelineUrl,
      hpUrl,
      instagramUrl,
      facebookUrl,
      tiktokUrl,
      xUrl,
      youtubeUrl,
      introducer,
      workDetail,
      prText,
      employeeCount,
      hobby,
      philosophy,
      partnerFishType,
      founded,
      established,
      joinReason,
      profilePhotoUrl,
      idolId,
      password,
      twoFactorOk
    });
  }

  const payload = { updatedAt: new Date().toISOString(), companies };
  if (CONFIG.CACHE_SECONDS > 0) {
    cache.put('companies_json_v1', JSON.stringify(payload), CONFIG.CACHE_SECONDS);
  }
  return payload;
}

/***** ログ管理 *****/
function logLoginAttempt(id, pw, result) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sh = ss.getSheetByName('ログ管理');
  sh.appendRow([new Date(), id || '', pw || '', result || '']);
}

/***** helpers *****/
function getSheetById_(spreadsheetId, sheetId) {
  const ss = SpreadsheetApp.openById(spreadsheetId);
  for (const s of ss.getSheets()) {
    if (String(s.getSheetId()) === String(sheetId)) return s;
  }
  return ss.getSheets()[0];
}

function safeCell_(row, idx0) {
  if (idx0 == null || idx0 < 0) return '';
  const v = row[idx0];
  if (v == null) return '';
  return String(v).trim();
}

function normalizeKey_(s) {
  return String(s || '')
    .replace(/[　\s]/g, '')
    .replace(/[（(]/g, '(')
    .replace(/[）)]/g, ')')
    .toLowerCase();
}

function findCol_(header, headerNorm, candidatesExact, tokensAll, fallbackContainsAnyCandidates) {
  for (const c of candidatesExact || []) {
    const cn = normalizeKey_(c);
    const j = headerNorm.indexOf(cn);
    if (j >= 0) return j;
  }
  if (tokensAll && tokensAll.length) {
    const tokens = tokensAll.map(t => normalizeKey_(t));
    for (let i = 0; i < headerNorm.length; i++) {
      const h = headerNorm[i];
      if (tokens.every(t => h.includes(t))) return i;
    }
  }
  if (fallbackContainsAnyCandidates && fallbackContainsAnyCandidates.length) {
    const cands = fallbackContainsAnyCandidates.map(t => normalizeKey_(t));
    for (let i = 0; i < headerNorm.length; i++) {
      const h = headerNorm[i];
      if (cands.some(t => h.includes(t))) return i;
    }
  }
  return null;
}

function extractYear_(text) {
  const s = String(text || '');
  const m = s.match(/(19|20)\d{2}/);
  return m ? Number(m[0]) : null;
}

function normalizeUrl_(url) {
  const s = String(url || '').trim();
  if (!s) return '';
  if (s === 'なし' || s === '不明') return '';

  // セルに複数入っていても「最初の1つ」だけを見る
  const first = s.split(/[\n,\s]+/).filter(Boolean)[0] || '';
  if (!first) return '';

  // メール（xxx@yyy.zzz）だけはURL扱いしない（TikTokの "@user" はURLなので許可）
  const lower = first.toLowerCase();
  if (lower.startsWith('mailto:')) return '';
  if (
    !/^https?:\/\//i.test(first) &&          // http(s) ではない
    !/^www\./i.test(first) &&                // www. でもない
    !first.includes('/') &&                  // パスがない（=URLっぽくない）
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(first) // メール形式
  ) return '';

  // すでに http(s)
  if (/^https?:\/\//i.test(first)) return first;

  // www. から始まる
  if (/^www\./i.test(first)) return 'https://' + first;

  // 日本語/全角などが混ざるものはURL扱いしない（=表示しない）
  if (/[^\x21-\x7E]/.test(first)) return '';

  // ざっくり「ドメインっぽい」形式だけ許可
  // 例: example.com / example.co.jp / x.com/xxx など
  if (!/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}(\/.*)?$/i.test(first)) return '';

  return 'https://' + first;
}

// ★GoogleドライブURLからファイルIDを抜く
function extractDriveFileId_(url) {
  const s = String(url || '').trim();
  if (!s) return '';
  let m = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m) return m[1];
  m = s.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return m[1];
  m = s.match(/\/d\/([a-zA-Z0-9_-]+)/); // googleusercontent系の保険
  if (m) return m[1];
  return '';
}

// プロフィール写真URLを「画像表示用」に正規化
function normalizePhotoUrl_(url) {
  const raw = String(url || '').trim();
  if (!raw) return '';
  // 既存の normalizeUrl_ と同じ思想で、最初のURLだけ使う
  const normalized = normalizeUrl_(raw);
  if (!normalized) return '';

  const id = extractDriveFileId_(normalized);
  if (id) {
    // 画像表示用（サムネ）URL
    return `https://drive.google.com/thumbnail?id=${id}&sz=w400`;
  }
  // Drive以外ならそのまま
  return normalized;
}

// Drive写真を「リンクを知っている全員が閲覧可」にする
// セル内のURL(複数でも)から DriveファイルID を全部抜く
function extractDriveFileIdsFromCell_(cellValue) {
  const raw = String(cellValue || '').trim();
  if (!raw) return [];

  // Googleフォームの回答は「改行」や「,」区切りになりやすいので両方対応
  const parts = raw.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);

  const ids = [];
  for (const p of parts) {
    const u = normalizeUrl_(p);
    const id = extractDriveFileId_(u);
    if (id) ids.push(id);
  }
  // 重複除去
  return Array.from(new Set(ids));
}

// Driveファイルを「リンクを知っている全員が閲覧可」に変更
function setAnyoneWithLinkView_(fileId) {
  if (!fileId) return;
  try {
    DriveApp.getFileById(fileId).setSharing(
      DriveApp.Access.ANYONE_WITH_LINK,
      DriveApp.Permission.VIEW
    );
  } catch (err) {
    // 権限が無い/組織設定で禁止 などの場合はここに来ます
    console.error('[setAnyoneWithLinkView_] failed:', fileId, err);
  }
}

/**
 * Googleフォーム送信時トリガー用
 * X列(=プロフィール写真列)に入ったDrive写真URLを検知して共有設定を変更する
 */
function onFormSubmit(e) {
  try {
    // 送信された行
    const row = e && e.range ? e.range.getRow() : null;
    if (!row || row <= CONFIG.HEADER_ROW) return;

    const sh = getSheetById_(CONFIG.SPREADSHEET_ID, CONFIG.SHEET_ID);
    const lastCol = sh.getLastColumn();

    // ヘッダを見て「プロフィール写真」列を特定（列位置がズレても動くように）
    const header = sh.getRange(CONFIG.HEADER_ROW, 1, 1, lastCol).getValues()[0];
    const headerNorm = header.map(h => normalizeKey_(h));

    // 2段階認証列（チェックボックス）を新規行に自動付与（未承認=FALSE）
    const twoFactorIdx = findCol_(
      header,
      headerNorm,
      ['2段階認証', '２段階認証', '二段階認証'],
      ['2段階', '認証'],
      ['認証']
    );

    if (twoFactorIdx != null) {
      const cell = sh.getRange(row, twoFactorIdx + 1);

      // まだチェックボックスになっていなければチェックボックス化
      const dv = cell.getDataValidation();
      const isCheckbox =
        dv &&
        dv.getCriteriaType &&
        dv.getCriteriaType() === SpreadsheetApp.DataValidationCriteria.CHECKBOX;

      if (!isCheckbox) {
        cell.insertCheckboxes();
      }

      // 新規行で空なら FALSE（未承認）にしておく
      const v = cell.getValue();
      if (v === '' || v == null) cell.setValue(false);
    }

    const photoIdx = findCol_(header, headerNorm, [
      'NO26.プロフィール写真をこちらで共有してください。',
      'No26.プロフィール写真をこちらで共有してください。',
      'NO24.プロフィール写真をこちらで共有してください。',
      'No24.プロフィール写真をこちらで共有してください。',
      'NO23.プロフィール写真をこちらで共有してください。',
      'No23.プロフィール写真をこちらで共有してください。',
      'プロフィール写真をこちらで共有してください。',
      'プロフィール写真'
    ], ['no23', 'プロフィール写真'], ['プロフィール写真']);

    if (photoIdx == null) return;

    // その行の写真URLセル
    const cellValue = sh.getRange(row, photoIdx + 1).getDisplayValue();
    const ids = extractDriveFileIdsFromCell_(cellValue);

    ids.forEach(id => setAnyoneWithLinkView_(id));
  } catch (err) {
    console.error('[onFormSubmit] error:', err);
  }
}
