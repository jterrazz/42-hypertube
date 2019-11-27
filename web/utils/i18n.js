const nextI18next = _interopRequireDefault(require("next-i18next"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NextI18NextInstance = new nextI18next.default({
  defaultLanguage: 'fr-FR',
  otherLanguages: ['en-US']
});

module.exports = NextI18NextInstance;
