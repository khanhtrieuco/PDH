var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const en = __importDefault(require("./en.js"));
const vn = __importDefault(require("./vn.js"));
const messages = {
  en: en.default,
  vn: vn.default
}
module.exports = messages