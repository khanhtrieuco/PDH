<template>
    <div class="slide instinctive " :tabindex="check" :tabview="check" aria-hidden="true">
        <h3 class="text text_huge text_white slide-word "
            :style="`left: calc(-${position * index}px + 50%);transition: left 1.3s ease 0s, opacity 0.7s ease 0s; opacity: ${index === check ? '1' : '0'};`">
            CORE VALUE</h3>
        <div class="slide-image-wrapper" :style="`left: -${position * index}px; transition: all 2s ease 0.2s;`">
            <img :class="`about-vision-img ${index === check ? 'mask-in-next' : 'mask-out-next'}`" src="/images/vs3.jpg" />
            <img class="about-vision-img-mask" src="/images/VISION-071.png" />
        </div>
        <div class="slide-text-block"
            :style="`left: calc(-${position * index}px + 50%);transition: left 1.6s ease 0s, opacity 0.7s ease 0s; opacity: ${index === check ? '1' : '0'};`">
            <div class="about-vison-list-content">
                <div class="about-vison-content-item">
                    <div class="about-vision-text">{{ $t('About_vs_3_1') }}</div>
                    <div class="about-vision-sub-1">{{ $t('About_vs_3_1_sub') }}</div>
                </div>
                <div class="about-vison-content-item">
                    <div class="about-vision-text">{{ $t('About_vs_3_2') }}</div>
                    <div class="about-vision-sub-1">{{ $t('About_vs_3_2_sub') }}</div>
                </div>
                <div class="about-vison-content-item">
                    <div class="about-vision-text">{{ $t('About_vs_3_3') }}</div>
                    <div class="about-vision-sub-1">{{ $t('About_vs_3_3_sub') }}</div>
                </div>
                <div class="about-vison-content-item">
                    <div class="about-vision-text">{{ $t('About_vs_3_4') }}</div>
                    <div class="about-vision-sub-1">{{ $t('About_vs_3_4_sub') }}</div>
                </div>
                <div class="about-vison-content-item">
                    <div class="about-vision-text">{{ $t('About_vs_3_5') }}</div>
                    <div class="about-vision-sub-1">{{ $t('About_vs_3_5_sub') }}</div>
                </div>
                <div class="about-vison-content-item">
                    <div class="about-vision-text">FUSION</div>
                    <div class="about-vision-sub-1">Phan Dang Hoang is a dialogue between East and West, art and application. We connect inspiration, human beings in the new era, creating the value of intertwine and uniqueness.</div>
                </div>
            </div>
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