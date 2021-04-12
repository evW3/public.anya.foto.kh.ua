<template>
    <div class="planning col center">
        <div class="planning-header row">
            <div class="controllers row">
                <div class="month-controller row">
                    <button class="month-controller__btn" @click="controlAnim(-1)">‹</button>
                    <div class="month-controller__content">
                        <ul v-bind:style="{ transform: translateXAnim, transition: transitionAnim }">
                            <li>Декабрь</li>
                            <li>Январь</li>
                            <li>Февраль</li>
                            <li>Март</li>
                            <li>Апрель</li>
                            <li>Май</li>
                            <li>Июнь</li>
                            <li>Июль</li>
                            <li>Август</li>
                            <li>Сентябрь</li>
                            <li>Октябрь</li>
                            <li>Ноябрь</li>
                            <li>Декабрь</li>
                            <li>Январь</li>
                        </ul>
                    </div>
                    <button class="month-controller__btn" @click="controlAnim(1)">›</button>
                </div>
                <div class="year-controller row center">
                    <button class="month-controller__btn" @click="changeYear(-1)">‹</button>
                    <span class="year-controller__content">{{ currentYear }}</span>
                    <button class="month-controller__btn" @click="changeYear(1)">›</button>
                </div>
            </div>
            <span class="title">График занятости</span>
            <div class="helper row">
                <div class="helper__item center row">
                    <div class="busy round"></div>
                    <span>- Занято</span>
                </div>
                <div class="helper__item center row">
                    <div class="free round"></div>
                    <span>- Свободно</span>
                </div>
            </div>
        </div>
        <Loader v-if="dateInfo.isLoading"/>
        <div v-else class="datepicker">
            <button
                disabled
                v-for="name in week"
                :key="name"
                class="datepicker__week"
            >{{ name }}</button>
            <button
                v-for="p in dateInfo.tightDate.previous"
                class="datepicker__day datepicker__day_disabled"
            >{{ p }}
            </button>
            <button
                v-for="(d,idx) in dateInfo.days"
                :key="idx + d.day"
                class="datepicker__day"
                :class="{'datepicker__day_busy': d.isBusy}"
                @click="setBusy(d)"
            >{{d.day}}</button>
            <button
                v-for="n in dateInfo.tightDate.next"
                class="datepicker__day datepicker__day_disabled"
            >{{ n }}
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Loader from "../components/Loader";

    export default {
        name: "Planning",
        data: () => ({
            counter: null,
            currentYear: null,
            transitionAnim: '0.2s',
            week:  ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        }),
        async mounted() {
            try {
                await this.$store.dispatch('initDatepicker');
                this.counter = this.dateInfo.month;
                this.currentYear = this.dateInfo.year;
            } catch (e) {
                console.log(`[ERROR] in component Planning: ${ e }`);
            }
        },
        computed: {
            translateXAnim: function () {
                return `translateX(-${this.counter * 100}%)`
            },
            ...mapGetters(['dateInfo']),
            ...mapGetters(['admin']),
        },
        methods: {
            controlAnim(val) {
                if(this.counter + val < 1) {
                    this.transitionAnim = '0s';
                    this.counter = 13;
                    setTimeout(() => {
                        this.transitionAnim = '0.2s';
                        this.counter = 12;
                    }, 0)
                } else if(this.counter + val <= 12) {
                    this.transitionAnim = '0.2s';
                    this.counter += val;
                } else {
                    this.transitionAnim = '0s';
                    this.counter = 0;
                    setTimeout(() => {
                        this.transitionAnim = '0.2s';
                        this.counter = 1;
                    }, 0)
                }
                try {
                    setTimeout(async () => {
                        await this.$store.dispatch('changeDate', { month: this.counter });
                    }, 0)
                } catch (e) {
                    console.log(`[ERROR] in component Planning in method controlAnim:\n${ e }`);
                }
            },

            async setBusy(date) {
                if(this.admin) {
                    if(date.isBusy) {
                        await this.$store.dispatch('unsetBusy', date.day);
                    } else {
                        await this.$store.dispatch('setBusy', date.day);
                    }
                }
            },

            async changeYear(val) {
                try {
                    this.currentYear += val;
                    await this.$store.dispatch('changeDate', { year: this.currentYear });
                } catch (e) {
                    console.log(`[ERROR] in method changeYear:\n${ e }`);
                }
            }
        },
        components: {
            Loader
        }
    }
</script>

<style scoped lang="scss">

    .planning {
        padding: 30px 200px;
        button {
            cursor: pointer;
        }
    }

    .controllers {
        & > div + div {
            margin-left: 50px;
        }
    }

    .planning-header {
        align-items: baseline;
        width: 100%;
        margin: 0 0 40px 0;
        justify-content: space-between;
    }

    .month-controller {
        &__content {
            width: 100px;
            height: 30px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;

            ul {
                margin: 0;
                padding: 0;
                white-space: nowrap;
                list-style: none;

                li {
                    display: inline-block;
                    width: 100%;
                    font-size: 18px;
                    text-align: center;
                }
            }
        }
        &__btn {
            font-size: 24px;
            background-color: transparent;
        }
    }

    .year-controller {
        &__content {
            height: fit-content;
            margin: 0 12px 0 12px;
        }
    }

    .helper {
        &__item {
            span {
                font-size: 18px;
            }
        }

        &__item + &__item {
            margin-left: 30px;
        }
    }

    .datepicker {
        display: grid;
        grid-template-columns: repeat(7, 140px);
        &__week {
            color: black;
            font-size: 29px;
            background-color: #EFEEEE;
            border: .5px solid #D1D1D1;
        }
        &__day {
            width: 140px;
            height: 100px;
            font-size: 29px;
            background: #FFFFFF;
            border: .5px solid #D1D1D1;
            &_busy {
                background-color: #FF7043;
                color: white;
            }
            &_disabled {
                background: #F9F8F8;
                color: rgba(0, 0, 0, .3);
            }
        }
    }

    .round {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 9px;
    }

    .busy {
        background-color: #FF7043;
    }

    .free {
        border: 1px solid;
    }
</style>