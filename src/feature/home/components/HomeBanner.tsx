import { useStore } from "@/app/stores/store";
import { Button, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Autoplay } from "swiper/modules";
import { Banner } from "@/app/models/banner.model";
import "./style/HomeBanner.scss"; // Import SCSS file

interface IProps {
    title: string;
}

function ListBanner({ title }: IProps) {
    const { bannerStore } = useStore();
    const { listBanner, loadListBanner, loadingInitial } = bannerStore;

    useEffect(() => {
        loadListBanner();
    }, [loadListBanner]);

    return (
        <div className="banner-container">
            <Typography.Title level={3}>{title}</Typography.Title>
            {loadingInitial ? (
                <div>Loading...</div>
            ) : (
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    style={{ height: '250px' }}
                >
                    {listBanner.map((banner: Banner) => (
                        <SwiperSlide key={banner.id}>
                            <div
                                className="banner-slide"
                                style={{ backgroundImage: `url(${banner.imageUrl})` }}
                            >
                                <div className="banner-overlay" />
                                <div className="banner-content">
                                    <Typography.Title level={3} className="banner-title" style={{ color: 'white' }}>
                                        {banner.title}
                                    </Typography.Title>
                                    <Typography.Text className="banner-date">
                                        {`Start Date: ${banner.startDate}`}<br />
                                        {`End Date: ${banner.endDate}`}
                                    </Typography.Text>
                                    <div className="banner-button-container">
                                        <Button className="banner-button" type="primary" size="large" href={banner.linkUrl}>
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}

export default observer(ListBanner);
