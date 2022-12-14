class TRL extends HTMLElement {
    circles;
    lines;
    texts;
    container;
    text_container;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const stylesheet = document.createElement('style');
        stylesheet.innerText = `
            .circle {
                width: 16px;
                height: 16px;
                border-radius: 16px;
                box-sizing: border-box;
            }

            .done {
                background: var(--text-blue);
                border: 1px solid var(--text-blue);
            }

            .done-text {
                color: var(--text-primary);
            }

            .none {
                background: none;
                border: 1px solid var(--text-disabled);
            }

            .none-text {
                color: var(--text-disabled);
            }

            .line {
                width: calc(9% + 8px);
                margin: 0;
            }

            .circle-container {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 0 20px;
                box-sizing: border-box;
            }

            .text-container {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: top;
                gap: calc(9% - 36px);
                margin-top: 12px;
            }

            span {
                width: 56px;
                text-align: center;
                font-size: var(--body-01);
            }

            .container {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        `;
        const link1 = document.createElement('link');
        link1.setAttribute('rel', 'stylesheet');
        link1.setAttribute('href', '/css/common.css');
        this.shadowRoot.append(link1, stylesheet);

        this.container = document.createElement('div');
        this.container.classList.add('container');

        this.circle_container = document.createElement('div');
        this.circle_container.classList.add('circle-container');
        this.text_container = document.createElement('div');
        this.text_container.classList.add('text-container');

        this.circles = Array(9);
        this.lines = Array(9);
        this.texts = Array(9);

        for (let i = 0; i < 9; i++) {
            this.circles[i] = document.createElement('div');
            this.circles[i].classList.add('circle');
            this.lines[i] = document.createElement('hr');
            this.lines[i].classList.add('line');
            this.texts[i] = document.createElement('span');
        }

        this.texts[0].innerHTML = '????????????<br>??????';
        this.texts[1].innerHTML = '????????????';
        this.texts[2].innerHTML = '?????? ???<br> ?????? ??????';
        this.texts[3].innerHTML = '????????? ?????? ?????????';
        this.texts[4].innerHTML = '????????????<br>?????????';
        this.texts[5].innerHTML = '????????? ?????? ?????????';
        this.texts[6].innerHTML = '????????????<br>??????';
        this.texts[7].innerHTML = '?????? ?????? ?????????';
        this.texts[8].innerHTML = '?????????<br>?????? ??????';
    }
    connectedCallback() {
        const achievement = Number(this.getAttribute('achievement')) ?? 1;

        for (let i = 0; i < 9; i++) {
            if (i < achievement) {
                this.circles[i].classList.add('done');
                this.lines[i].classList.add('done');
                this.texts[i].classList.add('done-text');
                this.texts[i].classList.add('body-bd');
            } else {
                this.circles[i].classList.add('none');
                this.lines[i].classList.add('none');
                this.texts[i].classList.add('none-text');
                this.texts[i].classList.add('body-me');
            }
        }

        this.circle_container.append(this.circles[0]);
        for (let i = 1; i < 9; i++) {
            this.circle_container.append(this.lines[i]);
            this.circle_container.append(this.circles[i]);
        }

        this.texts.forEach((t) => {
            this.text_container.append(t);
        });

        this.container.append(this.circle_container, this.text_container);
        this.shadowRoot.append(this.container);
    }
}

customElements.define('trl-container', TRL);
customElements.define('trl-container', TRL);
