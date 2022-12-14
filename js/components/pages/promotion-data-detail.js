class content_detail extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const title = this.getAttribute('title') ?? '제목이 들어와야합니다.';
        const img_src = this.getAttribute('img_src') ?? '#';
        const date_value = this.getAttribute('date_value') ?? 'YY.MM.DD';
        const caption_value = this.getAttribute('caption') ?? '캡션입니다.';
        const content_value =
            this.getAttribute('content_value') ?? '콘텐츠의 내용';
        const link =
            this.getAttribute('link') ??
            "location.href='/html/pages/promotion-center.html'";
        this.attachShadow({ mode: 'open' });

        const content_wrapper = document.createElement('div');
        content_wrapper.setAttribute('class', 'content-wrapper');

        const container = document.createElement('div');
        container.setAttribute('class', 'container');

        const info = document.createElement('div');
        info.setAttribute('class', 'info');

        const h1 = document.createElement('h1');
        h1.innerText = title;

        const date = document.createElement('div');
        date.setAttribute('class', 'date');

        const span = document.createElement('span');
        span.innerText = date_value;

        const mainImage = document.createElement('div');
        mainImage.setAttribute('class', 'mainImage');

        const img = document.createElement('img');
        img.setAttribute('src', img_src);

        const caption = document.createElement('div');
        caption.setAttribute('class', 'caption');
        caption.innerText = caption_value;

        const content = document.createElement('content');
        content.setAttribute('class', 'content');
        content.innerHTML = content_value;

        const btn_wrapper = document.createElement('div');
        const btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', '목록으로');
        btn.setAttribute('class', 'round-04');
        btn.setAttribute('onClick', link);
        const style = document.createElement('style');
        style.textContent = `
        .container{
            max-width: 1100px;
            margin: 0 auto;
            font-family: 'Pretendard';
            margin-top: 64px;
            margin-bottom: 120px;
            line-height: 160%;
            letter-spacing: -0.01em;
        }
        
        .info{
            margin-bottom: 64px;
        }
        .mainImage{
            margin-bottom: 32px;
        }
        .mainImage img{
            width: 100%;
            background-color: #ddd;
            height: 400px;
            margin-bottom: 8px;
        }
        .caption{
            width: 100%;
            color: var(--text-third);
            font-size: var(--body-caption);
        }
        h1{
            font-size: var(--title-03);
            color: var(--text-primary);
            font-weight: 700;
            margin-bottom: 24px;
            line-height: 130%;
        }
        .date{
            font-size: var(--body-04);
            color: var(--text-third);
        }
        .content{
            margin-bottom: 64px;
            font-size: var(--body-03);
        }
        input{
            float: right;
            background-color: var(--background-white-01);
            border: var(--stroke-gray-01) 1px solid;
            color: var(--text-secondary);
            font-size: var(--body-03);
            padding: 6px 12px;
            margin-top: 64px;
            margin-bottom:120px;
        }
        @media (max-width: 640px) {
            .container{
                margin-top: 36px;
            }
            .mainImage img{
                height: 120px;
            }
            h1{
                margin-bottom: 12px;
                font-size: var(--subtitle-03);
            }
            .info{
                margin-bottom: 48px;
            }
            .date{
                font-size: var(--body-04);
            }
            .content{
                margin-bottom: 48px;
                font-size: var(--body-02);
            }
            input{
                margin-top:48px;
            }
        }
        `;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(content_wrapper);

        content_wrapper.appendChild(container);

        container.appendChild(info);
        if (img_src != '#') {
            container.appendChild(mainImage);
            mainImage.appendChild(img);
            mainImage.appendChild(caption);
        }
        container.appendChild(content);
        container.appendChild(btn_wrapper);

        info.appendChild(h1);
        info.appendChild(date);

        date.appendChild(span);

        btn_wrapper.appendChild(btn);
    }
}

customElements.define('content-detail', content_detail);
