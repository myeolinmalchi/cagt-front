customElements.define(
    'calendar-unit',
    class extends HTMLElement {
        state;
        content;

        typeStyleMap = new Map([
            [
                'none',
                () => {
                    this.content.style.borderRadius = 'none';
                    this.content.style.background =
                        'var(--background-white-01)';
                    switch (this.state) {
                        case 'default':
                            this.content.style.color = 'var(--text-primary)';
                            break;
                        case 'disabled':
                            this.content.style.color = 'var(--text-disabled)';
                            break;
                        case 'accent':
                            this.content.style.color = 'var(--text-red)';
                            break;
                    }
                },
            ],
            [
                'one',
                () => {
                    this.content.style.background = 'var(--color-blue-filled)';
                    this.content.style.color = 'var(--text-white)';
                    this.content.style.borderRadius = '42px';
                },
            ],
            [
                'left',
                () => {
                    this.content.style.background = 'var(--color-blue-filled)';
                    this.content.style.color = 'var(--text-white)';
                    this.content.style.borderRadius = '42px 0px 0px 42px';
                },
            ],
            [
                'right',
                () => {
                    this.content.style.background = 'var(--color-blue-filled)';
                    this.content.style.color = 'var(--text-white)';
                    this.content.style.borderRadius = '0px 42px 42px 0px';
                },
            ],
            [
                'center',
                () => {
                    this.content.style.background = 'var(--color-blue-filled)';
                    this.content.style.color = 'var(--text-white)';
                    this.content.style.borderRadius = '0px';
                },
            ],
        ]);
        constructor() {
            super();
            this.content = document.createElement('span');
        }
        connectedCallback() {
            const [state, type, mode] = [
                this.getAttribute('state') ?? 'default',
                this.getAttribute('type') ?? 'none',
                this.getAttribute('mode') ?? 'normal',
            ];

            this.state = state;
            //this.setCommonStyle(mode);
            this.classList.add(type === 'one' ? 'checked' : 'none');
            this.classList.add(mode === 'normal' ? 'normal' : 'top');
            this.classList.add(this.state);
            //this.typeStyleMap.get(type)();
            this.append(this.content);
        }

        setCommonStyle(mode) {
            //this.style.height = mode === 'normal' ? '95px' : '51px';
            this.style.height = mode === 'normal' ? '0' : '51px';
            this.style.paddingBottom =
                mode === 'normal' ? 'max(calc(4.5% + 21px + 2px), 46px)' : '0';
            this.style.paddingTop =
                mode === 'normal' ? 'max(calc(4.5% - 21px + 2px), 0px)' : '0';
            this.style.boxSizing = 'border-box';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.margin = '0px';

            this.content.classList += 'body-03-bd';
            this.style.textAlign = 'center';
            this.content.style = `
                cursor: pointer;
                width: 42px;
                height: 42px;
                text-align: center;
                margin: auto;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
        }
    },
);

customElements.define(
    'calendar-container',
    class extends HTMLElement {
        connectedCallback() {}
    },
);

customElements.define(
    'calendar-units',
    class extends HTMLElement {
        units;
        date;

        start_day;
        end_day;

        period;
        connectedCallback() {
            this.date = new Date();
            this.style.display = 'flex';
            this.style.flexWrap = 'wrap';
            this.style.width = '100%';
            this.style.justifyContent = 'center';
            setTimeout(() => {
                this.period = this.nextElementSibling;
            });

            this.render();
        }

        prevMonth() {
            this.date = new Date(
                this.date.getFullYear(),
                this.date.getMonth() - 1,
                1,
            );
            this.render();
        }

        nextMonth() {
            this.date = new Date(
                this.date.getFullYear(),
                this.date.getMonth() + 1,
                1,
            );
            this.render();
        }

        render() {
            const dates = [1, 2, 13, 14, 15, 20, 21, 22, 26, 27, 29];
            this.innerHTML = '';
            const year = this.date.getFullYear();
            const month = this.date.getMonth();
            const startDay = new Date(year, month, 0);
            const prevDate = startDay.getDate();
            const prevDay = startDay.getDay();

            const endDay = new Date(year, month + 1, 0);
            const nextDate = endDay.getDate();
            const nextDay = endDay.getDay();

            this.units = [];

            // ?????? ??? ?????????
            for (
                let i = prevDate - (prevDay === 6 ? -1 : prevDay);
                i <= prevDate;
                i++
            ) {
                const date = new Date(year, month - 1, i);
                const unit = document.createElement('calendar-unit');
                unit.setAttribute('state', 'disabled');
                unit.setAttribute('type', 'none');
                if (this.start_day) {
                    if (this.end_day) {
                        if (this.start_day < date && this.end_day > date) {
                            unit.setAttribute('type', 'center');
                        } else if (
                            this.start_day.getTime() === date.getTime()
                        ) {
                            unit.setAttribute('type', 'left');
                        } else if (this.end_day.getTime() === date.getTime()) {
                            unit.setAttribute('type', 'right');
                        }
                    } else {
                        if (this.start_day.getTime() === date.getTime()) {
                            unit.setAttribute('type', 'one');
                        } else {
                            unit.setAttribute('type', 'none');
                        }
                    }
                }
                unit.content.innerHTML = i;
                /*unit.onclick = () => {
                    if (!this.start_day) {
                        this.start_day = date;
                        this.period?.st_date.setStartday(date);
                    } else if (!this.end_day) {
                        if (this.start_day.getTime() === date.getTime()) {
                            this.start_day = undefined;
                            this.period?.st_date.setStartday(undefined);
                        } else if (date > this.start_day) {
                            this.end_day = date;
                            this.period?.ed_date.setStartday(date);
                        }
                    } else {
                        if (this.end_day.getTime() === date.getTime()) {
                            this.end_day = undefined;
                            this.period?.ed_date.setStartday(undefined);
                        }
                    }
                    this.render();
                };*/
                this.units.push(unit);
            }

            // ?????? ??? ?????????
            for (let i = 1; i <= nextDate; i++) {
                const unit = document.createElement('calendar-unit');
                const date = new Date(year, month, i);
                unit.setAttribute('type', 'none');
                if ((prevDay + 1 + i) % 7 === 1) {
                    unit.setAttribute('state', 'accent');
                } else {
                    unit.setAttribute('state', 'default');
                }
                if (this.start_day) {
                    if (this.end_day) {
                        if (this.start_day < date && this.end_day > date) {
                            unit.setAttribute('type', 'center');
                        } else if (
                            this.start_day.getTime() === date.getTime()
                        ) {
                            unit.setAttribute('type', 'left');
                        } else if (this.end_day.getTime() === date.getTime()) {
                            unit.setAttribute('type', 'right');
                        }
                    } else {
                        if (this.start_day.getTime() === date.getTime()) {
                            unit.setAttribute('type', 'one');
                        } else {
                            unit.setAttribute('type', 'none');
                        }
                    }
                }
                unit.content.innerHTML = i;
                if (dates.includes(i)) {
                    unit.setAttribute('type', 'one');
                }
                /*unit.onclick = () => {
                    if (!this.start_day) {
                        this.start_day = date;
                    } else if (!this.end_day) {
                        if (this.start_day.getTime() === date.getTime()) {
                            this.start_day = undefined;
                        } else if (date > this.start_day) {
                            this.end_day = date;
                        }
                    } else {
                        if (this.end_day.getTime() === date.getTime()) {
                            this.end_day = undefined;
                        }
                    }
                    this.render();
                };*/
                this.units.push(unit);
            }

            // ?????? ??? ?????????
            for (let i = 1; i < 7 - nextDay; i++) {
                const unit = document.createElement('calendar-unit');
                const date = new Date(year, month + 1, i);
                unit.setAttribute('state', 'disabled');
                unit.setAttribute('type', 'none');
                unit.content.innerHTML = i;
                if (this.start_day) {
                    if (this.end_day) {
                        if (this.start_day < date && this.end_day > date) {
                            unit.setAttribute('type', 'center');
                        } else if (
                            this.start_day.getTime() === date.getTime()
                        ) {
                            unit.setAttribute('type', 'left');
                        } else if (this.end_day.getTime() === date.getTime()) {
                            unit.setAttribute('type', 'right');
                        }
                    } else {
                        if (this.start_day.getTime() === date.getTime()) {
                            unit.setAttribute('type', 'one');
                        } else {
                            unit.setAttribute('type', 'none');
                        }
                    }
                }
                /*unit.onclick = () => {
                    if (!this.start_day) {
                        this.start_day = date;
                        this.period?.st_date.setStartday(date);
                    } else if (!this.end_day) {
                        if (this.start_day.getTime() === date.getTime()) {
                            this.start_day = undefined;
                            this.period?.st_date.setStartday(undefined);
                        } else if (date > this.start_day) {
                            this.end_day = date;
                            this.period?.ed_date.setStartday(date);
                        }
                    } else {
                        if (this.end_day.getTime() === date.getTime()) {
                            this.end_day = undefined;
                            this.period?.ed_date.setStartday(undefined);
                        }
                    }
                    this.render();
                };*/
                this.units.push(unit);
            }

            this.units.forEach((u) => {
                this.append(u);
            });
        }
        setStartday(date) {
            this.start_day = date;
            this.render();
        }

        setEndday(date) {
            this.end_day = date;
            this.render();
        }
    },
);

customElements.define(
    'calendar-header',
    class extends HTMLElement {
        units;
        container;
        unit_container;
        top_container;
        constructor() {
            super();
            this.container = document.createElement('div');

            this.unit_container = document.createElement('div');

            ['???', '???', '???', '???', '???', '???', '???']
                .map((date) => {
                    const unit = document.createElement('calendar-unit');
                    unit.content.innerHTML = `${date}`;
                    if (date === '???') {
                        unit.setAttribute('state', 'accent');
                    }
                    unit.setAttribute('mode', 'short');
                    return unit;
                })
                .forEach((unit) => {
                    this.unit_container.appendChild(unit);
                });
        }
        connectedCallback() {
            setTimeout(() => {
                this.units = this.nextElementSibling;
                this.classList += 'title';
                this.style.display = 'flex';
                this.style.flexDirection = 'row';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'space-between';
                this.style.flexWrap = 'wrap';
                this.style.width = '100%';
                this.render();
            });
        }

        render() {
            const year = this.units.date.getFullYear();
            const month = this.units.date.getMonth() + 1;

            this.innerHTML = '';

            const leftArrow = document.createElement('span');
            leftArrow.innerHTML = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.875 11L1.875 6L6.875 1" stroke="#4B5563" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
            leftArrow.style.order = '0';
            /*leftArrow.onclick = () => {
                this.units.prevMonth();
                const year = this.units.date.getFullYear();
                const month = this.units.date.getMonth() + 1;
                center.innerText = `${year}.${month}`;
            };*/
            const rightArrow = document.createElement('span');
            rightArrow.innerHTML = `<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.125 11L6.125 6L1.125 1" stroke="#4B5563" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
            rightArrow.style.order = '2';
            /*rightArrow.onclick = () => {
                this.units.nextMonth();
                const year = this.units.date.getFullYear();
                const month = this.units.date.getMonth() + 1;
                center.innerText = `${year}.${month}`;
            };*/

            const center = document.createElement('span');
            center.innerText = `${year}.${month}`;
            center.style.order = '1';

            this.container.append(leftArrow, center, rightArrow);
            this.append(this.container, this.unit_container);
        }
    },
);

customElements.define(
    'calendar-period',
    class extends HTMLElement {
        st_container;
        ed_container;

        st_date;
        ed_date;
        constructor() {
            super();

            this.st_container = document.createElement('div');
            this.st_container.style = `
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            `;
            const ????????? = document.createElement('span');
            ?????????.innerText = '?????????';
            ?????????.style.marginBottom = '8px';
            ?????????.style.textAlign = 'left';
            ?????????.style.width = '100%';
            ?????????.classList.add('body-02-me');
            ?????????.style.color = 'var(--text-secondary)';
            this.st_date = document.createElement('textfield-date');
            this.st_date.setAttribute('size', 'l');
            this.st_date.style.width = '100%';
            this.st_container.append(?????????, this.st_date);

            this.ed_container = document.createElement('div');
            this.ed_container.style = `
                display: flex;
                width: 100%;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 16px;
            `;
            const ????????? = document.createElement('span');
            ?????????.innerText = '?????????';
            ?????????.style.marginBottom = '8px';
            ?????????.style.textAlign = 'left';
            ?????????.style.width = '100%';
            ?????????.classList.add('body-02-me');
            ?????????.style.color = 'var(--text-secondary)';
            this.ed_date = document.createElement('textfield-date');
            this.ed_date.setAttribute('size', 'l');
            this.ed_date.style.width = '100%';
            this.ed_container.append(?????????, this.ed_date);
        }
        connectedCallback() {
            this.style.marginTop = '16px';
            this.style.boxSizing = 'border-box';

            const units = this.previousElementSibling;

            const stonchange = this.st_date.start_time.onchange;
            this.st_date.onchange = (e) => {
                stonchange(e);
                units.setStartday(this.st_date.start);
            };

            const edonchange = this.ed_date.start_time.onchange;
            this.ed_date.onchage = (e) => {
                edonchange(e);
                units.setEndday(this.ed_date.start);
            };

            this.append(this.st_container, this.ed_container);
        }
    },
);
