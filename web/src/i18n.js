import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        "Home": "Home",
        "Search": "Search",
        "My profile": "My profile",
        "logout": "logout",
        "Sign in": "Sign in",
        "UserName": "UserName",
        "Password": "Password",
        "Forgot password?": "Forgot password",
        "Forgot Your Password": "Forgot Your Password",
        "Don't have an account? Sign Up": "Don't have an account? Sign Up",
        "Already have an account? Sign in": "Already have an account? Sign in",
        "reset": "reset",
        "Sign up": "Sign up",
        "First Name": "First Name",
        "Last Name": "Last Name",
        "Email Address": "Email Address",
        "Confirm Password": "Confirm Password",
        "Reset password": "Reset password",
        "Featured": "Featured",
        "Discover our best picks": "Discover our best picks",
        "Find Movies, TV Shows, ...": "Find Movies, TV Shows, ...",
        "Title": "Title",
        "Year": "Year",
        "Date Added": "Date Added",
        "Rating": "Rating",
        "Trending": "Trending",
        "Similar": "Similar",
        "Add comment": "Add comment",
        "Add public comment ...": "Add a public comment ...",
        "result matched": "result matched",
        "save": "save",
        "Settings Profile": "Settings Profile",
        "Dashboard": "Dashboard",
        "Change password": "Change password",
        "save image": "save image",
      }
    },
    fr: {
      translations: {
        "Home": "Accueil",
        "Search": "Recherche",
        "My profile": "Mon profile",
        "logout": "Se déconnecter",
        "Sign in": "Se Connecter",
        "UserName": "Nom d'utilisateur",
        "Password": "Mot de Passe",
        "Forgot password?": "Mot de passe oublié?",
        "Forgot Your Password": "Mot de passe oublié",
        "Don't have an account? Sign Up": "Vous n'avez pas de compte? S'inscrire",
        "Already have an account? Sign in": "Vous avez déjà un compte? Se connecter",
        "reset": "réinitialiser",
        "Sign up": "S'inscrire",
        "First Name": "Nom",
        "Last Name": "Prènom",
        "Email Address": "Adresse E-mail",
        "Confirm Password": "Confirmez le mot de passe",
        "Reset password": "Réinitialiser le mot de passe",
        "Featured": "En vedette",
        "Discover our best picks": "Découvrez nos meilleurs choix",
        "Find Movies, TV Shows, ...": "Trouver des films, Des Émissions de Télévision, ...",
        "Title": "Titre",
        "Year": "Année",
        "Date Added": "Date Ajoutée",
        "Rating": "Évaluation",
        "Trending": "Tendances",
        "Similar": "Similaire",
        "Add comment": "Ajouter un commentaire",
        "Add public comment ...": "Ajouter un commentaire public ...",
        "result matched": "résultat correspondant",
        "save": "enregistrer",
        "Settings Profile": "Paramètres de Profile",
        "Dashboard": "Tableau de bord",
        "Change password": "Change le mot de passe",
        "save image": "enregistrer l'image",
      }
    }
  },
  // lng: "fr",
  fallbackLng: ["en-US", "fr-FR"],

  // // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",
});

export default i18n;
