import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { observer } from 'mobx-react';
import { useStore } from '@/app/stores/store';
import { useState } from 'react';
import { CourtPriceBooking } from '@/app/models/courtcluster.model';
import { Col, Row } from 'antd';

const BookingEditorTemplateComponent = observer((props: any): JSX.Element => {
  const { courtClusterDetailsStore, authStore } = useStore();
  const { selectedCourt } = courtClusterDetailsStore;
  const court = selectedCourt?.courts.map((c) => {
    return {
      courtId: c.courtId,
      courtName: c.courtName,
    };
  });

  const [selectedCourtId, setSelectedCourtId] = useState(court?.[0].courtId);

  const filteredPrices = props.prices.filter(
    (price: CourtPriceBooking) => price.courtId === selectedCourtId,
  );
  const user = authStore.userApp;
  console.log('check props', props);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <label className="text-xs">Họ và tên:</label>
          <input
            name="fullName"
            id="fullName"
            className=" e-field w-full e-input "
            data-name="fullName"
            defaultValue={user?.displayName}
            placeholder={user?.displayName}
          />
        </Col>

        <Col span={12}>
          <label className="text-xs">Số điện thoại:</label>
          <input
            name="phoneNumber" // Phải khớp với fields.phoneNumber.name
            id="phoneNumber"
            className="e-field e-input w-full" // Phải có class "e-field"
            data-name="phoneNumber"
            defaultValue={user?.phoneNumber}
            placeholder={user?.phoneNumber}
            type="number"
            min={0}
            minLength={10}
          />
        </Col>

        <Col span={12}>
          <label className="text-xs" id="label_StartTime" htmlFor="StartTime">
            Từ:
          </label>
          <DateTimePickerComponent
            id="startTime"
            format="dd/MM/yy hh:mm a"
            name="startTime"
            className="e-start e-field e-control e-datetimepicker e-lib e-keyboard"
            aria-labelledby="label_StartTime"
            step={30}
          ></DateTimePickerComponent>
        </Col>
        <Col span={12}>
          <label className="text-xs" id="label_EndTime" htmlFor="EndTime">
            Đến:
          </label>
          <DateTimePickerComponent
            id="endTime"
            format="dd/MM/yy hh:mm a"
            name="endTime"
            className=" e-field e-end"
            aria-labelledby="label_EndTime"
            step={30}
          ></DateTimePickerComponent>
        </Col>

        {props.courtId && (
          <Col span={12}>
            <label className="text-xs">Chọn sân</label>
            <DropDownListComponent
              id="courtId"
              name="courtId"
              value={props.courtId}
              dataSource={court}
              fields={{ text: 'courtName', value: 'courtId' }}
              placeholder="Chọn Sân"
              className="e-field"
              onChange={(e: any) => setSelectedCourtId(e.value)}
            />
          </Col>
        )}
        <Col span={24}>
          <table className="w-full text-sm text-left rtl:text-right border-collapse ">
            <thead className="text-xs  uppercase  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Tên sân
                </th>
                <th scope="col" className="px-6 py-3">
                  Khung giờ
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPrices &&
                filteredPrices.map((price: CourtPriceBooking) => (
                  <tr className="" key={`${price.courtId}-${price.time}`}>
                    <td className="px-6 py-4">{price.courtName}</td>
                    <td className="px-6 py-4">{price.time}</td>
                    <td className="px-6 py-4">
                      {price.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
});

export default BookingEditorTemplateComponent;
