import express from 'express'
import BookingController from '../controller/Booking.js'

let router=express.Router()

router.get('/get-all-room',BookingController.getAllRoom)
router.post('/create-room',BookingController.createRoom)
router.post('/booking-room',BookingController.bookRoom)
router.get('/booked-data',BookingController.bookedRoom)
router.get('/customer-data',BookingController.getAllCustomerData)
router.get("/bookedCount/:customer_name",BookingController.bookCount)



export default router
