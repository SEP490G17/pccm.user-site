import { Col, Image, Row } from "antd";

interface IProps {
  images?: string[];
}

export default function ListCourtImage({ images }: IProps) {
  return (
    <Row gutter={[8, 12]}>
      <Image.PreviewGroup>
        <Col span={16}>
          <Image
            src={images?.[0]}
            width="100%"
            height="100%"
            className="rounded-lg object-cover"
          />
        </Col>
        <Col span={8}>
          <Row gutter={[12, 6]}>
            <Col span={24}>
              <Image
                src={images?.[1]}
                width="100%"
                height="202.5px"
                className="rounded-lg object-cover"
              />
            </Col>
            <Col span={24}>
              {images && images.length > 3 ? (
                <div className={'relative p-0 m-0 h-full'}>
                  <Image
                    id="image-group-2"
                    src={images[2]}
                    width="100%"
                    height="100%"
                    className="rounded-lg object-cover "
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      fontSize: 18,
                      cursor: "pointer",
                    }}
                    className="rounded-lg cursor-pointer"
                    onClick={() => {
                      document.getElementById("image-group-2")?.click();
                    }}
                  >
                    Xem thêm {images.length - 3} ảnh
                  </div>
                  {images.slice(3).map((image, index) => (
                    <Image
                      height={0}
                      width={0}
                      key={index}
                      src={image}
                      hidden
                    />
                  ))}
                </div>
              ) : (
                <Image
                  src={images?.[2]}
                  width="100%"
                  height="100%"
                  className="rounded-lg object-cover"
                />
              )}
            </Col>
          </Row>
        </Col>
      </Image.PreviewGroup>
    </Row>
  );
}
