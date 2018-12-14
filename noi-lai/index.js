const AccentType = {
  None: 'None',
  Acute: 'Acute',
  Grave: 'Grave',
  Hook: 'Hook',
  Tilde: 'Tilde',
  Drop: 'Drop',
};

const Accents = {
  [AccentType.None]: {
    type: AccentType.None,
    pattern: 'aăâiyuưeêoôơ',
  },
  [AccentType.Acute]: {
    type: AccentType.Acute,
    pattern: 'áắấíýúứéếóốớ',
  },
  [AccentType.Grave]: {
    type: AccentType.Grave,
    pattern: 'àằầìỳùừèềòồờ',
  },
  [AccentType.Hook]: {
    type: AccentType.Hook,
    pattern: 'ảẳẩỉỷủửẻểỏổở',
  },
  [AccentType.Tilde]: {
    type: AccentType.Tilde,
    pattern: 'ãẵẫĩỹũữẽễõỗỡ',
  },
  [AccentType.Drop]: {
    type: AccentType.Drop,
    pattern: 'ạặậịỵụựẹệọộợ',
  },
};

const collectWords = string => {
  const words = string.toLowerCase().split(' ');
  const head = words[0];
  const tail = words[words.length - 1];
  const mid = words.slice(1, -1);
  return [head, mid, tail];
};

const splitWord = word => {
  const consonant = /đ|gi|qu|^[b-df-hj-np-tv-xz]*/.exec(word).toString();
  const vowel = word.substr(consonant.length);
  return [consonant, vowel];
};

const analyzeVowel = vowel => {
  const defaultValue = {
    accentType: null,
    matchedChar: null,
    matchedCharIndex: null,
  };

  const accentRows = Object.values(Accents);
  const result = accentRows.reduce((currentResult, row) => {
    const matched = new RegExp(`[${row.pattern}]`).exec(vowel);

    if (!matched) return currentResult;

    if (row.type === AccentType.None) {
      const neutralMatched = new RegExp(`[${row.pattern}]+`).exec(vowel).toString();
      const neutralLength = (neutralMatched.length < vowel.length ? vowel.length : neutralMatched.length) - 1;
      const neutralIndex = Math.floor(neutralLength / 2);
      const neutralChar = vowel[neutralIndex];
      return {
        accentType: row.type,
        matchedChar: neutralChar,
        matchedCharIndex: neutralIndex,
      };
    }

    const matchedChar = matched.toString();
    const matchedCharIndex = matched.index;

    return {
      accentType: row.type,
      matchedChar,
      matchedCharIndex,
    };
  }, defaultValue);

  return {
    vowel,
    accentType: result.accentType,
    matchedChar: result.matchedChar,
    matchedCharIndex: result.matchedCharIndex,
  };
};

const changeCharAccent = (char, fromAccentType, toAccentType) => {
  const currentAccentCharIndex = Accents[fromAccentType].pattern.indexOf(char);
  return Accents[toAccentType].pattern[currentAccentCharIndex];
};

const switchAccent = (headVowel, tailVowel) => {
  const analyzedHeadVowel = analyzeVowel(headVowel);
  const analyzedTailVowel = analyzeVowel(tailVowel);

  if (analyzedHeadVowel.accentType === analyzedTailVowel.accentType) {
    return [tailVowel, headVowel];
  }

  const transformedHeadAccent = changeCharAccent(
    analyzedTailVowel.matchedChar,
    analyzedTailVowel.accentType,
    analyzedHeadVowel.accentType,
  );
  const transformedTailAccent = changeCharAccent(
    analyzedHeadVowel.matchedChar,
    analyzedHeadVowel.accentType,
    analyzedTailVowel.accentType,
  );

  const newHeadVowel = tailVowel.replace(analyzedTailVowel.matchedChar, transformedHeadAccent);
  const newTailVowel = headVowel.replace(analyzedHeadVowel.matchedChar, transformedTailAccent);

  return [newHeadVowel, newTailVowel];
};

const noiLai = string => {
  const [head, mid, tail] = collectWords(string);
  const [headConsonant, headVowel] = splitWord(head);
  const [tailConsonant, tailVowel] = splitWord(tail);
  const [newHeadVowel, newTailVowel] = switchAccent(headVowel, tailVowel);
  return `${headConsonant}${newHeadVowel} ${mid.join(' ')} ${tailConsonant}${newTailVowel}`;
};

(function main() {
  console.log(noiLai('GIỔI QUẮ'));
  console.log(noiLai('Uống rượư'));
  console.log(noiLai('ăn uống'));
  console.log(noiLai('đái dài kéo'));
  console.log(noiLai('má dì đẻ'));
  console.log(noiLai('câu bốn chữ cái'));
  console.log(noiLai('bươm bướm'));
  console.log(noiLai('Tươi tỉnh'));
  console.log(noiLai('đám cưới'));
})();
