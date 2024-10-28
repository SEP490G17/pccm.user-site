export interface BookingHistory {
    courtId: number;         
    startTime: string;  
    endTime: string;  
    duration: number;    
    totalPrice: number;    
    status: string;         
    paymentStatus: string; 
}