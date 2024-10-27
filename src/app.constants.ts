export const BOT_NAME = "Stadium finder bot";

export const carpatterns = [
  /^\d{5}[A-Z]{3}$/, // 01123AAA
  /^[A-Z]{3}\d{3}$/, // PAA123
  /^\d{2}[A-Z]{1}\d{3}[A-Z]{2}$/, // 01a123aa
  /^CMD\d{4}$/, // CMD1234
  /^D\d{6}$/, // D123456
  /^UN\d{4}$/, // UN1234
  /^T\d{6}$/, // T123456
  /^X\d{6}$/, // X123456
  /^\d{2}M\d{6}$/, // 01M123456
  /^\d{2}H\d{6}$/, // 01H123456
];
