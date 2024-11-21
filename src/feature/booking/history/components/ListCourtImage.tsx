import { Col, Image, Row } from "antd";
import { useEffect, useState } from "react";

interface IProps {
  images?: string[];
}

export default function ListCourtImage({ images }: IProps) {
  const [mainHeight, setMainHeight] = useState(420);
  const [subHeight, setSubHeight] = useState(210);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setMainHeight(280);
        setSubHeight(140);
      } else if (width <= 768) {
        setMainHeight(320);
        setSubHeight(160);
      } else if (width <= 992) {
        setMainHeight(380);
        setSubHeight(186);
      } else {
        setMainHeight(420);
        setSubHeight(210);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!images || images.length === 0) return null;

  // Trường hợp 1 ảnh: full width
  if (images.length === 1) {
    return (
      <Row>
        <Image.PreviewGroup>
          <Col span={24}>
            <Image
              src={images[0]}
              width="100%"
              height={mainHeight}
              className="object-cover rounded-lg"
            />
          </Col>
        </Image.PreviewGroup>
      </Row>
    );
  }

  if (images.length === 2) {
    return (
      <Row gutter={[8, 12]}>
        <Image.PreviewGroup>
          <Col span={12}>
            <Image
              src={images[0]}
              width="100%"
              height={mainHeight}
              className="object-cover rounded-lg"
            />
          </Col>
          <Col span={12}>
            <Image
              src={images[1]}
              width="100%"
              height={mainHeight}
              className="object-cover rounded-lg"
            />
          </Col>
        </Image.PreviewGroup>
      </Row>
    );
  }

  return (
    <Row gutter={[8, 12]}>
      <Image.PreviewGroup>
        <Col span={16}>
          <Image
            src={images[0]}
            width="100%"
            height={mainHeight}
            className="object-cover rounded-lg"
          />
        </Col>
        <Col span={8}>
          <Row gutter={[0, 8]}>
            <Col span={24}>
              <Image
                src={images[1]}
                width="100%"
                height={subHeight}
                className="object-cover rounded-lg"
              />
            </Col>
            <Col span={24}>
              <Image
                src={images[2]}
                width="100%"
                height={subHeight}
                className="object-cover rounded-lg"
              />
            </Col>
          </Row>
        </Col>
      </Image.PreviewGroup>
    </Row>
  );
}
