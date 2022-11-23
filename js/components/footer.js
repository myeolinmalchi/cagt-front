
class footer_default extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.attachShadow({mode: 'open'});
        const footer_container = document.createElement('footer');

        const footer_content_wrapper = document.createElement('div');
        footer_content_wrapper.setAttribute('class','container');
        
        const content_first = document.createElement('div');
        content_first.setAttribute('class','content first')
        const content_first_img = document.createElement('img');
        content_first_img.setAttribute('class','left');
        content_first_img.setAttribute('src','../image/logo.png');
        const content_first_ul = document.createElement('ul');
        content_first_ul.setAttribute('class','list')
        const content_first_li_1 = document.createElement('li');
        content_first_li_1.innerText="개인정보처리방침"
        const content_first_li_2 = document.createElement('li');
        content_first_li_2.innerText="이메일무단수집거부"
        const content_first_li_3 = document.createElement('li');
        content_first_li_3.innerText="이용약관"
        const content_first_li_4 = document.createElement('li');
        content_first_li_4.innerText="오시는길"

        const content_second = document.createElement('div');
        content_second.setAttribute('class','content second left');
        const content_second_hr = document.createElement('hr');

        const left_content = document.createElement('div');
        left_content.setAttribute('class','leftcontent');
        const content_third = document.createElement('div');
        content_third.setAttribute('class','content third left');
        const content_third_left_content = document.createElement('div');
        content_third_left_content.setAttribute('class','left');
        const content_third_p_1 = document.createElement('p');
        content_third_p_1.innerText = "(31214) 충청남도 천안시 동남구 풍세면 풍세로 303 한국자동차연구원 강소특구캠퍼스";
        const content_third_p_2 = document.createElement('p');
        content_third_p_2.innerText = "상호명 : 한국자동차 연구원 대표 전화번호 : 041-424-7017 사업자번호 : 312-82-04676 대표자명 : 나승식";

        const content_fourth_content = document.createElement('div');
        content_fourth_content.setAttribute('class','content fourth left');
        const content_fourth_p = document.createElement('p');
        content_fourth_p.innerText = "Copyright(c) 2021 천안아산강소특구. All right reser";


        const content_fivth_right_content = document.createElement('div');
        content_fivth_right_content.setAttribute('class','rightcontent');
        const content_fivth = document.createElement('div');
        content_fivth.setAttribute('class','content fivth right');
        const content_fivth_img_1 = document.createElement('img');
        content_fivth_img_1.setAttribute('src','../image/facebook.png');
        const content_fivth_img_2 = document.createElement('img');
        content_fivth_img_2.setAttribute('src','../image/instagram.png');

        footer_container.appendChild(footer_content_wrapper);
        footer_content_wrapper.appendChild(content_first);
        content_first.appendChild(content_first_img);
        content_first.appendChild(content_first_ul);
        content_first_ul.appendChild(content_first_li_1);
        content_first_ul.appendChild(content_first_li_2);
        content_first_ul.appendChild(content_first_li_3);
        content_first_ul.appendChild(content_first_li_4);

        footer_content_wrapper.appendChild(content_second);
        content_second.appendChild(content_second_hr);

        footer_content_wrapper.appendChild(left_content);
        left_content.appendChild(content_third);
        content_third.appendChild(content_third_left_content);
        content_third_left_content.appendChild(content_third_p_1);
        content_third_left_content.appendChild(content_third_p_2);

        left_content.appendChild(content_fourth_content);
        content_fourth_content.appendChild(content_fourth_p);

        footer_content_wrapper.appendChild(content_fivth_right_content);
        content_fivth_right_content.appendChild(content_fivth);
        content_fivth_img_2.setAttribute('class', 'mleft');
        content_fivth.appendChild(content_fivth_img_1);
        content_fivth.appendChild(content_fivth_img_2);

        
        const style = document.createElement('style');
        style.textContent = `
        p{
            margin: 0px;
        }
        ul{
            list-style: none;
        }
        body{
            width: 100%;
        }
        
        footer {
            min-height: 342px;
            width: 100%;
            background-color:#1A2433;
            display: block;
            color: #9CA3AF;
            padding-top: 60px;
            margin: 0 auto;
            font-family: 'Pretendard';
        }
        .container{
            max-width: 1100px;
            width: 100%;
            margin: 0 auto;
        }
        
        .content{
            display: inline-block;
            float: left;
        }
        
        .left{
            display: inline-block;
            float: left;
        }
        .leftcontent{
            display: block;
            width: 90%;
            float: left;
        }
        .rightcontent{
            display: block;
            width: 10%;
            float: right;
            margin-top: 28px;
        }
        .right{
            display: inline-block;
            float: right;
        }
        
        .list{
            weight: 50%;
            margin-top: 3px;
            margin-left: 24px;
            float: right;
        }
        
        .list li{
            float: left;
            font-size: 16px;
            margin-left: 12px;
            margin-right: 12px;
        }
        
        .second{
            margin-top: 23px;
            width: 100%;
        }
        .third{
            margin-top: 28px;
         }
         .third p{
            line-height: 22px;
            line-height: 160%;
         }
        .fourth{
            margin-top: 20px;
        }
        .fivth{
        
        }
        .mleft{
            margin-left: 16px;
        }
        /* 반응형 */
        @media (max-width: 1100px) {
            .container{
                max-width: 864px;
            }
        }
        
        @media (max-width: 864px) {
            .container{
                max-width: 350px;
            }
            footer{
                padding-top: 32px;
                font-size: 12px;
                line-height: 19px;
                line-height: 160%;
            }
            .list{
                margin: 0px;
                margin-top: 12px;
                padding: 0px;
            }
            .list li{
                font-size: 12px;
                line-height: 19px;
                line-height: 160%;
                margin-left: 16px;
                margin-right: 0px;
            }
            .list li:nth-child(1){
                margin-left: 0px;
            }
            .rightcontent{
                display: block;
                float: left;
                width: 100%;
            }
            .rightcontent .right{
                float: left;
            }
        }
        `
        this.shadowRoot.appendChild(footer_container);
        this.shadowRoot.append(style);
    }

}

customElements.define('footer-default',footer_default);