import { useStore } from "@/app/stores/store";
import { Button, Typography, Carousel } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Banner } from "@/app/models/banner.model";
import "./style/HomeBanner.scss";

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
                <Carousel autoplay autoplaySpeed={5000} dotPosition="bottom" effect="scrollx">
                    {listBanner.map((banner: Banner) => (
                        <div key={banner.id} className="banner-slide">
                            <div
                                className="banner-image"
                                style={{ backgroundImage: `url(${banner.imageUrl})` }}
                            />
                            <div className="banner-overlay" />
                            <div className="banner-content">
                                <div>
                                    <Typography.Title level={3} className="banner-title" style={{ color: 'white' }}>
                                        {banner.title}
                                    </Typography.Title>
                                    <Typography.Text className="banner-date">
                                        {`Start Date: ${banner.startDate}`}<br />
                                        {`End Date: ${banner.endDate}`}
                                    </Typography.Text>
                                </div>
                                <div className="banner-btn">
                                    <div className="banner-button-container">
                                        <Button className="banner-button" type="primary" size="large" href={banner.linkUrl}>
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
}

export default observer(ListBanner);
