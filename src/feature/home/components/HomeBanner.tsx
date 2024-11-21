import "./style/HomeBanner.scss";

import { Carousel, Skeleton, Typography } from "antd";
import { useEffect, useMemo } from "react";

import { Banner } from "@/app/models/banner.model";
import { observer } from "mobx-react-lite";
import { useStore } from "@/app/stores/store";

interface IProps {
    title: string;
}

function ListBanner({ title }: IProps) {
    const { bannerStore } = useStore();    
    const { bannerArray, loadListBanner, loadingInitial } = bannerStore;

    // Split banners based on bannerType
    const { typeTwoBanners, otherBanners } = useMemo(() => {
        return {
            typeTwoBanners: bannerArray.filter(banner => banner.bannerType === 2),
            otherBanners: bannerArray.filter(banner => banner.bannerType !== 2)
        };
    }, [bannerArray]);

    useEffect(() => {
        loadListBanner();
    }, [loadListBanner]);

    const renderCarousel = (banners: Banner[], isSmaller: boolean = false) => (
        <>
            {title && <Typography.Title level={3}>{title}</Typography.Title>}
            <Carousel autoplay autoplaySpeed={3000}>
                {banners.map((banner: Banner) => (
                    <div key={banner.id} className={`banner-slide ${isSmaller ? 'banner-slide-small' : ''}`}>
                        <div
                            className="banner-overlay"
                            style={{
                                backgroundImage: `url(${banner.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                width: '100%',
                                height: isSmaller ? '300px' : '500px'
                            }}
                        />
                    </div>
                ))}
            </Carousel>
        </>
    );

    return (
        <div className="banner-container">
            {loadingInitial ? (
                <Skeleton
                    paragraph={{ rows: 6 }}
                    active
                    style={{ height: "100%", width: '100%' }}
                />
            ) : (
                <>
                    {typeTwoBanners.length > 0 && (
                        <div className="banner-section">
                            {renderCarousel(typeTwoBanners, false)}
                        </div>
                    )}
                    {otherBanners.length > 0 && (
                        <div className="banner-section" style={{ marginTop: '20px' }}>
                            {renderCarousel(otherBanners, true)}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default observer(ListBanner);
