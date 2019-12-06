const nextI18next = _interopRequireDefault(require("next-i18next"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * i18n package for NextJS
 * https://github.com/isaachinman/next-i18next
 */

const NextI18NextInstance = new nextI18next.default({
  defaultLanguage: 'fr-FR',
  otherLanguages: ['en-US'],
  localePath: 'public/static/locales'
});

module.exports = NextI18NextInstance;
