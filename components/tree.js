let tree =
    {
        "archive": [
            {
                "year": "2024",
                "months": [ "05", "06", "07", "08", "09", "10", "11", "12", ],
            },
            {
                "year": "2025",
                "months": [ "01", "02", "03" ],
            }
        ],
        "trips": [
            {
                "year": "2024",
                "destinations": [
                    {"path": "pnw", "name": "Pacific Northwest"},
                    {"path": "ecuador", "name": "Ecuador"},
                    {"path": "utah", "name": "Utah"}
                ],
            },
            {
                "year": "2025",
                "destinations": [
                    {"path": "everglades", "name": "The Everglades"}
                ]
            }
        ],
        "selectedworks": [
            {"path": "panorama", "name": "Panoramas"},
            {"path": "street", "name": "Street Photography"},
            {"path": "cityscape", "name": "Cityscapes"},
            {"path": "landscape", "name": "Landscapes"},
            {"path": "wildlife", "name": "Wildlife"},
            {"path": "subwayentrance", "name": "Subway Structures"}
        ]
    }

function monthName(monthDigitString) {
    if (monthDigitString==="01") return "January";
    if (monthDigitString==="02") return "February";
    if (monthDigitString==="03") return "March";
    if (monthDigitString==="04") return "April";
    if (monthDigitString==="05") return "May";
    if (monthDigitString==="06") return "June";
    if (monthDigitString==="07") return "July";
    if (monthDigitString==="08") return "August";
    if (monthDigitString==="09") return "September";
    if (monthDigitString==="10") return "October";
    if (monthDigitString==="11") return "November";
    if (monthDigitString==="12") return "December";
    return "";
}

export {tree, monthName};
