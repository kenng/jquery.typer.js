String.prototype.rightChars = function(n){
  if (n <= 0) {
    return "";
  }
  else if (n > this.length) {
    return this;
  }
  else {
    return this.substring(this.length, this.length - n);
  }
};

(function($) {
  var
    options = {
      highlightSpeed    : 50, // TODO: change back to 20
      typeSpeed         : 100, // TODO: change back to 100
      clearDelay        : 500,
      typeDelay         : 200,
      clearOnHighlight  : true,
      typerDataAttr     : 'data-typer-targets',
      typerInterval     : 2000
    },
    highlight,
    clearText,
    backspace,
    type,
    spanWithColor,
    clearDelay,
    typeDelay,
    clearData,
    isNumber,
    typeWithAttribute,
    getHighlightInterval,
    getTypeInterval,
    typerInterval;

  spanWithColor = function(color, backgroundColor) {
    if (color === 'rgba(0, 0, 0, 0)') {
      color = 'rgb(255, 255, 255)';
    }

    return $('<span></span>')
      .css('color', color)
      .css('background-color', backgroundColor);
  };

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  clearData = function ($e) {
    $e.removeData([
      'typePosition',
      'highlightPosition',
      'leftStop',
      'rightStop',
      'primaryColor',
      'backgroundColor',
      'text',
      'typing'
    ]);
  };

  type = function ($e) {
    var
      // position = $e.data('typePosition'),
      text = $e.data('text'),
      oldLeft = $e.data('oldLeft'),
      oldRight = $e.data('oldRight'),
      newBrTags = $e.data('newBrTags'),
      newLeft = $e.data('oldLeft'),
      newRight = $e.data('oldRight'),
      relativeRightIndex = newLeft.length + text.length - 1,
      relativePos = 0;

    // if (!isNumber(position)) {
      // position = $e.data('leftStop');
    // }

    if (!text || text.length === 0) {
      clearData($e);
      return;
    }

    if(newBrTags){
      for(var i=0; i<newBrTags.length; i++){
        var brTag = newBrTags[i];
        if(brTag.start <= newLeft.length){
          newLeft = [newLeft.slice(0, brTag.start), brTag.html, newLeft.slice(brTag.start)].join('');
          relativeRightIndex = relativeRightIndex + brTag.html.length;
        }
        else if(brTag.start < relativeRightIndex){
          relativeRightIndex = relativeRightIndex + brTag.html.length;
        }
        else if(brTag.start >= relativeRightIndex){
          relativePos = brTag.start - relativeRightIndex;
          newRight = [newRight.slice(0, relativePos), brTag.html, newRight.slice(relativePos)].join('');
          relativeRightIndex = relativeRightIndex + brTag.html.length;
        }
      }
    }

    $e.html(newLeft + text.charAt(0) + newRight)
      .data({
      oldLeft: oldLeft + text.charAt(0),
      text: text.substring(1)
    });

    // $e.text($e.text() + text.substring(position, position + 1));

    // $e.data('typePosition', position + 1);

    setTimeout(function () {
      type($e);
    }, getTypeInterval());
  };

  clearText = function ($e) {
    $e.find('span').remove();

    setTimeout(function () {
      type($e);
    }, typeDelay());
  };

  highlight = function ($e) {
    var
      position = $e.data('highlightPosition'),
      leftText,
      highlightedText,
      rightText,
      oldBrTags = $e.data('oldBrTags');

    if (!isNumber(position)) {
      position = $e.data('rightStop') + 1;
    }

    if (position <= $e.data('leftStop')) {
      setTimeout(function () {
        clearText($e);
      }, clearDelay());
      return;
    }

    leftText = $e.text().substring(0, position - 1);
    highlightedText = $e.text().substring(position - 1, $e.data('rightStop') + 1);
    rightText = $e.text().substring($e.data('rightStop') + 1);

    if(oldBrTags){
      for(var i=0; i<oldBrTags.length; i++){
        brTag = oldBrTags[i];
        if(brTag.start < position){
          console.log('leftText');
          leftText = [leftText.slice(0, brTag.start), brTag.html, leftText.slice(brTag.start)].join('');
        }
        else if( brTag.start >= position && brTag.start <= $e.data('rightStop') ){
          console.log('highlightedText');
          brTagRelativeStart = brTag.start - position + 1;
          highlightedText = [highlightedText.slice(0, brTagRelativeStart), brTag.html, highlightedText.slice(brTagRelativeStart)].join('');
        }
        else {
          console.log('rightText');
          brTagRelativeStart = brTag.start - $e.data('rightStop');
          rightText = [rightText.slice(0, brTagRelativeStart), brTag.html, rightText.slice(brTagRelativeStart)].join('');
        }
      }
    }

    $e.html(leftText)
      .append(
        spanWithColor(
            $e.data('backgroundColor'),
            $e.data('primaryColor')
          )
          .append(highlightedText)
      )
      .append(rightText);

    $e.data('highlightPosition', position - 1);

    setTimeout(function () {
      return highlight($e);
    }, getHighlightInterval());
  };

  typeWithAttribute = function ($e) {
    var targets;

    if ($e.data('typing')) {
      return;
    }

    try {
      targets = JSON.parse($e.attr($.typer.options.typerDataAttr)).targets;
    } catch (e) {}

    if (typeof targets === "undefined") {
      targets = $.map($e.attr($.typer.options.typerDataAttr).split(','), function (e) {
        return $.trim(e);
      });
    }

    $e.typeTo(targets[Math.floor(Math.random()*targets.length)]);
  };

  getBrTagsInfo = function(htmlContent){
    var
      childTags = null,
      brTagsRegExp = /<br\s?.*?\/?>/,
      matchedBrTag = htmlContent.match(brTagsRegExp),
      offsetRemovedBrTags = 0,
      matchedArr = [],
      matchedObj = null;

    if( matchedBrTag ){
      console.log("Okay, Typer handle br tags.");
      while( matchedBrTag = htmlContent.match(brTagsRegExp) ){
        htmlContent = htmlContent.replace(brTagsRegExp, '');
        matchedObj = {
          html: matchedBrTag[0],
          start: offsetRemovedBrTags + matchedBrTag.index,
          end: offsetRemovedBrTags + matchedBrTag.index + matchedBrTag[0].length
        };
        offsetRemovedBrTags = matchedBrTag[0].length;
        matchedArr.push(matchedObj);
      }
    }

    return matchedArr.length>0 ? matchedArr : false;
  };

  removeBrTags = function(htmlContent){
    return htmlContent.replace(/<br\s?.*?\/?>/g, '');
  };

  // Expose our options to the world.
  $.typer = (function () {
    return { options: options };
  })();

  $.extend($.typer, {
    options: options
  });

  //-- Methods to attach to jQuery sets

  $.fn.typer = function() {
    var $elements = $(this);

    return $elements.each(function () {
      var $e = $(this);

      if (typeof $e.attr($.typer.options.typerDataAttr) === "undefined") {
        return;
      }

      typeWithAttribute($e);
      setInterval(function () {
        typeWithAttribute($e);
      }, typerInterval());
    });
  };

  $.fn.typeTo = function (newEntry) {
    var
      $e = $(this),
      currentText = $e.text(),
      currentHtml = $e.html(),
      newString = $('<div>').html(newEntry).text(), // remove tags
      newHtml = newEntry,
      i = 0,
      j = 0,
      oldBrTagsArr = null,
      newBrTagsArr = null;

    if (currentText === newString) {
      console.log("Our strings our equal, nothing to type");
      return $e;
    }

    if( currentText !== currentHtml ){
      console.log('Typer detected child elements in current html');

      oldBrTagsArr = getBrTagsInfo(currentHtml);

      if( currentText!==removeBrTags(currentHtml) || !oldBrTagsArr || oldBrTagsArr.length === 0 ){
        console.log("Sorry, Typer doesn't handle any other than br tags as child elements in current html.");
        return $e;
      }
    }

    if( newString !== newHtml ){
      console.log('Typer detected child elements in new html');

      newBrTagsArr = getBrTagsInfo(newHtml);

      if( newString!==removeBrTags(newHtml) || !newBrTagsArr || newBrTagsArr.length === 0 ){
        console.log("Sorry, Typer doesn't handle any other than br tags as child elements in new html.");
        return $e;
      }
    }

    $e.data('typing', true);

    while (currentText.charAt(i) === newString.charAt(i)) {
      i++;
    }

    while (currentText.rightChars(j) === newString.rightChars(j)) {
      j++;
    }

    newString = newString.substring(i, newString.length - j + 1);

    $e.data({
      oldLeft: currentText.substring(0, i),
      oldRight: currentText.rightChars(j - 1),
      leftStop: i,
      rightStop: currentText.length - j,
      primaryColor: $e.css('color'),
      backgroundColor: $e.css('background-color'),
      text: newString,
      oldBrTags: oldBrTagsArr,
      newBrTags: newBrTagsArr
    });

    highlight($e);

    return $e;
  };

  //-- Helper methods. These can one day be customized further to include things like ranges of delays.

  getHighlightInterval = function () {
    return $.typer.options.highlightSpeed;
  };

  getTypeInterval = function () {
    return $.typer.options.typeSpeed;
  },

  clearDelay = function () {
    return $.typer.options.clearDelay;
  },

  typeDelay = function () {
    return $.typer.options.typeDelay;
  };

  typerInterval = function () {
    return $.typer.options.typerInterval;
  };
})(jQuery);
