# portfolio-gas-webapp
- GASで作成したWebアプリ

# GAS Webアプリ①：角張会_会員管理

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
- 検索：「企業名・氏名」で検索、「並び順・グループ」の変更
- URL：「ホームページ・指針書・SNS」などをクリックしたら、そのURLへジャンプ
- 詳細：登録された企業名をクリックしたら、詳細画面にジャンプ
- 写真：回答でいただいた写真をアプリで閲覧できるように、自動で「一般的なアクセス」を「リンクを知っている全員 → 閲覧者」に変更
- ログイン：Googleフォームで回答したID、パスワードでログイン（管理者がスプレッドシートから許可しないとログインできない2段階認証を実装）
- レスポンシブ：スマホ画面で見やすいようにデザインを調整

## 技術
- Google Apps Script
- Google スプレッドシート
- HTML/CSS/JavaScript

## 画面イメージ
- ログイン画面
<img width="557" height="409" alt="角張会_会員管理(ログイン画面)" src="https://github.com/user-attachments/assets/93526c4e-6fc9-425d-9464-cf2cc9a3ff6e" />

- 会員画面（検索画面）
<img width="1665" height="764" alt="角張会_会員管理" src="https://github.com/user-attachments/assets/9e331a2b-0e66-4837-a47e-d1a2e80c3ec7" />

- 詳細画面
<img width="1661" height="657" alt="角張会_会員管理詳細画面)" src="https://github.com/user-attachments/assets/e9e2c93d-8e23-41ee-8ce6-a26b02ac7529" />

- レスポンシブ画面
<img width="317" height="675" alt="角張会_会員管理(レスポンシブ画面)" src="https://github.com/user-attachments/assets/f5930691-db1f-4759-a8e5-2df7a8781abf" />

# GAS Webアプリ②：営業管理グラフ & ランキング

## URL
- Webアプリ：https://script.google.com/macros/s/AKfycbxwAN3VyIEUyZglxmqWbWABV75NYjhUr_CO--rxIjWEdx5hA6laBBc8pePhDpFE-WFH/exec
- スプレッドシート（閲覧）：https://docs.google.com/spreadsheets/d/1sbtPfK7p7SmPbTWP1zzJJtjJryMFIwNmCHO073lvA1I/edit?usp=sharing

## 概要
- 目的：営業マンの数字をグラフ・ランキングで表示し、競争心を芽生えされるためのWebアプリ

## 機能
- 数字入力：営業マンそれぞれに各スプレッドシートを共有し、入力してもらう
- 更新：1時間に1回数字を更新するトリガー設定、Webアプリの右上にある「更新」ボタンをクリックするとリアルタイムで反映
- グラフ：「当日・月間」ごとに「アポ・商談数 / 商談化率・受注数」をグラフで閲覧
- ランキング：「当日・月間」ごとに「アポ・商談数 / 商談化率・受注数」をランキングで閲覧

## 実装予定
- 数字入力の簡易化：スプレッドシートに直接入力ではなく、Googleフォームの回答の入力に変更（回答した数字がスプレッドシートに自動で反映される）

## 技術
- Google Apps Script
- Google スプレッドシート
- HTML/CSS/JavaScript

## 画面イメージ
- グラフ画面
 <img width="1665" height="671" alt="営業管理グラフ" src="https://github.com/user-attachments/assets/87127c15-5c56-44b3-86ec-fa865c391c62" />
  
- ランキング画面
<img width="1669" height="455" alt="営業管理ランキング" src="https://github.com/user-attachments/assets/f37ae2ff-6ed4-4c3d-be49-0d17c0d9da47" />


