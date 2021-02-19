import Bold from 'core/assets/imagens/icone-bold.svg';
import Italic from 'core/assets/imagens/icone-italico.svg';
import Unordered from 'core/assets/imagens/icone-lista.svg';
import Ordered from 'core/assets/imagens/icone-listaNumerada.svg';

const toolbar = {
  options: ['inline', 'list'],
  inline: {
    bold: { icon: Bold, className: 'custom-icon' },
    italic: { icon: Italic, className: 'custom-icon' },
    options: ['bold', 'italic'],
  },
  list: {
    options: ['unordered', 'ordered'],
    unordered: { icon: Unordered, className: 'custom-icon' },
    ordered: { icon: Ordered, className: 'custom-icon' }
  },
}

export default toolbar;