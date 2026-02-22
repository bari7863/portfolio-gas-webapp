# gas-webapp-Membership management
- GASで作成したWebアプリ（角張会_会員管理）

# GAS Webアプリ：角張会_会員管理

## URL
- Webアプリ：https://script.google.com/macros/s/AKfycbwcaK44Cf0jgGRvypCDqnpsfT1SLaf7zrJY9vgi-LMu875JAYnpFBpd5mcCAqF6cE0A/exec
  
- スプレッドシート（閲覧）：https://docs.google.com/spreadsheets/d/1m2qiw2VJConvFoCVkth9AKOiL-yB8-q9UYrvv6nE6z4/edit?usp=sharing

- Googleフォーム（回答）：https://docs.google.com/forms/d/e/1FAIpQLScrUmFdRzOBXmRb78tXxJsjvC_fE94ho2kucdYOEUTFhCKk_g/viewform

## 概要
- 目的：角張会に賛同し参加してくれる素敵な会員を管理するためのWebアプリ

## ログイン情報
- ID：coco
- パスワード：cocochan

## 機能
- 登録：Googleフォームから回答

- 検索：「企業名・氏名・紹介者」を部分一致で検索可、「並び順・グループ」の変更可

- グループ：「入会年度・従業員数・創業 or 後継・創業・設立・年齢・業種」ごとにグループ化

- URL：「ホームページ・指針書・SNS」などをクリックしたら、そのURLへジャンプ

- 詳細：登録された会員をクリックしたら、詳細画面にジャンプ

- 写真：回答でいただいた写真をアプリで閲覧できるように、保存された写真の権限を自動で「一般的なアクセス：リンクを知っている全員 → 閲覧者」に変更

- ログイン：Googleフォームで回答したID、パスワードでログイン（管理者がスプレッドシートから許可しないとログインすることができない、2段階認証を実装）

- 2段階認証：スプレッドシートのAD列「2段階認証」のチェックボックスがチェックされている「ID・パスワード」のみ、ログインすることができる仕様

- ログ管理：ログイン履歴を、スプレッドシートのシート名「ログ管理」に自動記録（ログインした「日時・ID・パスワード・ログイン成功 / 失敗」などの情報を記録）

- レスポンシブ対応：スマホ画面で見やすいようにデザインを調整（「会員情報・詳細画面」を縦一列で表示、「検索画面・グループ画面」を別タブで表示）

## 技術
- Google Apps Script

- Google スプレッドシート

- HTML/CSS/JavaScript

## 画面イメージ

### PC画面
- ログイン画面
<img width="557" height="409" alt="角張会_会員管理(ログイン画面)" src="https://github.com/user-attachments/assets/93526c4e-6fc9-425d-9464-cf2cc9a3ff6e" />

- 会員画面（検索画面）
<img width="1665" height="764" alt="角張会_会員管理" src="https://github.com/user-attachments/assets/9e331a2b-0e66-4837-a47e-d1a2e80c3ec7" />

- 詳細画面
<img width="1661" height="657" alt="角張会_会員管理詳細画面)" src="https://github.com/user-attachments/assets/e9e2c93d-8e23-41ee-8ce6-a26b02ac7529" />

### スマホ画面
- 会員画面
<img width="317" height="675" alt="角張会_会員管理(レスポンシブ画面)" src="https://github.com/user-attachments/assets/f5930691-db1f-4759-a8e5-2df7a8781abf" />

- 検索画面
<img width="328" height="714" alt="角張会_スマホ画面(検索画面)" src="https://github.com/user-attachments/assets/e0f87fd1-4798-4b0f-a365-ee26a8f8d1e2" />

- グループ画面
<img width="325" height="712" alt="角張会_スマホ画面(グループ画面)" src="https://github.com/user-attachments/assets/72c75f1f-4b63-402f-bb47-ce7624ed15a8" />

- 詳細画面
<img width="300" height="686" alt="角張会_スマホ画面(詳細画面)" src="https://github.com/user-attachments/assets/8a619b3a-afba-4565-9d64-95671ebfcc98" />
