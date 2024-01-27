const homePage = async (req, res) => {
    try {
        res.status(200).send(`
        <div style="background-color: black; color: white; padding: 20px;border-radius:20px;margin:13em">
            <h1 style="text-align: center;">Welcome To Hall Booking API 😊</h1>
            <div style="display: flex; justify-content: center; align-items: center;padding:1em">
                <p style="text-align: center; max-width: 600px;">More than just your place to stay – Booking.com offers all types of accommodation. From takeoff to landing and everything in between - book your whole trip with us. 24/7 Customer Service. Low Rates. Motels. Great Availability. Hotels....</p>
            </div>
        </div>
        `);
    } catch (error) {
        res.status(500).send({
            comment: "Internal Server Error"
        });
    }
}

export default {
    homePage
}
