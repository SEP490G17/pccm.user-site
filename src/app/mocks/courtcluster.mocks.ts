import { ICourtCluster } from '@/app/models/courtcluster.model';
import san1 from "@/assets/images/san1.png";
import san2 from "@/assets/images/san2.png";
import san3 from "@/assets/images/san3.png";
import san4 from "@/assets/images/san4.png";

export const listCourtMock: ICourtCluster[] = [
  {
    id: 1,
    title: 'Sân Pickleball Việt Hà 01',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Coke', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 3, name: 'Trà xanh', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 4, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
  {
    id: 2,
    title: 'Sân Pickleball Việt Hà 02',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
  {
    id: 3,
    title: 'Sân Pickleball Việt Hà 03',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
  {
    id: 4,
    title: 'Sân Pickleball Việt Hà 04',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
    {
    id: 5,
    title: 'Sân Pickleball Việt Hà 05',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
    {
    id: 6,
    title: 'Sân Pickleball Việt Hà 06',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
    {
    id: 7,
    title: 'Sân Pickleball Việt Hà 07',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
    {
    id: 8,
    title: 'Sân Pickleball Việt Hà 08',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
  {
       id: 9,
    title: 'Sân Pickleball Việt Hà 01',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Coke', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 3, name: 'Trà xanh', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 4, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
  {
    id: 10,
    title: 'Sân Pickleball Việt Hà 02',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
  {
    id: 11,
    title: 'Sân Pickleball Việt Hà 03',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
  {
    id: 12,
    title: 'Sân Pickleball Việt Hà 04',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
    {
    id: 13,
    title: 'Sân Pickleball Việt Hà 05',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
    {
    id: 14,
    title: 'Sân Pickleball Việt Hà 06',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },
    {
    id: 15,
    title: 'Sân Pickleball Việt Hà 07',
    location: {
      tinh: "Thừa Thiên Huế",
      thanhpho: "Thành phố Huế",
      diachi: "70 Nguyễn Huệ, Phường Vĩnh Ninh",
    },
    ownerid: 'admin',
    description: 'sân pickleball',
    images: [san1, san2, san3, san4],
    services: [
      { id: 1, name: 'Wifi' },
      { id: 2, name: 'Bãi đỗ xe oto' },
      { id: 3, name: 'Bãi đỗ xe máy' },
      { id: 4, name: 'Căng tin' },
      { id: 5, name: 'Trà đá' },
      { id: 6, name: 'Đồ ăn' },
      { id: 7, name: 'Nước uống' },
    ],
    createAt: '21/10/2024',
    openHours: ['6:00', '23:00'],
    addresss: 'https://maps.app.goo.gl/vRn4XHyqJGSiKvEm6',
    quantity: 2,
    products: [
      { id: 1, name: 'Trà đá', category: [{ id: 1, name: 'Đồ uống' }] },
      { id: 2, name: 'Bim bim', category: [{ id: 1, name: 'Đồ ăn' }] },
    ],
  },

];
