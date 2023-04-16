import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import bengali from './bengali.json'
import english from './english.json'
import french from './french.json'
import german from './german.json'
import gujrati from './gujrati.json'
import hindi from './hindi.json'
import indonesian from './indonesian.json'
import japnese from './japnese.json'
import malay from './malay.json'
import mandrain from './mandrain.json'
import marathi from './marathi.json'
import portugese from './portugese.json'
import punjabi from './punjabi.json'
import russian from './russian.json'
import spanish from './spanish.json'
import tamil from './tamil.json'
import telugu from './telugu.json'
import turkish from './turkish.json'
import urdu from './urdu.json'


const resources = {
  bengali: {
    translation: bengali,
  },
  english: {
    translation: english,
  },
  french: {
    translation: french,
  },
  german: {
    translation: german,
  },
  gujrati: {
    translation: gujrati,
  },
  hindi: {
    translation: hindi,
  },
  indonesian: {
    translation: indonesian,
  },
  japnese: {
    translation: japnese,
  },
  malay: {
    translation: malay,
  },
  mandrain: {
    translation: mandrain,
  },
  marathi: {
    translation: marathi,
  },
  portugese: {
    translation: portugese,
  },
  punjabi: {
    translation: punjabi,
  },
  russian: {
    translation: russian,
  },
  spanish: {
    translation: spanish,
  },
  tamil: {
    translation: tamil,
  },
  telugu: {
    translation: telugu,
  },
  turkish: {
    translation: turkish,
  },
  urdu: {
    translation: urdu,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'english',
  fallbackLng: 'urdu',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
});