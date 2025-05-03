// este código será executado quando a janela carregar
window.onload = function({ target: Document }) {
    // função de inicialização que configura o estilo da página
    const OnInit = () => styleSheet({
      html: Document.querySelector('html'), // seleciona o elemento html
      body: Document.querySelector('body'), // seleciona o elemento body
      create: (element) => onlyCreateElement(element), // função para criar elementos html
    }).controller(() => {
      const resolution = 1280; // resolução mínima suportada
      const html = document.querySelector('html'); // seleciona o elemento html
      const head = document.querySelector('head'); // seleciona o elemento head
      const original = document.querySelector('body'); // seleciona o body original
      const body = document.createElement('body'); // cria um novo body
      const css = document.createElement('link'); // cria um link para o css
      const icon = document.createElement('link'); // cria um link para o favicon
  
      // configura os atributos do css e do favicon
      css.setAttribute('rel', 'stylesheet');
      css.setAttribute('href', './css/style.css');
      icon.setAttribute('rel', 'icon');
      icon.setAttribute('href', './img/favico.ico');
      head.appendChild(css); // adiciona o css ao head
      head.appendChild(icon); // adiciona o favicon ao head
  
      // verifica a largura da janela e ajusta o body
      window.innerWidth <= Number(resolution)-1
        ? html.removeChild(original) && html.appendChild(body)
        : null;
  
      // mensagem padrão para resoluções não suportadas
      body.innerHTML = `
        <style>
          .resolution {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
  
          .anchor {
            margin-top: 20px;
            font-size: 18px;
          }
        </style>
  
        <div class="resolution">
          <h1>resolução não suportada!</h1>
        </div>
      `;
  
      // adiciona um listener para redimensionamento da janela
      window.addEventListener('resize', ({ target }) => {
        if (target.innerWidth >= resolution) {
            html.removeChild(body); // remove o novo body
            html.appendChild(original); // restaura o body original
        } else if (window.innerWidth <= Number(resolution)-1) {
            html.removeChild(original); // remove o body original
            html.appendChild(body); // adiciona o novo body
        }
      });
    });
  
    /**
     * função usada para simplificar a criação de elementos html.
     * @param { HTMLElement } element - elemento html comum, por padrão é um div.
     * @returns objeto com métodos para configurar o elemento.
     */
    function onlyCreateElement(element) {
      return {
        classList: [], // lista de classes css
        elType: element, // tipo do elemento (ex: div, span)
        elementByTimes: [], // elementos criados em múltiplas instâncias
        times: 1, // quantidade de elementos a serem criados
        setType(type) {
          this.elType = type; // define o tipo do elemento
          return this;
        },
        setClass(...list) {
          this.classList = list; // define as classes css
          return this;
        },
        setTimes(times) {
          this.times = times; // define a quantidade de elementos
          return this;
        },
        build() {
          // cria múltiplos elementos se necessário
          if (this.times >= 2) {
            for (let i=this.times;i>=0;i--) {
              if (i>=1) {
                let component = Document.createElement(this.elType??'div');
                let copy = this.classList[this.classList.length-1];
                component.classList.add(...this.classList);
                component.classList.remove(copy);
                component.classList.add(copy.replace(copy, copy+'-'+i));
                this.elementByTimes.push(component);
              }
            }
          }
          if (this.elementByTimes.length>0)
            return this.elementByTimes;
          const component = Document.createElement(this.elType??'div');
          component.classList.add(...this.classList);
          return component;
        }
      }
    }
  
    // adiciona um listener para carregar o documento
    Document.addEventListener('load', OnInit(), {
      once: true, // executa apenas uma vez
      passive: false, // listener não é passivo
    });
  }