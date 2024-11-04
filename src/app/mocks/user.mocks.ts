// mocks/profileMock.ts
export interface UserProfile {
    userName: string; 
    email: string;
    phone: string;
    birthday: string;
    gender: string;
    address: string;
    avatar?: string; 
}


export const userProfileMock: UserProfile = {
    userName: 'Neil Sims',
    birthday: '1990-01-01',
    email: 'neil@example.com',
    phone: '+12-345 678 910',
    gender: 'male',
    address: '123 Main St, New York, NY 10001',
    avatar: 'https://img.4gamers.com.tw/ckfinder-vn/image2/auto/2024-08/thumb-1920-1228259-240825-085525.png?versionId=IoKQRep9QY5CvNYTzYK5PlEZ0v8eB0yO', 
};
