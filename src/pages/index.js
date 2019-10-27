import Loadable from "react-loadable"
import Loading from "../components/Loading"

export const Dashboard = Loadable({
    loader: () => import("./Dashboard"),
    loading: Loading,  
    timeout: 10000,
})

export const Pigeon = Loadable({
    loader: () => import("./Pigeon/Pigeon"),
    loading: Loading,  
    timeout: 10000,
})

// export const AnalyticsReport = Loadable({
//     loader: () => import("./AnalyticsReport"),
//     loading: Loading,  
//     timeout: 10000,
// })

// export const Account = Loadable({
//     loader: () => import("./Account"),
//     loading: Loading,  
//     timeout: 10000,
// })

// export const FAQ = Loadable({
//     loader: () => import("./FAQ"),
//     loading: Loading,  
//     timeout: 10000,
// })

// export const ContactUs = Loadable({
//     loader: () => import("./ContactUs"),
//     loading: Loading,  
//     timeout: 10000,
// })