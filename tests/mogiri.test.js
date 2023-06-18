require("dotenv").config()

const checkParticipant = require("../commands/mogiri").checkParticipant
const checkSponsor = require("../commands/mogiri").checkSponsor

const ALREADY_ADDED = 1 // 既にロールが付与されている
const ADDED = 2 // ロール付与に成功した
const NO_EXIST = 3 // 該当するチケット番号が存在しない
const NOT_PASSWORD_MATCH = 4 // パスワードが間違っている

test("grant valid invitee participant", () => {
  let ticket = process.env.TESTSP_ID
  let password = process.env.TESTSP_PW
  expect(checkParticipant(ticket, password)).toBe(ADDED)
})

test("grant valid general participant", () => {
  let ticket = "To3-12345"
  let password = process.env.PARTICIPANT_PW
  expect(checkParticipant(ticket, password)).toBe(ADDED)
})

test("deny invalid ticket participant", () => {
  let ticket = "hogehoge"
  let password = process.env.TESTSP_PW
  expect(checkParticipant(ticket, password)).toBe(NO_EXIST)
})

test("deny invalid password invitee participant", () => {
  let ticket = process.env.TESTSP_ID
  let password = "hugahuga"
  expect(checkParticipant(ticket, password)).toBe(NOT_PASSWORD_MATCH)
})

test("deny invalid password general participant", () => {
  let ticket = "To3-12345"
  let password = "hugahuga"
  expect(checkParticipant(ticket, password)).toBe(NOT_PASSWORD_MATCH)
})

test("grant valid sponsor", () => {
  let ticket = "Sp-12345"
  let password = process.env.SPONSOR_PW
  expect(checkSponsor(ticket, password)).toBe(ADDED)
})

test("deny invalid ticket sponsor", () => {
  let ticket = "hogehoge"
  let password = process.env.SPONSOR_PW
  expect(checkSponsor(ticket, password)).toBe(NO_EXIST)
})

test("deny invalid password sponsor", () => {
  let ticket = "Sp-12345"
  let password = "hugahuga"
  expect(checkSponsor(ticket, password)).toBe(NOT_PASSWORD_MATCH)
})
