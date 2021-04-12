<template>
    <div class="prices col center">
        <div class="title">Свадебный прайс</div>
        <div class="tariffs row">
            <div class="tariffs__description">
                <div class="tariffs__line row b-l tariffs__line_b">Тариф</div>
                <div class="tariffs__line row b-l tariffs__line_s">Время съемки свадьбы</div>
                <div class="tariffs__line row b-l tariffs__line_m">Количество обработанных фотографий</div>
                <div class="tariffs__line row b-l tariffs__line_s">Печать фото 15*21</div>
                <div class="tariffs__line row b-l tariffs__line_s">Love story</div>
                <div class="tariffs__line row b-l tariffs__line_s">Слайд-шоу</div>
                <div class="tariffs__line row b-l tariffs__line_s">Холст</div>
                <div class="tariffs__line row b-l tariffs__line_s">Премиум книга 25*25</div>
                <div class="tariffs__line row b-l tariffs__line_s">Мини буки для родителей</div>
                <div class="tariffs__line row b-l tariffs__line_m">Срок обработки и отдача материала</div>
                <div class="tariffs__line row b-l tariffs__line_b">Цена</div>
            </div>
            <div class="tariffs__mini col">
                <div class="tariffs__line_b row center tariffs_bold">Минимальный</div>
                <div class="tariffs__line_s row center">до 3 часов</div>
                <div class="tariffs__line_m row center">150-250 шт</div>
                <div class="tariffs__line_s row center">10 шт</div>
                <div class="tariffs__line_s row center">-10%</div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_m row center">2-3 месяца</div>
                <div class="tariffs__line_b row center tariffs_b-text">₴ 4 500</div>
            </div>
            <div class="tariffs__optimal col">
                <div class="tariffs__line_b row center tariffs_bold">Оптимальный</div>
                <div class="tariffs__line_s row center">до 5 часов</div>
                <div class="tariffs__line_m row center">350-500 шт</div>
                <div class="tariffs__line_s row center">15 шт</div>
                <div class="tariffs__line_s row center">-20%</div>
                <div class="tariffs__line_s check-mark bg-def row center"></div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_m row center">2-3 месяца</div>
                <div class="tariffs__line_b row center tariffs_b-text">₴ 6 500</div>
            </div>
            <div class="tariffs__standard col">
                <div class="tariffs__line_b row center tariffs_bold">Стандарт</div>
                <div class="tariffs__line_s row center">до 10 часов</div>
                <div class="tariffs__line_m row center">500-650 шт</div>
                <div class="tariffs__line_s row center">25 шт</div>
                <div class="tariffs__line_s row center">-30%</div>
                <div class="tariffs__line_s check-mark bg-def row center"></div>
                <div class="tariffs__line_s check-mark bg-def row center"></div>
                <div class="tariffs__line_s row center">15 разв. (-20%)</div>
                <div class="tariffs__line_s row center"></div>
                <div class="tariffs__line_m row center">2-3 месяца</div>
                <div class="tariffs__line_b row center tariffs_b-text">₴ 10 000</div>
            </div>
            <div class="tariffs__premium col">
                <div class="tariffs__line_b row center tariffs_bold">Премиум</div>
                <div class="tariffs__line_s row center">до 10 часов</div>
                <div class="tariffs__line_m row center">500-650 шт</div>
                <div class="tariffs__line_s row center">25 шт</div>
                <div class="tariffs__line_s row center">-30%</div>
                <div class="tariffs__line_s check-mark bg-def row center"></div>
                <div class="tariffs__line_s check-mark bg-def row center"></div>
                <div class="tariffs__line_s check-mark bg-def row center"></div>
                <div class="tariffs__line_s check-mark bg-def row center"></div>
                <div class="tariffs__line_m row center">4 недели</div>
                <div class="tariffs__line_b row center tariffs_b-text">₴ 18 000</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Prices"
    }
</script>

<style scoped lang="scss">
    .prices {
        width: 100%;
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .title {
        margin: 0 0 40px 0;
    }

    .tariffs {
        & > div + div {
            margin-left: 10px;
        }
        &__description {
            background: #FAFAFA;
            width: 257px;
            border: 1px solid rgba(0, 0, 0, .2);
        }

        &__mini {
            width: 155px;
            background: rgba(189, 189, 189, .4);
            border: 2px solid rgba(189, 189, 189, .8);
        }

        &__optimal {
            width: 155px;
            background: rgba(102, 187, 106, .4);
            border: 2px solid rgba(102, 187, 106, .8);
        }

        &__standard {
            width: 155px;
            background: rgba(66, 165, 245, .4);
            border: 2px solid rgba(66, 165, 245, .8);
        }

        &__premium {
            width: 155px;
            background: rgba(255, 238, 88, .6);
            border: 2px solid #E1CE25;
        }

        &__line {
            font-family: "AvenirNextCyr Medium";
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            padding: 0 0 0 26px;
            font-size: 16px;
        }

        &__line:last-child {
            border: none;
        }

        &__line_s {
            width: 100%;
            height: 40px;
        }

        &__line_m {
            width: 100%;
            height: 57px;
        }

        &__line_b {
            width: 100%;
            height: 64px;
        }

        &_bold {
            font-family: "AvenirNextCyr Bold";
            font-size: 16px;
        }

        &_b-text {
            font-size: 24px;
        }
    }
</style>