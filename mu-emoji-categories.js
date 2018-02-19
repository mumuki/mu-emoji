(function (window) {

  window.muEmojis = window.muEmojis || {};

  var availableLanguages = ['en', 'es', 'pt'];

  function currentLanguage() {
    var _language = window.navigator.languages && window.navigator.languages[0] ||
                    window.navigator.language ||
                    window.navigator.browserLanguage ||
                    window.navigator.systemLanguage ||
                    window.navigator.userLanguage;

    var language = _language.split("-")[0];

    return availableLanguages.indexOf(language) >= 0 ? language : "en";
  }

  window.muEmojis._inputPlaceholder_ = {
    en: "Search emojis",
    es: "Buscar emoticón",
    pt: "Emoticon de busca",
  }

  window.muEmojis._categories_ = [
    {
      name: "people",
      caption: {
        en: "Smileys & People",
        es: "Sonrisas y gente",
        pt: "Sorrisos e pessoas",
      }
    },
    {
      name: "nature",
      caption: {
        en: "Animals & Nature",
        es: "Animales y naturaleza",
        pt: "Animais e natureza",
      }
    },
    {
      name: "food",
      caption: {
        en: "Food & Drink",
        es: "Comida y bebida",
        pt: "Comida e bebida",
      }
    },
    {
      name: "activity",
      caption: {
        en: "Activity",
        es: "Actividad",
        pt: "Atividade",
      }
    },
    {
      name: "travel",
      caption: {
        en: "Travel & Places",
        es: "Viajes y lugares",
        pt: "Viagens e lugares",
      }
    },
    {
      name: "objects",
      caption: {
        en: "Objects",
        es: "Objetos",
        pt: "Objetos",
      }
    },
    {
      name: "symbols",
      caption: {
        en: "Symbols",
        es: "Símbolos",
        pt: "Símbolos",
      }
    },
    {
      name: "flags",
      caption: {
        en: "Flags",
        es: "Banderas",
        pt: "Bandeiras",
      }
    }
  ]

  function compareEmojis(a, b) {
    return a.order < b.order ? -1 : (a.order == b.order ? 0 : 1);
  }

  function fromCategory(category, jsCriteria, emoji) {
    return emoji.category === category.name && eval(jsCriteria);
  }

  function filterEmojisBy(category, jsCriteria) {
    return window.muEmojis.list.filter(fromCategory.bind(window.muEmojis, category, jsCriteria));
  }

  window.muEmojis.filterEmojisBy = filterEmojisBy;

  window.muEmojis.categories = window.muEmojis._categories_.map(function (category, index) {
    return {
      name: category.name,
      order: index + 1,
      caption: category.caption[currentLanguage()],
      list: filterEmojisBy(category, "!emoji.diversity"),
      diversity: filterEmojisBy(category, "!!emoji.diversity"),
    };
  })

  window.muEmojis.inputPlaceholder = window.muEmojis._inputPlaceholder_[currentLanguage()];

})(window);
