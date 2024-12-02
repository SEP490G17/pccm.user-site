import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    Modal,
    TimePicker,
    Upload,
} from 'antd';

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

interface MyModalProps {
    visible: boolean;
    onClose: () => void;
}

const FormCreateCourtCluster: React.FC<MyModalProps> = ({ visible, onClose }) => {
    const [value, setValue] = useState<number | null>(0);

    const handleChange = (newValue: number | null) => {
        setValue(newValue);
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            <div>
                <Flex justify='center'>
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item label="Tên cụm sân">
                            <Input placeholder="Tên cụm sân"
                                style={{ width: "300px" }} />
                        </Form.Item>

                        <Form.Item label="Giờ mở cửa">
                            <TimePicker.RangePicker
                                style={{ width: "300px" }} />
                        </Form.Item>

                        <Form.Item label="Giá sân">
                            <InputNumber
                                value={value}
                                formatter={(value) => `đ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                parser={(value) => value?.replace(/đ\s?|(,*)/g, "") as unknown as number}
                                onChange={handleChange}
                                style={{ width: "300px" }}
                            />
                        </Form.Item>

                        <Form.Item label="Dịch vụ">
                            <Input.TextArea placeholder="Dịch vụ"
                                style={{ width: "300px" }} />
                        </Form.Item>

                        <Form.Item label="Ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" listType="picture-card">
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Flex justify='center'>
                            <Form.Item>
                            <Button type="primary" size='large'>
                                Tạo cụm sân
                            </Button>
                        </Form.Item>
                        </Flex>
                        
                    </Form>
                </Flex>
            </div>
        </Modal>
    );
};

export default FormCreateCourtCluster;