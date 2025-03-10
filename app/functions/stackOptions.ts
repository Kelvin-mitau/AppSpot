const webStack = ["React.js","Angular","Vue.js","Svelte","JavaScript (Node.js)","Python (Django)","Flask ", "FastAPI)","Ruby on Rails","Spring Boot","Laravel, Symfony","C# (.NET)","MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis",  "Firebase", "Cassandra","MariaDB"," Oracle", "SQL Server", "SQLite","Remix", "Express", "Next.js"]

const mobileStack = ["React Native","Flutter","Swift","Kotlin","Java (Android)","Xamarin","PhoneGap, Ionic","Cordova","Unity","Cocos2d","MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis",  "Firebase", "Cassandra","MariaDB"," Oracle", "SQL Server", "SQLite"]

const desktopStack = ["Electron","Java (JavaFX, Swing)","Tkinter","WPF","WinForms","C++ (Qt)","C++ (MFC)","C++ (wxWidgets)","C++ (GTK)","C++ (FLTK)","C++ (VCL)","MySQL", "PostgreSQL", "SQLite", "MongoDB", "Redis",  "Firebase", "Cassandra","MariaDB"," Oracle", "SQL Server", "SQLite"]

type stackType = "web" | "mobile" | "desktop"
export default function StackOptions(stackType:string) {
    if (stackType == "web") return(webStack)
    else if (stackType == "mobile") return(mobileStack)
    else if (stackType == "desktop") return(desktopStack)
    else return []

}