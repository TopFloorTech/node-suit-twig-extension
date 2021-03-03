'use strict';

module.exports = suitTwigExtension;

function suitTwigExtension(Twig) {
  Twig.extendFunction('suit', function (base_class, modifiers = [], blockname = '', extra = [], attributes = '') {
    let classes = [];

    // If using a blockname to override default class.
    if (blockname.length) {
      // Set blockname class.
      classes.push(blockname + '-' + base_class);

      // Set blockname--modifier classes for each modifier.
      if (modifiers.length && Array.isArray(modifiers)) {
        modifiers.forEach(function (modifier) {
          classes.push(blockname + '-' + base_class + '--' + modifier);
        });
      }
    }
    // If not overriding base class.
    else {
      // Set base class.
      classes.push(base_class);

      // Set base--modifier class for each modifier.
      if (modifiers.length && Array.isArray(modifiers)) {
        modifiers.forEach(function (modifier) {
          classes.push(base_class + '--' + modifier);
        });
      }
    }

    // If extra non-BEM classes are added.
    if (extra.length && Array.isArray(extra)) {
      extra.forEach(function (extra_class) {
        classes.push(extra_class);
      });
    }

    attributes = 'class="' + classes.join(' ') + '"';

    return attributes;
  });
}
