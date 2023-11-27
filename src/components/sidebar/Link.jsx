import { GrMapLocation } from "react-icons/gr";
import { LuShip } from "react-icons/lu";
import { BsAirplaneEngines } from "react-icons/bs";
import { BiGridAlt, BiUser, BiUserCircle, BiGroup, BiNews, BiCog, BiInfoCircle } from "react-icons/bi";


export const linkItem1 = [
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
   
    {
        path:"/fleet/roles",
        name:"Roles",
        icon:<BiUser/>,
        disabled:true

    },

    {
        path:"/fleet/users",
        name:"Users",
        icon:<BiUserCircle/>,
        disabled:true

    },

    {
        path:"/fleet/personnel",
        name:"Personnel",
        icon:<BiGroup/>,
        disabled:false

    },

    {
        path:"/fleet/office",
        name:"Office",
        icon:<BiGroup/>,
        disabled:false
    },

    {
        path:"/fleet/vehicle",
        name:"Vehicle",
        icon:<BiGroup/>,
        disabled:false
    },


    
    {
        path:"/fleet/vessels",
        name:"Vessels",
        icon:<LuShip/>,
        disabled:true

    },
    {
        path:"/fleet/aircrafts",
        name:"Aircrafts",
        icon:<BsAirplaneEngines/>,
        disabled:true

    },

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

    {
        path:"/fleet/reports",
        name:"Reports",
        icon:<BiNews/>,
        disabled:true

    },
    {
        path:"/fleet/alerts",
        name:"Alerts",
        icon:<BiInfoCircle/>,
        disabled:true

    },

     
    {
        path:"/fleet/settings",
        name:"Settings",
        icon:<BiCog/>
    },
]