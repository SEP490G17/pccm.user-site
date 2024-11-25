import {
  ScheduleComponent,
  Week,
  Inject,
  ViewsDirective,
  ViewDirective,
  ResourceDirective,
  ResourcesDirective,
} from '@syncfusion/ej2-react-schedule';
import { useRef } from 'react';
import { L10n } from '@syncfusion/ej2-base';
import { observer } from 'mobx-react';
import { ICourtCluster } from '@/app/models/courtcluster.model';
import { useStore } from '@/app/stores/store';
import dayjs from 'dayjs';

interface BookingScheduleComponentProps {
  selectedCourtCluster: ICourtCluster;
}
const BookingScheduleComponent = observer(
  ({ selectedCourtCluster }: BookingScheduleComponentProps) => {
    const fields = {
      phoneNumber: {
        name: 'phoneNumber',
        validation: { required: true, minLength: 10, number: true },
      },
      startTime: { name: 'startTime', validation: { required: true } },
      endTime: { name: 'endTime', validation: { required: true } },
      courtId: { name: 'courtId', validation: { required: true } },
      fullName: { name: 'fullName', validation: { required: true } },
    };

    const { courtClusterDetailsStore } = useStore();
    const { bookingScheduleArray } = courtClusterDetailsStore;
    const group = { resources: ['courts'] };
    const schedule = useRef<ScheduleComponent>(null);
    L10n.load({
      'en-US': {
        schedule: {
          cancelButton: 'Đóng',
          deleteButton: 'Huỷ lịch',
          newEvent: 'Đặt lịch chơi',
          saveButton: 'Lưu',
        },
      },
    });

    const handleRenderCell = (args: any) => {
      const currentTime = new Date();

      if (args.elementType === 'workCells' || args.elementType === 'monthCells') {
        const cellStartTime = args.date;

        // Nếu thời gian ô là trong quá khứ, thay đổi màu nền và vô hiệu hóa click
        if (cellStartTime < currentTime) {
          args.element.classList.add('e-past-time-slot');
          args.element.style.pointerEvents = 'none';
        }
      }
    };
    const handleEventRendered = (args: any) => {
      if (args.data.RecurrenceRule) {
        args.element.style.backgroundColor = 'tomato';
      } else {
        args.element.style.backgroundColor = 'darkcyan';
      }
    };
    const handleNavigation = async (args: any) => {
      if (args.action === 'date') {
        // Lấy ngày hiện tại trên lịch
        const selectedDate = args.currentDate;
        await courtClusterDetailsStore.loadScheduleBookingList(selectedDate);
      }
    };
    const eventTemplate = (props:any) => {
      return (
        <div className="template-wrap">
          <div className="time flex justify-center items-center">
            {dayjs(props.startTime).format('HH:mm')} - {dayjs(props.endTime).format('HH:mm')}
          </div>
        </div>
      );
    };
    return (
      <ScheduleComponent
        ref={schedule}
        group={group}
        timeFormat="HH:mm"
        timeScale={{ enable: true, interval: 60, slotCount: 1 }}
        workHours={{ highlight: true, start: '05:00', end: '22:00' }}
        startHour="05:00"
        endHour="23:00"
        showQuickInfo={false}
        timezone="Asia/Bangkok"
        cssClass="schedule-cell-dimension"
        eventSettings={{
          fields: fields,
          dataSource: bookingScheduleArray,
        }}
        rowAutoHeight={true}
        quickInfoOnSelectionEnd={true}
        renderCell={handleRenderCell}
        readonly={true}
        eventRendered={handleEventRendered}
        enableAdaptiveUI={true}
        navigating={async (args: any) => await handleNavigation(args)}
      >
        <ViewsDirective>
          <ViewDirective option="Week" dateFormat="dd-MMM-yyyy" eventTemplate={eventTemplate} />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective
            field="courtId"
            title="Sân"
            name="courts"
            allowMultiple={true}
            dataSource={selectedCourtCluster.courts}
            textField="courtName"
            idField="courtId"
          ></ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Week]} />
      </ScheduleComponent>
    );
  },
);

export default BookingScheduleComponent;
