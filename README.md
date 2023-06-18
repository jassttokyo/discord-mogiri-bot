# mogiri bot

## 起動方法
1. ブラウザでbotの[招待リンク](https://discord.com/api/oauth2/authorize?client_id=943515396806443058&permissions=8858371072&scope=bot)を開き、招待したいDiscordサーバーを選択する
1. このリポジトリをクローンする
1. クローンしたリポジトリ内で`.env`ファイルを作成する
1. 作成した`.env`ファイル内に、以下を記載する
	- bot固有のもの(知りたい方は[@ropQa](https://twitter.com/ropQa)にDMください)
		- discord botのトークン
		- clientId
	- JaSSTの開催体によって変えるもの(使用したいサーバー、ロールのIDをご使用ください)
		- guildId
		- 自動付与したいロールのID
		- mogiri用のパスワード
1. `node.js`の`v16.6.0`以上をインストールする
1. `npm install`を実行する
1. ルートディレクトリで`node deploy-commands.js`を実行し、コマンドを登録する
1. ルートディレクトリで`node index.js`を実行し、botを起動する

## できること
- サーバー内にいるユーザーに`mogiri`コマンドを実行してもらい、実行したメンバーにロールを付与する
