import { format } from 'date-fns';


let rooms=[
    {
        room_id:1,
        room_name:'room-1',
        room_status:"available",
        amenities:"Tv,Washing Machine,Iron box",
        seats:4,
        price_per_hrs:1000
    },
    {
        room_id:2,
        room_name:'room-2',
        room_status:"available",
        amenities:"Tv,Washing Machine,Iron box",
        seats:4,
        price_per_hrs:2000
    },
    {
        room_id:3,
        room_name:'room-3',
        room_status:"available",
        amenities:"Tv,Washing Machine,Iron box",
        seats:4,
        price_per_hrs:3000
    },
]
let bookingRoom=[]

//CREATE ROOM
const createRoom=async(req,res)=>{
    try {
        let id=rooms.length?rooms[rooms.length-1].room_id +1 :1
         req.body.room_id = id
         rooms.push(req.body)
            await res.status(200).json({
                message:"Room Created Succesfully",
                Room:rooms
               })

        
    } catch (error) {
        res.status(500).json({
            comment:'Internel server error'
        })
        
    }
}

//GET ALL ROOM
const getAllRoom=async(req,res)=>{
    try {
        await res.status(200).json({
            comment:"Fetch All Room Succesfully 👍",
            rooms
        })

        
    } catch (error) {
        res.status(500).json({
            comment:'Internel server error'
        })
        
    }
}

//BOOKING ROOM
const bookRoom=async(req,res)=>{
    try {
        let {customer_name,start_time,end_time,roomID}=req.body;
        // console.log(req.body);
        let date = format(new Date(), "dd-MM-yyyy");
        let room=rooms.filter((e)=>e.room_status === "available" && e.room_id == roomID)
        if(!room){
            res.status(400).json({
                message:'Room is not Available'
            })
            return;
        }
          else{
            let booking={
                customer_name,
                start_time,
                end_time,
                roomID,
                Date:date,
                booking_id:bookingRoom.length +1,
                booking_date:new Date(),
                status:"booked" 
             }
       bookingRoom.push(booking) 
       res.status(200).json({
         message:"Succesfully Booked Room",
         BookingRoom:booking,
         bookingRoom
       })
          }     

    } catch (error) {
        res.status(500).json({
            message:"Internal server Error"
        })
        
    }
}
 
//  BOOKED DATA

const bookedRoom=async(req,res)=>{
    try {
        let roomList=rooms.map((room)=>{
            let booking = bookingRoom.find((booking)=>booking.roomID === room.room_id)
            return{
                roomName:room.room_name,
                bookedStatus:booking? "Booked" : "Available",
                customerName:booking? booking.customer_name : null,
                date:booking?booking.Date: null,
                startTime: booking? booking.start_time : null,
                endTime: booking? booking.end_time: null
            }
        })
        res.status(200).json({
            message:"Succesfully Fetched All Room with Booked Details",
            roomList
        })
        
    } catch (error) {
        res.status(500).json({
            comment:'Internel server error'
        })
    }
}

//ALL CUSTOMER WITH ROOM DATA
const  getAllCustomerData=async(req,res)=>{
    try {
        const customerList=bookingRoom.map((booking)=>{
            const room=rooms.find((r)=>r.room_id === booking.roomID)
            return{
                Customer_Name: booking.customer_name,
                Room_Name:room? rooms.room_name :null,
                Date:booking.Date,
                start_time:booking.start_time,
                end_time:booking.end_time
            }
        })
        await res.status(200).json({
            message:"Succesfully Fetched All Customer with Booked Details",
            customerList

        })
    } catch (error) {
        res.status(500).json({
            comment:'Internel server error'
        })
    }
}

const bookCount=async(req,res)=>{
    try {
        const { customer_name } = req.body;
        console.log('Requested Customer Name:', customer_name); // Log the requested customer name
        const customerBooking = bookingRoom.filter((e) =>{ 
        console.log('Booking Customer Name:', e.customer_name); // Log each booking's customer name
            return e.customer_name === customer_name;    
        });
        console.log('Customer Booking:', customerBooking); // Log the resulting customer bookings

        res.status(200).json({
            message: 'Successfully fetched',
            customer_name,
            booking_count: bookingRoom.length,
            bookings: bookingRoom
        });
    } catch (error) {
        console.error('Error in bookCount:', error); // Log any errors that occur
        res.status(500).json({
            comment: 'Internal server error'
        });
    }

}


export default {
    createRoom,
    getAllRoom,
    bookRoom,
    bookedRoom,
    getAllCustomerData,
    bookCount
    
}