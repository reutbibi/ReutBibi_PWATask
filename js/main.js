window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);

    var linktoShare = "";
    var titletoShare = "";

    function geoFindMe() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            document.getElementById("status").textContent = "The browser does not support GeoLocation";
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            linktoShare=`https://maps.google.com/?q=${latitude},${longitude}`;
            titletoShare=`https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
            
            document.getElementById("map-link").textContent = linktoShare;
            document.getElementById("iframe").src = titletoShare;
            document.getElementById("iframe").classList.remove("d-none");
        }

        function error() {
            document.getElementById("status").textContent = "The browser could not reteive GeoLocation";
        }

    }

    function share() {
        if (navigator.share) {
            const shareData = {
                title: "My Geo Location",
                text: titletoShare,
                url: linktoShare,
            }
            navigator.share(shareData);
        } else 
        {
            document.getElementById("status").textContent = "Could not share data...";
        }
    }
})