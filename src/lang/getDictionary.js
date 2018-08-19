import english from './english';
import chineseSimplified from './chinese-simplified';
import french from './french';
import german from './german';
import japanese from './japanese';
import korean from './korean';
import portugese from './portugese';
import russian from './russian';
import thai from './thai';


const getDictionary = (langCode) => {
    switch (langCode) {
      case 'ru':
        return russian;
        case 'zh':
        return chineseSimplified;   
        case 'jp':
        return japanese;
        case 'th':
        return thai;  
        case 'ko':
        return korean; 
        case 'fr':
        return french; 
        case 'de':
        return german; 
        case 'pt':
        return portugese;                                                      
      default:
      return english;
    }
  };

  export default getDictionary;  