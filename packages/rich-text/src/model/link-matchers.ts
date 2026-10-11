import type { LinkMatcher } from '@lexical/react/LexicalAutoLinkPlugin';

const URL_MATCHER = /^((https?):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
const LOCAL_URL_MATCHER = /^\/(answers|hashtag|profile)\/.*/;
const MESSENGER_URL_MATCHER =
  /\b(tg|viber|whatsapp|wa|line|skype|signal|fb-messenger|discord|wechat|kakaotalk):\/\/[^\s"'<>()]+/gi;
const PHONE_URL_MATCHER = /^\+[1-9]\d{1,14}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9._%+-]{1,256}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/;

export const MATCHERS: LinkMatcher[] = [
  text => {
    const match = URL_MATCHER.exec(text) ?? LOCAL_URL_MATCHER.exec(text) ?? MESSENGER_URL_MATCHER.exec(text);
    if (match === null) return null;
    const [fullMatch] = match;

    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch,
    };
  },
  text => {
    const match = PHONE_URL_MATCHER.exec(text);
    if (match === null) return null;
    const [fullMatch] = match;

    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: `tel:${fullMatch}`,
    };
  },
  text => {
    const match = EMAIL_REGEX.exec(text);
    if (match === null) return null;
    const [fullMatch] = match;

    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: `mailto::${fullMatch}`,
    };
  },
];
