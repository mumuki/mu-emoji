var mumuki = {
  load: function (callback) {
    return callback();
  }
}

mumuki.load(function () {

  var ESCAPE_KEY = 27;

  var OPEN_CLASS = 'open';
  var ACTIVE_CLASS = 'active';

  var TONE_0 = '1f3fa';
  var TONE_1 = '1f3fb';
  var TONE_2 = '1f3fc';
  var TONE_3 = '1f3fd';
  var TONE_4 = '1f3fe';
  var TONE_5 = '1f3ff';

  var TONES = [TONE_1, TONE_2, TONE_3, TONE_4, TONE_5];

  function noop() {}
  function id(x) { return x }
  function $class(clazz) { return '.' + clazz }

  function $$(array) {
    return $(array.join('\n'));
  }

  MuEmoji.DROPDOWN = 'mu-emoji-dropdown';

  MuEmoji.DROPDOWN_MENU = MuEmoji.DROPDOWN + '-menu';

  MuEmoji.DROPDOWN_TOGGLE = MuEmoji.DROPDOWN + '-toggle';

  MuEmoji.DROPDOWN_MENU_ALIGNMENT = MuEmoji.DROPDOWN_MENU + '-alignment';
  MuEmoji.DROPDOWN_MENU_ALIGNMENT_LEFT = MuEmoji.DROPDOWN_MENU_ALIGNMENT + '-left';
  MuEmoji.DROPDOWN_MENU_ALIGNMENT_RIGHT = MuEmoji.DROPDOWN_MENU_ALIGNMENT + '-right';
  MuEmoji.DROPDOWN_MENU_ALIGNMENT_CENTER = MuEmoji.DROPDOWN_MENU_ALIGNMENT + '-center';

  MuEmoji.DROPDOWN_MENU_TABS = MuEmoji.DROPDOWN_MENU + '-tabs';
  MuEmoji.DROPDOWN_MENU_TAB = MuEmoji.DROPDOWN_MENU_TABS + '-item';

  MuEmoji.DROPDOWN_MENU_SEARCH = MuEmoji.DROPDOWN_MENU + '-search';
  MuEmoji.DROPDOWN_MENU_SEARCH_ICON = MuEmoji.DROPDOWN_MENU_SEARCH + '-icon';
  MuEmoji.DROPDOWN_MENU_SEARCH_INPUT = MuEmoji.DROPDOWN_MENU_SEARCH + '-input';

  MuEmoji.DROPDOWN_MENU_EMOJIS = MuEmoji.DROPDOWN_MENU + '-emojis';
  MuEmoji.DROPDOWN_MENU_EMOJIS_CATEGORIES = MuEmoji.DROPDOWN_MENU_EMOJIS + '-categories';
  MuEmoji.DROPDOWN_MENU_EMOJIS_CATEGORY = MuEmoji.DROPDOWN_MENU_EMOJIS_CATEGORIES + '-item';

  MuEmoji.DROPDOWN_MENU_EMOJI = MuEmoji.DROPDOWN_MENU_EMOJIS + '-item';

  MuEmoji.DROPDOWN_MENU_FOOTER = 'mu-emojis-footer';
  MuEmoji.DROPDOWN_MENU_FOOTER_DIVERSITIES = 'mu-emoji-diversities';
  MuEmoji.DROPDOWN_MENU_FOOTER_EMOJI_ONE_LEGEND = 'emoji-one-legend';

  function MuEmoji($element, index) {
    this.$element = $element;
    this.index = index;
  }

  MuEmoji.prototype = {

    create: function () {
      this.$element.empty();
      this.createDropdownToggle();
      this.createDropdownMenu();
    },

    createDropdownToggle: function () {
      this.toggle = new MuEmojiDropdownToggle(this);
      this.$element.append(this.toggle.create());
    },

    createDropdownMenu: function () {
      this.menu = new MuEmojiDropdownMenu(this);
      this.$element.append(this.menu.create());
    },

    dropdownToggleIconClass: function () {
      return this.$element.data('icon-class') || 'fa fa-fw fa-smile-o';
    },

    dropdownMenuAlignmentClass: function () {
      switch (this.$element.data('dropdown-alignment')) {
        case 'right': return MuEmoji.DROPDOWN_MENU_ALIGNMENT_RIGHT;
        case 'center': return MuEmoji.DROPDOWN_MENU_ALIGNMENT_CENTER;
        default: return MuEmoji.DROPDOWN_MENU_ALIGNMENT_LEFT;
      }
    },

    openDropdown: function () {
      this.menu.open();
    },

    closeDropdown: function () {
      this.menu.close();
    },

    toggleDropdown: function (event) {
      this.menu.toggleDropdown(event);
    },

    clickedOnEmoji: function (emoji) {
      eval(this.$element.data('on-emoji-click'))(emoji);
      this.closeDropdown();
    },

    hasDiversityEnable: function () {
      return this.$element.data('with-diversity');
    },

  }



  function MuEmojiDropdownToggle(parent) {
    this.parent = parent;
  }

  MuEmojiDropdownToggle.prototype = {

    create: function () {
      return this.$element = $('<a>', {
        class: MuEmoji.DROPDOWN_TOGGLE,
        html: this.icon(),
        click: this.parent.toggleDropdown.bind(this.parent)
      });
    },

    icon: function () {
      return $('<i>', {
        class: this.parent.dropdownToggleIconClass()
      });
    }

  }



  function MuEmojiDropdownMenu(parent) {
    this.parent = parent;
  }

  MuEmojiDropdownMenu.prototype = {

    create: function () {
      this.$element = $('<div>', {
        class: [MuEmoji.DROPDOWN_MENU, this.alignmentClass()].join(' '),
      });
      this.createTabs();
      this.createSearch();
      this.createEmojis();
      this.createFooter();
      return this.$element;
    },

    alignmentClass: function () {
      return this.parent.dropdownMenuAlignmentClass();
    },

    createTabs: function () {
      this.tabs = new MuEmojiDropdownMenuTabs(this);
      this.$element.append(this.tabs.create());
    },

    createSearch: function () {
      this.search = new MuEmojiDropdownMenuSearch(this);
      this.$element.append(this.search.create());
    },

    createEmojis: function () {
      this.emojis = new MuEmojiDropdownMenuEmojis(this);
      this.$element.append(this.emojis.create());
    },

    createFooter: function () {
      this.footer = new MuEmojiDropdownMenuFooter(this);
      this.$element.append(this.footer.create());
    },

    clickedOnTone: function (clickedTone) {
      this.emojis.clickedOnTone(clickedTone);
    },

    open: function () {
      this.$element.addClass(OPEN_CLASS);
    },

    isOpen: function () {
      return this.$element.hasClass(OPEN_CLASS);
    },

    close: function () {
      this.$element.removeClass(OPEN_CLASS);
    },

    isClosed: function () {
      return !this.isOpen();
    },

    toggleDropdown: function () {
      this.$element.toggleClass(OPEN_CLASS);
    },

    clickedOnEmoji: function (emoji) {
      this.parent.clickedOnEmoji(emoji);
    },

    hasDiversityEnable: function () {
      return this.parent.hasDiversityEnable();
    },

    scrollToCategory(category) {
      this.emojis.scrollToCategory(category);
    }
  }


  function MuEmojiDropdownMenuTabs(parent) {
    this.parent = parent;
    this.tabs = [];
  }

  MuEmojiDropdownMenuTabs.prototype = {

    create: function () {
      this.$element = $('<ul>', {
        class: MuEmoji.DROPDOWN_MENU_TABS
      });
      this.createCategories();
      return this.$element;
    },

    createCategories: function () {
      var self = this;
      window.muEmojis.categories.forEach(function (category, index) {
        var tab = new MuEmojiDropdownMenuTab(self, category, index);
        self.tabs.push(tab);
        self.$element.append(tab.create());
      });
    },

    clickedOnTab: function (clickedTab) {
      this.tabs.forEach(function (tab) {
        tab.deactivate();
      });
      this.parent.scrollToCategory(clickedTab.category);
    },

  }


  function MuEmojiDropdownMenuTab(parent, category, index) {
    this.parent = parent;
    this.category = category;
    this.index = index;
  }

  MuEmojiDropdownMenuTab.prototype = {

    create: function () {
      var self = this
      return self.$element = $('<li>', {
        class: [MuEmoji.DROPDOWN_MENU_TAB, self.index === 0 && 'active'].filter(id).join(' '),
        title: self.category.description,
        html: self.icon(),
        click: function (event) {
          self.parent.clickedOnTab(self);
          self.activate();
          event.stopPropagation();
        }
      });
    },

    icon: function () {
      return $('<i>', {
        class: this.category.icon_class
      });
    },

    deactivate: function () {
      this.$element.removeClass(ACTIVE_CLASS);
    },

    activate: function () {
      this.$element.addClass(ACTIVE_CLASS);
    },

  }


  function MuEmojiDropdownMenuSearch(parent) {
    this.parent = parent;
    this.searchTimeout = setTimeout(noop);
  }

  MuEmojiDropdownMenuSearch.prototype = {

    create: function () {
      this.$element = $('<div>', {
        class: MuEmoji.DROPDOWN_MENU_SEARCH
      });
      this.createIcon();
      this.createInput();
      return this.$element;
    },

    createIcon: function () {
      this.$icon = $('<i>', {
        class: [MuEmoji.DROPDOWN_MENU_SEARCH_ICON, 'fa fa-fw fa-search'].join(' '),
      });
      this.$element.append(this.$icon);
    },

    createInput: function () {
      var self = this;
      this.$input = $('<input>', {
        class: MuEmoji.DROPDOWN_MENU_SEARCH_INPUT,
        placeholder: window.searchEmojiPlaceholder,
        keyup: function (event) {
          self.search();
        }
      });
      this.$element.append(this.$input);
    },

    search: function () {
      var self = this;
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(function () {
        self._doSearch(self.$input.val().trim());
      }, 500);
    },

    _doSearch: function (query) {
      console.log(query);
    },

  }


  function MuEmojiDropdownMenuEmojis(parent) {
    this.parent = parent;
    this.categories = [];
    this.emojiTone = TONE_0;
  }

  MuEmojiDropdownMenuEmojis.prototype = {

    create: function () {
      this.$element = $('<ul>', {
        class: MuEmoji.DROPDOWN_MENU_EMOJIS
      });
      this.createEmojis();
      return this.$element;
    },

    createEmojis: function () {
      var self = this
      self.$element.empty();
      self.categories = [];
      window.muEmojis.categories.forEach(function (cat) {
        var category = new MuEmojiDropdownMenuEmojisCategory(self, cat);
        self.categories.push(category);
        self.$element.append(category.create());
      });
    },

    scrollToCategory(category) {
      var firstCategory = this.categories[0];
      var categoryToScroll = this.categories.find(function (cat) {
        return cat.category.name === category.name;
      });
      var scrollTop = categoryToScroll.$element.position().top - firstCategory.$element.position().top;
      this.$element.scrollTop(scrollTop);
    },

    clickedOnTone: function (clickedTone) {
      this.emojiTone = clickedTone;
      this.createEmojis();
    },

    clickedOnEmoji: function (emoji) {
      this.parent.clickedOnEmoji(emoji)
    },

    hasDiversityEnable: function () {
      return this.parent.hasDiversityEnable();
    },

  }


  function MuEmojiDropdownMenuEmojisCategory(parent, category) {
    this.parent = parent;
    this.category = category;
  }

  MuEmojiDropdownMenuEmojisCategory.prototype = {

    create: function () {
      this.$element = $('<li>', {
        class: MuEmoji.DROPDOWN_MENU_EMOJIS_CATEGORIES,
      });
      this.createTitle();
      this.createEmojis();
      return this.$element;
    },

    createTitle: function () {
      this.$title = $('<h4>', {
        text: this.category.caption
      });
      this.$element.append(this.$title);
    },

    createEmojis: function () {
      this.$emojis = $('<ul>', {
        class: MuEmoji.DROPDOWN_MENU_EMOJIS_CATEGORY
      });
      this.populate();
      this.$element.append(this.$emojis);
    },

    populate: function () {
      var self = this
      self.category.list.forEach(function (emoji) {
        if (emoji.diversity) return;
        var categoryName = !self.hasDiversity(emoji) ? (emoji.sprite_category || emoji.category) : 'diversity';
        emoji = !self.hasDiversity(emoji) ? emoji : window.muEmojis.object[emoji.diversities[self.toneIndex()]];
        var $emoji = $('<li>', {
          class: MuEmoji.DROPDOWN_MENU_EMOJI,
          html: self.icon(categoryName, emoji),
          click: function () {
            self.parent.clickedOnEmoji(emoji);
          }
        });
        self.$emojis.append($emoji);
      });
    },

    icon: function (categoryName, emoji) {
      return $('<i>', {
        class: ['mu-emoji', 'px24', categoryName,  '_' + emoji.code_points.base].join(' '),
        title: emoji.name,
        data: {
          code: emoji.shortname
        }
      });
    },

    toneIndex: function () {
      return TONES.indexOf(this.parent.emojiTone);
    },

    hasDiversity: function (emoji) {
      return emoji.diversities.length !== 0 && this.toneIndex() >= 0 && this.hasDiversityEnable();
    },

    hasDiversityEnable: function () {
      return this.parent.hasDiversityEnable();
    }

  }


  function MuEmojiDropdownMenuFooter(parent) {
    this.parent = parent;
  }

  MuEmojiDropdownMenuFooter.prototype = {

    create: function () {
      this.$element = $('<div>', {
        class: MuEmoji.DROPDOWN_MENU_FOOTER,
      });
      this.createDiversities();
      this.createEmojiOneLegend();
      return this.$element;
    },

    createDiversities: function () {
      this.$diversities = $('<div>', {
        class: MuEmoji.DROPDOWN_MENU_FOOTER_DIVERSITIES,
      });
      this.createDiversityItems();
      this.$element.append(this.$diversities);
    },

    createDiversityItems: function () {
      var self = this;
      [TONE_0].concat(TONES).forEach(function (tone) {
        self.$diversities.append($('<i>', {
          class: 'mu-emoji diversity _' + tone,
          click: function (event) {
            self.parent.clickedOnTone(tone);
          }
        }));
      });
    },

    createEmojiOneLegend: function () {
      this.$emojiOneLegend = $('<div>', {
        class: MuEmoji.DROPDOWN_MENU_FOOTER_EMOJI_ONE_LEGEND,
        html: window.emojiOneLegend + ' <a href="https://www.emojione.com/" target="_blank">EmojiOne</a></div>'
      });
      this.$element.append(this.$emojiOneLegend);
    },

  }



  $.fn.renderEmojis = function () {
    var self = this;
    self.each(function (i) {
      var $element = $(self[i]);
      $element.empty();
      new MuEmoji($element, i).create();
    });
    return self;
  }

  $($class(MuEmoji.DROPDOWN)).renderEmojis();

});