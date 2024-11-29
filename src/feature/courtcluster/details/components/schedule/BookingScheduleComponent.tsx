import {
  ScheduleComponent,
  Week,
  Inject,
  ViewsDirective,
  ViewDirective,
  ResourceDirective,
  ResourcesDirective,
} from '@syncfusion/ej2-react-schedule';
import { useRef, useState } from 'react';
import { isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { observer } from 'mobx-react-lite';
import { ICourtCluster } from '@/app/models/courtcluster.model';
import { useStore } from '@/app/stores/store';
import dayjs from 'dayjs';
import BookingEditorTemplateComponent from '../bookingForm/BookingEditorTemplateComponent';
import { BookingByDay } from '@/app/models/booking.model';
import { useToast } from '@chakra-ui/react';

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

    const { courtClusterDetailsStore, authStore } = useStore();
    const { bookingScheduleArray } = courtClusterDetailsStore;
    const group = { resources: ['courts'] };
    const schedule = useRef<ScheduleComponent>(null);

    const [selectedDate, setSelectedDate] = useState<any>(new Date());
    const [playStart, setPlayStart] = useState<any>(null);
    const [playEnd, setPlayEnd] = useState<any>(null);

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
    const eventTemplate = (props: any) => {
      return (
        <div className="template-wrap">
          <div className="time flex justify-center items-center">
            {dayjs(props.startTime).format('HH:mm')} - {dayjs(props.endTime).format('HH:mm')}
          </div>
        </div>
      );
    };

    const handleOnCellClick = (args: any) => {
      const { startTime, endTime } = args;
      setSelectedDate(dayjs(startTime).format('YYYY-MM-DD'));
      setPlayStart(dayjs(startTime).format('HH:mm'));
      setPlayEnd(dayjs(endTime).format('HH:mm'));
    };

    const onPopupOpen = (args: any) => {
      if (!authStore.isLoggedIn) {
        authStore.setVisible(true);
        args.cancel = true;
        return;
      }
      if (args.type === 'Editor') {
        if (args.data && args.data.id) {
          args.cancel = true;
        } else {
          args.element.querySelector('#selectedDate').value = selectedDate;
          args.element.querySelector('#playStart').value = playStart;
          args.element.querySelector('#playEnd').value = playEnd;
        }
      }
    };
    const toast = useToast();
    const handleActionBegin = async (args: any) => {
      const currentTime = new Date();
      if (
        (args.requestType === 'eventCreate' || args.requestType === 'eventChange') &&
        args.data &&
        ((Array.isArray(args.data) && args.data.length > 0) || !isNullOrUndefined(args.data))
      ) {
        if (schedule.current) {
          const eventData = Array.isArray(args.data) ? args.data[0] : args.data;
          const selectedDate = eventData.selectedDate;
          const playEnd = eventData.playEnd;
          const playStart = eventData.playStart;
          const minEndDate = dayjs(playStart).add(1, 'hour');
          if (dayjs(`${selectedDate} ${playStart}`).isBefore(dayjs(currentTime))) {
            toast({
              title: 'Đặt lịch thất bại',
              description: 'Không thể đặt lịch của ngày trước đó',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }

          if (dayjs(playEnd).isBefore(minEndDate) && !dayjs(playEnd).isSame(minEndDate)) {
            toast({
              title: 'Đặt lịch thất bại',
              description: 'Thời gian đặt lịch phải lơn hơn hoặc bằng 1 tiêng',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            return;
          }
          const bookingPost: BookingByDay = {
            fullName: eventData.fullName,
            courtId: eventData.courtId,
            fromDate: eventData.selectedDate,
            fromTime: eventData.playStart + ':00',
            toTime: eventData.playEnd + ':00',
            phoneNumber: eventData.phoneNumber,
          };

          args.cancel = true;
          await courtClusterDetailsStore.bookingByDay(bookingPost, toast);
        }
      }
    };
    return (
      <ScheduleComponent
        ref={schedule}
        group={group}
        timeFormat="HH:mm"
        timeScale={{ enable: true, interval: 60, slotCount: 1 }}
        workHours={{
          highlight: true,
          start: selectedCourtCluster.openTime,
          end: selectedCourtCluster.closeTime,
        }}
        startHour={selectedCourtCluster.openTime.substring(0, 5)}
        endHour={selectedCourtCluster.closeTime.substring(0, 5)}
        cellClick={handleOnCellClick}
        popupOpen={onPopupOpen}
        actionBegin={async (prop: any) => await handleActionBegin(prop)} // Đảm bảo hàm hành động
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
        eventRendered={handleEventRendered}
        editorTemplate={(props: any) => (
          <BookingEditorTemplateComponent
            {...props}
            courtOfClusterArray={selectedCourtCluster.courts} // Truyền dataSource vào editor template
            playStart={playStart}
            playEnd={playEnd}
          />
        )}
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
