import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import  session from "express-session"
import axios from "axios"


const app: Application = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret : 'sparkapi4444',
  resave : false,
  saveUninitialized : false,
}));

//Routes({ app })
/*The application should have these two endpoints:
    • POST /api/location
    • Accept longitude and latitude to store against a user/system.

    • GET /api/forecast
    • Should make a call to the DarkSky API using the longitude and latitude stored against the user/system.*/

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_key = 'e2fa44d64ec023289482ecdaaeff3fbb';

const getWeather = async (req:Request, res:Response,  next:NextFunction) => {
  try {

    //@ts-ignore
    const lat = req.session.gps.latitude;
    //@ts-ignore
    const lon = req.session.gps.longitude;

    const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_key}`);

    const weather = response.data;

    //@ts-ignore
    req.session.weather = weather;
    next();
  } catch (errors) {
    console.error(errors);
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send("TS App is Running")
})

app.post("/api/location", (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;
  if(latitude && longitude){
    //@ts-ignore
    req.session.gps = { "latitude": latitude, "longitude": longitude};
    //@ts-ignore
    res.json(req.session.gps);
  }else{
    res.json({message: "no location data found"})
  }
  
})

app.get("/api/forecast", getWeather, (req: Request, res: Response) => {
  //@ts-ignore
  if(req.session.weather){
    //@ts-ignore
    res.json({weather: req.session.weather});
  }else{
    // new session no location info available
    res.json({message: "no location data found"})
  }
})



//const PORT = process.env.PORT

const PORT = 4444
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})