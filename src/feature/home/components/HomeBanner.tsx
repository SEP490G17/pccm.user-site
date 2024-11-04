import { useStore } from "@/app/stores/store";
import { Carousel, Skeleton, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Banner } from "@/app/models/banner.model";
import "./style/HomeBanner.scss";

interface IProps {
    title: string;
}

function ListBanner({ title }: IProps) {
    const { bannerStore } = useStore();
    const { bannerArray, loadListBanner, loadingInitial } = bannerStore;

    useEffect(() => {
        loadListBanner();
    }, [loadListBanner]);

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
                    <Typography.Title level={3}>{title}</Typography.Title>
                    <Carousel autoplay autoplaySpeed={3000}>
                        {bannerArray.map((banner: Banner) => (
                            <div key={banner.id} className="banner-slide">
                                <div
                                    className="banner-overlay"
                                    style={{
                                        backgroundImage: `url(${banner.imageUrl})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                                {/* <div className="banner-content">
                                    <Typography.Title
                                        level={3}
                                        className="banner-title"
                                        style={{ color: "white" }}
                                    >
                                        {banner.title}
                                    </Typography.Title>
                                    <Typography.Text className="banner-date">
                                        {`Start Date: ${banner.startDate}`}<br />
                                        {`End Date: ${banner.endDate}`}
                                    </Typography.Text>
                                    <div className="banner-button-container">
                                        <Button
                                            className="banner-button"
                                            type="primary"
                                            size="large"
                                            href={banner.linkUrl}
                                        >
                                            Xem chi tiết
                                        </Button>
                                    </div>
                                </div> */}
                            </div>
                        ))}
                    </Carousel>
                </>
            )
            }
        </div >
    );
}

export default observer(ListBanner);
