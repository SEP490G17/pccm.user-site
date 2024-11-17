import {
  ScheduleComponent,
  EventFieldsMapping,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Week,
  Inject,
} from '@syncfusion/ej2-react-schedule';
import { isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import {  useRef } from 'react';
import { useStore } from '@/app/stores/store';
import BookingEditorTemplateComponent from './BookingEditorTemplateComponent';

const BookingScheduleComponent = observer(() => {
  const { courtClusterDetailsStore } = useStore();
  const { selectedCourt } = courtClusterDetailsStore;
  const fields = {
    phoneNumber: {
      name: 'phoneNumber',
      validation: { required: true, minLength: 10, number: true, },
      default:'0865869202'
    },
    startTime: { name: 'startTime', validation: { required: true } },
    endTime: { name: 'endTime', validation: { required: true } },
    courtId: { name: 'courtId', validation: { required: true } },
    recurrence: { name: 'recurrence', validation: { required: true } },
    fullName: { name: 'fullName', validation: { required: true }, default:'sss' },
  };
  
  const group = { resources: ['courts'] };
  const schedule = useRef<ScheduleComponent>(null);
  L10n.load({
    'en-US': {
      schedule: {
        cancelButton: 'Đóng',
        deleteButton: 'Huỷ lịch',
        newEvent: 'Đặt lịch chơi',
      },
    },
  });
  const handleActionBegin = async (args: any) => {
    const currentTime = new Date();
    if (
      (args.requestType === 'eventCreate' || args.requestType === 'eventChange') &&
      args.data &&
      ((Array.isArray(args.data) && args.data.length > 0) || !isNullOrUndefined(args.data))
    ) {
      console.log(args.data);

      if (schedule.current) {
        const eventData = Array.isArray(args.data) ? args.data[0] : args.data;
        const eventField: EventFieldsMapping = schedule.current.eventFields!;
        const startDate = eventData[eventField.startTime!];
        const endDate = eventData[eventField.endTime!];
        if (startDate < currentTime) {
          args.cancel = true; // Huỷ nếu thời gian bắt đầu nằm trong quá khứ
        }
        if (!schedule.current.isSlotAvailable(startDate, endDate)) {
          args.cancel = true; // Huỷ nếu slot không khả dụng
        }
        const minEndDate = dayjs(startDate).add(1, 'hour');
        if (dayjs(endDate).isBefore(minEndDate)) {
          args.cancel = true;

          return;
        }
        if (args.data[0].recurrence) {
          switch (args.data[0].recurrence) {
            case 1: {
              const until = dayjs(endDate).add(1, 'month').format('YYYYMMDDTHHmmss[Z]');
              args.data[0].RecurrenceRule = `FREQ=DAILY;INTERVAL=1;UNTIL=${until.toString()};`;
              const untilSave = dayjs(endDate).add(1, 'month').format('YYYY-MM-DDTHH:mm:ss[Z]');
              args.data[0].untilTime = untilSave.toString();
              break;
            }
            case 2: {
              const until = dayjs(endDate).add(3, 'month').format('YYYYMMDDTHHmmss[Z]');
              args.data[0].RecurrenceRule = `FREQ=DAILY;INTERVAL=1;UNTIL=${until.toString()};`;
              const untilSave = dayjs(endDate).add(3, 'month').format('YYYY-MM-DDTHH:mm:ss[Z]');
              args.data[0].untilTime = untilSave.toString();
              break;
            }
            case 3: {
              const until = dayjs(endDate).add(12, 'month').format('YYYYMMDDTHHmmss[Z]');
              args.data[0].RecurrenceRule = `FREQ=DAILY;INTERVAL=1;UNTIL=${until.toString()};`;
              const untilSave = dayjs(endDate).add(12, 'month').format('YYYY-MM-DDTHH:mm:ss[Z]');
              args.data[0].untilTime = untilSave.toString();
              break;
            }
          }
        }
        args.data[0].paymentStatus = 'pending';

        args.cancel = true;
        const bookingPost: BookingCreate = {
          FullName: eventData.fullName,
          CourtId: eventData.courtId,
          StartTime: eventData.startTime,
          EndTime: eventData.endTime,
          PhoneNumber: eventData.phoneNumber,
          RecurrenceRule: eventData.RecurrenceRule ?? '',
          UntilTime: eventData.untilTime ?? null,
        };
        
      }
    }
  };
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
    const isComplete = args.data.isSuccess;
    // Apply color class based on paymentStatus

    if (isComplete) {
      args.element.classList.add('booking-complete');
    }
  };

  const handleNavigation = async (args: any) => {
    console.log(args);
    if (args.action === 'date') {
      // Lấy ngày hiện tại trên lịch
      const selectedDate = args.currentDate;
      console.log('Ngày được chọn:', selectedDate);
      await courtClusterDetailsStore.loadScheduleBookingList(selectedDate);
    }
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
      eventRendered={handleEventRendered}
      eventSettings={{
        fields: fields,
        dataSource: courtClusterDetailsStore.bookingScheduleArray,
      }}
      editorTemplate={(props: any) => (
        <BookingEditorTemplateComponent
          {...props}
          prices={courtClusterDetailsStore.courtPrice}
          fields={fields}
        />
      )}      rowAutoHeight={true}
      quickInfoOnSelectionEnd={true}
      actionBegin={async (prop: any) => await handleActionBegin(prop)} // Đảm bảo hàm hành động
      renderCell={handleRenderCell}
      enableAdaptiveUI={true}
      navigating={async (args: any) => await handleNavigation(args)}
    >
      <ViewsDirective>
        <ViewDirective option="Week" dateFormat="dd-MMM-yyyy" />
      </ViewsDirective>
      <ResourcesDirective>
        <ResourceDirective
          field="courtId"
          title="Sân"
          name="courts"
          allowMultiple={true}
          dataSource={selectedCourt?.courts}
          textField="courtName"
          idField="courtId"
        ></ResourceDirective>
      </ResourcesDirective>
      <Inject services={[Week]} />
    </ScheduleComponent>
  );
});

export default BookingScheduleComponent;
