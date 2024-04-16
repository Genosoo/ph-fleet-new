import { GrMapLocation } from "react-icons/gr";
import { LuShip } from "react-icons/lu";
import { BsAirplaneEngines } from "react-icons/bs";
import { BiGridAlt, BiUser, BiUserCircle, BiGroup, BiNews, BiCog, BiInfoCircle } from "react-icons/bi";
import { PiBuildingsLight } from "react-icons/pi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { PiWarningDiamond } from "react-icons/pi";
import { BsPersonCheck } from "react-icons/bs";

export const linkItem1 = [

    //________________________________________________________________LINKS 1_______________________________________________________________________ //
    {
        path:"/fleet/dashboard",
        name:"Dashboard",
        icon:<BiGridAlt/>,
    },
    {
        path:"/fleet/map",
        name:"Map",
        icon:<GrMapLocation/>
    },


    //________________________________________________________________LINKS 2_______________________________________________________________________ //
    {
        path:"/fleet/report-in",
        name:"Report In",
        icon:<BsPersonCheck/>,
        disabled:false

    }, {
        path:"/fleet/reports",
        name:"Reports",
        icon:<BiNews/>,
        disabled:false

    },
    {
        path:"/fleet/alerts",
        name:"Alerts",
        icon:<BiInfoCircle/>,
        disabled:true

    },

    {
        path:"/fleet/incidents",
        name:"Incidents",
        icon:<PiWarningDiamond />,
        disabled:false

    },


    //________________________________________________________________LINKS 3_______________________________________________________________________ //
    {
        path:"/fleet/roles",
        name:"Roles",
        icon:<BiUser/>,
        disabled:false

    },

    {
        path:"/fleet/users",
        name:"Users",
        icon:<BiUserCircle/>,
        disabled:false

    },


    //________________________________________________________________LINKS 4_______________________________________________________________________ //
   
    {
        path:"/fleet/personnel",
        name:"Personnel",
        icon:<BiGroup/>,
        disabled:false

    },
    {
        path:"/fleet/vessels",
        name:"Vessels",
        icon:<LuShip/>,
        disabled:false

    },
    {
        path:"/fleet/aircrafts",
        name:"Aircrafts",
        icon:<BsAirplaneEngines/>,
        disabled:false

    },

    {
        path:"/fleet/offices",
        name:"Offices",
        icon:<PiBuildingsLight/>,
        disabled:false
    },

    {
        path:"/fleet/vehicles",
        name:"Vehicles",
        icon:<MdOutlineDirectionsCar/>,
        disabled:false
    },


    
  
    //________________________________________________________________LINKS 5_______________________________________________________________________ //
    {
        path:"/fleet/commercial-vessels",
        name:"Vessels-Commercial",
        icon:<LuShip/>,
        disabled:true

    },
    {
        path:"/fleet/commercial-aircrafts",
        name:"Aircrafts-Commercial",
        icon:<BsAirplaneEngines/>,
        disabled:true

    },

     //________________________________________________________________LINKS 6_______________________________________________________________________ //
   
    {
        path:"/other-personnel",
        name:"Other Personnel",
        icon:<BiGroup/>,
        disabled:true

    },

    {
        path:"/other-offices",
        name:"Other Offices",
        icon:<PiBuildingsLight/>,
        disabled:true

    },

     {
        path:"/other-vessels",
        name:"Other Vessels",
        icon:<LuShip/>,
        disabled:true

    },

    {
        path:"/other-aircrafts",
        name:"Other Aircrafts",
        icon:<BsAirplaneEngines/>,
        disabled:true

    },

    {
        path:"/other-vehicles",
        name:"Other Vehicles",
        icon:<MdOutlineDirectionsCar/>,
        disabled:true

    },

   

    //________________________________________________________________LINKS 7_______________________________________________________________________ //
    {
        path:"/fleet/settings",
        name:"Settings",
        icon:<BiCog/>
    },
]