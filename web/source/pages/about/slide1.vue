<template>
    <div class="slide chance " :tabindex="check" :tabview="check" aria-hidden="true">
        <h3 class="text text_huge text_white slide-word"
            :style="`left: calc(-${position * index}px + 50%); transition: left 1.3s ease 0s, opacity 0.7s ease 0s;  opacity: ${index === check ? '1' : '0'};`">
            VISION</h3>
        <div class="slide-image-wrapper" :style="`left: -${position * index}px; transition: all 2s ease 0.2s;`">
            <img :class="`about-vision-img ${index === check ? 'mask-in-next' : 'mask-out-next'}`" src="/images/vs1.jpg" />
            <img class="about-vision-img-mask" src="/images/VISION-071.png" />
        </div>
        <div class="slide-text-block"
            :style="`left: calc(-${position * index}px + 50%); transition: left 1.6s ease 0s, opacity 0.7s ease 0s; opacity: ${index === check ? '1' : '0'};`">
            <div class="about-vision-text">{{ $t('About_vs_1') }}</div>
            <div class="about-vision-sub">{{ $t('About_vs_1_sub') }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        position: {
            type: Number
        },
        index: {
            type: Number
        },
        check: {
            type: Number
        }
    },
}
</script>