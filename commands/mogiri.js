const { SlashCommandBuilder } = require("@discordjs/builders")
const db = require("../db/sqlite3")

const ALREADY_ADDED = 1 // 既にロールが付与されている
const ADDED = 2 // ロール付与に成功した
const NO_EXIST = 3 // 該当するチケット番号が存在しない
const NOT_PASSWORD_MATCH = 4 // パスワードが間違っている

/**
 * discordコマンド
 * mogiri
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mogiri")
    .setDescription("ロールを自動付与するコマンドです。")
    .addStringOption((option) =>
      option
        .setName("ロール")
        .setDescription(
          "一般参加者の方は「参加者」を、スポンサーの方は「スポンサー」を選択してください。"
        )
        .setRequired(true)
        .addChoices(
          { name: "参加者", value: "参加者" },
          { name: "スポンサー", value: "スポンサー" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("チケット番号")
        .setDescription(
          "To3-から始まるチケット番号を入力してください。（例：To3-99999）"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("パスワード")
        .setDescription(
          "参加者の方は、案内メールに記載のパスワードを入力してください。\nスポンサーの方は、事前にお伝えしたパスワードを入力してください。"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    let result = mogiri(
      interaction.member,
      interaction.options.getString("ロール"),
      interaction.options.getString("チケット番号"),
      interaction.options.getString("パスワード")
    )
    switch (result) {
      case ALREADY_ADDED:
        interaction.reply({
          content: `既に${interaction.options.getString(
            "ロール"
          )}のロールが付与されています。\nロールが付与されないなどトラブルがあれば、実行委員までご連絡ください。`,
          ephemeral: true,
        })
        break
      case ADDED:
        interaction.reply({
          content: `${interaction.options.getString(
            "ロール"
          )}のロール付与が完了しました。\nJaSST\'23 Tokyoをお楽しみください！`,
          ephemeral: true,
        })
        break
      case NO_EXIST:
        interaction.reply({
          content:
            "チケット番号を確認できませんでした。\n番号をご確認の上、再度mogiriコマンドを実行してください。",
          ephemeral: true,
        })
        break
      case NOT_PASSWORD_MATCH:
        interaction.reply({
          content:
            "パスワードが異なります。\nパスワードをご確認の上、再度mogiriコマンドを実行してください。",
          ephemeral: true,
        })
        break
      default:
        interaction.reply({
          content:
            "エラーが発生しました。再度mogiriコマンドを実行してください。\nロールが付与されないなどトラブルがあれば、実行委員までご連絡ください。",
          ephemeral: true,
        })
    }
  },
  checkParticipant,
  checkSponsor,
  mogiri,
}

/**
 * ロールを付与する
 * @param {GuildMember} member : 付与対象のメンバー
 * @param {String} ticket : チケット番号
 */
function mogiri(member, role, ticket, password) {
  let result = 0
  switch (role) {
    case "参加者":
      // 既に付与済みであれば処理をスキップする
      if (member.roles.cache.has(process.env.participantRoleId))
        return ALREADY_ADDED

      result = checkParticipant(ticket, password)
      if (result == ADDED) {
        member.roles.add(process.env.participantRoleId)

        // どのdiscordユーザーがどのチケット番号でmogiriしたかを記録する
        db.insert(ticket, member.user.username)
      }
      return result
    case "スポンサー":
      // 既に付与済みであれば処理をスキップする
      if (member.roles.cache.has(process.env.sponsorRoleId))
        return ALREADY_ADDED

      result = checkSponsor(ticket, password)
      if (result == ADDED) {
        member.roles.add(process.env.sponsorRoleId)

        // どのdiscordユーザーがどのチケット番号でmogiriしたかを記録する
        db.insert(ticket, member.user.username)
      }
      return result
    default:
      break
  }
}

/**
 *
 * @param {String} ticket : チケット番号
 * @param {String} password : パスワード
 */
function checkParticipant(ticket, password) {
  // 入力されたチケット番号から、招待者用の環境変数のキーを逆引き
  js = JSON.parse(process.env.INVITEE_ENV)
  id_key = Object.keys(js).find((key) => js[key] === ticket)

  if (isInvitee(id_key, js)) {
    pw_key = id_key.replace(/_ID/, "_PW")
    if (js[pw_key] == password) {
      return ADDED
    } else {
      return NOT_PASSWORD_MATCH
    }
  }

  // 一般参加者
  if (!isValidParticipantTicket(ticket)) return NO_EXIST
  if (password == process.env.PARTICIPANT_PW) {
    return ADDED
  } else {
    return NOT_PASSWORD_MATCH
  }
}

/**
 *
 * @param {String} ticket : チケット番号
 * @param {String} password : パスワード
 */
function checkSponsor(ticket, password) {
  if (!isValidSponsorTicket(ticket)) return NO_EXIST
  if (password == process.env.SPONSOR_PW) {
    return ADDED
  } else {
    return NOT_PASSWORD_MATCH
  }
}

/**
 *
 * @param {String} id_key
 * @param {Object} js
 * @returns 招待者の場合、true
 */
function isInvitee(id_key, js) {
  return id_key in js
}

function isValidParticipantTicket(ticket) {
  // TODO : 判定方法を、既に発行したチケット番号に合致するかどうか？に変える
  return ticket.match(/.*To3-\d{5}.*/)
}

function isValidSponsorTicket(ticket) {
  // TODO : 判定方法を、既に発行したチケット番号に合致するかどうか？に変える
  return ticket.match(/.*Sp-\d{5}.*/)
}
