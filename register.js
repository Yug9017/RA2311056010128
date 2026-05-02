const axios = require("axios");

const BASE_URL = "http://20.207.122.201/evaluation-service";

async function register() {
    try {
        const res = await axios.post(`${BASE_URL}/register`, {
            email: "ys8665@srmist.edu.in",
            name: "Yug Sosa",
            mobileNo: "7069780730",
            githubUsername: "Yug9017",
            rollNo: "RA2311056010128",
            accessCode: "QkbpxH"
        });

        console.log("\n✅ REGISTER SUCCESS:\n");
        console.log(res.data);

    } catch (err) {
        console.error("❌ REGISTER FAILED:");
        console.error(err.response?.data || err.message);
    }
}

register();