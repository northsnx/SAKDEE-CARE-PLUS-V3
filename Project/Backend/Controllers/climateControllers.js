const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.moniterClimate = async (req, res) => {
    try {
        const userID = req.user.user_id;
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ message: "City is required" });
        }
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {   
            return res.status(400).json({ message: "Weather API error", error: data });
        }
        const ClimateData = {
            userId: userID,
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            weather: data.weather[0].main,
        }
        // const savedClimate = await prisma.climate.create({
        //     data: {
        //         userId: userID,
        //         city: data.name,
        //         temp: data.main.temp,
        //         humidity: data.main.humidity,
        //         weather: data.weather[0].main,
        //     }
        // })
        res.status(200).json({
            message: "Climate monitored successfully",
            data: ClimateData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'err:',
            error: err.message,
            stack: err.stack
        });
    }
}