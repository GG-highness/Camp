# README

## 概要


Campはキャンプに関する投稿や施設の評価を閲覧できるサービスです。


## 機能

* ログイン・ログアウト機能

* 複数の写真・コメント・投稿機能

* いいね機能

* 投稿編集・削除機能

* キャンプ場を5段階で評価

## 環境

* 言語 : Ruby 2.6.3

* WEBフレームワーク : Ruby on Rails 5.2.4.3

* テスト環境 : Minitest 5.14.1(まだない)

* データベース : PostgreSQL 5.7(バージョンは不明)

* 実行・開発環境 : Docker, Docker Compose(まだ)

* 運用環境 : AWS(EC2, VPC, ELB, Route53, Certificate Manager, IAM)(まだ)

## 実行方法
(適当)
起動

`docker-compose up`

停止

`docker-compose down`

ビルド

`docker-compose build`

データベースの作成

`docker-compose run web rails db:create`
`docker-compose run web rails db:migrate`
