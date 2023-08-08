<template>
    <div class="contact-container" v-if="isMobile">
        <div class="contact-banner">
            <img class="w-100" :src="bannerInfo.recruitment_mobile?.data.attributes.url ?? '/images/contact_mobile.jpg'" ></img>
        </div>
        <div class="container">
            <h1 class="contact-title">
                Chuyên viên Tư vấn</br> và Chăm sóc Khách hàng
            </h1>
            <div class="contact-des">
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printertook and scrambled it to make a type specimen book.
            </div>
        </div>
        <div class="contact-content">
        	<b-container>
	        	<div class="content-tab d-flex justify-content-between align-items-center" @click="setShowTab('tab1')">
	        		<div class="content-tab-text">Mục đích</div>
	        		<img src="/images/plus.png" v-if="showItem !== 'tab1'" />
	        		<img src="/images/minus.png" v-else />
	        	</div>
	        	<transition :duration="{ enter: 400, leave: 100 }" mode="out-in" name="slide-fade">
		        	<div class="block-content" v-if="showItem === 'tab1'">
	    				<div class="d-flex justify-content-between align-items-center">
	    					<div class="t-title">01</div>
	    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
	    				</div>
	    				<div class="d-flex justify-content-between align-items-center">
	    					<div class="t-title">02</div>
	    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
	    				</div>
	    				<div class="d-flex justify-content-between align-items-center">
	    					<div class="t-title">03</div>
	    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
	    				</div>
	    				<div class="d-flex justify-content-between align-items-center">
	    					<div class="t-title">04</div>
	    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
	    				</div>
	    			</div>
	    		</transition>
    			<div class="content-tab d-flex justify-content-between align-items-center" @click="setShowTab('tab2')">
	        		<div class="content-tab-text">Yêu cầu</div>
	        		<img src="/images/plus.png" v-if="showItem !== 'tab2'" />
	        		<img src="/images/minus.png" v-else />
	        	</div>
	        	<transition :duration="{ enter: 500, leave: 100 }" name="slide-fade">
	    			<div class="block-content tab2" v-if="showItem === 'tab2'">
	    				<img class="image-block" src="/images/contact-info.jpg"></img>
	    				<div class="block-data">
		    				<div class="block-title">Yêu cầu công việc</div>
		    				<ul>
		    					<li>Nhắn tin tư vấn bán hàng & theo dõi chăm sóc khách hàng (trên các nền tảng online FB/IG/Tik Tok/TMĐT).</li>
								<li>Thu thập & phân loại thông tin (có sẵn) của khách hàng theo định hướng.</li>
								<li>Gọi điện thoại tư vấn bán hàng & chăm sóc khách hàng trước, trong và sau khi mua.</li>
								<li>Phản hồi đánh giá của khách hàng trên sàn TMĐT.</li>
								<li>Livestream bán hàng trên các sàn TMĐT/Tik Tok.</li>
								<li>Làm báo cáo về chất lượng/phản hồi của khách hàng.</li>
								<li>Kết hợp với phía kế toán kho vận để giải quyết đơn hàng có trục trặc.</li>
		    				</ul>
	    				</div>
		    		</div>
		    	</transition>
	    		<div class="content-tab d-flex justify-content-between align-items-center" @click="setShowTab('tab3')">
	        		<div class="content-tab-text">Thu nhập & Phúc lợi</div>
	        		<img src="/images/plus.png" v-if="showItem !== 'tab3'" />
	        		<img src="/images/minus.png" v-else />
	        	</div>
	        	<transition :duration="{ enter: 400, leave: 100 }" mode="out-in" name="slide-fade">
		    		<div class="block-content tab2" v-if="showItem === 'tab3'">
	    				<img class="image-block" src="/images/contact-info.jpg"></img>
	    				<div class="block-data">
		    				<div class="block-title">Thu nhập & Phúc lợi</div>
		    				<div class="block-sub">THU NHẬP</div>
		    				<ul>
		    					<li>Lương cứng 8.000.000</li>
								<li>Hoa hồng Tháng & Quý & Năm</li>
								<li>Thu nhập >10.000.000</li>
		    				</ul>
		    				<div class="block-sub">PHÚC LỢI</div>
		    				<ul>
		    					<li>Có 12 ngày phép năm (Theo quy địnhcủa nhà nước)</li>
								<li>Cộng thêm những ngày nghỉ phép do công ty thưởng thêm.</li>
								<li>Đóng BHXH đầy đủ, nhận lương net</li>
								<li>Lương tháng 13</li>
								<li>Đi du lịch</li>
		    				</ul>
	    				</div>
		    		</div>
		    	</transition>
	    		<div class="content-tab d-flex justify-content-between align-items-center" @click="setShowTab('tab4')">
	        		<div class="content-tab-text">Địa điểm và Thời gian</div>
	        		<img src="/images/plus.png" v-if="showItem !== 'tab4'" />
	        		<img src="/images/minus.png" v-else />
	        	</div>
	        	<transition :duration="{ enter: 400, leave: 100 }" mode="out-in" name="slide-fade">
		    		<div class="block-content" v-if="showItem === 'tab4'">
		    			<img class="image-block" src="/images/contact-info.jpg"></img>
	    				<div class="block-data">
		    				<div class="block-title">Địa điểm và Thời gian</div>
		    				<div class="block-sub">ĐỊA ĐIỂM CÔNG TY</div>
		    				<div class="li">36 đường D5, P. 25, Q. Bình Thạnh, Tp. Hồ Chí Minh</div>
		    				<div class="block-sub block-sub-time">THỜI GIAN</div>
		    				<div class="li">Làm việc 6 ngày/tuần (nghỉ 1 ngày thứ 7 hoặc Chủ Nhật).</div>
							<div class="li">Linh hoạt 2 ca:</div>
							<div class="li">+ Ca sáng: 9h - 18h (nghỉ trưa 1 tiếng)</div>
							<div class="li">+ Ca tối: 13h - 22h (nghỉ ăn 1 tiếng)</div>
							<div class="li">+ Livestream: tối trong tuần (tùy lịch sắp xếp)</div>
	    				</div>
		    		</div>
		    	</transition>
	        </b-container>
        </div>
        <b-container>
	        <div class="contact-btn">
	        	Gửi CV tại đây
	        </div>
        </b-container>
    </div>
    <div class="contact-container" v-else>
        <b-container>
            <b-breadcrumb class="breadcrumb" :items="breadcrumb"></b-breadcrumb>
        </b-container>
        <div class="contact-banner">
            <img class="w-100" :src="bannerInfo.recruitment?.data.attributes.url ?? '/images/contact.jpg'" ></img>
        </div>
        <div class="container">
            <h1 class="contact-title">
                Chuyên viên Tư vấn và Chăm sóc Khách hàng
            </h1>
            <div class="contact-des">
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printertook and scrambled it to make a type specimen book.
            </div>
        </div>
        <div class="contact-content">
        	<b-container class="d-flex justify-content-end">
        		<div :class="`content-title ${ showItem === 'tab1' ? 'content-title-active' : ''}`" @click="setShowTab('tab1')" >Mục đích</div>
        		<div :class="`content-title ${ showItem === 'tab2' ? 'content-title-active' : ''}`" @click="setShowTab('tab2')">Yêu cầu</div>
        		<div :class="`content-title ${ showItem === 'tab3' ? 'content-title-active' : ''}`" @click="setShowTab('tab3')">Thu nhập & Phúc lợi</div>
        		<div :class="`content-title ${ showItem === 'tab4' ? 'content-title-active' : ''}`" @click="setShowTab('tab4')">Địa điểm và Thời gian</div>
        	</b-container>
    		<div class="block-content" v-if="showItem === 'tab1'">
    			<b-container class="d-flex justify-content-between align-items-center h-100">
    				<div>
    					<div class="t-title">01</div>
    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
    				</div>
    				<div>
    					<div class="t-title">02</div>
    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
    				</div>
    				<div>
    					<div class="t-title">03</div>
    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
    				</div>
    				<div>
    					<div class="t-title">04</div>
    					<div class="t-des">There are many variations of passages of Lorem Ipsum available, but the majority</div>
    				</div>
    			</b-container>
    		</div>
    		<div class="block-content tab2" v-if="showItem === 'tab2'">
    			<b-container class="">
    				<div class="block-left">
	    				<div class="block-title">Yêu cầu công việc</div>
	    				<ul>
	    					<li>Nhắn tin tư vấn bán hàng & theo dõi chăm sóc khách hàng (trên các nền tảng online FB/IG/Tik Tok/TMĐT).</li>
							<li>Thu thập & phân loại thông tin (có sẵn) của khách hàng theo định hướng.</li>
							<li>Gọi điện thoại tư vấn bán hàng & chăm sóc khách hàng trước, trong và sau khi mua.</li>
							<li>Phản hồi đánh giá của khách hàng trên sàn TMĐT.</li>
							<li>Livestream bán hàng trên các sàn TMĐT/Tik Tok.</li>
							<li>Làm báo cáo về chất lượng/phản hồi của khách hàng.</li>
							<li>Kết hợp với phía kế toán kho vận để giải quyết đơn hàng có trục trặc.</li>
	    				</ul>
    				</div>
    			</b-container>
    			<img class="image-block" src="/images/contact-info.jpg"></img>
    		</div>
    		<div class="block-content" v-if="showItem === 'tab3'">
    			<b-container class="">
    				<div class="block-left">
	    				<div class="block-title">Thu nhập & Phúc lợi</div>
	    				<div class="block-sub">THU NHẬP</div>
	    				<ul>
	    					<li>Lương cứng 8.000.000</li>
							<li>Hoa hồng Tháng & Quý & Năm</li>
							<li>Thu nhập >10.000.000</li>
	    				</ul>
	    				<div class="block-sub">PHÚC LỢI</div>
	    				<ul>
	    					<li>Có 12 ngày phép năm (Theo quy địnhcủa nhà nước)</li>
							<li>Cộng thêm những ngày nghỉ phép do công ty thưởng thêm.</li>
							<li>Đóng BHXH đầy đủ, nhận lương net</li>
							<li>Lương tháng 13</li>
							<li>Đi du lịch</li>
	    				</ul>
    				</div>
    			</b-container>
    			<img class="image-block" src="/images/contact-info.jpg"></img>
    		</div>
    		<div class="block-content" v-if="showItem === 'tab4'">
    			<b-container class="">
    				<div class="block-left">
	    				<div class="block-title">Địa điểm và Thời gian</div>
	    				<div class="block-sub">ĐỊA ĐIỂM CÔNG TY</div>
	    				<div class="li">36 đường D5, P. 25, Q. Bình Thạnh, Tp. Hồ Chí Minh</div>
	    				<div class="block-sub block-sub-time">THỜI GIAN</div>
	    				<div class="li">Làm việc 6 ngày/tuần (nghỉ 1 ngày thứ 7 hoặc Chủ Nhật).</div>
						<div class="li">Linh hoạt 2 ca:</div>
						<div class="li">+ Ca sáng: 9h - 18h (nghỉ trưa 1 tiếng)</div>
						<div class="li">+ Ca tối: 13h - 22h (nghỉ ăn 1 tiếng)</div>
						<div class="li">+ Livestream: tối trong tuần (tùy lịch sắp xếp)</div>
    				</div>
    			</b-container>
    			<img class="image-block" src="/images/contact-info.jpg"></img>
    		</div>
        </div>
        <div class="contact-btn">
        	Gửi CV tại đây
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
export default {
    name: 'AboutPage',
    computed: {
        ...mapGetters({
            bannerInfo: "common/getBannerinfo",
        }),
    },
    data() {
        return {
            breadcrumb: [
                {
                    text: this.$t('Home'),
                    href: '/'
                },
                {
                    text: 'Tuyển dụng',
                    active: true
                }
            ],
            showItem: 'tab1',
            isMobile: false
        }
    },
    watch: {
        '$i18n.locale': function (val) {
            if (val) {
                this.breadcrumb = [
                    {
                        text: this.$t('Home'),
                        href: '/'
                    },
                    {
                        text: 'Tuyển dụng',
                        active: true
                    }
                ]
            }
        },
    },
    mounted() {
        if (!this.$route.hash) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        this.isMobile = this.checkMobile()
        if(this.isMobile) {
        	this.showItem = 'tab0'
        }
    },
    methods: {
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        setShowTab(data) {
        	if(data === this.showItem && this.isMobile)
        		this.showItem = 'tab0'
        	else
        		this.showItem = data
        }
    }
    // methods: {
    //   ...mapActions({
    //     getListWork: "work/getListWork"
    //   }),
    //   async loadData() {
    //     await this.getListWork()
    //     console.log(this.listWork)
    //   }
    // }
}
</script>
<style lang="scss">
.contact-container {
    margin-top: 180px;
}
.breadcrumb {
    background-color: white;
    padding-left: 0px;
}

.contact-title{
    margin-top: 45px;
    font-size: 36px;
    line-height: 47px;
    align-items: center;
    text-align: center;
    color: #515151;
}
.contact-des{
    margin-top: 27px;
    font-family: 'inter';
    font-weight: 300;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    color: #2F3036;
    width: 390px;
    margin-left: auto;
    margin-right: auto;
}
.contact-content{
	margin-top: 100px;
}
.content-title{
	margin-left: 100px;
	font-size: 20px;
	line-height: 40px;
	color: #484848;
	cursor: pointer;
	white-space: nowrap;
	margin-bottom: 1px;
}
.content-title-active{
	border-bottom: 2px solid;
}
.block-content{
	background: #F5F5F5;
	height: 700px;
}
.t-title{
	font-weight: 250;
	font-size: 50px;
	line-height: 50px;
	text-align: center;
	letter-spacing: -0.01em;
	color: #2F3036;
	font-family: 'bodrum-light';
	font-style: italic;
}
.t-des{
	font-family: 'inter-light';
	font-weight: 300;
	font-size: 16px;
	line-height: 22px;
	text-align: center;
	color: #2F3036;
	margin-top: 16px;
	width: 210px;
}
.block-left{
	width: 375px;
	float: left;
	li{
		font-family: 'inter-light';
		font-size: 13px;
	}
	.li{
		font-family: 'inter-light';
		font-size: 13px;
	}
}
.tab2{
	li{
		font-family: 'inter-light';
		font-size: 13px;
		line-height: 18px;
		margin-bottom: 16px;
	}
}
.block-title{
	margin-top: 90px;
	margin-bottom: 70px;
	font-size: 36px;
}
.block-sub{
	font-weight: 600;
	margin-bottom: 16px;
}
.block-sub-time{
	margin-top: 16px;
}
.image-block{
	height: 700px;
	object-fit: cover;
	width: calc(56%);
	float: right;
}
.contact-btn{
	width: 464px;
	height: 80px;
	line-height: 80px;
	background: #F593A5;
	border-radius: 85px;
	font-weight: 300;
	font-size: 26px;
	text-align: center;
	color: #FFFFFF;
	margin: 100px auto 100px auto;
	cursor: pointer;
}
@media (max-width: 520px) {
	.contact-container{
		margin-top: 0px;
	}
	.contact-title{
		font-size: 20px;
		line-height: 26px;
	}
	.contact-des{
		font-size: 10px;
		line-height: 12px;
		width: 100%;
	}
	.content-tab{
		border-bottom: 1px solid #B9B9B9;
		margin-bottom: 12px;
		.content-tab-text{
			line-height: 45px;
    		font-size: 14px;
		}
		img{
			width: 25px;
		}
	}
	.block-content{

		background: #ffffff;
	    height: auto;
	    margin-top: 16px;
	    .image-block{
	    	height: auto;
		    object-fit: cover;
		    width: 100%;
		    float: none;
	    }
	    .block-data{
	    	.block-title{
	    		margin-top: 16px;
			    margin-bottom: 16px;
			    font-size: 18px;
	    	}
	    	li{
	    		font-size: 10px;
	    		line-height: 12px;
	    	}
	    	.block-sub{
	    		font-size: 12px;
				line-height: 15px;
	    	}
	    	.li{
	    		font-size: 10px;
	    	}
	    }
	    .t-title{
    		text-align: left;
    	}
    	.t-des{
    		text-align: left;
    		width: calc(100% - 85px)
    	}
	}
	.contact-btn{
		height: 55px;
		line-height: 55px;
		font-size: 12px;
		width: 100%;
	}
}
</style>